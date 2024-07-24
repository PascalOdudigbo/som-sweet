import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db/db';
import { verifyToken } from '@/utils/auth';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedUserId = await verifyToken(token);
    const { orderId, amount, reason } = await req.json();

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { payment: true },
    });

    if (!order || order.userId !== decodedUserId) {
      return NextResponse.json({ error: 'Order not found or unauthorized' }, { status: 404 });
    }

    // Create Stripe refund
    const stripeRefund = await stripe.refunds.create({
      payment_intent: order.payment.stripePaymentId,
      amount: Math.round(amount * 100), // Convert to cents
    });

    // Create refund in database
    const refund = await prisma.refund.create({
      data: {
        orderId,
        amount,
        reason,
        status: 'Processed',
        stripeRefundId: stripeRefund.id,
      },
    });

    // Update order status
    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'Refunded' },
    });

    return NextResponse.json(refund);
  } catch (error) {
    console.error('Failed to process refund:', error);
    return NextResponse.json({ error: 'Failed to process refund' }, { status: 500 });
  }
}
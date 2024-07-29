// /api/refunds/[refundId]/approve/

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db/db';
import { verifyToken } from '@/utils/auth';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(req: NextRequest, { params }: { params: { refundId: string } }) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedUserId = await verifyToken(token);
    const refundId = parseInt(params.refundId);

    // Check if the user is an admin
    if (!decodedUserId){
      return NextResponse.json({ error: 'Unauthorize. User id noy decoded' }, { status: 403 });
    }

    const isAdmin = await checkIfUserIsAdmin(decodedUserId);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const refund = await prisma.refund.findUnique({
      where: { id: refundId },
      include: { order: { include: { payment: true } } },
    });

    if (!refund) {
      return NextResponse.json({ error: 'Refund not found' }, { status: 404 });
    }

    if (refund.status !== 'Pending') {
      return NextResponse.json({ error: 'Refund is not in a pending state' }, { status: 400 });
    }

    // Process refund in Stripe
    const stripeRefund = await stripe.refunds.create({
      payment_intent: refund?.order?.payment?.stripePaymentId,
      amount: Math.round(refund.amount * 100), // Convert to cents
    });

    // Update refund status in database
    const updatedRefund = await prisma.refund.update({
      where: { id: refundId },
      data: {
        status: 'Processed',
        stripeRefundId: stripeRefund.id,
        approvedBy: decodedUserId,
        approvedAt: new Date(),
      },
    });

    // Update order status
    await prisma.order.update({
      where: { id: refund.orderId },
      data: { status: 'Refunded' },
    });

    return NextResponse.json(updatedRefund);
  } catch (error) {
    console.error('Failed to approve refund:', error);
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json({ error: 'Stripe error: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to approve refund' }, { status: 500 });
  }
}

async function checkIfUserIsAdmin(userId: number): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { role: true },
  });
  return user?.role.name === 'Admin';
}
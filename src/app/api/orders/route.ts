// /api/orders/

import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/db/db';
import { verifyToken } from '@/utils/auth';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = await verifyToken(token);
    if (!userId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { paymentIntentId, shippingAddressId } = await req.json();

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json({ error: 'Payment not successful' }, { status: 400 });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true, variation: true } } },
    });

    if (!cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        shippingAddressId,
        total: paymentIntent.amount / 100,
        status: 'Paid',
        orderItems: {
          create: cart.items.map(item => ({
            productId: item.productId,
            variationId: item.variationId,
            quantity: item.quantity,
            price: item.variation?.price || item.product.basePrice,
            customText: item.customText,
          })),
        },
        payment: {
          create: {
            stripePaymentId: paymentIntentId,
            stripeCustomerId: paymentIntent.customer as string,
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency,
            status: paymentIntent.status,
            paymentMethod: paymentIntent.payment_method_types[0],
          },
        },
      },
      include: { orderItems: true, payment: true },
    });

    // Clear the cart
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
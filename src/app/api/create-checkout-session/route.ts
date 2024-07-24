import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { verifyToken } from '@/utils/auth';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20",
});

export async function POST(req: NextRequest) {
    try {
        const token = req.headers.get('Authorization')?.split(' ')[1];
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decodedUserId = await verifyToken(token);
        const { orderId, items } = await req.json();

        if (decodedUserId) {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: items.map((item: any) => ({
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: `${item.product.name} ${item.variation ? `- ${item.variation.name}` : ''}`,
                        },
                        unit_amount: Math.round((item.variation?.price || item.product.basePrice) * 100),
                    },
                    quantity: item.quantity,
                })),
                mode: 'payment',
                success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}&orderId=${orderId.toString()}`,
                cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
                metadata: {
                    orderId: orderId.toString(),
                    userId: decodedUserId.toString(),
                },
            });

            return NextResponse.json({ id: session.id });
        }


    } catch (error) {
        console.error('Error creating checkout session:', error);
        return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 });
    }
}
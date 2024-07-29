import { loadStripe, Stripe } from '@stripe/stripe-js';
import { CartType, OrderType } from './allModelTypes';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export async function createPaymentIntent(cart: CartType): Promise<{ clientSecret: string }> {
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify({ cart }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create payment intent');
  }

  return response.json();
}

export async function confirmPayment(stripe: Stripe, clientSecret: string, paymentMethodId: string, shippingAddressId: number): Promise<OrderType> {
  const result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: paymentMethodId,
  });

  if (result.error) {
    throw new Error(result.error.message || 'Payment failed');
  }

  if (result.paymentIntent?.status === 'succeeded') {
    // Create order in the database
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ 
        paymentIntentId: result.paymentIntent.id,
        shippingAddressId 
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create order');
    }

    return response.json();
  } else {
    throw new Error('Payment was not successful');
  }
}
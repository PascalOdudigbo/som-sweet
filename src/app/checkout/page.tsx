'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { NavChildFooterLayout, FormInput, Loading, Dropdown } from '@/components'
import { useAuth } from '@/contexts/AuthProvider'
import { useCart } from '@/contexts/CartProvider'
import { getUserAddresses, createAddress } from '@/utils/addressManagement'
import { createPaymentIntent } from '@/utils/paymentManagement'
import { showToast } from '@/utils/toast'
import { AddressType } from '@/utils/allModelTypes'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import './_checkout.scss'
import { createOrder } from '@/utils/orderManagement'
import Stripe from 'stripe'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutFormProps {
  clientSecret: string;
  handlePaymentSuccess: (paymentIntent: Stripe.PaymentIntent) => void;
}

function CheckoutForm({ clientSecret, handlePaymentSuccess }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      throw new Error('Card element not found');
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      }
    })

    if (result.error) {
      showToast('error', result.error.message || 'An error occurred')
    } else if (result.paymentIntent?.status === 'succeeded') {
      handlePaymentSuccess(result.paymentIntent)
    }

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="stripe_form">
      <CardElement options={{
        style: {
          base: {
            fontSize: '16px',
            color: '#424770',
            '::placeholder': {
              color: '#aab7c4',
            },
          },
          invalid: {
            color: '#9e2146',
          },
        },
      }}/>
      <button type="submit" disabled={!stripe || isProcessing} className="custom_large_button proceed_to_payment">
        {isProcessing ? 'Processing...' : 'Pay now'}
      </button>
    </form>
  )
}

function Checkout() {
  const { user } = useAuth()
  const { cart, clearCart } = useCart()
  const router = useRouter()

  const [addresses, setAddresses] = useState<AddressType[]>([])
  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(null)
  const [newAddress, setNewAddress] = useState<Partial<AddressType>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  useEffect(() => {
    const fetchAddresses = async () => {
      if (user) {
        try {
          const userAddresses = await getUserAddresses(user.id)
          setAddresses(userAddresses)
          if (userAddresses.length > 0) {
            setSelectedAddress(userAddresses[0])
          }
        } catch (error) {
          showToast('error', 'Failed to fetch addresses')
        }
      }
    }
    fetchAddresses()
  }, [user])

  useEffect(() => {
    const createIntent = async () => {
      if (cart) {
        try {
          const { clientSecret } = await createPaymentIntent(cart)
          setClientSecret(clientSecret)
        } catch (error) {
          showToast('error', 'Failed to initialize payment')
        }
      }
    }
    createIntent()
  }, [cart])

  const handleAddressChange = (addressId: string | number) => {
    const address = addresses.find(a => a.id === parseInt(addressId.toString()))
    setSelectedAddress(address || null)
  }

  const handleAddNewAddress = async () => {
    if (user) {
      try {
        const createdAddress = await createAddress({ ...newAddress, userId: user.id } as AddressType)
        setAddresses([...addresses, createdAddress])
        setSelectedAddress(createdAddress)
        setNewAddress({})
      } catch (error) {
        showToast('error', 'Failed to add new address')
      }
    }
  }

  const handlePaymentSuccess = async (paymentIntent: Stripe.PaymentIntent) => {
    try {
      if (!user || !selectedAddress) {
        throw new Error('Missing required information');
      }

      const orderData = {
        paymentIntentId: paymentIntent.id,
        shippingAddressId: selectedAddress.id
      };

      const createdOrder = await createOrder(orderData);

      // clearCart()
      showToast('success', 'Order placed successfully')
      router.push(`/order-confirmation/${createdOrder.id}`)
    } catch (error) {
      console.error('Order creation failed:', error)
      showToast('error', 'Failed to create order. Please contact support.')
    }
  }

  if (isLoading) return <Loading />

  return (
    <NavChildFooterLayout>
      <main className="checkout_main_container page_container flex_column_center">
        <h1 className='section_title'>Checkout</h1>
        <div className="checkout_content">
          <section className="address_section">
            <h2 className='section_title'>Shipping Address</h2>
            {addresses.length > 0 && (
              <Dropdown
                label="Select Address"
                items={addresses.map(address => `${address.addressLine1}, ${address.city}, ${address.state}, ${address.postalCode}`)}
                buttonText={selectedAddress ? `${selectedAddress.addressLine1}, ${selectedAddress.city}` : "Select an address"}
                clickFunction={handleAddressChange}
                required={true}
              />
            )}
            <h3 className='section_title'>Add a New Address</h3>
            <FormInput
              label="Address Line 1"
              autoComplete="address-line1"
              inputValue={newAddress.addressLine1 || ""}
              onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewAddress({ ...newAddress, addressLine1: e.target.value })
              }}
              inputType='text'
              readonly={false}
              required={true}
            />
            <FormInput
              label="Address Line 2"
              autoComplete="address-line2"
              inputValue={newAddress.addressLine2 || ""}
              onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewAddress({ ...newAddress, addressLine2: e.target.value })
              }}
              inputType='text'
              readonly={false}
              required={false}
            />
            <FormInput
              label="City"
              autoComplete="city"
              inputValue={newAddress.city || ""}
              onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewAddress({ ...newAddress, city: e.target.value })
              }}
              inputType='text'
              readonly={false}
              required={true}
            />
            <FormInput
              label="State"
              autoComplete="state"
              inputValue={newAddress.state || ""}
              onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewAddress({ ...newAddress, state: e.target.value })
              }}
              inputType='text'
              readonly={false}
              required={true}
            />
            <FormInput
              label="Postal Code"
              autoComplete="postal-code"
              inputValue={newAddress.postalCode || ""}
              onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewAddress({ ...newAddress, postalCode: e.target.value })
              }}
              inputType='text'
              readonly={false}
              required={true}
            />
            <FormInput
              label="Country"
              autoComplete="country"
              inputValue={newAddress.country || ""}
              onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewAddress({ ...newAddress, country: e.target.value })
              }}
              inputType='text'
              readonly={false}
              required={true}
            />
            <button className='custom_button' onClick={handleAddNewAddress}>Add New Address</button>
          </section>
          <section className="order_summary">
            <h2 className='section_title'>Order Summary</h2>
            {cart?.items.map((item) => (
              <div
                key={`${item.productId}-${item.variationId}`}
                className="cart_item"
              >
                <p>
                  {item.product.name} - {item.variation?.name}
                </p>
                <p>Quantity: {item.quantity}</p>
                <p>
                  Price: £
                  {(
                    (item.variation?.price || item.product.basePrice) *
                    item.quantity
                  ).toFixed(2)}
                </p>
              </div>
            ))}
            <p className='total_price'>
              Total: £
              {cart?.items
                .reduce(
                  (sum, item) =>
                    sum +
                    item.quantity *
                    (item.variation?.price || item.product.basePrice),
                  0
                )
                .toFixed(2)}
            </p>
          </section>
          {clientSecret && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm clientSecret={clientSecret} handlePaymentSuccess={handlePaymentSuccess} />
            </Elements>
          )}
        </div>
      </main>
    </NavChildFooterLayout>
  )
}

export default Checkout
'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { NavChildFooterLayout, FormInput, Loading } from '@/components'
import { useAuth } from '@/contexts/AuthProvider'
import { useCart } from '@/contexts/CartProvider'
import { getUserAddresses, createAddress } from '@/utils/addressManagement'
import { createOrder } from '@/utils/orderManagement'
import { showToast } from '@/utils/toast'
import { AddressType, OrderType } from '@/utils/allModelTypes'
import { loadStripe } from '@stripe/stripe-js'
import './_checkout.scss'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function Checkout() {
  const { user } = useAuth()
  const { cart, clearCart } = useCart()
  const router = useRouter()

  const [addresses, setAddresses] = useState<AddressType[]>([])
  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(null)
  const [newAddress, setNewAddress] = useState<Partial<AddressType>>({})
  const [isLoading, setIsLoading] = useState(false)

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

  const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const address = addresses.find(a => a.id === parseInt(e.target.value))
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

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      if (!user || !selectedAddress || !cart) {
        throw new Error('Missing required information')
      }

      const order: Partial<OrderType> = {
        userId: user.id,
        total: cart.items.reduce((sum, item) => sum + item.quantity * (item.variation?.price || item.product.basePrice), 0),
        status: 'Unpaid',
        shippingAddressId: selectedAddress.id,
        orderItems: cart?.items?.map(item => ({
          productId: item.productId,
          variationId: item.variationId,
          quantity: item.quantity,
          price: item.variation?.price || item.product.basePrice,
          customText: item.customText
        }))
      }

      const createdOrder = await createOrder(order as OrderType)

      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe failed to initialize')

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          orderId: createdOrder.id,
          items: cart.items,
        }),
      })

      const session = await response.json()

      if (session.error) {
        console.log(session.error)
        throw new Error(session.error)
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      })

      if (result.error) {
        throw new Error(result.error.message)
      }

      clearCart()
    } catch (error) {
      console.error('Checkout failed:', error)
      showToast('error', 'Checkout failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <Loading />

  return (
    <NavChildFooterLayout>
      <main className="checkout_container">
        <h1 className='section_title'>Checkout</h1>
        <section className="address_section">
          {addresses.length > 0 && <h2 className='section_title'>Shipping Address</h2>}          
          {
            addresses.length > 0 && (
            <select
              onChange={handleAddressChange}
              value={selectedAddress?.id || ""}
            >
              {addresses.map((address) => (
                <option key={address.id} value={address.id}>
                  {`${address.addressLine1}, ${address.city}, ${address.state}, ${address.postalCode}`}
                </option>
              ))}
            </select>
          )}
          <h2 className='section_title'>Add a New Address</h2>
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
          <h2>Order Summary</h2>
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
        <button className={"custom_large_button proceed_to_payment"} onClick={handleCheckout} disabled={!selectedAddress}>
          Proceed to Payment
        </button>
      </main>
    </NavChildFooterLayout>
  );
}

export default Checkout
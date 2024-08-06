'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { NavChildFooterLayout, Loading } from '@/components'
import { getOrderById } from '@/utils/orderManagement'
import { useAuth } from '@/hooks/useAuth'
import { OrderType } from '@/utils/allModelTypes'
import './_order_confirmation.scss'

function OrderConfirmation() {
  const [order, setOrder] = useState<OrderType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()
  const { user } = useAuth()

  useEffect(() => {
    const fetchOrder = async () => {
      if (user) {
        const orderId = params.id;

        if (orderId) {
          try {
            const fetchedOrder = await getOrderById(user.id, parseInt(orderId.toString()))
            setOrder(fetchedOrder)
          } catch (error) {
            console.error('Failed to fetch order:', error)
          }
        }
      }
      setIsLoading(false)
    }

    fetchOrder()
  }, [user, params])

  if (isLoading || !order) return <Loading />


  return (
    <NavChildFooterLayout>
      <main className='order_confirmation_container'>
        <h1 className='page_title'>Order Confirmation</h1>
        <div className='order_details'>
          <h2>Order #{order.id}</h2>
          <p>Status: {order.status}</p>
          <p>Total: £{order.total.toFixed(2)}</p>
        </div>
        <div className='order_items'>
          <h3>Order Items:</h3>
          {order?.orderItems && order?.orderItems.map((item) => (
            <div key={item.id} className='order_item'>
              <p>{item?.product?.name} - {item?.variation?.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: £{item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className='refund_policy'>
          <h3>Refund Policy</h3>
          <p>You can request a refund prior to receiving your order. Please read our full refund policy for more details.</p>
          <Link href="/store-policies/#refunds" className='refund_policy_link'>Read Full Refund Policy</Link>
        </div>
        <Link href="/orders" className='view_orders_button custom_large_button'>View All Orders</Link>
      </main>
    </NavChildFooterLayout>
  )
}

export default OrderConfirmation
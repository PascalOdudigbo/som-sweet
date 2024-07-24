'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { NavChildFooterLayout, Loading } from '@/components'
import { getUserOrders } from '@/utils/orderManagement'
import { useAuth } from '@/contexts/AuthProvider'
import { OrderType } from '@/utils/allModelTypes'
import './_orders.scss'

function MyOrders() {
  const [orders, setOrders] = useState<OrderType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        console.log(user)
        try {
          const fetchedOrders = await getUserOrders(user.id)
          console.log(fetchedOrders)
          setOrders(fetchedOrders)
        } catch (error) {
          console.error('Failed to fetch orders:', error)
        }
      }
      setIsLoading(false)
    }

    fetchOrders()
  }, [user])

  if (isLoading) return <Loading />

  return (
    <NavChildFooterLayout>
      <main className='my_orders_container page_container'>
        <h1 className='page_title'>My Orders</h1>
        {orders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className='order_card'>
              <h2>Order #{order.id}</h2>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Status: {order.status}</p>
              <p>Total: £{order.total.toFixed(2)}</p>
              <Link href={`/order-confirmation/?orderId=${order.id}`} className='view_details_button'>View Details</Link>
              {order.status !== 'Refunded' && (
                <Link href={`/request-refund/${order.id}`} className='request_refund_button'>Request Refund</Link>
              )}
            </div>
          ))
        )}
      </main>
    </NavChildFooterLayout>
  )
}

export default MyOrders
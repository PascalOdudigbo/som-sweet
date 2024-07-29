'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { NavChildFooterLayout, Loading, FormInput, TextArea } from '@/components'
import { useAuth } from '@/contexts/AuthProvider'
import { getOrderById, updateOrderStatus } from '@/utils/orderManagement'
import { requestRefund } from '@/utils/refundManagement'
import { OrderType } from '@/utils/allModelTypes'
import { showToast } from '@/utils/toast'
import './_request_refund.scss'

function RequestRefund({ params }: { params: { orderId: string } }) {
  const [order, setOrder] = useState<OrderType | null>(null)
  const [refundAmount, setRefundAmount] = useState<string>('')
  const [refundReason, setRefundReason] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchOrder = async () => {
      if (user) {
        try {
          const fetchedOrder = await getOrderById(user.id, parseInt(params.orderId))
          setOrder(fetchedOrder)
          setRefundAmount(fetchedOrder.total.toString())
        } catch (error) {
          console.error('Failed to fetch order:', error)
          showToast('error', 'Failed to fetch order details')
          router.push('/orders')
        }
      }
      setIsLoading(false)
    }

    fetchOrder()
  }, [user, params.orderId, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!order) throw new Error('Order not found')
      if (!user) throw new Error('Unauthorized, user not logged in!')
      const refundAmountFloat = parseFloat(refundAmount)
      if (isNaN(refundAmountFloat) || refundAmountFloat <= 0 || refundAmountFloat > order.total) {
        throw new Error('Invalid refund amount')
      }
      
      await requestRefund(order.id, refundAmountFloat, refundReason)
      await updateOrderStatus(user?.id, order.id, "Cancelled")
      showToast('success', 'Refund request submitted successfully')
      router.push('/orders')
    } catch (error) {
      console.error('Failed to submit refund request:', error)
      showToast('error', 'Failed to submit refund request')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) return <Loading />
  if (user && !order) return <div>Order not found</div>

  return (
    <NavChildFooterLayout>
      <main className='request_refund_container page_container'>
        <h1 className='page_title section_title'>Request Refund</h1>
        <div className='order_summary'>
          <h2 className='section_title'>Order Summary</h2>
          <p>Order #: {order?.id}</p>
          <p>Date: {new Date(order?.createdAt ?? "").toLocaleDateString()}</p>
          <p>Total: £{order?.total.toFixed(2)}</p>
        </div>
        <form onSubmit={handleSubmit} className='refund_form'>
          <FormInput
            label='Refund Amount (£)'
            inputType='number'
            inputValue={refundAmount}
            required={true}
            readonly={false}
            onChangeFunction={(e) => setRefundAmount(e.target.value)}
          />
          <TextArea
            label='Reason for Refund'
            inputValue={refundReason}
            required={true}
            rows={5}
            cols={50}
            onChangeFunction={(e) => setRefundReason(e.target.value)}
          />
          <button type='submit' className='submit_button' disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Refund Request'}
          </button>
        </form>
      </main>
    </NavChildFooterLayout>
  )
}

export default RequestRefund
'use client'
import React, { useState, useEffect } from 'react'
import { Loading, Search } from '@/components'
import { RefundType, OrderType, UserType } from '@/utils/allModelTypes'
import { getAllRefunds, approveRefund, denyRefund } from '@/utils/refundManagement'
import { showToast } from '@/utils/toast'
import { sendEmail } from '@/utils/emailJS'
import './_refunds.scss'

interface ExtendedRefundType extends RefundType {
  order: OrderType & {
    user: UserType;
    orderItems: Array<{
      id: number;
      productId: number;
      quantity: number;
      price: number;
      product: {
        name: string;
      };
    }>;
  };
}

function RefundsManagement() {
  const [refunds, setRefunds] = useState<ExtendedRefundType[]>([])
  const [filteredRefunds, setFilteredRefunds] = useState<ExtendedRefundType[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [expandedRefundId, setExpandedRefundId] = useState<number | null>(null)

  useEffect(() => {
    fetchRefunds()
  }, [])

  useEffect(() => {
    const filtered = refunds.filter(refund =>
      refund.orderId.toString().includes(searchTerm) ||
      refund.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      refund.order.user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredRefunds(filtered)
  }, [searchTerm, refunds])

  const fetchRefunds = async () => {
    setIsLoading(true)
    try {
      const fetchedRefunds = await getAllRefunds()
      setRefunds(fetchedRefunds)
      setFilteredRefunds(fetchedRefunds)
    } catch (error) {
      console.error('Failed to fetch refunds:', error)
      showToast('error', 'Failed to fetch refunds')
    } finally {
      setIsLoading(false)
    }
  }

  const handleApprove = async (refund: ExtendedRefundType) => {
    try {
      const updatedRefund = await approveRefund(refund.id);
      console.log('Refund approved:', updatedRefund);
      showToast('success', 'Refund approved successfully');
      await sendEmail({
        emailTitle: "Refund Request Approved",
        username: refund.order.user.username,
        emailTo: refund.order.user.email,
        notice: "This is regarding your recent refund request",
        emailBody: `Your refund request for order #${refund.orderId} has been approved and processed.`
      }, "success", "Approval email sent to customer");
      fetchRefunds(); // Refresh the list
    } catch (error) {
      console.error('Failed to approve refund:', error);
      showToast('error', 'Failed to approve refund');
    }
  };

  const handleDeny = async (refund: ExtendedRefundType) => {
    try {
      await denyRefund(refund.id)
      showToast('info', 'Refund request denied')
      await sendEmail({
        emailTitle: "Refund Request Denied",
        username: refund.order.user.username,
        emailTo: refund.order.user.email,
        notice: "This is regarding your recent refund request",
        emailBody: `We regret to inform you that your refund request for order #${refund.orderId} has been denied.`
      }, "info", "Denial email sent to customer")
      fetchRefunds() // Refresh the list
    } catch (error) {
      console.error('Failed to deny refund:', error)
      showToast('error', 'Failed to deny refund')
    }
  }

  const toggleExpand = (refundId: number) => {
    setExpandedRefundId(expandedRefundId === refundId ? null : refundId)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <main className='refunds_management_wrapper'>
      <h1 className='section_title'>Refunds Management</h1>
      <div className="search_wrapper">
        <Search onSearch={setSearchTerm} />
      </div>
      <table className="refunds_table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRefunds.map((refund) => (
            <React.Fragment key={refund.id}>
              <tr onClick={() => toggleExpand(refund.id)}>
                <td>{refund.orderId}</td>
                <td>{refund.order.user.email}</td>
                <td>£{refund.amount.toFixed(2)}</td>
                <td>{refund.reason}</td>
                <td>{refund.status}</td>
                <td>
                  {refund.status === 'Pending' && (
                    <>
                      <button onClick={() => handleApprove(refund)} className="approve_button">Approve</button>
                      <button onClick={() => handleDeny(refund)} className="deny_button">Deny</button>
                    </>
                  )}
                </td>
              </tr>
              {expandedRefundId === refund.id && (
                <tr className="expanded_details">
                  <td colSpan={6}>
                    <h3>Order Details</h3>
                    <p>Order Date: {new Date(refund.order.createdAt).toLocaleDateString()}</p>
                    <p>Total: £{refund.order.total.toFixed(2)}</p>
                    <h4>Customer Details</h4>
                    <p>Name: {refund.order.user.username}</p>
                    <p>Email: {refund.order.user.email}</p>
                    <h4>Order Items</h4>
                    <ul>
                      {refund.order.orderItems.map((item) => (
                        <li key={item.id}>
                          {item.product.name} - Quantity: {item.quantity} - Price: £{item.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {filteredRefunds.length === 0 && <p className="no_refunds_text">No refunds found</p>}
    </main>
  )
}

export default RefundsManagement
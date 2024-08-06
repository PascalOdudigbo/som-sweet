// app/admin/orders/page.tsx
'use client'
import React, { useState, useEffect } from 'react'
import { Loading, Search, Pagination, OrderRow } from '@/components'
import { OrderType } from '@/utils/allModelTypes'
import { getAllOrders, updateOrderStatusAdmin, deleteUnpaidAndPendingOrders } from '@/utils/orderManagement'
import './_orders.scss'

function OrdersManagement() {
  const [orders, setOrders] = useState<OrderType[]>([])
  const [filteredOrders, setFilteredOrders] = useState<OrderType[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [ordersPerPage] = useState(10)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const fetchedOrders = await getAllOrders()
      setOrders(fetchedOrders)
      setFilteredOrders(fetchedOrders)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const results = orders.filter(order =>
      order.id.toString().includes(searchTerm) ||
      order.user?.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredOrders(results)
    setCurrentPage(1)
  }, [searchTerm, orders])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      const updatedOrder = await updateOrderStatusAdmin(orderId, newStatus)
      setOrders(orders.map(order => order.id === orderId ? updatedOrder : order))
    } catch (error) {
      console.error('Failed to update order status:', error)
    }
  }

  const handleDeleteUnpaidAndPending = async () => {
    if (window.confirm('Are you sure you want to delete all unpaid and pending orders? This action cannot be undone.')) {
      try {
        await deleteUnpaidAndPendingOrders()
        await fetchOrders() // Refresh the order list after deletion
      } catch (error) {
        console.error('Failed to delete unpaid and pending orders:', error)
      }
    }
  }

  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (isLoading) return <Loading />

  return (
    <main className='orders_management_wrapper'>
      <header className='orders_management_header flex_row_center'>
        <h2 className='section_title orders_management_header_title'>Orders</h2>
        {/* <button onClick={handleDeleteUnpaidAndPending} className="delete_unpaid_button">
          Delete Unpaid and Pending Orders
        </button> */}
      </header>
      
      <div className="search_wrapper">
        <Search onSearch={handleSearch} />
      </div>

      <table className="orders_table">
        <thead>
          <tr className="table_headers_wrapper">
            <th className="p__inter table_header">ORDER ID</th>
            <th className="p__inter table_header">CUSTOMER</th>
            <th className="p__inter table_header">TOTAL</th>
            <th className="p__inter table_header">STATUS</th>
            <th className="p__inter table_header">DATE</th>
            <th className="p__inter table_header">ACTION</th>
          </tr>
        </thead>

        <tbody className='table_body'>
          {currentOrders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              onStatusChange={handleStatusChange}
            />
          ))}
        </tbody>
      </table>

      {filteredOrders.length === 0 && <h3 className="p__inter no_orders_text">NO ORDERS FOUND</h3>}

      <Pagination
        itemsPerPage={ordersPerPage}
        totalItems={filteredOrders.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </main>
  )
}

export default OrdersManagement
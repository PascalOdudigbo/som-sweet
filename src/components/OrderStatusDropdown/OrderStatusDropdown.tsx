// components/OrderStatusDropdown/OrderStatusDropdown.tsx
import React from 'react'
import { Dropdown } from '@/components'
import './_order_status_dropdown.scss'

interface OrderStatusDropdownProps {
  currentStatus: string
  onStatusChange: (newStatus: string | number) => void
}

const statusOptions = ["Pending", "Rejected", "Processing", "Shipped", "Delivered"]

function OrderStatusDropdown({ currentStatus, onStatusChange }: OrderStatusDropdownProps) {
  return (
    <Dropdown
      label="Status"
      items={statusOptions}
      buttonText={currentStatus}
      clickFunction={onStatusChange}
      required={true}
    />
  )
}

export default OrderStatusDropdown
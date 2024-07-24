import { RefundType } from './allModelTypes';
import { showToast } from './toast';

export async function requestRefund(orderId: number, amount: number, reason: string): Promise<RefundType> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch('/api/refunds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ orderId, amount, reason }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to request refund');
    }

    showToast('success', 'Refund request submitted successfully');
    return response.json();
  } catch (error) {
    console.error('Error requesting refund:', error);
    showToast('error', 'Failed to request refund');
    throw error;
  }
}

export async function getRefundsByOrderId(orderId: number): Promise<RefundType[]> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`/api/refunds/order/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch refunds');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching refunds:', error);
    showToast('error', 'Failed to fetch refunds');
    throw error;
  }
}
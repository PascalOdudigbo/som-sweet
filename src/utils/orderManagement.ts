import { OrderType } from './allModelTypes';
import { showToast } from './toast';

export async function createOrder(orderData: { paymentIntentId: string, shippingAddressId: number }): Promise<OrderType> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create order');
    }

    return response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

export async function getOrderById(userId: number, id: number): Promise<OrderType> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`/api/orders/${userId}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch order');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching order:', error);
    showToast('error', 'Failed to fetch order');
    throw error;
  }
}

export async function getUserOrders(userId: number): Promise<OrderType[]> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`/api/orders/user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch user orders');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching user orders:', error);
    showToast('error', 'Failed to fetch orders');
    throw error;
  }
}

export async function updateOrderStatus(userId: number, id: number, status: string): Promise<OrderType> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`/api/orders/${userId}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update order status');
    }
    showToast('success', 'Order status updated successfully');
    return response.json();
  } catch (error) {
    console.error('Error updating order status:', error);
    showToast('error', 'Failed to update order status');
    throw error;
  }
}
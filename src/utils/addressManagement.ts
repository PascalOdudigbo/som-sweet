import { AddressType } from './allModelTypes';
import { showToast } from './toast';

export async function getUserAddresses(userId: number): Promise<AddressType[]> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`/api/addresses/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch addresses');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching addresses:', error);
    showToast('error', 'Failed to fetch addresses');
    throw error;
  }
}

export async function createAddress(address: Omit<AddressType, 'id'>): Promise<AddressType> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`/api/addresses/${address.userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(address),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create address');
    }
    showToast('success', 'Address created successfully');
    return response.json();
  } catch (error) {
    console.error('Error creating address:', error);
    showToast('error', 'Failed to create address');
    throw error;
  }
}

export async function updateAddress(id: number, address: Partial<AddressType>): Promise<AddressType> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`/api/addresses/${address.userId}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(address),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update address');
    }
    showToast('success', 'Address updated successfully');
    return response.json();
  } catch (error) {
    console.error('Error updating address:', error);
    showToast('error', 'Failed to update address');
    throw error;
  }
}

export async function deleteAddress(userId: number, id: number): Promise<void> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`/api/addresses/${userId}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete address');
    }
    showToast('success', 'Address deleted successfully');
  } catch (error) {
    console.error('Error deleting address:', error);
    showToast('error', 'Failed to delete address');
    throw error;
  }
}
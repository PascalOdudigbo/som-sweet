// utils/staffManagement.ts

import { UserType, RoleType } from './allModelTypes';

export async function getAllStaff(): Promise<UserType[]> {
  try {
    const response = await fetch('/api/staff');
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch staff: ${errorData.message || response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in getAllStaff:', error);
    throw error;
  }
}

export async function getStaffById(id: number): Promise<UserType> {
  try {
    const response = await fetch(`/api/staff/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch staff member: ${errorData.message || response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error in getStaffById for id ${id}:`, error);
    throw error;
  }
}

export async function createStaff(staff: Omit<UserType, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserType> {
  try {
    const response = await fetch('/api/staff', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(staff),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to create staff member: ${errorData.message || response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in createStaff:', error);
    throw error;
  }
}

export async function updateStaff(id: number, staffData: Partial<UserType>): Promise<UserType> {
  try {
    const response = await fetch(`/api/staff/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(staffData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to update staff member: ${errorData.message || response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error in updateStaff for id ${id}:`, error);
    throw error;
  }
}

export async function deleteStaff(id: number): Promise<void> {
  try {
    const response = await fetch(`/api/staff/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to delete staff member: ${errorData.message || response.statusText}`);
    }
  } catch (error) {
    console.error(`Error in deleteStaff for id ${id}:`, error);
    throw error;
  }
}

export async function getAllRoles(): Promise<RoleType[]> {
  try {
    const response = await fetch('/api/roles');
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch roles: ${errorData.message || response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in getAllRoles:', error);
    throw error;
  }
}

export async function assignRole(userId: number, roleId: number): Promise<UserType> {
  try {
    const response = await fetch(`/api/staff/${userId}/role`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roleId }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to assign role: ${errorData.message || response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error in assignRole for userId ${userId}:`, error);
    throw error;
  }
}

export async function toggleStaffActiveStatus(id: number): Promise<UserType> {
  try {
    const response = await fetch(`/api/staff/${id}/toggle-active`, {
      method: 'PUT',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to toggle staff active status: ${errorData.message || response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error in toggleStaffActiveStatus for id ${id}:`, error);
    throw error;
  }
}
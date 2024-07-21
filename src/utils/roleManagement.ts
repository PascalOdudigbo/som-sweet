// utils/roleManagement.ts

import { RoleType } from './allModelTypes';

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

export async function getRoleById(id: number): Promise<RoleType> {
  try {
    const response = await fetch(`/api/roles/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch role: ${errorData.message || response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error in getRoleById for id ${id}:`, error);
    throw error;
  }
}

export async function createRole(role: Omit<RoleType, 'id'>): Promise<RoleType> {
  try {
    const response = await fetch('/api/roles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(role),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to create role: ${errorData.message || response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in createRole:', error);
    throw error;
  }
}

export async function updateRole(id: number, role: Partial<Omit<RoleType, 'id'>>): Promise<RoleType> {
  try {
    const response = await fetch(`/api/roles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(role),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to update role: ${errorData.message || response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error in updateRole for id ${id}:`, error);
    throw error;
  }
}

export async function deleteRole(id: number): Promise<void> {
  try {
    const response = await fetch(`/api/roles/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to delete role: ${errorData.message || response.statusText}`);
    }
  } catch (error) {
    console.error(`Error in deleteRole for id ${id}:`, error);
    throw error;
  }
}
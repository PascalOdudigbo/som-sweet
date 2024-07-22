import { UserType, RoleType } from './allModelTypes';

export const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const isLoggedIn = (): boolean => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  const decodedToken: any = parseJwt(token);
  if (!decodedToken || Date.now() >= decodedToken.exp * 1000) {
    localStorage.removeItem('token');
    return false;
  }

  return true;
};

export async function getUserData(): Promise<UserType> {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch('/api/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch user data: ${errorData.error || response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in getUserData:', error);
    throw error;
  }
}

export async function getAllStaff(): Promise<UserType[]> {
  try {
    const response = await fetch('/api/staff');
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch staff: ${errorData.error || response.statusText}`);
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
      throw new Error(`Failed to fetch staff member: ${errorData.error || response.statusText}`);
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
      throw new Error(`Failed to create staff member: ${errorData.error || response.statusText}`);
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
      throw new Error(`Failed to update staff member: ${errorData.error || response.statusText}`);
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
      throw new Error(`Failed to delete staff member: ${errorData.error || response.statusText}`);
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
      throw new Error(`Failed to fetch roles: ${errorData.error || response.statusText}`);
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
      throw new Error(`Failed to assign role: ${errorData.error || response.statusText}`);
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
      throw new Error(`Failed to toggle staff active status: ${errorData.error || response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error in toggleStaffActiveStatus for id ${id}:`, error);
    throw error;
  }
}

export async function signIn(email: string, password: string): Promise<{ user: UserType, token: string }> {
  try {
    const response = await fetch('/api/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to sign in: ${errorData.error || response.statusText}`);
    }
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
  } catch (error) {
    console.error('Sign in failed:', error);
    throw error;
  }
}

export const signOut = () => {
  localStorage.removeItem('token');
};
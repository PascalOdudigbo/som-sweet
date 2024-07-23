import { UserType } from './allModelTypes';

export async function signUp(userData: { username: string; email: string; password: string }): Promise<UserType> {
    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to sign up: ${errorData.error || response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error in signUp:', error);
      throw error;
    }
  }
  

export async function getUserProfile(): Promise<UserType> {
  try {
    const response = await fetch('/api/users/profile');
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch user profile: ${errorData.error || response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    throw error;
  }
}

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

export const signOut = () => {
  localStorage.removeItem('token');
};
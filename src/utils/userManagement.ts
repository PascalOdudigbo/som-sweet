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
    return response.json();
  } catch (error) {
    console.error('Error in signIn:', error);
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
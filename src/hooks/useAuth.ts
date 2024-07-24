'use client'
import { useState, useEffect } from 'react';
import { UserType } from '@/utils/allModelTypes';
import { parseJwt } from '@/utils/userManagement';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter()


  async function loadUserFromToken() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken: any = parseJwt(token);
        
        if (decodedToken && Date.now() < decodedToken.exp * 1000) {
          try {
            const response = await fetch('/api/users/', {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
              const userData = await response.json();
              setUser(userData);
            } else {
              localStorage.removeItem('token');
              setUser(null);
            }
          } catch (error) {
            console.error('Error fetching user profile:', error);
            localStorage.removeItem('token');
            setUser(null);
          }
        } else {
          localStorage.removeItem('token');
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUserFromToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const { user, token } = await response.json();
        localStorage.setItem('token', token);
        setUser(user);
        return user;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push("/")
    
  };

  return { user, loading, login, logout, loadUserFromToken };
}
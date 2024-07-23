'use client'
import React, { createContext, useContext } from 'react';
import { UserType } from '@/utils/allModelTypes';
import { useAuth as useAuthHook } from '@/hooks/useAuth'; // Import the existing useAuth hook

interface AuthContextType {
  user: UserType | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserType>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Use the existing useAuth hook
  const auth = useAuthHook(); 

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
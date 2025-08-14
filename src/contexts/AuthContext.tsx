import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { dataService } from '../services/dataService';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  loading: boolean;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('yamaha_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Ensure dates are properly parsed
        parsedUser.createdAt = new Date(parsedUser.createdAt);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('yamaha_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data or create demo user
      let loginUser = mockUsers.find(u => u.email === email);
      
      if (!loginUser) {
        // Create demo user for any email
        loginUser = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          phone: '+62812-3456-7890',
          avatar: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1507003211169-0a1dd7228f2d' : '1494790108755-2616b612b786'}?w=150&h=150&fit=crop&crop=face`,
          balance: Math.floor(Math.random() * 500000) + 50000, // Random balance between 50k-550k
          role: email.includes('admin') ? 'admin' : 'customer',
          createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000) // Random date within last 90 days
        };
      }
      
      setUser(loginUser);
      localStorage.setItem('yamaha_user', JSON.stringify(loginUser));
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Partial<User>) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: userData.email || '',
        name: userData.name || '',
        phone: userData.phone || '',
        avatar: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1507003211169-0a1dd7228f2d' : '1494790108755-2616b612b786'}?w=150&h=150&fit=crop&crop=face`,
        balance: 0,
        role: 'customer',
        createdAt: new Date()
      };
      
      setUser(newUser);
      localStorage.setItem('yamaha_user', JSON.stringify(newUser));
      
      // Create welcome notification
      await dataService.createNotification({
        userId: newUser.id,
        title: 'Selamat Datang di Yamaha Member!',
        message: 'Terima kasih telah bergabung. Mulai selesaikan tugas pertama Anda dan dapatkan reward menarik!',
        type: 'system',
        read: false
      });
      
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const updatedUser = await dataService.updateUser(user.id, updates);
      if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem('yamaha_user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error('Profile update error:', error);
      throw new Error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('yamaha_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
import React from 'react';
import { Bell, User, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
  showNotifications?: boolean;
}

export default function Header({ title, onMenuClick, showNotifications = true }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="bg-gradient-to-r from-[#003399] to-blue-600 text-white px-4 py-4 sticky top-0 z-50 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-white hover:bg-opacity-20 rounded-xl transition-all duration-200"
            >
              <Menu size={20} />
            </button>
          )}
          <h1 className="text-xl font-bold truncate">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          {showNotifications && (
            <button className="relative p-2 hover:bg-white hover:bg-opacity-20 rounded-xl transition-all duration-200">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                3
              </span>
            </button>
          )}
          
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <span className="hidden sm:block text-sm font-semibold">
              {user?.name}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
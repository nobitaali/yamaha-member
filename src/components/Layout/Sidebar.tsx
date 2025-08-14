import React from 'react';
import { Home, ClipboardList, Gift, User, Settings, LogOut, Users, BarChart3 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import clsx from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const customerNavItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', path: '/dashboard' },
    { id: 'tasks', icon: ClipboardList, label: 'Tugas', path: '/tasks' },
    { id: 'rewards', icon: Gift, label: 'Reward', path: '/rewards' },
    { id: 'profile', icon: User, label: 'Profil', path: '/profile' }
  ];

  const adminNavItems = [
    { id: 'admin', icon: BarChart3, label: 'Dashboard Admin', path: '/admin' },
    { id: 'admin-tasks', icon: ClipboardList, label: 'Kelola Tugas', path: '/admin/tasks' },
    { id: 'admin-users', icon: Users, label: 'Kelola User', path: '/admin/users' },
    { id: 'admin-submissions', icon: Gift, label: 'Verifikasi', path: '/admin/submissions' }
  ];

  const navItems = user?.role === 'admin' ? adminNavItems : customerNavItems;

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={clsx(
        'fixed left-0 top-0 h-full bg-white border-r border-gray-200 w-64 z-50 transform transition-transform duration-300 ease-in-out',
        'lg:translate-x-0 lg:static lg:z-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#003399] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Y</span>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Yamaha Loyalty</h2>
              <p className="text-sm text-gray-500">{user?.role === 'admin' ? 'Admin Panel' : 'Customer'}</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={clsx(
                      'w-full flex items-center space-x-3 px-3 py-2 rounded-md transition-colors text-left',
                      isActive
                        ? 'bg-[#003399] text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Keluar</span>
          </button>
        </div>
      </aside>
    </>
  );
}
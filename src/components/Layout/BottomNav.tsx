import React from 'react';
import { Home, ClipboardList, Gift, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

const navItems = [
  { id: 'dashboard', icon: Home, label: 'Beranda', path: '/dashboard' },
  { id: 'tasks', icon: ClipboardList, label: 'Tugas', path: '/tasks' },
  { id: 'rewards', icon: Gift, label: 'Reward', path: '/rewards' },
  { id: 'profile', icon: User, label: 'Profil', path: '/profile' }
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 lg:hidden shadow-2xl">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={clsx(
                'flex flex-col items-center space-y-1 py-2 px-4 rounded-2xl transition-all duration-200',
                isActive
                  ? 'text-[#003399] bg-blue-50 scale-105'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              )}
            >
              <Icon size={22} />
              <span className="text-xs font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
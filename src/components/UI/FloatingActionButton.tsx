import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export default function FloatingActionButton({ 
  onClick, 
  icon = <Plus size={24} />, 
  className = '' 
}: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-24 right-6 lg:bottom-8 w-14 h-14 bg-gradient-to-r from-[#003399] to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center z-40 ${className}`}
    >
      {icon}
    </button>
  );
}
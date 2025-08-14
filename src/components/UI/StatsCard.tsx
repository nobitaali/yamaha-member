import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  animated?: boolean;
}

export default function StatsCard({ 
  label, 
  value, 
  icon: Icon, 
  color, 
  change, 
  trend = 'neutral',
  animated = false 
}: StatsCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
          <div className="text-2xl font-bold text-gray-900">
            {animated && typeof value === 'number' ? (
              <AnimatedCounter value={value} />
            ) : (
              value
            )}
          </div>
          {change && (
            <p className={`text-sm mt-1 font-medium ${getTrendColor()}`}>
              {change}
            </p>
          )}
        </div>
        <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center shadow-lg`}>
          <Icon className="text-white" size={24} />
        </div>
      </div>
    </div>
  );
}
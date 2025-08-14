import React from 'react';
import { Calendar, MapPin, Trophy, Users, Clock, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import ProgressRing from './ProgressRing';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    reward: number;
    deadline: string;
    category: string;
    location: string;
    participants: number;
    maxParticipants: number;
    requirements: string[];
  };
  onTakeTask: (taskId: string) => void;
  onViewDetails: (taskId: string) => void;
}

export default function TaskCard({ task, onTakeTask, onViewDetails }: TaskCardProps) {
  const progress = (task.participants / task.maxParticipants) * 100;
  const daysLeft = Math.ceil((new Date(task.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  const getCategoryColor = (category: string) => {
    const colors = {
      service: 'bg-blue-100 text-blue-800',
      social: 'bg-pink-100 text-pink-800',
      survey: 'bg-green-100 text-green-800',
      testride: 'bg-purple-100 text-purple-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Header with category and reward */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(task.category)}`}>
            {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
          </span>
          <div className="text-right">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full">
              <span className="text-sm font-bold">{formatCurrency(task.reward)}</span>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{task.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{task.description}</p>
      </div>

      {/* Progress and stats */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <ProgressRing progress={progress} size={60} strokeWidth={6}>
              <span className="text-xs font-bold text-[#003399]">{Math.round(progress)}%</span>
            </ProgressRing>
            <div>
              <p className="text-sm font-semibold text-gray-900">{task.participants} dari {task.maxParticipants}</p>
              <p className="text-xs text-gray-500">peserta bergabung</p>
            </div>
          </div>
          
          <div className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
            daysLeft <= 3 ? 'bg-red-100 text-red-700' : 
            daysLeft <= 7 ? 'bg-orange-100 text-orange-700' : 
            'bg-blue-100 text-blue-700'
          }`}>
            <Clock size={14} />
            <span className="text-xs font-semibold">{daysLeft} hari</span>
          </div>
        </div>

        {/* Location and deadline */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin size={16} className="mr-2 text-gray-400" />
            <span>{task.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-2 text-gray-400" />
            <span>Deadline: {new Date(task.deadline).toLocaleDateString('id-ID')}</span>
          </div>
        </div>

        {/* Requirements preview */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-700 mb-2">Persyaratan:</p>
          <div className="flex flex-wrap gap-1">
            {task.requirements.slice(0, 2).map((req, index) => (
              <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                {req}
              </span>
            ))}
            {task.requirements.length > 2 && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs">
                +{task.requirements.length - 2} lainnya
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="px-6 pb-6">
        <div className="flex space-x-3">
          <button
            onClick={() => onTakeTask(task.id)}
            className="flex-1 bg-gradient-to-r from-[#003399] to-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <Trophy size={18} />
            <span>Ambil Tugas</span>
          </button>
          <button
            onClick={() => onViewDetails(task.id)}
            className="px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 hover:border-[#003399] hover:text-[#003399] transition-all duration-200 flex items-center justify-center"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
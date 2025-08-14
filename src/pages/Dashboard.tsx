import React, { useState } from 'react';
import { Wallet, Trophy, Clock, TrendingUp, Star, Gift, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { formatCurrency } from '../utils/format';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import StatsCard from '../components/UI/StatsCard';
import ProgressRing from '../components/UI/ProgressRing';
import AnimatedCounter from '../components/UI/AnimatedCounter';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const stats = [
    {
      label: 'Saldo Reward',
      value: user?.balance || 0,
      icon: Wallet,
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      change: '+15% bulan ini',
      trend: 'up' as const,
      animated: true
    },
    {
      label: 'Tugas Selesai',
      value: 12,
      icon: Trophy,
      color: 'bg-gradient-to-r from-[#003399] to-blue-600',
      change: '+3 minggu ini',
      trend: 'up' as const,
      animated: true
    },
    {
      label: 'Tugas Aktif',
      value: 3,
      icon: Clock,
      color: 'bg-gradient-to-r from-orange-500 to-amber-500',
      animated: true
    },
    {
      label: 'Total Poin',
      value: 2450,
      icon: TrendingUp,
      color: 'bg-gradient-to-r from-purple-500 to-indigo-500',
      change: '+180 poin',
      trend: 'up' as const,
      animated: true
    }
  ];

  const recentTasks = [
    {
      id: '1',
      title: 'Review Service Yamaha',
      reward: 50000,
      deadline: '2025-01-20',
      status: 'active'
    },
    {
      id: '2',
      title: 'Share Foto Motor di Social Media',
      reward: 25000,
      deadline: '2025-01-18',
      status: 'completed'
    },
    {
      id: '3',
      title: 'Survey Kepuasan Pelanggan',
      reward: 30000,
      deadline: '2025-01-25',
      status: 'active'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Dashboard"
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto p-4 pb-20 lg:pb-4">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section with Achievement */}
            <div className="mb-8 bg-gradient-to-r from-[#003399] to-blue-600 rounded-3xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-5 rounded-full translate-y-12 -translate-x-12" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      Selamat datang, {user?.name}! 👋
                    </h2>
                    <p className="text-blue-100">
                      Anda sudah menyelesaikan 12 tugas bulan ini
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="text-yellow-400" size={16} />
                      <span className="text-sm font-semibold">Gold Member</span>
                    </div>
                    <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                      <span className="text-sm font-bold">Level 8</span>
                    </div>
                  </div>
                </div>
                
                {/* Progress to next level */}
                <div className="bg-white bg-opacity-10 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress ke Level 9</span>
                    <span className="text-sm font-bold">2,450 / 3,000 poin</span>
                  </div>
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: '82%' }}
                    />
                  </div>
                  <p className="text-xs text-blue-100 mt-2">550 poin lagi untuk naik level!</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <StatsCard
                  key={index}
                  label={stat.label}
                  value={stat.label === 'Saldo Reward' ? formatCurrency(stat.value as number) : stat.value}
                  icon={stat.icon}
                  color={stat.color}
                  change={stat.change}
                  trend={stat.trend}
                  animated={stat.animated}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Zap className="mr-2 text-[#003399]" size={20} />
                  Aksi Cepat
                </h3>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-[#003399] to-blue-600 text-white p-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2">
                    <Trophy size={18} />
                    <span>Lihat Tugas Baru</span>
                  </button>
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2">
                    <Gift size={18} />
                    <span>Klaim Reward</span>
                  </button>
                </div>
              </div>
              
              {/* Achievement Ring */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Pencapaian Bulan Ini</h3>
                <ProgressRing progress={75} size={120}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#003399]">75%</div>
                    <div className="text-xs text-gray-500">Target</div>
                  </div>
                </ProgressRing>
                <p className="text-sm text-gray-600 mt-3 text-center">
                  9 dari 12 tugas selesai
                </p>
              </div>
              
              {/* Leaderboard Preview */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Trophy className="mr-2 text-yellow-500" size={20} />
                  Top Performer
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                      <span className="font-semibold text-gray-900">{user?.name}</span>
                    </div>
                    <span className="font-bold text-[#003399]">2,450 poin</span>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Anda berada di peringkat #1</p>
                    <p className="text-xs text-gray-500">di wilayah Jakarta</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Recent Tasks */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">Aktivitas Terbaru</h3>
                  <button className="text-[#003399] hover:text-blue-800 font-semibold text-sm">
                    Lihat Semua
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {recentTasks.map((task) => (
                  <div key={task.id} className="p-6 hover:bg-blue-50 transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{task.title}</h4>
                        <p className="text-sm text-gray-600">
                          Deadline: {new Date(task.deadline).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-bold text-[#003399] text-lg">
                            {formatCurrency(task.reward)}
                          </p>
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                            task.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {task.status === 'completed' ? 'Selesai' : 'Aktif'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
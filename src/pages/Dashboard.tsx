import React, { useState, useEffect } from 'react';
import { Wallet, Trophy, Clock, TrendingUp, Star, Gift, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { formatCurrency } from '../utils/format';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import StatsCard from '../components/UI/StatsCard';
import ProgressRing from '../components/UI/ProgressRing';
import AnimatedCounter from '../components/UI/AnimatedCounter';
import { dataService } from '../services/dataService';
import { Task, Submission, Transaction } from '../types';
import { mockLeaderboard } from '../data/mockData';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [userSubmissions, setUserSubmissions] = useState<Submission[]>([]);
  const [userTransactions, setUserTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!user) return;
      
      try {
        // Load recent tasks
        const tasks = await dataService.getTasks({ status: 'active' });
        setRecentTasks(tasks.slice(0, 3));

        // Load user submissions
        const submissions = await dataService.getSubmissions({ userId: user.id });
        setUserSubmissions(submissions);

        // Load user transactions
        const transactions = await dataService.getTransactions(user.id);
        setUserTransactions(transactions.slice(0, 5));
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user]);

  const completedTasks = userSubmissions.filter(s => s.status === 'approved').length;
  const activeTasks = userSubmissions.filter(s => s.status === 'pending').length;
  const totalPoints = completedTasks * 100 + Math.floor(Math.random() * 500);
  const userRank = mockLeaderboard.find(l => l.userId === user?.id)?.rank || Math.floor(Math.random() * 10) + 1;

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
      value: completedTasks,
      icon: Trophy,
      color: 'bg-gradient-to-r from-[#003399] to-blue-600',
      change: `+${Math.floor(completedTasks / 3)} minggu ini`,
      trend: 'up' as const,
      animated: true
    },
    {
      label: 'Tugas Aktif',
      value: activeTasks,
      icon: Clock,
      color: 'bg-gradient-to-r from-orange-500 to-amber-500',
      animated: true
    },
    {
      label: 'Total Poin',
      value: totalPoints,
      icon: TrendingUp,
      color: 'bg-gradient-to-r from-purple-500 to-indigo-500',
      change: `+${Math.floor(totalPoints * 0.1)} poin`,
      trend: 'up' as const,
      animated: true
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Dashboard"
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 pb-20 lg:pb-4">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section with Achievement */}
            <div className="mb-6 bg-gradient-to-r from-[#003399] to-blue-600 rounded-2xl lg:rounded-3xl p-4 sm:p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-white bg-opacity-10 rounded-full -translate-y-8 translate-x-8 sm:-translate-y-12 sm:translate-x-12 lg:-translate-y-16 lg:translate-x-16" />
              <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white bg-opacity-5 rounded-full translate-y-8 -translate-x-8 sm:translate-y-10 sm:-translate-x-10 lg:translate-y-12 lg:-translate-x-12" />
              
              <div className="relative z-10">
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0 mb-4">
                  <div className="flex-1">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 leading-tight">
                      Selamat datang, <br className="sm:hidden" />
                      <span className="text-yellow-300">{user?.name}!</span> 👋
                    </h2>
                    <p className="text-blue-100 text-sm lg:text-base">
                      Anda sudah menyelesaikan <span className="font-semibold text-yellow-300">{completedTasks}</span> tugas bulan ini
                    </p>
                  </div>
                  <div className="flex flex-col items-start space-y-2 sm:flex-col sm:items-end sm:space-y-2">
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-400" size={16} />
                      <span className="text-sm font-semibold">
                        {user?.balance && user.balance > 200000 ? 'Gold Member' : 
                         user?.balance && user.balance > 100000 ? 'Silver Member' : 'Bronze Member'}
                      </span>
                    </div>
                    <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
                      <span className="text-sm font-bold">Level {Math.floor((totalPoints / 300)) + 1}</span>
                    </div>
                  </div>
                </div>
                
                {/* Progress to next level */}
                <div className="bg-white bg-opacity-10 rounded-xl lg:rounded-2xl p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-1 sm:space-y-0">
                    <span className="text-xs sm:text-sm font-medium">Progress ke Level {Math.floor((totalPoints / 300)) + 2}</span>
                    <span className="text-xs sm:text-sm font-bold">{totalPoints.toLocaleString('id-ID')} / {((Math.floor((totalPoints / 300)) + 1) * 300).toLocaleString('id-ID')} poin</span>
                  </div>
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min((totalPoints % 300) / 300 * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-blue-100">{((Math.floor((totalPoints / 300)) + 1) * 300 - totalPoints).toLocaleString('id-ID')} poin lagi untuk naik level!</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Zap className="mr-2 text-[#003399]" size={18} />
                  Aksi Cepat
                </h3>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-[#003399] to-blue-600 text-white p-3 sm:p-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base">
                    <Trophy size={16} />
                    <span>Lihat Tugas Baru</span>
                  </button>
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 sm:p-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 text-sm sm:text-base">
                    <Gift size={16} />
                    <span>Klaim Reward</span>
                  </button>
                </div>
              </div>
              
              {/* Achievement Ring */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 flex flex-col items-center justify-center">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 text-center">Pencapaian Bulan Ini</h3>
                <ProgressRing progress={Math.min((completedTasks / 12) * 100, 100)} size={100}>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold text-[#003399]">{Math.round((completedTasks / 12) * 100)}%</div>
                    <div className="text-xs text-gray-500">Target</div>
                  </div>
                </ProgressRing>
                <p className="text-sm text-gray-600 mt-3 text-center">
                  {completedTasks} dari 12 tugas selesai
                </p>
              </div>
              
              {/* Leaderboard Preview */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Trophy className="mr-2 text-yellow-500" size={18} />
                  Top Performer
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                      <span className="font-semibold text-gray-900 text-sm sm:text-base truncate">{user?.name}</span>
                    </div>
                    <span className="font-bold text-[#003399] text-sm sm:text-base">{totalPoints.toLocaleString('id-ID')} poin</span>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Anda berada di peringkat #{userRank}</p>
                    <p className="text-xs text-gray-500">di wilayah Jakarta</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Tasks */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">Aktivitas Terbaru</h3>
                  <button className="text-[#003399] hover:text-blue-800 font-semibold text-sm">
                    Lihat Semua
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {recentTasks.map((task) => (
                  <div key={task.id} className="p-4 sm:p-6 hover:bg-blue-50 transition-all duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base truncate">{task.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">
                          Deadline: {new Date(task.deadline).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                        <div className="text-left sm:text-right">
                          <p className="font-bold text-[#003399] text-base sm:text-lg">
                            {formatCurrency(task.reward)}
                          </p>
                          <span className={`inline-flex px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
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
                
                {recentTasks.length === 0 && (
                  <div className="p-8 text-center">
                    <Trophy className="mx-auto text-gray-400 mb-3" size={48} />
                    <p className="text-gray-500">Belum ada aktivitas terbaru</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Users, ClipboardList, CheckCircle, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import Header from '../../components/Layout/Header';
import Sidebar from '../../components/Layout/Sidebar';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    {
      label: 'Total Users',
      value: '2,847',
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      label: 'Active Tasks',
      value: '24',
      icon: ClipboardList,
      color: 'bg-green-500',
      change: '+3'
    },
    {
      label: 'Pending Submissions',
      value: '156',
      icon: CheckCircle,
      color: 'bg-orange-500',
      change: '+8%'
    },
    {
      label: 'Total Rewards Paid',
      value: formatCurrency(45750000),
      icon: DollarSign,
      color: 'bg-purple-500',
      change: '+25%'
    }
  ];

  const recentSubmissions = [
    {
      id: '1',
      user: 'Ahmad Rizki',
      task: 'Review Service Yamaha',
      submittedAt: '2025-01-15 14:30',
      status: 'pending'
    },
    {
      id: '2',
      user: 'Sari Dewi',
      task: 'Share Foto Motor',
      submittedAt: '2025-01-15 13:45',
      status: 'approved'
    },
    {
      id: '3',
      user: 'Budi Santoso',
      task: 'Survey Kepuasan',
      submittedAt: '2025-01-15 12:20',
      status: 'rejected'
    },
    {
      id: '4',
      user: 'Lisa Pratiwi',
      task: 'Test Ride NMAX',
      submittedAt: '2025-01-15 11:10',
      status: 'pending'
    }
  ];

  const topTasks = [
    { name: 'Share Foto Motor', submissions: 1230, completion: 85 },
    { name: 'Survey Kepuasan', submissions: 856, completion: 92 },
    { name: 'Review Service', submissions: 645, completion: 78 },
    { name: 'Test Ride NMAX', submissions: 289, completion: 45 }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Admin Dashboard"
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto p-4 pb-20 lg:pb-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Dashboard Admin
              </h2>
              <p className="text-gray-600">
                Kelola program loyalitas Yamaha Motor Indonesia
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        <p className="text-sm text-green-600 mt-1">{stat.change} dari bulan lalu</p>
                      </div>
                      <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                        <Icon className="text-white" size={24} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Submissions */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Submission Terbaru</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {recentSubmissions.map((submission) => (
                    <div key={submission.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{submission.user}</p>
                          <p className="text-sm text-gray-500">{submission.task}</p>
                          <p className="text-xs text-gray-400">{submission.submittedAt}</p>
                        </div>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          submission.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : submission.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {submission.status === 'approved' ? 'Disetujui' : 
                           submission.status === 'rejected' ? 'Ditolak' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button className="w-full text-[#003399] hover:text-blue-800 font-medium text-sm">
                    Lihat Semua Submission
                  </button>
                </div>
              </div>

              {/* Top Tasks */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Tugas Populer</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {topTasks.map((task, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-gray-900">{task.name}</p>
                          <p className="text-sm text-gray-500">{task.submissions} submission</p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#003399] h-2 rounded-full"
                            style={{ width: `${task.completion}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{task.completion}% completion rate</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
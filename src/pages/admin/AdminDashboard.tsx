import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ClipboardList, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  BarChart3,
  PieChart
} from 'lucide-react';
import Header from '../../components/Layout/Header';
import Sidebar from '../../components/Layout/Sidebar';
import StatsCard from '../../components/UI/StatsCard';
import { formatCurrency } from '../../utils/format';
import { dataService } from '../../services/dataService';
import { Task, Submission, User } from '../../types';
import { mockStatistics } from '../../data/mockData';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState(mockStatistics);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const [tasksData, submissionsData, usersData, statsData] = await Promise.all([
          dataService.getTasks(),
          dataService.getSubmissions(),
          dataService.getUsers(),
          dataService.getDashboardStats()
        ]);
        
        setTasks(tasksData);
        setSubmissions(submissionsData);
        setUsers(usersData.filter(u => u.role === 'customer'));
        setStats(statsData);
      } catch (error) {
        console.error('Error loading admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, []);

  const handleReviewSubmission = async (submissionId: string, status: 'approved' | 'rejected', feedback?: string) => {
    try {
      await dataService.reviewSubmission(submissionId, status, feedback, '1');
      // Refresh submissions
      const updatedSubmissions = await dataService.getSubmissions();
      setSubmissions(updatedSubmissions);
      alert(`Submission ${status === 'approved' ? 'disetujui' : 'ditolak'} berhasil!`);
    } catch (error) {
      console.error('Error reviewing submission:', error);
      alert('Gagal memproses submission. Silakan coba lagi.');
    }
  };

  const adminStats = [
    {
      label: 'Total Users',
      value: stats.totalUsers || users.length,
      icon: Users,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      change: `+${stats.monthlyStats?.newUsers || 5} bulan ini`,
      trend: 'up' as const
    },
    {
      label: 'Active Tasks',
      value: stats.activeTasks || tasks.filter(t => t.status === 'active').length,
      icon: ClipboardList,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      change: '+3 minggu ini',
      trend: 'up' as const
    },
    {
      label: 'Pending Reviews',
      value: stats.pendingSubmissions || submissions.filter(s => s.status === 'pending').length,
      icon: Clock,
      color: 'bg-gradient-to-r from-orange-500 to-orange-600',
      change: 'Perlu review',
      trend: 'neutral' as const
    },
    {
      label: 'Total Rewards',
      value: formatCurrency(stats.totalRewards || 0),
      icon: DollarSign,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      change: `+${formatCurrency(stats.monthlyStats?.totalRewards || 0)} bulan ini`,
      trend: 'up' as const
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminStats.map((stat, index) => (
          <StatsCard
            key={index}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            change={stat.change}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <BarChart3 className="mr-2 text-blue-500" size={20} />
              Task Completion Rate
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Service Reviews</span>
              <span className="text-sm font-semibold">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Social Media</span>
              <span className="text-sm font-semibold">92%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Surveys</span>
              <span className="text-sm font-semibold">78%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <PieChart className="mr-2 text-purple-500" size={20} />
              User Activity
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
              <span className="text-sm font-medium text-gray-700">Active Users</span>
              <span className="font-bold text-green-600">{Math.floor(users.length * 0.7)}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-xl">
              <span className="text-sm font-medium text-gray-700">New This Month</span>
              <span className="font-bold text-yellow-600">{stats.monthlyStats?.newUsers || 5}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
              <span className="text-sm font-medium text-gray-700">Total Registered</span>
              <span className="font-bold text-blue-600">{users.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Recent Submissions</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {submissions.slice(0, 5).map((submission) => {
            const task = tasks.find(t => t.id === submission.taskId);
            const user = users.find(u => u.id === submission.userId);
            return (
              <div key={submission.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {task?.title || 'Unknown Task'}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Submitted by: {user?.name || 'Unknown User'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {submission.submittedAt.toLocaleDateString('id-ID')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      submission.status === 'approved' ? 'bg-green-100 text-green-700' :
                      submission.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {submission.status === 'approved' ? 'Approved' :
                       submission.status === 'rejected' ? 'Rejected' : 'Pending'}
                    </span>
                    {submission.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleReviewSubmission(submission.id, 'approved', 'Great work!')}
                          className="bg-green-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-green-600 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReviewSubmission(submission.id, 'rejected', 'Please improve and resubmit.')}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderTasks = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Manage Tasks</h2>
        <button className="bg-[#003399] text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-800 transition-colors flex items-center space-x-2">
          <Plus size={18} />
          <span>Add New Task</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#003399] focus:border-transparent"
                />
              </div>
            </div>
            <select className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#003399] focus:border-transparent">
              <option value="all">All Categories</option>
              <option value="service">Service</option>
              <option value="social">Social Media</option>
              <option value="survey">Survey</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reward</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">{task.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {task.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatCurrency(task.reward)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {task.deadline.toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      task.status === 'active' ? 'bg-green-100 text-green-800' :
                      task.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#003399] focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img 
                        src={user.avatar || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face`} 
                        alt={user.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {formatCurrency(user.balance)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {user.createdAt.toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye size={16} />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'tasks', label: 'Tasks', icon: ClipboardList },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'submissions', label: 'Submissions', icon: CheckCircle }
  ];

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#003399] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <BarChart3 className="text-white" size={24} />
            </div>
            <p className="text-gray-600">Loading admin dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Admin Dashboard"
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto p-4">
          <div className="max-w-7xl mx-auto">
            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
              <div className="flex space-x-1 p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-[#003399] text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'tasks' && renderTasks()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'submissions' && renderOverview()} {/* Reuse overview for now */}
          </div>
        </main>
      </div>
    </div>
  );
}
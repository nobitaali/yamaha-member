import React, { useState, useEffect } from 'react';
import { Filter, Search, Sparkles, RefreshCw } from 'lucide-react';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import TaskCard from '../components/UI/TaskCard';
import FloatingActionButton from '../components/UI/FloatingActionButton';
import { Task } from '../types';
import { dataService } from '../services/dataService';
import { formatCurrency } from '../utils/format';

export default function Tasks() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const categories = [
    { value: 'all', label: 'Semua' },
    { value: 'service', label: 'Service' },
    { value: 'social', label: 'Social Media' },
    { value: 'survey', label: 'Survey' },
    { value: 'testride', label: 'Test Ride' },
    { value: 'content', label: 'Content' },
    { value: 'event', label: 'Event' },
    { value: 'referral', label: 'Referral' },
    { value: 'workshop', label: 'Workshop' }
  ];

  const loadTasks = async () => {
    try {
      const filters = {
        category: selectedCategory,
        search: searchQuery,
        status: 'active'
      };
      const tasksData = await dataService.getTasks(filters);
      setTasks(tasksData);
    } catch (error) {
      console.error('Error loading tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshTasks = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  useEffect(() => {
    loadTasks();
  }, [selectedCategory, searchQuery]);

  const filteredTasks = tasks;

  const handleTakeTask = async (taskId: string) => {
    try {
      // In a real app, this would create a submission or mark task as taken
      alert(`Mengambil tugas dengan ID: ${taskId}`);
      // You could navigate to a submission form here
    } catch (error) {
      console.error('Error taking task:', error);
      alert('Gagal mengambil tugas. Silakan coba lagi.');
    }
  };

  const handleViewDetails = (taskId: string) => {
    // In a real app, this would navigate to task details page
    alert(`Melihat detail tugas dengan ID: ${taskId}`);
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            title="Tugas Tersedia"
            onMenuClick={() => setSidebarOpen(true)}
          />
          
          <main className="flex-1 overflow-y-auto p-4 pb-20 lg:pb-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#003399] rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Sparkles className="text-white" size={24} />
                  </div>
                  <p className="text-gray-600">Memuat tugas...</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Tugas Tersedia"
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto p-4 pb-20 lg:pb-4">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#003399] to-blue-600 rounded-3xl p-6 mb-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16" />
              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="text-yellow-400" size={24} />
                  <h2 className="text-2xl font-bold">Tugas Tersedia</h2>
                </div>
                <p className="text-blue-100 mb-4">
                  {filteredTasks.length} tugas menanti Anda dengan total reward hingga{' '}
                  <span className="font-bold text-yellow-400">
                    {formatCurrency(filteredTasks.reduce((sum, task) => sum + task.reward, 0))}
                  </span>
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span>{filteredTasks.filter(t => t.category === 'service').length} Service</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-pink-400 rounded-full" />
                    <span>{filteredTasks.filter(t => t.category === 'social').length} Social Media</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    <span>{filteredTasks.filter(t => t.category === 'testride').length} Test Ride</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full" />
                    <span>{filteredTasks.filter(t => t.category === 'content').length} Content</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Cari tugas..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#003399] focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
                    />
                  </div>
                </div>
                
                {/* Category Filter */}
                <div className="flex items-center space-x-3">
                  <Filter size={20} className="text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#003399] focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Tasks Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={{
                    ...task,
                    deadline: task.deadline.toISOString().split('T')[0],
                    participants: Math.floor(Math.random() * 500) + 50,
                    maxParticipants: Math.floor(Math.random() * 1000) + 500,
                    location: task.category === 'testride' ? 'Dealer Jakarta, Bandung, Surabaya' : 
                             task.category === 'workshop' ? 'Training Center Yamaha' :
                             task.category === 'event' ? 'Yamaha Heritage Museum' : 'Online'
                  }}
                  onTakeTask={handleTakeTask}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>

            {filteredTasks.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada tugas ditemukan</h3>
                <p className="text-gray-500 mb-6">Coba ubah filter atau kata kunci pencarian</p>
                <button 
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="bg-[#003399] text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors"
                >
                  Reset Filter
                </button>
              </div>
            )}
            
            <FloatingActionButton
              onClick={refreshTasks}
              icon={<RefreshCw size={24} className={refreshing ? 'animate-spin' : ''} />}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
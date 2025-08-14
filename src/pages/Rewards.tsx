import React, { useState, useEffect } from 'react';
import { Gift, Star, Clock, ShoppingBag, Filter, Search } from 'lucide-react';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import { useAuth } from '../contexts/AuthContext';
import { formatCurrency } from '../utils/format';
import { dataService } from '../services/dataService';
import { mockRewards } from '../data/mockData';

export default function Rewards() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [rewards, setRewards] = useState(mockRewards);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const categories = [
    { value: 'all', label: 'Semua' },
    { value: 'service', label: 'Service' },
    { value: 'merchandise', label: 'Merchandise' },
    { value: 'accessories', label: 'Aksesoris' },
    { value: 'experience', label: 'Experience' }
  ];

  const filteredRewards = rewards.filter(reward => {
    const matchesCategory = selectedCategory === 'all' || reward.category === selectedCategory;
    const matchesSearch = reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         reward.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleRedeem = async (rewardId: string) => {
    if (!user) return;
    
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) return;

    if (user.balance < reward.points) {
      alert('Saldo poin tidak mencukupi!');
      return;
    }

    if (reward.stock <= 0) {
      alert('Stok reward habis!');
      return;
    }

    try {
      const success = await dataService.redeemReward(user.id, rewardId);
      if (success) {
        alert(`Berhasil menukar ${reward.title}! Reward akan dikirim dalam 3-5 hari kerja.`);
        // Refresh rewards to update stock
        setRewards(prev => prev.map(r => 
          r.id === rewardId ? { ...r, stock: r.stock - 1 } : r
        ));
      } else {
        alert('Gagal menukar reward. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error redeeming reward:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Rewards"
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto p-4 pb-20 lg:pb-4">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-6 mb-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16" />
              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-2">
                  <Gift className="text-yellow-400" size={24} />
                  <h2 className="text-2xl font-bold">Tukar Poin Anda</h2>
                </div>
                <p className="text-purple-100 mb-4">
                  Saldo poin Anda:{' '}
                  <span className="font-bold text-yellow-400 text-xl">
                    {user?.balance?.toLocaleString('id-ID') || '0'} poin
                  </span>
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400" size={16} />
                    <span>Reward Eksklusif</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="text-yellow-400" size={16} />
                    <span>Pengiriman 3-5 Hari</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ShoppingBag className="text-yellow-400" size={16} />
                    <span>{filteredRewards.length} Item Tersedia</span>
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
                      placeholder="Cari reward..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
                    />
                  </div>
                </div>
                
                {/* Category Filter */}
                <div className="flex items-center space-x-3">
                  <Filter size={20} className="text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
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

            {/* Rewards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRewards.map((reward) => (
                <div key={reward.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="relative">
                    <img 
                      src={reward.image} 
                      alt={reward.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        reward.category === 'service' ? 'bg-blue-100 text-blue-700' :
                        reward.category === 'merchandise' ? 'bg-green-100 text-green-700' :
                        reward.category === 'accessories' ? 'bg-purple-100 text-purple-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {categories.find(c => c.value === reward.category)?.label}
                      </span>
                    </div>
                    {reward.stock <= 5 && reward.stock > 0 && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          Stok Terbatas
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{reward.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{reward.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="text-yellow-400" size={16} />
                        <span className="font-bold text-purple-600 text-lg">
                          {reward.points.toLocaleString('id-ID')} poin
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        Stok: {reward.stock}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleRedeem(reward.id)}
                      disabled={!user || user.balance < reward.points || reward.stock <= 0}
                      className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                        !user || user.balance < reward.points || reward.stock <= 0
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-105'
                      }`}
                    >
                      {reward.stock <= 0 ? 'Stok Habis' :
                       !user || user.balance < reward.points ? 'Poin Tidak Cukup' : 'Tukar Sekarang'}
                    </button>
                    
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Berlaku hingga {reward.validUntil.toLocaleDateString('id-ID')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {filteredRewards.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada reward ditemukan</h3>
                <p className="text-gray-500 mb-6">Coba ubah filter atau kata kunci pencarian</p>
                <button 
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
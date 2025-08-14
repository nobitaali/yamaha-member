import React, { useState, useEffect } from 'react';
import { User, Settings, Wallet, History, LogOut, Edit, Camera, Star, Trophy, Gift, CreditCard, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { formatCurrency } from '../utils/format';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import { dataService } from '../services/dataService';
import { Transaction, Submission } from '../types';

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userSubmissions, setUserSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, logout, updateProfile } = useAuth();

  useEffect(() => {
    const loadProfileData = async () => {
      if (!user) return;
      
      try {
        const [userTransactions, submissions] = await Promise.all([
          dataService.getTransactions(user.id),
          dataService.getSubmissions({ userId: user.id })
        ]);
        
        setTransactions(userTransactions);
        setUserSubmissions(submissions);
      } catch (error) {
        console.error('Error loading profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [user]);

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar?')) {
      logout();
    }
  };

  const completedTasks = userSubmissions.filter(s => s.status === 'approved').length;
  const totalPoints = completedTasks * 100 + Math.floor(Math.random() * 500);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'history', label: 'History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-r from-[#003399] to-blue-600 rounded-full flex items-center justify-center">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover" />
              ) : (
                <span className="text-white text-2xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <Camera size={16} className="text-gray-600" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{user?.name}</h2>
            <p className="text-gray-600 mb-2">{user?.email}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="text-yellow-400" size={16} />
                <span className="text-sm font-semibold text-gray-700">
                  {user?.balance && user.balance > 200000 ? 'Gold Member' : 
                   user?.balance && user.balance > 100000 ? 'Silver Member' : 'Bronze Member'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Trophy className="text-blue-500" size={16} />
                <span className="text-sm font-semibold text-gray-700">
                  Level {Math.floor((totalPoints / 300)) + 1}
                </span>
              </div>
            </div>
          </div>
          <button className="bg-[#003399] text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-colors flex items-center space-x-2">
            <Edit size={18} />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Saldo Reward</p>
              <p className="text-2xl font-bold">{formatCurrency(user?.balance || 0)}</p>
            </div>
            <Wallet size={32} className="text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Tugas Selesai</p>
              <p className="text-2xl font-bold">{completedTasks}</p>
            </div>
            <Trophy size={32} className="text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Poin</p>
              <p className="text-2xl font-bold">{totalPoints.toLocaleString('id-ID')}</p>
            </div>
            <Gift size={32} className="text-purple-200" />
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Informasi Personal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
            <input
              type="text"
              value={user?.name || ''}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#003399] focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#003399] focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
            <input
              type="tel"
              value={user?.phone || ''}
              placeholder="Belum diisi"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#003399] focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Bergabung</label>
            <input
              type="text"
              value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString('id-ID') : ''}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#003399] focus:border-transparent"
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Pencapaian Terbaru</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
              <Trophy className="text-white" size={20} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">First Steps</p>
              <p className="text-sm text-gray-600">Selesaikan tugas pertama</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
              <Star className="text-white" size={20} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Social Butterfly</p>
              <p className="text-sm text-gray-600">Aktif di social media</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderWallet = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#003399] to-blue-600 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Saldo Reward Anda</h3>
        <p className="text-3xl font-bold mb-4">{formatCurrency(user?.balance || 0)}</p>
        <div className="flex space-x-4">
          <button className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-opacity-30 transition-colors flex items-center space-x-2">
            <CreditCard size={18} />
            <span>Tarik Saldo</span>
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className="bg-white text-[#003399] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
          >
            <History size={18} />
            <span>Riwayat Transaksi</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Transaksi Terbaru</h3>
        <div className="space-y-4">
          {transactions.slice(0, 5).map((transaction) => (
            <div key={transaction.id} className={`flex items-center justify-between p-4 rounded-xl ${
              transaction.type === 'reward' ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'reward' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'reward' ? 
                    <ArrowDownLeft className="text-green-600" size={20} /> :
                    <ArrowUpRight className="text-red-600" size={20} />
                  }
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {transaction.type === 'reward' ? 'Reward Diterima' : 'Penarikan Saldo'}
                  </p>
                  <p className="text-sm text-gray-600">{transaction.description}</p>
                  <p className="text-xs text-gray-500">
                    {transaction.createdAt.toLocaleDateString('id-ID')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className={`font-bold ${
                  transaction.type === 'reward' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'reward' ? '+' : ''}{formatCurrency(transaction.amount)}
                </span>
                <p className={`text-xs ${
                  transaction.status === 'completed' ? 'text-green-600' :
                  transaction.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {transaction.status === 'completed' ? 'Selesai' :
                   transaction.status === 'pending' ? 'Pending' : 'Gagal'}
                </p>
              </div>
            </div>
          ))}
          
          {transactions.length === 0 && (
            <div className="text-center py-8">
              <Wallet className="mx-auto text-gray-400 mb-3" size={48} />
              <p className="text-gray-500">Belum ada transaksi</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Riwayat Aktivitas</h3>
        <div className="space-y-4">
          {userSubmissions.map((submission) => (
            <div key={submission.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-xl">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                submission.status === 'approved' ? 'bg-green-100' :
                submission.status === 'rejected' ? 'bg-red-100' : 'bg-yellow-100'
              }`}>
                <Trophy size={20} className={
                  submission.status === 'approved' ? 'text-green-600' :
                  submission.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'
                } />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">
                  {submission.status === 'approved' ? 'Tugas Selesai' :
                   submission.status === 'rejected' ? 'Tugas Ditolak' : 'Tugas Disubmit'}
                </p>
                <p className="text-sm text-gray-600">Task ID: {submission.taskId}</p>
                <p className="text-xs text-gray-500">
                  {submission.submittedAt.toLocaleDateString('id-ID')} - {submission.submittedAt.toLocaleTimeString('id-ID')}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                submission.status === 'approved' ? 'bg-green-100 text-green-700' :
                submission.status === 'rejected' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {submission.status === 'approved' ? 'Disetujui' :
                 submission.status === 'rejected' ? 'Ditolak' : 'Pending'}
              </span>
            </div>
          ))}
          
          {userSubmissions.length === 0 && (
            <div className="text-center py-8">
              <History className="mx-auto text-gray-400 mb-3" size={48} />
              <p className="text-gray-500">Belum ada aktivitas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Pengaturan Notifikasi</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Notifikasi Tugas Baru</p>
              <p className="text-sm text-gray-600">Dapatkan notifikasi saat ada tugas baru</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email Marketing</p>
              <p className="text-sm text-gray-600">Terima email tentang promo dan penawaran</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Keamanan</h3>
        <div className="space-y-4">
          <button className="w-full text-left p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <p className="font-medium text-gray-900">Ubah Password</p>
            <p className="text-sm text-gray-600">Perbarui password untuk keamanan akun</p>
          </button>
          
          <button className="w-full text-left p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <p className="font-medium text-gray-900">Verifikasi Dua Faktor</p>
            <p className="text-sm text-gray-600">Tambahkan lapisan keamanan ekstra</p>
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Akun</h3>
        <button 
          onClick={handleLogout}
          className="w-full bg-red-500 text-white p-4 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
        >
          <LogOut size={18} />
          <span>Keluar dari Akun</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Profile"
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto p-4 pb-20 lg:pb-4">
          <div className="max-w-4xl mx-auto">
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
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'wallet' && renderWallet()}
            {activeTab === 'history' && renderHistory()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        </main>
      </div>
    </div>
  );
}
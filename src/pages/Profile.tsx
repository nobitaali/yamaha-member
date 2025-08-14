import React, { useState } from 'react';
import { User, Mail, Phone, Edit2, Settings, Bell, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  const profileData = [
    { label: 'Email', value: user?.email || '', icon: Mail },
    { label: 'Nomor HP', value: user?.phone || 'Belum diatur', icon: Phone },
    { label: 'Bergabung', value: new Date(user?.createdAt || new Date()).toLocaleDateString('id-ID'), icon: User }
  ];

  const menuItems = [
    {
      id: 'notifications',
      label: 'Notifikasi',
      icon: Bell,
      description: 'Atur preferensi notifikasi',
      action: () => alert('Membuka pengaturan notifikasi')
    },
    {
      id: 'settings',
      label: 'Pengaturan',
      icon: Settings,
      description: 'Pengaturan akun dan aplikasi',
      action: () => alert('Membuka pengaturan')
    },
    {
      id: 'help',
      label: 'Bantuan & FAQ',
      icon: HelpCircle,
      description: 'Dapatkan bantuan dan jawaban',
      action: () => alert('Membuka bantuan')
    },
    {
      id: 'logout',
      label: 'Keluar',
      icon: LogOut,
      description: 'Keluar dari akun Anda',
      action: logout,
      danger: true
    }
  ];

  const stats = [
    { label: 'Tugas Selesai', value: '12' },
    { label: 'Total Reward', value: 'Rp 275.000' },
    { label: 'Rank', value: 'Gold Member' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Profil"
          onMenuClick={() => setSidebarOpen(true)}
          showNotifications={false}
        />
        
        <main className="flex-1 overflow-y-auto p-4 pb-20 lg:pb-4">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="w-24 h-24 bg-[#003399] rounded-full flex items-center justify-center">
                  <User size={40} className="text-white" />
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                      <p className="text-gray-600 capitalize">{user?.role} Member</p>
                    </div>
                    <button className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                      <Edit2 size={16} className="mr-2" />
                      Edit Profil
                    </button>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-[#003399]">{stat.value}</p>
                    <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Profil</h3>
              <div className="space-y-4">
                {profileData.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                      <Icon size={20} className="text-gray-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500">{item.label}</p>
                        <p className="text-gray-900">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Menu Items */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pengaturan & Lainnya</h3>
              <div className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left ${
                        item.danger
                          ? 'hover:bg-red-50 text-red-600'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <Icon size={20} />
                      <div className="flex-1">
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
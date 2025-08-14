import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownLeft, Gift, CreditCard, TrendingUp, Download } from 'lucide-react';
import { formatCurrency } from '../utils/format';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import AnimatedCounter from '../components/UI/AnimatedCounter';
import ProgressRing from '../components/UI/ProgressRing';

export default function Rewards() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('balance');
  const { user } = useAuth();

  const transactions = [
    {
      id: '1',
      type: 'reward',
      amount: 50000,
      description: 'Reward Review Service Yamaha',
      date: '2025-01-15',
      status: 'completed'
    },
    {
      id: '2',
      type: 'withdrawal',
      amount: -25000,
      description: 'Penarikan ke OVO',
      date: '2025-01-14',
      status: 'completed'
    },
    {
      id: '3',
      type: 'reward',
      amount: 30000,
      description: 'Reward Survey Kepuasan',
      date: '2025-01-12',
      status: 'completed'
    },
    {
      id: '4',
      type: 'withdrawal',
      amount: -50000,
      description: 'Penarikan ke Bank BCA',
      date: '2025-01-10',
      status: 'pending'
    }
  ];

  const withdrawalMethods = [
    {
      id: 'ovo',
      name: 'OVO',
      icon: '💜',
      minAmount: 25000,
      fee: 2500,
      description: 'Transfer langsung ke akun OVO'
    },
    {
      id: 'gopay',
      name: 'GoPay',
      icon: '💚',
      minAmount: 25000,
      fee: 2500,
      description: 'Transfer langsung ke akun GoPay'
    },
    {
      id: 'dana',
      name: 'DANA',
      icon: '💙',
      minAmount: 25000,
      fee: 2500,
      description: 'Transfer langsung ke akun DANA'
    },
    {
      id: 'bank',
      name: 'Transfer Bank',
      icon: '🏦',
      minAmount: 50000,
      fee: 5000,
      description: 'Transfer ke rekening bank'
    }
  ];

  const handleWithdrawal = (method: string) => {
    // In real app, open withdrawal modal
    alert(`Membuka form penarikan untuk ${method}`);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Reward & Saldo"
          onMenuClick={() => setSidebarOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto p-4 pb-20 lg:pb-4">
          <div className="max-w-7xl mx-auto">
            {/* Balance Card */}
            <div className="bg-gradient-to-r from-[#003399] to-blue-600 text-white rounded-3xl p-8 mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white bg-opacity-10 rounded-full -translate-y-20 translate-x-20" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white bg-opacity-5 rounded-full translate-y-16 -translate-x-16" />
              
              <div className="relative z-10">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Wallet size={24} />
                    <p className="text-blue-100 text-lg font-medium">Total Saldo Reward</p>
                  </div>
                  <div className="text-4xl font-bold mb-4">
                    <AnimatedCounter 
                      value={user?.balance || 0} 
                      prefix="Rp " 
                      className="text-4xl font-bold"
                    />
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <TrendingUp size={16} className="text-green-400" />
                      <span className="text-green-400 font-semibold">+25% bulan ini</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Gift size={16} className="text-yellow-400" />
                      <span className="text-blue-100">12 reward diterima</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-blue-400">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Minimum penarikan</p>
                      <p className="font-semibold">{formatCurrency(25000)}</p>
                    </div>
                    <button className="bg-white text-[#003399] px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all duration-200 flex items-center space-x-2 shadow-lg">
                      <Download size={18} />
                      <span>Tarik Dana</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Reward Bulan Ini</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(125000)}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="text-green-600" size={24} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Penarikan</p>
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(75000)}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <ArrowUpRight className="text-blue-600" size={24} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Transaksi Pending</p>
                    <p className="text-2xl font-bold text-orange-600">1</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <CreditCard className="text-orange-600" size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
              <div className="border-b border-gray-100">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('balance')}
                    className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-200 ${
                      activeTab === 'balance'
                        ? 'text-[#003399] border-b-3 border-[#003399] bg-blue-50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Riwayat Saldo
                  </button>
                  <button
                    onClick={() => setActiveTab('withdraw')}
                    className={`flex-1 py-4 px-6 text-center font-semibold transition-all duration-200 ${
                      activeTab === 'withdraw'
                        ? 'text-[#003399] border-b-3 border-[#003399] bg-blue-50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Penarikan
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'balance' && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 mb-6 text-lg">Riwayat Transaksi</h3>
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-5 border border-gray-100 rounded-2xl hover:shadow-md transition-all duration-200 hover:border-[#003399]">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${
                            transaction.type === 'reward' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            {transaction.type === 'reward' ? (
                              <ArrowDownLeft className="text-green-600" size={20} />
                            ) : (
                              <ArrowUpRight className="text-red-600" size={20} />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{transaction.description}</p>
                            <p className="text-sm text-gray-600">
                              {new Date(transaction.date).toLocaleDateString('id-ID')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            transaction.type === 'reward' ? 'text-green-600' : 'text-red-600'
                          } text-lg`}>
                            {transaction.type === 'reward' ? '+' : ''}{formatCurrency(transaction.amount)}
                          </p>
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                            transaction.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                            {transaction.status === 'completed' ? 'Selesai' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'withdraw' && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 mb-6 text-lg">Metode Penarikan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {withdrawalMethods.map((method) => (
                        <div key={method.id} className="border border-gray-200 rounded-2xl p-6 hover:border-[#003399] hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-2xl">
                                {method.icon}
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900">{method.name}</h4>
                                <p className="text-sm text-gray-500">{method.description}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Minimum:</span>
                              <span className="font-semibold text-gray-900">{formatCurrency(method.minAmount)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Biaya admin:</span>
                              <span className="font-semibold text-gray-900">{formatCurrency(method.fee)}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleWithdrawal(method.name)}
                            disabled={(user?.balance || 0) < method.minAmount}
                            className="w-full bg-gradient-to-r from-[#003399] to-blue-600 text-white py-3 px-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                          >
                            {(user?.balance || 0) < method.minAmount ? 'Saldo Tidak Cukup' : 'Tarik Dana'}
                          </button>
                        </div>
                      ))}
                    </div>
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
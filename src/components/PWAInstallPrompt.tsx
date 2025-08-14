import React from 'react';
import { Download, X } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

interface PWAInstallPromptProps {
  onDismiss: () => void;
}

export default function PWAInstallPrompt({ onDismiss }: PWAInstallPromptProps) {
  const { installPWA } = usePWA();

  const handleInstall = () => {
    console.log('jalan')
    installPWA();
    onDismiss();
  };

  return (
    <div className="fixed bottom-20 left-4 right-4 lg:bottom-4 lg:left-auto lg:right-4 lg:w-80 bg-[#003399] text-white rounded-lg p-4 shadow-lg z-50">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Download size={20} />
            <h3 className="font-semibold">Install Yamaha Loyalty</h3>
          </div>
          <p className="text-sm text-blue-100 mb-3">
            Install aplikasi untuk akses cepat dan notifikasi langsung
          </p>
          <div className="flex space-x-2">
            <button
              onClick={handleInstall}
              className="bg-white text-[#003399] px-3 py-2 rounded text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              Install
            </button>
            <button
              onClick={onDismiss}
              className="border border-blue-400 px-3 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Nanti
            </button>
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="ml-2 p-1 hover:bg-blue-700 rounded"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { usePWA } from './hooks/usePWA';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import BottomNav from './components/Layout/BottomNav';

// Pages
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Rewards from './pages/Rewards';
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';
import SurveyForm from './pages/SurveyForm';

function AppContent() {
  const { user, loading } = useAuth();
  const { isInstallable } = usePWA();
  const [showInstallPrompt, setShowInstallPrompt] = useState(true);

  useEffect(() => {
    // Show install prompt after 30 seconds if installable
    if (isInstallable) {
      const timer = setTimeout(() => {
        setShowInstallPrompt(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isInstallable]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#003399] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">Y</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }
console.log(user.role,'test')
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {user.role === 'admin' ? (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/tasks" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminDashboard />} />
            <Route path="/admin/submissions" element={<AdminDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/tasks/survey/:taskId" element={<SurveyForm />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        )}
      </Routes>

      {user.role === 'customer' && <BottomNav />}
      
      {showInstallPrompt && (
        <PWAInstallPrompt onDismiss={() => setShowInstallPrompt(false)} />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
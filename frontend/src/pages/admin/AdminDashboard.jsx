import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import AdminLayout from '../../components/AdminLayout';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get('/admin/dashboard');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
      // Set default stats if API fails
      setStats({
        total_users: 0,
        active_applications: 0,
        total_revenue: 0,
        pending_reviews: 0,
        active_grants: 0,
        support_tickets: 0,
        revenue_growth: 0,
        user_growth: 0
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Users */}
          <StatCard
            title="Total Users"
            value={stats?.total_users || 0}
            change={`+${stats?.user_growth || 0}%`}
            icon="👥"
            color="blue"
          />

          {/* Active Applications */}
          <StatCard
            title="Active Applications"
            value={stats?.active_applications || 0}
            icon="📄"
            color="green"
          />

          {/* Total Revenue */}
          <StatCard
            title="Total Revenue"
            value={`₹${(stats?.total_revenue || 0).toLocaleString()}`}
            change={`+${stats?.revenue_growth || 0}%`}
            icon="💰"
            color="orange"
          />

          {/* Pending Reviews */}
          <StatCard
            title="Pending Reviews"
            value={stats?.pending_reviews || 0}
            icon="⏳"
            color="yellow"
            alert={stats?.pending_reviews > 10}
          />

          {/* Active Grants */}
          <StatCard
            title="Active Grants"
            value={stats?.active_grants || 0}
            icon="🎯"
            color="purple"
          />

          {/* Support Tickets */}
          <StatCard
            title="Support Tickets"
            value={stats?.support_tickets || 0}
            icon="🎫"
            color="red"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickActionButton
              label="Manage Users"
              icon="👥"
              onClick={() => navigate('/admin/users')}
            />
            <QuickActionButton
              label="Applications"
              icon="📄"
              onClick={() => navigate('/admin/applications')}
            />
            <QuickActionButton
              label="Packages"
              icon="📦"
              onClick={() => navigate('/admin/packages')}
            />
            <QuickActionButton
              label="Payments"
              icon="💳"
              onClick={() => navigate('/admin/payments')}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <ActivityItem
              icon="✅"
              text="New user registered for Utility Services"
              time="2 hours ago"
            />
            <ActivityItem
              icon="📄"
              text="GST Registration application submitted"
              time="3 hours ago"
            />
            <ActivityItem
              icon="💡"
              text="Electricity name change request - Torrent Power"
              time="4 hours ago"
            />
            <ActivityItem
              icon="🔥"
              text="Gas connection application - Adani Gas"
              time="5 hours ago"
            />
            <ActivityItem
              icon="💧"
              text="Water connection request - AMC"
              time="6 hours ago"
            />
          </div>
        </div>
      </div>
      </div>
    </AdminLayout>
  );
}

// Stat Card Component
function StatCard({ title, value, change, icon, color, alert }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <div className={`bg-white rounded-lg shadow p-6 ${alert ? 'ring-2 ring-red-500' : ''}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm text-green-600 mt-1">{change}</p>
          )}
        </div>
        <div className={`text-3xl ${colorClasses[color]} p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// Quick Action Button
function QuickActionButton({ label, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <span className="text-3xl mb-2">{icon}</span>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </button>
  );
}

// Activity Item
function ActivityItem({ icon, text, time }) {
  return (
    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
      <span className="text-xl">{icon}</span>
      <div className="flex-1">
        <p className="text-sm text-gray-900">{text}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
}

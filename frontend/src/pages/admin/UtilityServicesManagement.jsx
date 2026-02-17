import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import AdminLayout from '../../components/AdminLayout';

export default function UtilityServicesManagement() {
  const [applications, setApplications] = useState([]);
  const [serviceFilter, setServiceFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUtilityApplications();
  }, [serviceFilter]);

  const fetchUtilityApplications = async () => {
    try {
      const response = await axios.get('/admin/applications', {
        params: { 
          service_type: serviceFilter !== 'all' ? serviceFilter : null 
        }
      });
      const utilityApps = response.data.applications?.filter(app => 
        ['electricity', 'gas', 'water', 'property'].includes(app.service_type)
      ) || [];
      setApplications(utilityApps);
    } catch (error) {
      console.error('Error:', error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const services = [
    { id: 'all', name: 'All Services', icon: '📋', color: 'gray' },
    { id: 'electricity', name: 'Electricity', icon: '💡', color: 'yellow' },
    { id: 'gas', name: 'Gas', icon: '🔥', color: 'orange' },
    { id: 'water', name: 'Water', icon: '💧', color: 'blue' },
    { id: 'property', name: 'Property', icon: '🏠', color: 'green' }
  ];

  const providers = {
    electricity: ['Torrent Power', 'UGVCL', 'DGVCL', 'MGVCL', 'PGVCL'],
    gas: ['Adani Gas', 'Gujarat Gas', 'Sabarmati Gas'],
    water: ['AMC', 'SMC', 'Rajkot Municipal'],
    property: ['AnyROR', 'Revenue Department']
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Utility Services Management</h1>

          {/* Service Filter Tabs */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setServiceFilter(service.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    serviceFilter === service.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{service.icon}</div>
                  <div className="text-sm font-medium">{service.name}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {applications.filter(a => service.id === 'all' || a.service_type === service.id).length} apps
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <StatCard title="Total Applications" value={applications.length} icon="📄" color="blue" />
            <StatCard title="Pending" value={applications.filter(a => a.status === 'pending').length} icon="⏳" color="yellow" />
            <StatCard title="Processing" value={applications.filter(a => a.status === 'processing').length} icon="⚙️" color="purple" />
            <StatCard title="Completed" value={applications.filter(a => a.status === 'completed').length} icon="✅" color="green" />
          </div>

          {/* Applications List */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold">Applications</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                        No applications found for {serviceFilter === 'all' ? 'any service' : serviceFilter}
                      </td>
                    </tr>
                  ) : (
                    applications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm">#{app.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-2xl mr-2">
                              {services.find(s => s.id === app.service_type)?.icon}
                            </span>
                            <span className="text-sm capitalize">{app.service_type}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{app.application_type}</td>
                        <td className="px-6 py-4 text-sm">User #{app.user_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(app.status)}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(app.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">View</button>
                          <button className="text-green-600 hover:text-green-800">Process</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value, icon, color }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`text-3xl ${colors[color]} p-3 rounded-lg`}>{icon}</div>
      </div>
    </div>
  );
}

function getStatusColor(status) {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

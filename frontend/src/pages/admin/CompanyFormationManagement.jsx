import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import AdminLayout from '../../components/AdminLayout';

export default function CompanyFormationManagement() {
  const [applications, setApplications] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('applications');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [appsRes, pkgsRes] = await Promise.all([
        axios.get('/admin/applications'),
        axios.get('/admin/packages')
      ]);
      setApplications(appsRes.data.applications || []);
      setPackages(pkgsRes.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const services = [
    { id: 'gst', name: 'GST Registration', icon: '📋', desc: 'Goods & Services Tax' },
    { id: 'msme', name: 'MSME Registration', icon: '🏭', desc: 'Udyam Registration' },
    { id: 'pan', name: 'PAN Registration', icon: '🆔', desc: 'Permanent Account Number' },
    { id: 'tan', name: 'TAN Registration', icon: '🔢', desc: 'Tax Deduction Account' },
    { id: 'dsc', name: 'DSC', icon: '🔐', desc: 'Digital Signature Certificate' },
    { id: 'din', name: 'DIN', icon: '👤', desc: 'Director Identification Number' },
    { id: 'coi', name: 'COI', icon: '📜', desc: 'Certificate of Incorporation' },
    { id: 'shop_act', name: 'Shop Act', icon: '🏪', desc: 'Shop & Establishment' }
  ];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Company Formation Management</h1>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('applications')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'applications'
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Applications
                </button>
                <button
                  onClick={() => setActiveTab('packages')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'packages'
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Packages
                </button>
                <button
                  onClick={() => setActiveTab('services')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'services'
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Services
                </button>
              </nav>
            </div>
          </div>

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Total Applications" value="0" icon="📄" />
                <StatCard title="Pending" value="0" icon="⏳" />
                <StatCard title="In Progress" value="0" icon="⚙️" />
                <StatCard title="Completed" value="0" icon="✅" />
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Recent Applications</h2>
                <div className="text-center py-8 text-gray-500">
                  No company formation applications yet
                </div>
              </div>
            </div>
          )}

          {/* Packages Tab */}
          {activeTab === 'packages' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{pkg.name}</h3>
                      {pkg.badge_text && (
                        <span className="inline-block mt-1 px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded">
                          {pkg.badge_text}
                        </span>
                      )}
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      pkg.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {pkg.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{pkg.subtitle}</p>
                  <p className="text-2xl font-bold text-orange-600 mb-2">₹{pkg.price?.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mb-4">⏱️ {pkg.timeline}</p>
                  <button className="w-full bg-blue-50 text-blue-600 px-4 py-2 rounded hover:bg-blue-100">
                    View Details
                  </button>
                </div>
              ))}
              {packages.length === 0 && (
                <div className="col-span-3 text-center py-8 text-gray-500">
                  No packages created yet
                </div>
              )}
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-3">{service.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{service.desc}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">0 applications</span>
                    <button className="text-blue-600 hover:text-blue-800">Manage →</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
}

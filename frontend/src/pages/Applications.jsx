import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, ArrowRight, Filter, Plus, Zap, Flame, Droplets, Building } from 'lucide-react';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await api.get('/applications/');
      setApplications(response.data || []);
    } catch (error) {
      console.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'submitted': return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'pending':
      case 'processing': return <Clock className="w-5 h-5 text-yellow-500" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'submitted': return 'bg-blue-100 text-blue-700';
      case 'pending':
      case 'processing': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getServiceIcon = (serviceType) => {
    switch (serviceType) {
      case 'electricity': return <Zap className="w-5 h-5 text-white" />;
      case 'gas': return <Flame className="w-5 h-5 text-white" />;
      case 'water': return <Droplets className="w-5 h-5 text-white" />;
      case 'property': return <Building className="w-5 h-5 text-white" />;
      default: return <FileText className="w-5 h-5 text-white" />;
    }
  };

  const getServiceColor = (serviceType) => {
    switch (serviceType) {
      case 'electricity': return 'from-yellow-400 to-orange-500';
      case 'gas': return 'from-red-400 to-rose-600';
      case 'water': return 'from-cyan-400 to-blue-500';
      case 'property': return 'from-emerald-400 to-green-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Applications</h1>
              <p className="text-gray-500">Track your submitted applications and their status</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              to="/services"
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Application
            </Link>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Recent Applications</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Filter className="w-4 h-4" />
              Total: {applications.length}
            </div>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading applications...</p>
              </div>
            </div>
          ) : applications.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Applications Yet</h3>
              <p className="text-gray-600 mb-6">You haven't submitted any applications yet. Start by applying for a service.</p>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Apply for Service
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`bg-gradient-to-r ${getServiceColor(app.service_type)} p-3 rounded-xl shadow-lg`}>
                        {getServiceIcon(app.service_type)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-800 capitalize">
                            {app.service_type} - {app.application_type}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                            {app.status}
                          </span>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-4">
                            <span><strong>Application ID:</strong> {app.id}</span>
                            <span><strong>Provider:</strong> {app.provider || 'N/A'}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span><strong>Submitted:</strong> {formatDate(app.submitted_at)}</span>
                            {app.updated_at && (
                              <span><strong>Updated:</strong> {formatDate(app.updated_at)}</span>
                            )}
                          </div>
                          {app.notes && (
                            <div>
                              <strong>Notes:</strong> {app.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      {getStatusIcon(app.status)}
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/services"
            className="flex items-center gap-3 bg-white p-4 rounded-xl hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">New Application</p>
              <p className="text-xs text-gray-500">Apply for services</p>
            </div>
          </Link>
          
          <Link
            to="/documents"
            className="flex items-center gap-3 bg-white p-4 rounded-xl hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">My Documents</p>
              <p className="text-xs text-gray-500">Manage documents</p>
            </div>
          </Link>
          
          <Link
            to="/profile"
            className="flex items-center gap-3 bg-white p-4 rounded-xl hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Profile</p>
              <p className="text-xs text-gray-500">Update details</p>
            </div>
          </Link>
          
          <Link
            to="/support"
            className="flex items-center gap-3 bg-white p-4 rounded-xl hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">Get Help</p>
              <p className="text-xs text-gray-500">Contact support</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Applications;
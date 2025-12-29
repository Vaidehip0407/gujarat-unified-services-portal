import { useState, useEffect } from 'react';
import api from '../api/axios';
import { FileText, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const Applications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get('/applications/');
      setApplications(response.data);
    } catch (error) {
      console.error('Failed to fetch applications');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
      case 'processing': return <Clock className="w-5 h-5 text-yellow-500" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'pending':
      case 'processing': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Applications</h2>

      <div className="bg-white rounded-xl shadow-md p-6">
        {applications.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No applications yet</p>
            <p className="text-sm text-gray-400">Start by applying for a service from the dashboard</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(app.status)}
                      <h3 className="font-semibold text-gray-800 capitalize">
                        {app.service_type} - {app.application_type.replace('_', ' ')}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Application ID: #{app.id}
                    </p>
                    {app.submitted_at && (
                      <p className="text-sm text-gray-500">
                        Submitted: {new Date(app.submitted_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>
                {app.external_reference && (
                  <p className="text-sm text-blue-600 mt-2">
                    External Ref: {app.external_reference}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;

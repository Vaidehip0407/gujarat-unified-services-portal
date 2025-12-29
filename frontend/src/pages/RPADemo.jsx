import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { 
  Bot, Play, CheckCircle, Clock, AlertCircle, RefreshCw, 
  ExternalLink, Eye, Zap, Monitor, Database
} from 'lucide-react';

const RPADemo = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [rpaSubmissions, setRpaSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(null);

  useEffect(() => {
    fetchApplications();
    fetchRpaSubmissions();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get('/applications/');
      setApplications(response.data || []);
    } catch (error) {
      console.error('Failed to fetch applications');
    }
  };

  const fetchRpaSubmissions = async () => {
    try {
      const response = await api.get('/rpa/submissions');
      setRpaSubmissions(response.data || []);
    } catch (error) {
      console.error('Failed to fetch RPA submissions');
    }
  };

  const submitViaRPA = async (application, targetWebsite) => {
    setSubmitting(application.id);
    
    try {
      // Prepare submission data based on application
      const submissionData = {
        city: user?.city || 'Ahmedabad',
        service_number: application.form_data?.service_number || '123456789',
        t_no: application.form_data?.t_no || 'T123456',
        applicant_name: user?.full_name || 'Test User',
        mobile: user?.mobile?.replace(/\D/g, '').slice(0, 10) || '9876543210', // Ensure 10 digits
        email: user?.email || 'test@example.com',
        application_type: application.application_type || 'name_change'
      };

      const response = await api.post('/rpa/submit', {
        application_id: application.id,
        target_website: targetWebsite,
        submission_data: submissionData
      });

      console.log('RPA submission started:', response.data);
      
      // Refresh data
      await fetchRpaSubmissions();
      
      // Poll for status updates
      pollRpaStatus(response.data.id);
      
    } catch (error) {
      console.error('RPA submission failed:', error);
      alert('RPA submission failed: ' + (error.response?.data?.detail || error.message));
    } finally {
      setSubmitting(null);
    }
  };

  const pollRpaStatus = async (submissionId) => {
    const maxPolls = 30; // 30 seconds
    let polls = 0;
    
    const poll = async () => {
      try {
        const response = await api.get(`/rpa/status/${submissionId}`);
        const submission = response.data;
        
        // Update submissions list
        setRpaSubmissions(prev => 
          prev.map(sub => sub.id === submissionId ? submission : sub)
        );
        
        if (submission.status === 'processing' && polls < maxPolls) {
          polls++;
          setTimeout(poll, 1000); // Poll every second
        } else if (submission.status === 'success') {
          // Refresh applications to show updated status
          await fetchApplications();
        }
      } catch (error) {
        console.error('Failed to poll RPA status');
      }
    };
    
    poll();
  };

  const retryRpaSubmission = async (submissionId) => {
    try {
      await api.post(`/rpa/retry/${submissionId}`);
      await fetchRpaSubmissions();
      pollRpaStatus(submissionId);
    } catch (error) {
      console.error('Retry failed:', error);
      alert('Retry failed: ' + (error.response?.data?.detail || error.message));
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'queued': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'processing': return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed': return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'queued': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RPA Automation Demo
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Robotic Process Automation for Government Form Submissions
          </p>
        </div>

        {/* Demo Info */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-start gap-4">
            <Monitor className="w-8 h-8 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-2">🤖 How RPA Works:</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/20 p-3 rounded-lg">
                  <strong>1. Queue Submission</strong>
                  <p>Your application is queued for RPA processing</p>
                </div>
                <div className="bg-white/20 p-3 rounded-lg">
                  <strong>2. Browser Automation</strong>
                  <p>Selenium opens browser and fills government form</p>
                </div>
                <div className="bg-white/20 p-3 rounded-lg">
                  <strong>3. Get Confirmation</strong>
                  <p>RPA extracts confirmation number and saves to database</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Applications Ready for RPA */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">Applications Ready for RPA</h2>
          </div>
          
          {applications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No applications found. Create an application first from Services page.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {applications.map((app) => (
                <div key={app.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        {app.service_type.toUpperCase()} - {app.application_type}
                      </h3>
                      <p className="text-gray-600">Application ID: {app.id}</p>
                      <p className="text-sm text-gray-500">
                        Status: <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      {app.service_type === 'electricity' && (
                        <button
                          onClick={() => submitViaRPA(app, 'torrent-power')}
                          disabled={submitting === app.id}
                          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
                        >
                          {submitting === app.id ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                          Submit via RPA (Torrent Power)
                        </button>
                      )}
                      
                      <a
                        href="http://localhost:8000/demo-govt/torrent-power"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Demo Site
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RPA Submissions Status */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Database className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-800">RPA Submission History</h2>
            <button
              onClick={fetchRpaSubmissions}
              className="ml-auto bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          
          {rpaSubmissions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No RPA submissions yet. Submit an application via RPA to see results here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {rpaSubmissions.map((submission) => (
                <div key={submission.id} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      {getStatusIcon(submission.status)}
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {submission.target_website.toUpperCase()} Submission
                        </h3>
                        <p className="text-sm text-gray-600">
                          Application ID: {submission.application_id}
                        </p>
                        {submission.confirmation_number && (
                          <p className="text-sm font-mono bg-green-100 text-green-800 px-2 py-1 rounded mt-1">
                            Confirmation: {submission.confirmation_number}
                          </p>
                        )}
                        {submission.error_message && (
                          <p className="text-sm text-red-600 mt-1">
                            Error: {submission.error_message}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          Created: {new Date(submission.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(submission.status)}`}>
                        {submission.status}
                      </span>
                      
                      {submission.status === 'failed' && submission.retry_count < 3 && (
                        <button
                          onClick={() => retryRpaSubmission(submission.id)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-colors text-sm"
                        >
                          Retry
                        </button>
                      )}
                      
                      {submission.confirmation_number && (
                        <a
                          href={`http://localhost:8000/demo-govt/${submission.target_website}/status/${submission.confirmation_number}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors text-sm flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          Track
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RPADemo;
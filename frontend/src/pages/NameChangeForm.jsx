import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Zap, Flame, Droplets, Building, ArrowLeft, Send, RefreshCw } from 'lucide-react';

const NameChangeForm = () => {
  const { serviceType } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const serviceConfig = {
    electricity: { icon: Zap, color: 'bg-yellow-500', label: 'Electricity' },
    gas: { icon: Flame, color: 'bg-orange-500', label: 'Gas' },
    water: { icon: Droplets, color: 'bg-blue-500', label: 'Water' },
    property: { icon: Building, color: 'bg-green-500', label: 'Property' }
  };

  const config = serviceConfig[serviceType] || serviceConfig.electricity;
  const Icon = config.icon;

  useEffect(() => {
    fetchPrefillData();
  }, [serviceType]);

  const fetchPrefillData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/applications/prefill/${serviceType}/name_change`);
      setFormData(response.data);
    } catch (error) {
      console.error('Failed to fetch prefill data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      // Create application
      const appResponse = await api.post('/applications/', {
        service_type: serviceType,
        application_type: 'name_change',
        form_data: formData
      });

      // Submit application
      await api.post(`/applications/${appResponse.data.id}/submit`);
      
      setMessage('Application submitted successfully!');
      setTimeout(() => navigate('/applications'), 2000);
    } catch (error) {
      setMessage('Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  const renderFields = () => {
    const commonFields = [
      { name: 'full_name', label: 'Full Name', required: true },
      { name: 'mobile', label: 'Mobile Number', required: true },
      { name: 'email', label: 'Email', required: true },
      { name: 'address', label: 'Address' },
      { name: 'city', label: 'City' },
      { name: 'pincode', label: 'Pincode' }
    ];

    const serviceFields = {
      electricity: [
        { name: 'service_number', label: 'Service Number', required: true },
        { name: 't_no', label: 'T-No' },
        { name: 'consumer_name', label: 'Current Consumer Name' },
        { name: 'new_name', label: 'New Name (After Change)', required: true }
      ],
      gas: [
        { name: 'consumer_number', label: 'Consumer Number', required: true },
        { name: 'bp_number', label: 'BP Number' },
        { name: 'consumer_name', label: 'Current Consumer Name' },
        { name: 'new_name', label: 'New Name (After Change)', required: true }
      ],
      water: [
        { name: 'connection_id', label: 'Connection ID', required: true },
        { name: 'consumer_name', label: 'Current Consumer Name' },
        { name: 'new_name', label: 'New Name (After Change)', required: true }
      ],
      property: [
        { name: 'survey_number', label: 'Survey Number', required: true },
        { name: 'property_id', label: 'Property ID' },
        { name: 'owner_name', label: 'Current Owner Name' },
        { name: 'new_owner_name', label: 'New Owner Name', required: true }
      ]
    };

    return [...(serviceFields[serviceType] || []), ...commonFields];
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="max-w-2xl">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Dashboard
      </button>

      <div className={`${config.color} rounded-t-xl p-4 flex items-center gap-3`}>
        <Icon className="w-8 h-8 text-white" />
        <div>
          <h2 className="text-xl font-bold text-white">{config.label} Name Change</h2>
          <p className="text-white/80 text-sm">Form auto-filled from your profile</p>
        </div>
      </div>

      <div className="bg-white rounded-b-xl shadow-md p-6">
        {message && (
          <div className={`p-4 rounded-lg mb-4 ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <div className="flex justify-end mb-4">
          <button
            onClick={fetchPrefillData}
            className="flex items-center gap-1 text-blue-600 text-sm hover:underline"
          >
            <RefreshCw className="w-4 h-4" /> Refresh Auto-fill
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderFields().map((field) => (
              <div key={field.name} className={field.name === 'address' ? 'md:col-span-2' : ''}>
                <label className="block text-gray-700 mb-1 text-sm">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.name === 'address' ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required={field.required}
                    rows={2}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                ) : (
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    required={field.required}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NameChangeForm;

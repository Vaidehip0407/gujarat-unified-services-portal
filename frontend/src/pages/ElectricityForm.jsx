import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { ArrowLeft, RefreshCw, Zap, ExternalLink } from 'lucide-react';
import { gujaratData, getElectricityProvider } from '../data/gujaratServices';

const ElectricityForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    city: 'Ahmedabad',
    provider: 'Torrent Power',
    service_number: '',
    t_no: '',
    mobile: '',
    email: '',
    captcha_answer: ''
  });
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // All Gujarat electricity providers with URLs
  const allProviders = [
    ...gujaratData.electricity.government,
    ...gujaratData.electricity.private
  ];

  useEffect(() => {
    fetchPrefillData();
    generateCaptcha();
  }, []);

  useEffect(() => {
    // Auto-select provider based on city
    const provider = getElectricityProvider(formData.city);
    setFormData(prev => ({ ...prev, provider: provider.name }));
    setSelectedProvider(provider);
  }, [formData.city]);

  useEffect(() => {
    // Update selected provider details when provider changes
    const provider = allProviders.find(p => p.name === formData.provider);
    if (provider) {
      setSelectedProvider(provider);
    }
  }, [formData.provider]);

  const generateCaptcha = () => {
    setCaptcha({
      num1: Math.floor(Math.random() * 10),
      num2: Math.floor(Math.random() * 10)
    });
    setFormData(prev => ({ ...prev, captcha_answer: '' }));
  };

  const fetchPrefillData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/applications/prefill/electricity/name_change');
      setFormData(prev => ({
        ...prev,
        service_number: response.data.service_number || '',
        t_no: response.data.t_no || '',
        mobile: response.data.mobile || '',
        email: response.data.email || '',
        city: response.data.city || 'Ahmedabad'
      }));
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
    setMessage('');

    if (parseInt(formData.captcha_answer) !== captcha.num1 + captcha.num2) {
      setMessage('Invalid captcha answer');
      generateCaptcha();
      return;
    }

    setSubmitting(true);
    try {
      const appResponse = await api.post('/applications/', {
        service_type: 'electricity',
        application_type: 'name_change',
        form_data: formData
      });
      await api.post(`/applications/${appResponse.data.id}/submit`);
      setMessage('Application submitted successfully!');
      setTimeout(() => navigate('/applications'), 2000);
    } catch (error) {
      setMessage('Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Dashboard
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-white text-xl font-bold">Electricity Service</h1>
                <p className="text-yellow-100 text-sm">Gujarat State - Name Change Request</p>
              </div>
            </div>
          </div>
        </div>

        {/* Provider Portal Link */}
        {selectedProvider && (
          <div className="bg-yellow-50 border-b border-yellow-100 p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-800">
                  Selected Provider: {selectedProvider.name}
                </p>
                <p className="text-xs text-yellow-600">{selectedProvider.fullName}</p>
              </div>
              <a
                href={selectedProvider.portal}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-yellow-700 hover:text-yellow-900 bg-yellow-100 px-3 py-1 rounded-lg"
              >
                Official Portal <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            {selectedProvider.nameChangeUrl && (
              <a
                href={selectedProvider.nameChangeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline mt-1 inline-flex items-center gap-1"
              >
                Direct Name Change Link <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}

        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
            Name Change Application Request
          </h2>
          <p className="text-gray-500 text-center text-sm mb-6">
            Please enter your details for name change application
          </p>

          {message && (
            <div className={`p-3 rounded-lg mb-4 text-center ${
              message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* City */}
            <div>
              <label className="block text-gray-700 mb-1">
                City<span className="text-red-500">*</span>
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                required
              >
                {gujaratData.cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Provider */}
            <div>
              <label className="block text-gray-700 mb-1">
                Electricity Provider<span className="text-red-500">*</span>
              </label>
              <select
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                required
              >
                <optgroup label="Government (DISCOMs)">
                  {gujaratData.electricity.government.map(p => (
                    <option key={p.name} value={p.name}>{p.name} - {p.fullName}</option>
                  ))}
                </optgroup>
                <optgroup label="Private">
                  {gujaratData.electricity.private.map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Service Number */}
            <div>
              <label className="block text-gray-700 mb-1">
                Service Number / Consumer Number<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="service_number"
                value={formData.service_number}
                onChange={handleChange}
                placeholder="Enter your Service Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                required
              />
            </div>

            {/* T No - Only for Torrent Power */}
            {formData.provider === 'Torrent Power' && (
              <div>
                <label className="block text-gray-700 mb-1">
                  T No<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="t_no"
                  value={formData.t_no}
                  onChange={handleChange}
                  placeholder="Enter your T No"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                  required
                />
              </div>
            )}

            {/* Mobile Number */}
            <div>
              <label className="block text-gray-700 mb-1">
                Mobile Number<span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your Mobile Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-1">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
                required
              />
            </div>

            {/* Captcha */}
            <div>
              <label className="block text-gray-700 mb-1">
                Please confirm you are not robot
              </label>
              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium">
                  {captcha.num1} + {captcha.num2} =
                </span>
                <input
                  type="text"
                  name="captcha_answer"
                  value={formData.captcha_answer}
                  onChange={handleChange}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none text-center"
                  required
                />
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700"
                >
                  Re-generate <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Provider Quick Links */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-2">Quick Links - Official Portals:</p>
              <div className="flex flex-wrap gap-2">
                {allProviders.map(provider => (
                  <a
                    key={provider.name}
                    href={provider.portal}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-white px-3 py-1 rounded border hover:bg-gray-100 text-blue-600 flex items-center gap-1"
                  >
                    {provider.name} <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-full font-semibold hover:from-yellow-600 hover:to-orange-600 disabled:opacity-50 transition"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ElectricityForm;

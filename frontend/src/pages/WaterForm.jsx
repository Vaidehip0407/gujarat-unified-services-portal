import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { ArrowLeft, RefreshCw, Droplets } from 'lucide-react';
import { gujaratData } from '../data/gujaratServices';

const WaterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    city: 'Ahmedabad',
    provider: 'AMC',
    connection_id: '',
    consumer_name: '',
    zone: '',
    ward: '',
    mobile: '',
    email: '',
    address: '',
    captcha_answer: ''
  });
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchPrefillData();
    generateCaptcha();
  }, []);

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
      const response = await api.get('/applications/prefill/water/name_change');
      setFormData(prev => ({
        ...prev,
        connection_id: response.data.connection_id || '',
        consumer_name: response.data.consumer_name || response.data.full_name || '',
        zone: response.data.zone || '',
        ward: response.data.ward || '',
        mobile: response.data.mobile || '',
        email: response.data.email || '',
        address: response.data.address || '',
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
        service_type: 'water',
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
        <div className="bg-gradient-to-r from-blue-500 to-blue-400 p-4">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg">
              <Droplets className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-white text-xl font-bold">Water Service</h1>
              <p className="text-blue-100 text-sm">Gujarat State - Name Change Request</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
            Name Change Application Request
          </h2>
          <p className="text-gray-500 text-center text-sm mb-6">
            Please enter your details for water connection name change
          </p>

          {message && (
            <div className={`p-3 rounded-lg mb-4 text-center ${
              message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">City<span className="text-red-500">*</span></label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                {gujaratData.cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Water Provider / Municipal Corporation<span className="text-red-500">*</span></label>
              <select
                name="provider"
                value={formData.provider}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <optgroup label="Municipal Corporations">
                  {gujaratData.water.municipalCorporations.map(p => (
                    <option key={p.name} value={p.name}>{p.name} - {p.fullName}</option>
                  ))}
                </optgroup>
                <optgroup label="Government">
                  {gujaratData.water.government.map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Private Suppliers">
                  {gujaratData.water.private.map(p => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Connection ID / Consumer Number<span className="text-red-500">*</span></label>
              <input
                type="text"
                name="connection_id"
                value={formData.connection_id}
                onChange={handleChange}
                placeholder="Enter your Connection ID"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Current Consumer Name<span className="text-red-500">*</span></label>
              <input
                type="text"
                name="consumer_name"
                value={formData.consumer_name}
                onChange={handleChange}
                placeholder="Enter current consumer name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Zone</label>
                <input
                  type="text"
                  name="zone"
                  value={formData.zone}
                  onChange={handleChange}
                  placeholder="Enter Zone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Ward</label>
                <input
                  type="text"
                  name="ward"
                  value={formData.ward}
                  onChange={handleChange}
                  placeholder="Enter Ward"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Mobile Number<span className="text-red-500">*</span></label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your Mobile Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Email<span className="text-red-500">*</span></label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Connection Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter connection address"
                rows={2}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Please confirm you are not robot</label>
              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium">{captcha.num1} + {captcha.num2} =</span>
                <input
                  type="text"
                  name="captcha_answer"
                  value={formData.captcha_answer}
                  onChange={handleChange}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center"
                  required
                />
                <button type="button" onClick={generateCaptcha} className="flex items-center gap-1 text-blue-500">
                  Re-generate <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold hover:bg-blue-600 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WaterForm;

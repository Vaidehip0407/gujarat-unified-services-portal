import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { ArrowLeft, RefreshCw } from 'lucide-react';

const TorrentPowerForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    city: 'Ahmedabad',
    service_number: '',
    t_no: '',
    mobile: '',
    email: '',
    captcha_answer: ''
  });
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const cities = ['Ahmedabad', 'Gandhinagar', 'Surat', 'Bharuch', 'Dahej'];

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

    // Validate captcha
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

      {/* Torrent Power Style Header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-4">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded">
              <div className="grid grid-cols-3 gap-0.5">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-orange-500 rounded-sm"></div>
                ))}
              </div>
            </div>
            <div>
              <h1 className="text-white text-xl font-bold">torrent</h1>
              <p className="text-orange-100 text-xs tracking-widest">POWER</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
            Name Change Application Request
          </h2>
          <p className="text-gray-500 text-center text-sm mb-6">
            Please enter your Application number, Mobile Number and Email
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                required
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Service Number */}
            <div>
              <label className="block text-gray-700 mb-1">
                Service Number<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="service_number"
                value={formData.service_number}
                onChange={handleChange}
                placeholder="Enter your Service Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                required
              />
            </div>

            {/* T No */}
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                required
              />
            </div>

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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
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
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-center"
                  required
                />
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="flex items-center gap-1 text-orange-500 hover:text-orange-600"
                >
                  Re-generate <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 disabled:opacity-50 transition"
            >
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TorrentPowerForm;

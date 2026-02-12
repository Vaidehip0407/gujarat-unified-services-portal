import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin, Calendar, TrendingUp, Award, ExternalLink, Download, CheckCircle, FileText, Home, Heart, Share2 } from 'lucide-react';
import axios from '../api/axios';

const GrantDetail = () => {
  const navigate = useNavigate();
  const { grantId } = useParams();
  
  const [grant, setGrant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchGrantDetail();
  }, [grantId]);

  const fetchGrantDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/grants/${grantId}`);
      setGrant(response.data);
    } catch (error) {
      console.error('Error fetching grant detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.delete(`/grants/favorites/${grantId}`);
      } else {
        await axios.post(`/grants/favorites/${grantId}`);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      open: { color: 'bg-green-100 text-green-800', label: '🟢 Open for Applications' },
      upcoming: { color: 'bg-yellow-100 text-yellow-800', label: '🟡 Upcoming' },
      closed: { color: 'bg-red-100 text-red-800', label: '🔴 Closed' }
    };
    
    const config = statusConfig[status] || statusConfig.open;
    
    return (
      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading grant details...</p>
        </div>
      </div>
    );
  }

  if (!grant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Grant Not Found</h3>
          <button
            onClick={() => navigate('/government-grants')}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Back to Grants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-white hover:text-green-100 mb-4 transition-colors bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-green-100 mb-4">
            <Link to="/" className="hover:text-white flex items-center gap-1">
              <Home className="w-3 h-3" />
              Dashboard
            </Link>
            <span>/</span>
            <Link to="/government-grants" className="hover:text-white">
              Government Grants
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">Grant Details</span>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{grant.name}</h1>
              {grant.name_hindi && (
                <p className="text-xl text-green-100 mb-4">{grant.name_hindi}</p>
              )}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg">
                  <Building2 className="w-4 h-4" />
                  {grant.ministry}
                </span>
                <span className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg">
                  <MapPin className="w-4 h-4" />
                  {grant.level === 'central' ? 'Central Government' : grant.level === 'state' ? 'State Government' : 'Central + State'}
                </span>
                {grant.scheme_number && (
                  <span className="bg-white/20 px-3 py-1 rounded-lg">
                    Scheme No: {grant.scheme_number}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              {getStatusBadge(grant.status)}
              <div className="text-right bg-white/20 px-6 py-3 rounded-lg">
                <div className="text-3xl font-bold">
                  {grant.amount_display || `₹${(grant.max_amount / 100000).toFixed(0)} Lakhs`}
                </div>
                <div className="text-sm text-green-100">Maximum Grant Amount</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Scheme Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-green-600" />
                Scheme Overview
              </h2>
              {grant.objective && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Objective</h3>
                  <p className="text-gray-700">{grant.objective}</p>
                </div>
              )}
              {grant.description && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                  <p className="text-gray-700">{grant.description}</p>
                </div>
              )}
              {grant.description_hindi && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">विवरण (हिंदी में)</h3>
                  <p className="text-gray-700">{grant.description_hindi}</p>
                </div>
              )}
            </div>

            {/* Benefits */}
            {grant.benefits && grant.benefits.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  Key Benefits
                </h2>
                <ul className="space-y-3">
                  {grant.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Eligibility Criteria */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-blue-600" />
                Eligibility Criteria
              </h2>
              {grant.eligibility_summary && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-blue-800 font-semibold">{grant.eligibility_summary}</p>
                </div>
              )}
              {grant.eligibility_criteria && (
                <div className="space-y-3">
                  {Object.entries(grant.eligibility_criteria).map(([key, value]) => (
                    <div key={key} className="border-l-4 border-blue-500 pl-4">
                      <div className="font-semibold text-gray-800 capitalize">{key.replace('_', ' ')}</div>
                      <div className="text-gray-700">
                        {Array.isArray(value) ? value.join(', ') : value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Required Documents */}
            {grant.required_documents && grant.required_documents.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-purple-600" />
                  Required Documents
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {grant.required_documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                      <FileText className="w-5 h-5 text-purple-600 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Official Links */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Official Government Sources
              </h2>
              <div className="space-y-3">
                {grant.official_website && (
                  <a
                    href={grant.official_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <ExternalLink className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="font-semibold text-gray-800">Official Website</div>
                      <div className="text-sm text-gray-600">{grant.official_website}</div>
                    </div>
                  </a>
                )}
                {grant.notification_pdf && (
                  <a
                    href={grant.notification_pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <Download className="w-5 h-5 text-red-600" />
                    <div>
                      <div className="font-semibold text-gray-800">Download Notification PDF</div>
                      <div className="text-sm text-gray-600">Official Government Notification</div>
                    </div>
                  </a>
                )}
                {grant.guidelines_pdf && (
                  <a
                    href={grant.guidelines_pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <Download className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="font-semibold text-gray-800">Download Guidelines PDF</div>
                      <div className="text-sm text-gray-600">Application Guidelines</div>
                    </div>
                  </a>
                )}
              </div>
              <div className="mt-4 text-xs text-gray-600 italic">
                ⚠️ As per Government Notification • Ministry of {grant.ministry}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Important Dates */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                Important Dates
              </h3>
              <div className="space-y-3">
                {grant.announcement_date && (
                  <div className="border-l-4 border-blue-500 pl-3">
                    <div className="text-sm text-gray-600">Announcement Date</div>
                    <div className="font-semibold text-gray-800">
                      {new Date(grant.announcement_date).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                )}
                {grant.application_start_date && (
                  <div className="border-l-4 border-green-500 pl-3">
                    <div className="text-sm text-gray-600">Application Start</div>
                    <div className="font-semibold text-gray-800">
                      {new Date(grant.application_start_date).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                )}
                {grant.application_end_date && (
                  <div className="border-l-4 border-red-500 pl-3">
                    <div className="text-sm text-gray-600">Last Date to Apply</div>
                    <div className="font-semibold text-gray-800">
                      {new Date(grant.application_end_date).toLocaleDateString('en-IN', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Applications</span>
                    <span className="font-semibold text-gray-800">{grant.application_count}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Views</span>
                    <span className="font-semibold text-gray-800">{grant.view_count}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <Link
                  to={`/government-grants/check-eligibility/${grant.id}`}
                  className="block w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-center"
                >
                  Check Eligibility
                </Link>
                {grant.status === 'open' && (
                  <Link
                    to={`/government-grants/apply/${grant.id}`}
                    className="block w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-center"
                  >
                    Apply Now
                  </Link>
                )}
                <button
                  onClick={toggleFavorite}
                  className={`w-full py-3 rounded-lg transition-colors font-semibold flex items-center justify-center gap-2 ${
                    isFavorite 
                      ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Saved' : 'Save Grant'}
                </button>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Need Help?</h3>
              <p className="text-sm text-gray-700 mb-4">
                Our support team is here to assist you with your grant application.
              </p>
              <Link
                to="/support"
                className="block w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold text-center text-sm"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrantDetail;

import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Filter, Search, Calendar, TrendingUp, Building2, MapPin, Award, ExternalLink, Heart, CheckCircle, XCircle, Clock, Home, Download } from 'lucide-react';
import axios from '../api/axios';

const AllGrants = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    ministry: '',
    level: '',
    status: '',
    minAmount: '',
    maxAmount: '',
    search: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  // Update filters when category param changes
  useEffect(() => {
    if (category) {
      setFilters(prev => ({ ...prev, category }));
    }
  }, [category]);

  // Filter options
  const categories = [
    { value: 'startup', label: 'Startup', icon: '🚀' },
    { value: 'msme', label: 'MSME', icon: '🏭' },
    { value: 'export', label: 'Export', icon: '🌍' },
    { value: 'technology', label: 'Technology', icon: '💻' },
    { value: 'women', label: 'Women Entrepreneur', icon: '👩‍💼' },
    { value: 'scst', label: 'SC/ST', icon: '🤝' },
    { value: 'minority', label: 'Minority', icon: '🏢' },
    { value: 'agriculture', label: 'Agriculture', icon: '🌾' },
    { value: 'manufacturing', label: 'Manufacturing', icon: '⚙️' }
  ];

  const ministries = [
    { value: 'Ministry of MSME', label: 'Ministry of MSME' },
    { value: 'DPIIT', label: 'DPIIT' },
    { value: 'Ministry of Electronics and IT', label: 'MeitY' },
    { value: 'Ministry of Agriculture', label: 'Agriculture' },
    { value: 'Ministry of Commerce', label: 'Commerce' },
    { value: 'Ministry of Women and Child Development', label: 'Women & Child' },
    { value: 'Ministry of Social Justice', label: 'Social Justice' }
  ];

  const levels = [
    { value: 'central', label: 'Central Government' },
    { value: 'state', label: 'State Government' },
    { value: 'both', label: 'Central + State' }
  ];

  const statuses = [
    { value: 'open', label: 'Open', color: 'green' },
    { value: 'upcoming', label: 'Upcoming', color: 'yellow' },
    { value: 'closed', label: 'Closed', color: 'red' }
  ];

  const amountRanges = [
    { min: 0, max: 500000, label: '₹0 - ₹5 Lakh' },
    { min: 500000, max: 2500000, label: '₹5 - ₹25 Lakh' },
    { min: 2500000, max: 10000000, label: '₹25 Lakh - ₹1 Crore' },
    { min: 10000000, max: null, label: '₹1 Crore+' }
  ];

  useEffect(() => {
    fetchGrants();
  }, [filters]);

  const fetchGrants = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (filters.category) params.append('category', filters.category);
      if (filters.ministry) params.append('ministry', filters.ministry);
      if (filters.level) params.append('level', filters.level);
      if (filters.status) params.append('status', filters.status);
      if (filters.minAmount) params.append('min_amount', filters.minAmount);
      if (filters.maxAmount) params.append('max_amount', filters.maxAmount);
      if (filters.search) params.append('search', filters.search);
      
      const response = await axios.get(`/grants?${params.toString()}`);
      setGrants(response.data);
    } catch (error) {
      console.error('Error fetching grants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      ministry: '',
      level: '',
      status: '',
      minAmount: '',
      maxAmount: '',
      search: ''
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      open: { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Open' },
      upcoming: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Upcoming' },
      closed: { color: 'bg-red-100 text-red-800', icon: XCircle, label: 'Closed' }
    };
    
    const config = statusConfig[status] || statusConfig.open;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  const getCategoryInfo = (categoryValue) => {
    return categories.find(c => c.value === categoryValue) || { label: categoryValue, icon: '📋' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/government-grants')}
            className="inline-flex items-center gap-2 text-white hover:text-green-100 mb-4 transition-colors bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Grants</span>
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
            <span className="text-white font-semibold">All Grants</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">All Government Grants</h1>
              <p className="text-green-100">सभी सरकारी अनुदान</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{grants.length}</div>
              <div className="text-sm text-green-100">Available Grants</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-green-600 hover:text-green-700 font-semibold"
                >
                  Clear All
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Search Grants
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    placeholder="Search by name..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Type
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ministry */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ministry / Department
                </label>
                <select
                  value={filters.ministry}
                  onChange={(e) => handleFilterChange('ministry', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Ministries</option>
                  {ministries.map(min => (
                    <option key={min.value} value={min.value}>
                      {min.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Level */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Government Level
                </label>
                <div className="space-y-2">
                  {levels.map(level => (
                    <label key={level.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="level"
                        value={level.value}
                        checked={filters.level === level.value}
                        onChange={(e) => handleFilterChange('level', e.target.value)}
                        className="w-4 h-4 text-green-600"
                      />
                      <span className="text-sm text-gray-700">{level.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Application Status
                </label>
                <div className="space-y-2">
                  {statuses.map(status => (
                    <label key={status.value} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value={status.value}
                        checked={filters.status === status.value}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        className="w-4 h-4 text-green-600"
                      />
                      <span className="text-sm text-gray-700">{status.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amount Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Funding Range
                </label>
                <div className="space-y-2">
                  {amountRanges.map((range, idx) => (
                    <label key={idx} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="amount"
                        checked={filters.minAmount === range.min.toString()}
                        onChange={() => {
                          handleFilterChange('minAmount', range.min.toString());
                          handleFilterChange('maxAmount', range.max ? range.max.toString() : '');
                        }}
                        className="w-4 h-4 text-green-600"
                      />
                      <span className="text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Grants List */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading grants...</p>
              </div>
            ) : grants.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Grants Found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {grants.map((grant) => {
                  const categoryInfo = getCategoryInfo(grant.category);
                  
                  return (
                    <div
                      key={grant.id}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                    >
                      <div className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                              {categoryInfo.icon}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-800 mb-1">
                                {grant.name}
                              </h3>
                              {grant.name_hindi && (
                                <p className="text-sm text-gray-600 mb-2">{grant.name_hindi}</p>
                              )}
                              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Building2 className="w-4 h-4" />
                                  {grant.ministry}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {grant.level === 'central' ? 'Central Govt' : grant.level === 'state' ? 'State Govt' : 'Central + State'}
                                </span>
                                {grant.scheme_number && (
                                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                    Scheme: {grant.scheme_number}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            {getStatusBadge(grant.status)}
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-600">
                                {grant.amount_display || `₹${(grant.max_amount / 100000).toFixed(0)}L`}
                              </div>
                              <div className="text-xs text-gray-500">Max Amount</div>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        {grant.description && (
                          <p className="text-gray-700 mb-4 line-clamp-2">
                            {grant.description}
                          </p>
                        )}

                        {/* Eligibility */}
                        {grant.eligibility_summary && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                            <div className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="text-xs font-semibold text-blue-800 mb-1">Eligibility</div>
                                <div className="text-sm text-blue-700">{grant.eligibility_summary}</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            {grant.application_end_date && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                Last Date: {new Date(grant.application_end_date).toLocaleDateString('en-IN')}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4" />
                              {grant.application_count} Applied
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Link
                              to={`/government-grants/grant/${grant.id}`}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm"
                            >
                              View Details
                            </Link>
                            <Link
                              to={`/government-grants/check-eligibility/${grant.id}`}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
                            >
                              Check Eligibility
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Transparency Dashboard */}
        <div className="mt-12 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Public Transparency Dashboard
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">₹500Cr+</div>
              <div className="text-sm text-gray-600">Total Grants Disbursed</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{grants.length}</div>
              <div className="text-sm text-gray-600">Active Schemes</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">10,000+</div>
              <div className="text-sm text-gray-600">Businesses Funded</div>
            </div>
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">85%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllGrants;

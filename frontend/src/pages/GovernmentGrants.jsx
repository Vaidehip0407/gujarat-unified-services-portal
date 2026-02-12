import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Gift, Search, ArrowRight, TrendingUp, Home } from 'lucide-react';

const GovernmentGrants = () => {
  const navigate = useNavigate();
  
  const grantCategories = [
    {
      id: 'find-grant',
      name: 'Find Grant for My Business',
      nameHindi: 'मेरे व्यवसाय के लिए अनुदान खोजें',
      icon: '🔍',
      description: 'AI will analyze your business and suggest eligible grants',
      color: 'from-purple-500 to-pink-500',
      featured: true,
      route: '/government-grants/find-grant'
    },
    {
      id: 'startup',
      name: 'Startup Grants',
      nameHindi: 'स्टार्टअप अनुदान',
      icon: '🚀',
      description: 'Grants for new startups and entrepreneurs',
      color: 'from-blue-500 to-cyan-500',
      grants: [
        { name: 'Startup India Seed Fund', amount: '₹20 Lakhs', eligibility: 'DPIIT Recognized' },
        { name: 'Atal Innovation Mission', amount: '₹10 Lakhs', eligibility: 'Tech Startups' },
        { name: 'SISFS', amount: '₹15 Lakhs', eligibility: 'SC/ST Entrepreneurs' }
      ]
    },
    {
      id: 'msme',
      name: 'MSME Grants',
      nameHindi: 'एमएसएमई अनुदान',
      icon: '🏭',
      description: 'Grants for Micro, Small & Medium Enterprises',
      color: 'from-green-500 to-teal-500',
      grants: [
        { name: 'Credit Guarantee Scheme', amount: '₹50 Lakhs', eligibility: 'MSME Registered' },
        { name: 'Technology Upgradation', amount: '₹10 Lakhs', eligibility: 'Manufacturing' },
        { name: 'Marketing Assistance', amount: '₹5 Lakhs', eligibility: 'Export Oriented' }
      ]
    },
    {
      id: 'export',
      name: 'Export Grants',
      nameHindi: 'निर्यात अनुदान',
      icon: '🌍',
      description: 'Grants for export-oriented businesses',
      color: 'from-orange-500 to-red-500',
      grants: [
        { name: 'Market Development Assistance', amount: '₹5 Lakhs', eligibility: 'Exporters' },
        { name: 'Export Promotion Capital Goods', amount: '₹10 Lakhs', eligibility: 'Manufacturers' },
        { name: 'Trade Fair Participation', amount: '₹3 Lakhs', eligibility: 'All Exporters' }
      ]
    },
    {
      id: 'technology',
      name: 'Technology Grants',
      nameHindi: 'प्रौद्योगिकी अनुदान',
      icon: '💻',
      description: 'Grants for technology and innovation',
      color: 'from-indigo-500 to-purple-500',
      grants: [
        { name: 'R&D Grant', amount: '₹25 Lakhs', eligibility: 'Tech Companies' },
        { name: 'Patent Filing Support', amount: '₹2 Lakhs', eligibility: 'Innovators' },
        { name: 'Digital India Initiative', amount: '₹5 Lakhs', eligibility: 'IT Services' }
      ]
    },
    {
      id: 'women',
      name: 'Women Entrepreneur Grants',
      nameHindi: 'महिला उद्यमी अनुदान',
      icon: '👩‍💼',
      description: 'Special grants for women-led businesses',
      color: 'from-pink-500 to-rose-500',
      grants: [
        { name: 'Mahila Udyam Nidhi', amount: '₹10 Lakhs', eligibility: 'Women Owned' },
        { name: 'Stree Shakti Package', amount: '₹5 Lakhs', eligibility: 'Women Entrepreneurs' },
        { name: 'TREAD Scheme', amount: '₹15 Lakhs', eligibility: 'Women in Rural Areas' }
      ]
    },
    {
      id: 'scst',
      name: 'SC/ST Entrepreneur Grants',
      nameHindi: 'एससी/एसटी उद्यमी अनुदान',
      icon: '🤝',
      description: 'Special grants for SC/ST entrepreneurs',
      color: 'from-yellow-500 to-orange-500',
      grants: [
        { name: 'NSFDC Loan Scheme', amount: '₹20 Lakhs', eligibility: 'SC Entrepreneurs' },
        { name: 'NSTFDC Scheme', amount: '₹15 Lakhs', eligibility: 'ST Entrepreneurs' },
        { name: 'Stand-Up India', amount: '₹10 Lakhs', eligibility: 'SC/ST/Women' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-white hover:text-green-100 mb-4 transition-colors bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-green-100 mb-4">
            <Link to="/" className="hover:text-white flex items-center gap-1">
              <Home className="w-3 h-3" />
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">Government Grants</span>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Government Grants</h1>
              <p className="text-xl text-green-100">सरकारी अनुदान</p>
            </div>
          </div>
          <p className="text-lg text-green-100">
            Find and apply for government grants for your business
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* AI Grant Finder - Featured */}
        <div className="mb-12">
          <Link
            to="/government-grants/find-grant"
            className="block bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
                🔍
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-bold">Find Grant for My Business</h2>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                    AI Powered
                  </span>
                </div>
                <p className="text-xl text-purple-100 mb-4">
                  मेरे व्यवसाय के लिए अनुदान खोजें
                </p>
                <p className="text-purple-100 mb-4">
                  Upload your business documents and let AI analyze which grants you're eligible for
                </p>
                <div className="flex items-center gap-2 text-white font-semibold">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Grant Categories */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Browse by Category</h2>
          <p className="text-gray-600 text-center mb-8">Explore grants based on your business type</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {grantCategories.slice(1).map((category) => (
              <div
                key={category.id}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
              >
                {/* Category Header */}
                <div className={`w-14 h-14 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center text-3xl mb-4`}>
                  {category.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{category.nameHindi}</p>
                <p className="text-sm text-gray-500 mb-6">{category.description}</p>
                
                {/* Grants List */}
                <div className="space-y-3 mb-6">
                  {category.grants.map((grant, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-sm font-semibold text-gray-800 flex-1">{grant.name}</h4>
                        <span className="text-sm font-bold text-green-600">{grant.amount}</span>
                      </div>
                      <p className="text-xs text-gray-500">Eligibility: {grant.eligibility}</p>
                    </div>
                  ))}
                </div>
                
                {/* View All Button */}
                <Link
                  to={`/government-grants/${category.id}`}
                  className="block w-full py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-semibold text-center hover:from-green-700 hover:to-teal-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span>View All Grants</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Grant Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">₹500Cr+</div>
              <p className="text-sm text-gray-600">Total Grants Available</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-sm text-gray-600">Active Grant Schemes</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">10,000+</div>
              <p className="text-sm text-gray-600">Businesses Funded</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">85%</div>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            How to Apply for Grants
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Upload Documents', desc: 'Business registration, financials' },
              { step: '2', title: 'AI Analysis', desc: 'AI finds eligible grants' },
              { step: '3', title: 'Fill Details', desc: 'Complete application form' },
              { step: '4', title: 'Submit', desc: 'Application auto-submitted' }
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                  {item.step}
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentGrants;

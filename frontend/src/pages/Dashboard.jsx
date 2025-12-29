  import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { 
  Zap, Flame, Droplets, Building, ArrowRight, FileText, Upload, 
  ExternalLink, CheckCircle, Clock, User, Shield, AlertCircle,
  MapPin, Phone, Mail, Calendar
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    documents: 0,
    applications: 0,
    pending: 0,
    completed: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [docsRes, appsRes] = await Promise.all([
        api.get('/users/documents'),
        api.get('/applications/')
      ]);
      
      const applications = appsRes.data || [];
      const pending = applications.filter(a => ['pending', 'draft', 'processing'].includes(a.status)).length;
      const completed = applications.filter(a => a.status === 'completed').length;
      
      setStats({
        documents: docsRes.data?.length || 0,
        applications: applications.length,
        pending: pending,
        completed: completed
      });
    } catch (error) {
      console.error('Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  const services = [
    {
      id: 'electricity',
      name: 'Electricity',
      nameGuj: 'વીજળી',
      icon: Zap,
      gradient: 'from-amber-400 to-orange-500',
      iconBg: 'bg-amber-500',
      link: '/electricity',
      providers: [
        { name: 'Torrent Power', areas: 'Ahmedabad, Gandhinagar, Surat', url: 'https://connect.torrentpower.com' },
        { name: 'PGVCL', areas: 'Rajkot, Jamnagar, Junagadh', url: 'https://www.pgvcl.com' },
        { name: 'UGVCL', areas: 'Mehsana, Sabarkantha', url: 'https://www.ugvcl.com' },
        { name: 'MGVCL', areas: 'Vadodara, Anand, Kheda', url: 'https://www.mgvcl.com' },
        { name: 'DGVCL', areas: 'Surat, Navsari, Valsad', url: 'https://www.dgvcl.com' }
      ]
    },
    {
      id: 'gas',
      name: 'Gas',
      nameGuj: 'ગેસ',
      icon: Flame,
      gradient: 'from-red-400 to-rose-600',
      iconBg: 'bg-red-500',
      link: '/gas',
      providers: [
        { name: 'Adani Total Gas', areas: 'Ahmedabad, Vadodara', url: 'https://www.adanigas.com' },
        { name: 'Gujarat Gas', areas: 'Surat, Bharuch, Vapi', url: 'https://www.gujaratgas.com' },
        { name: 'Sabarmati Gas', areas: 'Gandhinagar, Mehsana', url: 'https://www.sabarmatigas.com' }
      ]
    },
    {
      id: 'water',
      name: 'Water',
      nameGuj: 'પાણી',
      icon: Droplets,
      gradient: 'from-cyan-400 to-blue-500',
      iconBg: 'bg-cyan-500',
      link: '/water',
      providers: [
        { name: 'AMC', areas: 'Ahmedabad', url: 'https://ahmedabadcity.gov.in' },
        { name: 'SMC', areas: 'Surat', url: 'https://www.suratmunicipal.gov.in' },
        { name: 'VMC', areas: 'Vadodara', url: 'https://vmc.gov.in' },
        { name: 'GWSSB', areas: 'State Wide', url: 'https://gwssb.gujarat.gov.in' }
      ]
    },
    {
      id: 'property',
      name: 'Property',
      nameGuj: 'મિલકત',
      icon: Building,
      gradient: 'from-emerald-400 to-green-600',
      iconBg: 'bg-emerald-500',
      link: '/property',
      providers: [
        { name: 'AnyRoR Gujarat', areas: '7/12 & 8A Records', url: 'https://anyror.gujarat.gov.in' },
        { name: 'e-Dhara', areas: 'Land Mutation', url: 'https://revenuedepartment.gujarat.gov.in' },
        { name: 'e-Nagar', areas: 'Urban Property', url: 'https://enagar.gujarat.gov.in' }
      ]
    }
  ];

  const statsData = [
    { label: 'Documents', value: stats.documents, icon: FileText, gradient: 'from-emerald-500 to-green-600' },
    { label: 'Applications', value: stats.applications, icon: CheckCircle, gradient: 'from-blue-500 to-indigo-600' },
    { label: 'Pending', value: stats.pending, icon: Clock, gradient: 'from-amber-500 to-orange-600' },
    { label: 'Completed', value: stats.completed, icon: AlertCircle, gradient: 'from-emerald-500 to-teal-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        
        {/* Hero Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-blue-800 p-8 text-white shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full -ml-36 -mb-36"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl"></div>
          
          {/* Gujarat Ashoka Emblem Style Pattern */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10">
            <div className="w-40 h-40 border-8 border-white rounded-full flex items-center justify-center">
              <div className="w-28 h-28 border-4 border-white rounded-full flex items-center justify-center">
                <div className="text-6xl">🦁</div>
              </div>
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <User className="w-10 h-10" />
              </div>
              <div>
                <p className="text-emerald-200 text-sm font-medium mb-1">સ્વાગત છે • Welcome</p>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{user?.full_name || 'Citizen'}</h1>
                <p className="text-emerald-100 text-lg">Gujarat State Unified Services Portal</p>
                <p className="text-emerald-200/80 text-sm mt-1">ગુજરાત રાજ્ય એકીકૃત સેવા પોર્ટલ</p>
              </div>
            </div>
            
            {/* User Quick Info */}
            <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-white/20">
              {user?.city && (
                <div className="flex items-center gap-2 text-emerald-100">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{user.city}, Gujarat</span>
                </div>
              )}
              {user?.mobile && (
                <div className="flex items-center gap-2 text-emerald-100">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{user.mobile}</span>
                </div>
              )}
              {user?.email && (
                <div className="flex items-center gap-2 text-emerald-100">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <div 
              key={stat.label} 
              className="relative overflow-hidden bg-white rounded-2xl p-5 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-800">
                    {loading ? '...' : stat.value}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
                <div className={`bg-gradient-to-br ${stat.gradient} p-3 rounded-xl text-white shadow-lg`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/documents"
            className="group relative overflow-hidden bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 opacity-0 group-hover:opacity-5 transition-opacity"></div>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform">
                <Upload className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">Upload Documents</h3>
                <p className="text-sm text-gray-500">Aadhaar, PAN, Bills → Auto Extract Data</p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-2 transition-all" />
            </div>
          </Link>

          <Link
            to="/applications"
            className="group relative overflow-hidden bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity"></div>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform">
                <FileText className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">My Applications</h3>
                <p className="text-sm text-gray-500">
                  {stats.pending > 0 ? `${stats.pending} applications pending` : 'Track your submissions'}
                </p>
              </div>
              <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-2 transition-all" />
            </div>
          </Link>
        </div>

        {/* Services Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-1.5 bg-gradient-to-b from-emerald-500 to-blue-600 rounded-full"></div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Gujarat Services</h2>
              <p className="text-sm text-gray-500">ગુજરાત સેવાઓ • Select a service to apply</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Service Header */}
                <div className={`bg-gradient-to-r ${service.gradient} p-5`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/25 backdrop-blur-sm p-3 rounded-xl">
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{service.name}</h3>
                        <p className="text-white/80">{service.nameGuj}</p>
                      </div>
                    </div>
                    <Link
                      to={service.link}
                      className="bg-white text-gray-800 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                    >
                      Apply Now →
                    </Link>
                  </div>
                </div>

                {/* Providers List */}
                <div className="p-5">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                    Official Portals
                  </p>
                  <div className="space-y-2">
                    {service.providers.map((provider) => (
                      <a
                        key={provider.name}
                        href={provider.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 border border-transparent hover:border-emerald-200 transition-all group/item"
                      >
                        <div>
                          <p className="font-semibold text-gray-800 group-hover/item:text-emerald-700">{provider.name}</p>
                          <p className="text-xs text-gray-500">{provider.areas}</p>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover/item:text-emerald-600" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Government Portals Footer */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-5">
            <Shield className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg font-bold">Official Gujarat Government Portals</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'Digital Gujarat', url: 'https://digitalgujarat.gov.in' },
              { name: 'AnyRoR Gujarat', url: 'https://anyror.gujarat.gov.in' },
              { name: 'e-Nagar Gujarat', url: 'https://enagar.gujarat.gov.in' },
              { name: 'Seva Setu', url: 'https://sevasetu.gujarat.gov.in' },
              { name: 'e-Gram', url: 'https://egram.gujarat.gov.in' },
              { name: 'Revenue Dept', url: 'https://revenuedepartment.gujarat.gov.in' },
              { name: 'GSWAN', url: 'https://gswan.gujarat.gov.in' },
              { name: 'iORA', url: 'https://iora.gujarat.gov.in' }
            ].map((portal) => (
              <a
                key={portal.name}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium">{portal.name}</span>
              </a>
            ))}
          </div>
          
          {/* Footer Note */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm">
              🇮🇳 Powered by Gujarat State • સત્યમેવ જયતે
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

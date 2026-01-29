import { Link } from 'react-router-dom';
import { Zap, Flame, Droplets, Building, ExternalLink, Shield } from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: 'electricity',
      name: 'Electricity',
      nameHindi: 'बिजली',
      icon: Zap,
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      iconBg: 'bg-blue-100',
      providers: [
        { name: 'Torrent Power', url: 'https://connect.torrentpower.com' },
        { name: 'PGVCL', url: 'https://www.pgvcl.com' },
        { name: 'UGVCL', url: 'https://www.ugvcl.com' },
        { name: 'MGVCL', url: 'https://www.mgvcl.com' },
        { name: 'DGVCL', url: 'https://www.dgvcl.com' }
      ]
    },
    {
      id: 'gas',
      name: 'Gas',
      nameHindi: 'गैस',
      icon: Flame,
      color: 'indigo',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      textColor: 'text-indigo-700',
      iconBg: 'bg-indigo-100',
      providers: [
        { name: 'Adani Total Gas', url: 'https://www.adanigas.com' },
        { name: 'Gujarat Gas', url: 'https://iconnect.gujaratgas.com' },
        { name: 'Sabarmati Gas', url: 'https://www.sabarmatigas.com' }
      ]
    },
    {
      id: 'water',
      name: 'Water',
      nameHindi: 'पानी',
      icon: Droplets,
      color: 'cyan',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      textColor: 'text-cyan-700',
      iconBg: 'bg-cyan-100',
      providers: [
        { name: 'AMC Water', url: 'https://ahmedabadcity.gov.in' },
        { name: 'SMC Water', url: 'https://www.suratmunicipal.gov.in' },
        { name: 'VMC Water', url: 'https://vmc.gov.in' },
        { name: 'GWSSB', url: 'https://gwssb.gujarat.gov.in' }
      ]
    },
    {
      id: 'property',
      name: 'Property',
      nameHindi: 'संपत्ति',
      icon: Building,
      color: 'emerald',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-700',
      iconBg: 'bg-emerald-100',
      providers: [
        { name: 'AnyRoR Gujarat', url: 'https://anyror.gujarat.gov.in' },
        { name: 'e-Dhara', url: 'https://revenuedepartment.gujarat.gov.in' },
        { name: 'e-Nagar', url: 'https://enagar.gujarat.gov.in' },
        { name: 'iORA', url: 'https://iora.gujarat.gov.in' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Government Services</h1>
            <p className="text-gray-500 text-sm">Select a service to apply for name change in your utility connections</p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => {
          const Icon = service.icon;
          // Different colors for each service
          const serviceColors = {
            electricity: 'bg-yellow-500 group-hover:bg-yellow-600',
            gas: 'bg-red-500 group-hover:bg-red-600', 
            water: 'bg-blue-500 group-hover:bg-blue-600',
            property: 'bg-green-500 group-hover:bg-green-600'
          };
          
          return (
            <Link
              key={service.id}
              to={`/service-facilities/${service.id}`}
              className="group bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all hover:scale-105"
            >
              <div className="p-6 text-center">
                <div className={`w-16 h-16 ${serviceColors[service.id]} rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{service.name}</h3>
                <p className="text-gray-500 text-sm">{service.nameHindi}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Help Section */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Need Help?</h3>
            <p className="text-gray-600 text-sm mt-1">
              Contact our support team for assistance
            </p>
          </div>
          <Link
            to="/support"
            className="px-6 py-2.5 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
          >
            Get Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;

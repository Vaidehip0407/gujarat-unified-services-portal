import { Link } from 'react-router-dom';
import { Zap, Flame, Droplets, Building, ArrowRight, ExternalLink, Shield, Bot } from 'lucide-react';
import { allServices } from '../data/allServices';

const Services = () => {
  const serviceCategories = [
    {
      id: 'electricity',
      name: 'Electricity Services',
      nameGuj: 'વીજળી સેવાઓ',
      description: 'Name change, new connection, meter complaints',
      icon: Zap,
      gradient: 'from-amber-400 to-orange-500',
      bgLight: 'bg-amber-50',
      borderColor: 'border-amber-200',
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
      name: 'Gas Services',
      nameGuj: 'ગેસ સેવાઓ',
      description: 'PNG connection, name transfer, billing',
      icon: Flame,
      gradient: 'from-red-400 to-rose-600',
      bgLight: 'bg-red-50',
      borderColor: 'border-red-200',
      providers: [
        { name: 'Adani Total Gas', url: 'https://www.adanigas.com' },
        { name: 'Gujarat Gas', url: 'https://www.gujaratgas.com' },
        { name: 'Sabarmati Gas', url: 'https://www.sabarmatigas.com' }
      ]
    },
    {
      id: 'water',
      name: 'Water Services',
      nameGuj: 'પાણી સેવાઓ',
      description: 'Water connection, complaints, billing',
      icon: Droplets,
      gradient: 'from-cyan-400 to-blue-500',
      bgLight: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      providers: [
        { name: 'AMC Water', url: 'https://ahmedabadcity.gov.in' },
        { name: 'SMC Water', url: 'https://www.suratmunicipal.gov.in' },
        { name: 'VMC Water', url: 'https://vmc.gov.in' },
        { name: 'GWSSB', url: 'https://gwssb.gujarat.gov.in' }
      ]
    },
    {
      id: 'property',
      name: 'Property Services',
      nameGuj: 'મિલકત સેવાઓ',
      description: '7/12, 8A, mutation, property tax',
      icon: Building,
      gradient: 'from-emerald-400 to-green-600',
      bgLight: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
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
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Gujarat Government Services</h1>
            <p className="text-gray-500">ગુજરાત સરકારી સેવાઓ • Select a service category</p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {serviceCategories.map((category) => {
          const serviceData = allServices[category.id];
          
          // Debug log
          console.log('Category:', category.id, 'ServiceData:', serviceData);
          
          if (!serviceData) {
            return (
              <div key={category.id} className="bg-red-100 p-4 rounded-lg">
                <p>Error: No service data found for {category.id}</p>
              </div>
            );
          }
          
          return (
            <div 
              key={category.id}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Service Header */}
              <div className={`bg-gradient-to-r ${category.gradient} p-6`}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/25 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white">{category.name}</h2>
                    <p className="text-white/80 text-sm">{category.nameGuj}</p>
                  </div>
                </div>
                <p className="text-white/90 mt-3 text-sm">{category.description}</p>
              </div>

              {/* Available Services */}
              <div className="p-5 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  One-Click Services (Auto Submit)
                </p>
                <div className="space-y-2">
                  {serviceData?.services?.map((service) => (
                    <Link
                      key={service.id}
                      to={`/${category.id}/${service.id}`}
                      className={`flex items-center justify-between p-3 rounded-xl ${category.bgLight} ${category.borderColor} border hover:shadow-md transition-all group`}
                    >
                      <div className="flex-1">
                        <div className="font-medium text-gray-700">{service.name}</div>
                        <div className="text-xs text-gray-500">{service.nameGuj} • {service.fees} • {service.time}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )) || <p className="text-gray-500">No services available</p>}
                </div>
              </div>

              {/* Official Portals */}
              <div className="p-5 bg-gray-50">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Official Portals
                </p>
                <div className="flex flex-wrap gap-2">
                  {category.providers.map((provider) => (
                    <a
                      key={provider.name}
                      href={provider.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all"
                    >
                      {provider.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Need Help?</h3>
            <p className="text-blue-200 text-sm mt-1">
              Contact our support team for assistance with any service
            </p>
          </div>
          <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
            Get Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;

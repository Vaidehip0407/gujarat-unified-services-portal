import { useParams, Link } from 'react-router-dom';
import { Zap, Flame, Droplets, Building, ArrowRight, FileText, Settings, Plus } from 'lucide-react';

const ServiceFacilities = () => {
  const { serviceType } = useParams();
  
  const serviceConfig = {
    electricity: {
      name: 'Electricity',
      nameHindi: 'बिजली',
      icon: Zap,
      color: 'bg-yellow-500',
      hoverColor: 'hover:bg-yellow-600'
    },
    gas: {
      name: 'Gas',
      nameHindi: 'गैस',
      icon: Flame,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600'
    },
    water: {
      name: 'Water',
      nameHindi: 'पानी',
      icon: Droplets,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    property: {
      name: 'Property',
      nameHindi: 'संपत्ति',
      icon: Building,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    }
  };

  const service = serviceConfig[serviceType];
  const Icon = service?.icon;

  if (!service) {
    return <div>Service not found</div>;
  }

  const facilities = [
    {
      id: 'name-change',
      name: 'Name Change',
      nameHindi: 'नाम परिवर्तन',
      description: 'Change name in your utility connection',
      descriptionHindi: 'अपने उपयोगिता कनेक्शन में नाम बदलें',
      icon: FileText,
      available: true,
      link: `/service-providers/${serviceType}/name-change`
    },
    {
      id: 'new-connection',
      name: 'New Connection',
      nameHindi: 'नया कनेक्शन',
      description: 'Apply for new utility connection',
      descriptionHindi: 'नए उपयोगिता कनेक्शन के लिए आवेदन करें',
      icon: Plus,
      available: false,
      comingSoon: true
    },
    {
      id: 'transfer',
      name: 'Transfer Connection',
      nameHindi: 'कनेक्शन स्थानांतरण',
      description: 'Transfer connection to another location',
      descriptionHindi: 'कनेक्शन को दूसरे स्थान पर स्थानांतरित करें',
      icon: Settings,
      available: false,
      comingSoon: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{service.name} Services</h1>
            <p className="text-gray-600 text-lg">{service.nameHindi} सेवाएं</p>
            <p className="text-gray-500 text-sm mt-1">Select the facility you need</p>
          </div>
        </div>
      </div>

      {/* Facilities Selection */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Available Facilities</h2>
        <p className="text-gray-600 mb-8">आपको कौन सी सुविधा चाहिए? (What facility do you need?)</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => {
            const FacilityIcon = facility.icon;
            
            if (facility.available) {
              return (
                <Link
                  key={facility.id}
                  to={facility.link}
                  className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition-colors">
                      <FacilityIcon className="w-8 h-8 text-blue-600 group-hover:text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{facility.name}</h3>
                    <p className="text-gray-600 text-sm mb-1">{facility.nameHindi}</p>
                    <p className="text-gray-500 text-xs mb-4">{facility.description}</p>
                    <div className="flex items-center justify-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                      Select <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            } else {
              return (
                <div
                  key={facility.id}
                  className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 opacity-60 cursor-not-allowed"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <FacilityIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-600 mb-2">{facility.name}</h3>
                    <p className="text-gray-500 text-sm mb-1">{facility.nameHindi}</p>
                    <p className="text-gray-400 text-xs mb-4">{facility.description}</p>
                    {facility.comingSoon && (
                      <div className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full inline-block">
                        Coming Soon
                      </div>
                    )}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-blue-900 mb-2">Currently Available</h3>
        <p className="text-blue-800 text-sm">
          अभी केवल <strong>Name Change</strong> की सुविधा उपलब्ध है। अन्य सुविधाएं जल्द ही आएंगी।
        </p>
        <p className="text-blue-700 text-xs mt-2">
          Currently only <strong>Name Change</strong> facility is available. Other facilities coming soon.
        </p>
      </div>
    </div>
  );
};

export default ServiceFacilities;
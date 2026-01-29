import { useParams, Link } from 'react-router-dom';
import { Zap, Flame, Droplets, Building, ArrowRight, MapPin, Phone, AlertCircle, CheckCircle } from 'lucide-react';

const ServiceProviders = () => {
  const { serviceType, facilityType } = useParams();
  
  const serviceConfig = {
    electricity: {
      name: 'Electricity',
      nameHindi: 'बिजली',
      icon: Zap,
      color: 'bg-yellow-500',
      providers: [
        // Government Providers
        {
          id: 'pgvcl',
          name: 'PGVCL',
          nameHindi: 'पीजीवीसीएल',
          description: 'Paschim Gujarat Vij Company Limited',
          areas: ['Rajkot', 'Jamnagar', 'Bhavnagar', 'Junagadh', 'Porbandar'],
          phone: '1912',
          type: 'Government',
          available: true,
          onlineAvailable: true
        },
        {
          id: 'ugvcl',
          name: 'UGVCL',
          nameHindi: 'यूजीवीसीएल',
          description: 'Uttar Gujarat Vij Company Limited',
          areas: ['Mehsana', 'Patan', 'Banaskantha', 'Sabarkantha'],
          phone: '1912',
          type: 'Government',
          available: true,
          onlineAvailable: true
        },
        {
          id: 'mgvcl',
          name: 'MGVCL',
          nameHindi: 'एमजीवीसीएल',
          description: 'Madhya Gujarat Vij Company Limited',
          areas: ['Vadodara', 'Anand', 'Kheda', 'Panchmahal'],
          phone: '1912',
          type: 'Government',
          available: true,
          onlineAvailable: true
        },
        {
          id: 'dgvcl',
          name: 'DGVCL',
          nameHindi: 'डीजीवीसीएल',
          description: 'Dakshin Gujarat Vij Company Limited',
          areas: ['Surat', 'Navsari', 'Valsad', 'Tapi'],
          phone: '1912',
          type: 'Government',
          available: true,
          onlineAvailable: true
        },
        // Private Providers
        {
          id: 'torrent-power',
          name: 'Torrent Power',
          nameHindi: 'टॉरेंट पावर',
          description: 'Private electricity distribution company',
          areas: ['Ahmedabad', 'Gandhinagar', 'Surat (parts)'],
          phone: '1800-200-9090',
          type: 'Private',
          available: true,
          onlineAvailable: true
        }
      ]
    },
    gas: {
      name: 'Gas',
      nameHindi: 'गैस',
      icon: Flame,
      color: 'bg-orange-500',
      providers: [
        // Government Providers
        {
          id: 'gujarat-gas',
          name: 'Gujarat Gas Ltd',
          nameHindi: 'गुजरात गैस लिमिटेड',
          description: 'State government gas distribution company',
          areas: ['Rajkot', 'Jamnagar', 'Morbi', 'Bhavnagar'],
          phone: '1800-233-3555',
          type: 'Government',
          available: true,
          onlineAvailable: true
        },
        {
          id: 'gspc',
          name: 'GSPC',
          nameHindi: 'जीएसपीसी',
          description: 'Gujarat State Petroleum Corporation (Limited retail)',
          areas: ['Limited Areas'],
          phone: '079-2327-4000',
          type: 'Government',
          available: false,
          onlineAvailable: false,
          note: 'Retail phased out - merging into Gujarat Gas'
        },
        {
          id: 'sabarmati-gas',
          name: 'Sabarmati Gas',
          nameHindi: 'साबरमती गैस',
          description: 'North Gujarat gas distribution',
          areas: ['Mehsana', 'Gandhinagar', 'Patan'],
          phone: '02762-245-000',
          type: 'Government',
          available: true,
          onlineAvailable: false,
          note: 'Offline process only - visit local office'
        },
        // Private Providers
        {
          id: 'adani-gas',
          name: 'Adani Total Gas Ltd',
          nameHindi: 'अदानी टोटल गैस लिमिटेड',
          description: 'Leading private city gas distribution company',
          areas: ['Ahmedabad', 'Vadodara', 'Surat', 'Kheda'],
          phone: '1800-266-6666',
          type: 'Private',
          available: true,
          onlineAvailable: true
        },
        {
          id: 'torrent-gas',
          name: 'Torrent Gas',
          nameHindi: 'टॉरेंट गैस',
          description: 'Private gas distribution company',
          areas: ['Selected areas in Gujarat'],
          phone: '1800-200-9191',
          type: 'Private',
          available: true,
          onlineAvailable: true
        },
        {
          id: 'vadodara-gas',
          name: 'Vadodara Gas Ltd',
          nameHindi: 'वडोदरा गैस लिमिटेड',
          description: 'Regional private gas distributor',
          areas: ['Vadodara region'],
          phone: '0265-2334-000',
          type: 'Private',
          available: true,
          onlineAvailable: false,
          note: 'Manual process via office only'
        },
        {
          id: 'irm-energy',
          name: 'IRM Energy Ltd',
          nameHindi: 'आईआरएम एनर्जी लिमिटेड',
          description: 'Private gas distribution company',
          areas: ['Selected regions'],
          phone: '1800-123-4567',
          type: 'Private',
          available: true,
          onlineAvailable: false,
          note: 'Customer service based process'
        }
      ]
    },
    water: {
      name: 'Water',
      nameHindi: 'पानी',
      icon: Droplets,
      color: 'bg-blue-500',
      providers: [
        // Government Providers
        {
          id: 'gwssb',
          name: 'GWSSB',
          nameHindi: 'जीडब्ल्यूएसएसबी',
          description: 'Gujarat Water Supply & Sewerage Board',
          areas: ['Rural Gujarat', 'Small Towns'],
          phone: '079-2325-4000',
          type: 'Government',
          available: true,
          onlineAvailable: false,
          note: 'Mostly offline application process'
        },
        {
          id: 'amc-water',
          name: 'AMC Water',
          nameHindi: 'एएमसी जल विभाग',
          description: 'Ahmedabad Municipal Corporation Water Supply',
          areas: ['Ahmedabad'],
          phone: '079-2550-0000',
          type: 'Government',
          available: true,
          onlineAvailable: true
        },
        {
          id: 'smc-water',
          name: 'SMC Water',
          nameHindi: 'एसएमसी जल विभाग',
          description: 'Surat Municipal Corporation Water Supply',
          areas: ['Surat'],
          phone: '0261-2463-000',
          type: 'Government',
          available: true,
          onlineAvailable: true
        },
        {
          id: 'vmc-water',
          name: 'VMC Water',
          nameHindi: 'वीएमसी जल विभाग',
          description: 'Vadodara Municipal Corporation Water Supply',
          areas: ['Vadodara'],
          phone: '0265-2428-000',
          type: 'Government',
          available: true,
          onlineAvailable: true
        },
        {
          id: 'rmc-water',
          name: 'RMC Water',
          nameHindi: 'आरएमसी जल विभाग',
          description: 'Rajkot Municipal Corporation Water Supply',
          areas: ['Rajkot'],
          phone: '0281-2463-000',
          type: 'Government',
          available: true,
          onlineAvailable: false,
          note: 'Offline/assisted process only'
        },
        // Private Providers
        {
          id: 'local-tankers',
          name: 'Local Water Tankers',
          nameHindi: 'स्थानीय पानी टैंकर',
          description: 'Private water supply services (Varun, Shiv Shakti, etc.)',
          areas: ['Various locations'],
          phone: 'Contact directly',
          type: 'Private',
          available: false,
          onlineAvailable: false,
          note: 'Location-based service - not applicable for name change'
        }
      ]
    },
    property: {
      name: 'Property',
      nameHindi: 'संपत्ति',
      icon: Building,
      color: 'bg-green-500',
      providers: [
        // Government Providers
        {
          id: 'anyror',
          name: 'AnyRoR (Revenue Dept)',
          nameHindi: 'एनीआरओआर (राजस्व विभाग)',
          description: 'Gujarat Land Records System - Revenue Department',
          areas: ['All Gujarat Districts'],
          phone: '079-2325-2000',
          type: 'Government',
          available: true,
          onlineAvailable: true,
          note: 'Online application, manual mutation approval required'
        },
        {
          id: 'e-nagar',
          name: 'e-Nagar Portal',
          nameHindi: 'ई-नगर पोर्टल',
          description: 'Urban Local Bodies property tax system',
          areas: ['Urban Areas', 'Municipalities'],
          phone: '079-2325-4000',
          type: 'Government',
          available: true,
          onlineAvailable: true,
          note: 'Property tax mutation request'
        },
        {
          id: 'municipal-corps',
          name: 'Municipal Corporations',
          nameHindi: 'नगर निगम',
          description: 'AMC, RMC, VMC, SMC & other ULBs',
          areas: ['Major Cities'],
          phone: '079-2658-0000',
          type: 'Government',
          available: true,
          onlineAvailable: true,
          note: 'Online initiation, ward-level verification'
        },
        {
          id: 'talati',
          name: 'Talati (Village Officer)',
          nameHindi: 'तलाटी (ग्राम अधिकारी)',
          description: 'Revenue Department Village Level Officer',
          areas: ['Rural Areas', 'Villages'],
          phone: 'Contact local Talati office',
          type: 'Government',
          available: true,
          onlineAvailable: false,
          note: 'Offline mutation process only'
        },
        {
          id: 'mamlatdar',
          name: 'Mamlatdar/Tehsildar',
          nameHindi: 'मामलतदार/तहसीलदार',
          description: 'Taluka Revenue Office - Final approval authority',
          areas: ['Taluka Level'],
          phone: 'Contact local Tehsil office',
          type: 'Government',
          available: true,
          onlineAvailable: false,
          note: 'Manual approval process'
        },
        {
          id: 'e-dhara',
          name: 'e-Dhara Centers',
          nameHindi: 'ई-धारा केंद्र',
          description: 'Assisted land record services',
          areas: ['Various locations'],
          phone: '079-2325-3000',
          type: 'Government',
          available: true,
          onlineAvailable: true,
          note: 'Assisted service, document submission'
        },
        // Private Providers
        {
          id: 'india-filings',
          name: 'IndiaFilings/Consultants',
          nameHindi: 'इंडियाफाइलिंग्स/सलाहकार',
          description: 'Legal & documentation support services',
          areas: ['Pan Gujarat'],
          phone: '1800-123-4567',
          type: 'Private',
          available: true,
          onlineAvailable: true,
          note: 'Legal & documentation support only'
        },
        {
          id: 'ezylegal',
          name: 'ezyLegal',
          nameHindi: 'ईज़ीलीगल',
          description: 'Private legal & property services platform',
          areas: ['Major Cities'],
          phone: '1800-891-7070',
          type: 'Private',
          available: true,
          onlineAvailable: true,
          note: 'Legal facilitation, not direct mutation'
        },
        {
          id: 'local-agents',
          name: 'Local Property Agents',
          nameHindi: 'स्थानीय संपत्ति एजेंट',
          description: 'City-wise property tax & mutation consultants',
          areas: ['City-wise'],
          phone: 'Contact local agents',
          type: 'Private',
          available: true,
          onlineAvailable: false,
          note: 'Offline assistance through local consultants'
        }
      ]
    }
  };

  const facilityConfig = {
    'name-change': {
      name: 'Name Change',
      nameHindi: 'नाम परिवर्तन',
      description: 'Change name in your utility connection'
    }
  };

  const service = serviceConfig[serviceType];
  const facility = facilityConfig[facilityType];
  const Icon = service?.icon;

  if (!service || !facility) {
    return <div>Service or facility not found</div>;
  }

  // Separate government and private providers
  const governmentProviders = service.providers.filter(p => p.type === 'Government');
  const privateProviders = service.providers.filter(p => p.type === 'Private');

  const renderProvider = (provider) => (
    <div
      key={provider.id}
      className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{provider.name}</h3>
          <p className="text-gray-600 text-sm">{provider.nameHindi}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-xs px-2 py-1 rounded-full ${
              provider.type === 'Government' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-purple-100 text-purple-800'
            }`}>
              {provider.type}
            </span>
            {provider.available ? (
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-600" />
                <span className="text-xs text-green-800">Available</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-red-600" />
                <span className="text-xs text-red-800">Not Available</span>
              </div>
            )}
          </div>
        </div>
        {provider.onlineAvailable ? (
          <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            Online
          </div>
        ) : (
          <div className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
            Offline
          </div>
        )}
      </div>

      <p className="text-gray-600 text-sm mb-4">{provider.description}</p>

      {/* Service Areas */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Service Areas:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {provider.areas.map((area, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md"
            >
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone className="w-4 h-4" />
          <span className="font-medium">{provider.phone}</span>
        </div>
      </div>

      {/* Special Notes */}
      {provider.note && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-800">{provider.note}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        {provider.available ? (
          <Link
            to={`/name-change-application/${serviceType}?provider=${provider.id}`}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            Apply for Name Change <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-medium cursor-not-allowed"
          >
            Currently Unavailable
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{service.name} - {facility.name}</h1>
            <p className="text-gray-600 text-lg">{service.nameHindi} - {facility.nameHindi}</p>
            <p className="text-gray-500 text-sm mt-1">Select your service provider</p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Link to="/services" className="hover:text-blue-600">Services</Link>
        <span>→</span>
        <Link to={`/service-facilities/${serviceType}`} className="hover:text-blue-600">{service.name}</Link>
        <span>→</span>
        <span className="text-gray-800 font-medium">{facility.name}</span>
      </div>

      {/* Government Providers */}
      {governmentProviders.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            Government Service Providers
          </h2>
          <p className="text-gray-600 mb-8">सरकारी सेवा प्रदाता (Government Service Providers)</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {governmentProviders.map(renderProvider)}
          </div>
        </div>
      )}

      {/* Private Providers */}
      {privateProviders.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
            Private Service Providers
          </h2>
          <p className="text-gray-600 mb-8">निजी सेवा प्रदाता (Private Service Providers)</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {privateProviders.map(renderProvider)}
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-yellow-900 mb-2">Need Help Choosing?</h3>
        <p className="text-yellow-800 text-sm mb-3">
          अपने क्षेत्र के अनुसार सेवा प्रदाता चुनें। सरकारी प्रदाता आमतौर पर अधिक विश्वसनीय होते हैं।
        </p>
        <p className="text-yellow-700 text-xs">
          Choose the service provider based on your area. Government providers are usually more reliable.
        </p>
      </div>
    </div>
  );
};

export default ServiceProviders;
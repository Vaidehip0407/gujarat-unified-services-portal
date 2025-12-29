// Gujarat State Service Providers Data with Portal URLs

export const gujaratData = {
  // ELECTRICITY - Gujarat DISCOMs
  electricity: {
    government: [
      { 
        name: 'PGVCL', 
        fullName: 'Paschim Gujarat Vij Company Limited', 
        areas: ['Rajkot', 'Jamnagar', 'Junagadh', 'Bhavnagar', 'Porbandar', 'Amreli', 'Morbi', 'Surendranagar', 'Kutch'],
        portal: 'https://www.pgvcl.com',
        nameChangeUrl: 'https://www.pgvcl.com/consumer-services/name-change',
        newConnectionUrl: 'https://www.pgvcl.com/consumer-services/new-connection'
      },
      { 
        name: 'UGVCL', 
        fullName: 'Uttar Gujarat Vij Company Limited', 
        areas: ['Mehsana', 'Sabarkantha', 'Banaskantha', 'Patan', 'Aravalli', 'Mahisagar'],
        portal: 'https://www.ugvcl.com',
        nameChangeUrl: 'https://www.ugvcl.com/consumer-corner/name-change',
        newConnectionUrl: 'https://www.ugvcl.com/consumer-corner/new-connection'
      },
      { 
        name: 'MGVCL', 
        fullName: 'Madhya Gujarat Vij Company Limited', 
        areas: ['Vadodara', 'Anand', 'Kheda', 'Panchmahal', 'Dahod', 'Chhota Udaipur'],
        portal: 'https://www.mgvcl.com',
        nameChangeUrl: 'https://www.mgvcl.com/consumer-services/name-change',
        newConnectionUrl: 'https://www.mgvcl.com/consumer-services/new-connection'
      },
      { 
        name: 'DGVCL', 
        fullName: 'Dakshin Gujarat Vij Company Limited', 
        areas: ['Surat', 'Navsari', 'Valsad', 'Bharuch', 'Narmada', 'Tapi', 'Dang'],
        portal: 'https://www.dgvcl.com',
        nameChangeUrl: 'https://www.dgvcl.com/consumer-services/name-change',
        newConnectionUrl: 'https://www.dgvcl.com/consumer-services/new-connection'
      }
    ],
    private: [
      { 
        name: 'Torrent Power', 
        fullName: 'Torrent Power Limited',
        areas: ['Ahmedabad', 'Gandhinagar', 'Surat'],
        portal: 'https://www.torrentpower.com',
        nameChangeUrl: 'https://connect.torrentpower.com/tplcp/application/namechangerequest',
        newConnectionUrl: 'https://connect.torrentpower.com/tplcp/application/newconnection'
      }
    ]
  },

  // GAS Providers
  gas: {
    government: [
      { 
        name: 'Gujarat Gas Ltd', 
        fullName: 'Gujarat Gas Limited',
        areas: ['Surat', 'Bharuch', 'Ankleshwar', 'Vapi', 'Valsad', 'Navsari'],
        portal: 'https://www.gujaratgas.com',
        nameChangeUrl: 'https://www.gujaratgas.com/customer-care/name-transfer',
        newConnectionUrl: 'https://www.gujaratgas.com/new-connection'
      },
      { 
        name: 'Sabarmati Gas', 
        fullName: 'Sabarmati Gas Limited',
        areas: ['Gandhinagar', 'Sabarkantha', 'Mehsana'],
        portal: 'https://www.sabarmatigas.com',
        nameChangeUrl: 'https://www.sabarmatigas.com/customer-services',
        newConnectionUrl: 'https://www.sabarmatigas.com/new-connection'
      }
    ],
    private: [
      { 
        name: 'Adani Total Gas', 
        fullName: 'Adani Total Gas Limited',
        areas: ['Ahmedabad', 'Vadodara', 'Kheda', 'Faridabad'],
        portal: 'https://www.adanigas.com',
        nameChangeUrl: 'https://www.adanigas.com/customer-zone/name-transfer',
        newConnectionUrl: 'https://www.adanigas.com/customer-zone/new-connection'
      },
      { 
        name: 'Torrent Gas', 
        fullName: 'Torrent Gas Private Limited',
        areas: ['Ahmedabad', 'Surat'],
        portal: 'https://www.torrentgas.com',
        nameChangeUrl: 'https://www.torrentgas.com/customer-services',
        newConnectionUrl: 'https://www.torrentgas.com/new-connection'
      }
    ]
  },

  // WATER Suppliers
  water: {
    municipalCorporations: [
      { 
        name: 'AMC', 
        fullName: 'Ahmedabad Municipal Corporation', 
        city: 'Ahmedabad',
        portal: 'https://ahmedabadcity.gov.in',
        nameChangeUrl: 'https://ahmedabadcity.gov.in/portal/water-connection',
        newConnectionUrl: 'https://ahmedabadcity.gov.in/portal/new-water-connection'
      },
      { 
        name: 'SMC', 
        fullName: 'Surat Municipal Corporation', 
        city: 'Surat',
        portal: 'https://www.suratmunicipal.gov.in',
        nameChangeUrl: 'https://www.suratmunicipal.gov.in/Aborad/Water',
        newConnectionUrl: 'https://www.suratmunicipal.gov.in/Departments/WaterSupply'
      },
      { 
        name: 'VMC', 
        fullName: 'Vadodara Municipal Corporation', 
        city: 'Vadodara',
        portal: 'https://vmc.gov.in',
        nameChangeUrl: 'https://vmc.gov.in/water-supply',
        newConnectionUrl: 'https://vmc.gov.in/new-connection'
      },
      { 
        name: 'RMC', 
        fullName: 'Rajkot Municipal Corporation', 
        city: 'Rajkot',
        portal: 'https://www.rmc.gov.in',
        nameChangeUrl: 'https://www.rmc.gov.in/water-department',
        newConnectionUrl: 'https://www.rmc.gov.in/new-water-connection'
      }
    ],
    government: [
      { 
        name: 'GWSSB', 
        fullName: 'Gujarat Water Supply & Sewerage Board',
        areas: ['State Wide'],
        portal: 'https://gwssb.gujarat.gov.in',
        nameChangeUrl: 'https://gwssb.gujarat.gov.in/services',
        newConnectionUrl: 'https://gwssb.gujarat.gov.in/new-connection'
      }
    ]
  },

  // PROPERTY - Revenue / Land Administration
  property: {
    government: [
      { 
        name: 'AnyRoR Gujarat', 
        fullName: '7/12 & 8A Utara Portal',
        type: 'Online Portal',
        portal: 'https://anyror.gujarat.gov.in',
        services: ['7/12 Extract', '8A Extract', 'Land Records']
      },
      { 
        name: 'e-Dhara', 
        fullName: 'e-Dhara Centers (Revenue Department)',
        type: 'District Level',
        portal: 'https://revenuedepartment.gujarat.gov.in',
        services: ['Mutation', 'Name Transfer', 'Land Records']
      },
      { 
        name: 'e-Nagar Gujarat', 
        fullName: 'Urban Development Portal',
        type: 'Urban Areas',
        portal: 'https://enagar.gujarat.gov.in',
        services: ['Property Tax', 'Building Permission', 'NOC']
      },
      { 
        name: 'iORA', 
        fullName: 'Integrated Online Revenue Applications',
        type: 'State Level',
        portal: 'https://iora.gujarat.gov.in',
        services: ['Revenue Applications', 'Certificates']
      }
    ]
  },

  // Cities in Gujarat
  cities: [
    'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar',
    'Jamnagar', 'Junagadh', 'Gandhinagar', 'Anand', 'Nadiad',
    'Morbi', 'Mehsana', 'Bharuch', 'Vapi', 'Navsari',
    'Veraval', 'Porbandar', 'Godhra', 'Palanpur', 'Valsad',
    'Patan', 'Dahod', 'Botad', 'Amreli', 'Deesa'
  ],

  // Districts in Gujarat
  districts: [
    'Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha',
    'Bharuch', 'Bhavnagar', 'Botad', 'Chhota Udaipur', 'Dahod',
    'Dang', 'Devbhoomi Dwarka', 'Gandhinagar', 'Gir Somnath', 'Jamnagar',
    'Junagadh', 'Kheda', 'Kutch', 'Mahisagar', 'Mehsana',
    'Morbi', 'Narmada', 'Navsari', 'Panchmahal', 'Patan',
    'Porbandar', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar',
    'Tapi', 'Vadodara', 'Valsad'
  ]
};

// Get electricity provider by city
export const getElectricityProvider = (city) => {
  // Check Torrent Power cities first
  const torrentProvider = gujaratData.electricity.private.find(p => 
    p.areas.includes(city)
  );
  if (torrentProvider) return { ...torrentProvider, type: 'Private' };
  
  // Check government DISCOMs
  for (const discom of gujaratData.electricity.government) {
    if (discom.areas.includes(city)) {
      return { ...discom, type: 'Government' };
    }
  }
  
  return { ...gujaratData.electricity.government[1], type: 'Government' }; // Default UGVCL
};

// Get gas provider by city
export const getGasProvider = (city) => {
  // Check all providers
  const allProviders = [
    ...gujaratData.gas.private.map(p => ({ ...p, type: 'Private' })),
    ...gujaratData.gas.government.map(p => ({ ...p, type: 'Government' }))
  ];
  
  for (const provider of allProviders) {
    if (provider.areas.includes(city)) {
      return provider;
    }
  }
  
  return { ...gujaratData.gas.government[0], type: 'Government' }; // Default Gujarat Gas
};

// Get water provider by city
export const getWaterProvider = (city) => {
  const municipal = gujaratData.water.municipalCorporations.find(m => m.city === city);
  if (municipal) return { ...municipal, type: 'Municipal Corporation' };
  return { ...gujaratData.water.government[0], type: 'Government' };
};

export default gujaratData;

export const allServices = {
  electricity: {
    name: 'Electricity Services',
    nameGuj: 'વીજળી સેવાઓ',
    icon: '⚡',
    services: [
      { id: 'name_change', name: 'Name Change', nameGuj: 'નામ બદલાવ', fees: 'Free', time: '3-5 days' },
      { id: 'new_connection', name: 'New Connection', nameGuj: 'નવું કનેક્શન', fees: '₹500-2000', time: '7-15 days' },
      { id: 'bill_complaint', name: 'Bill Complaint', nameGuj: 'બિલ ફરિયાદ', fees: 'Free', time: '1-3 days' }
    ]
  },
  gas: {
    name: 'Gas Services',
    nameGuj: 'ગેસ સેવાઓ',
    icon: '🔥',
    services: [
      { id: 'name_change', name: 'Name Change', nameGuj: 'નામ બદલાવ', fees: 'Free', time: '3-5 days' },
      { id: 'new_connection', name: 'New Connection', nameGuj: 'નવું કનેક્શન', fees: '₹1500-3000', time: '10-15 days' },
      { id: 'cylinder_booking', name: 'Cylinder Booking', nameGuj: 'સિલિન્ડર બુકિંગ', fees: 'As per rate', time: '1-2 days' }
    ]
  },
  water: {
    name: 'Water Services',
    nameGuj: 'પાણી સેવાઓ',
    icon: '💧',
    services: [
      { id: 'name_change', name: 'Name Change', nameGuj: 'નામ બદલાવ', fees: 'Free', time: '3-5 days' },
      { id: 'new_connection', name: 'New Connection', nameGuj: 'નવું કનેક્શન', fees: '₹1000-2500', time: '7-15 days' },
      { id: 'complaint', name: 'Water Supply Complaint', nameGuj: 'પાણી પુરવઠા ફરિયાદ', fees: 'Free', time: '1-3 days' }
    ]
  },
  property: {
    name: 'Property Services',
    nameGuj: 'મિલકત સેવાઓ',
    icon: '🏠',
    services: [
      { id: 'name_transfer', name: 'Name Transfer', nameGuj: 'નામ ટ્રાન્સફર', fees: '₹2000-5000', time: '15-30 days' },
      { id: 'mutation', name: 'Property Mutation', nameGuj: 'મિલકત મ્યુટેશન', fees: '₹1000-3000', time: '10-20 days' },
      { id: 'tax_payment', name: 'Property Tax Payment', nameGuj: 'મિલકત કર ચુકવણી', fees: 'As per assessment', time: 'Instant' }
    ]
  }
};

export default allServices;
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ResponsiveLayout from './components/ResponsiveLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewHome from './pages/NewHome';
import UtilityServices from './pages/UtilityServices';
import DocumentUploadFlow from './pages/DocumentUploadFlow';
import FinalFormPage from './pages/FinalFormPage';
import CompanyFormation from './pages/CompanyFormation';
import GovernmentGrants from './pages/GovernmentGrants';
import Profile from './pages/Profile';
import Documents from './pages/Documents';
import Services from './pages/Services';
import ServiceFacilities from './pages/ServiceFacilities';
import ServiceProviders from './pages/ServiceProviders';
import NameChangeApplication from './pages/NameChangeApplication';
import Applications from './pages/Applications';
import NameChangeForm from './pages/NameChangeForm';
import NewConnectionForm from './pages/NewConnectionForm';
import SupplierVerification from './pages/SupplierVerification';
import Support from './pages/Support';
import OfflineIndicator from './components/OfflineIndicator';
import InstallPWA from './components/InstallPWA';
import './registerSW';

// Global error handler for undefined property errors
window.addEventListener('error', (event) => {
  if (event.message && event.message.includes('enddate')) {
    console.warn('Caught enddate error:', event.message);
    event.preventDefault();
    return true;
  }
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && event.reason.message && event.reason.message.includes('enddate')) {
    console.warn('Caught enddate promise rejection:', event.reason.message);
    event.preventDefault();
  }
});

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <OfflineIndicator />
      <InstallPWA />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* New Document-First Flow Routes */}
          <Route path="/new-home" element={<NewHome />} />
          
          {/* Utility Services Routes */}
          <Route path="/utility-services" element={<UtilityServices />} />
          <Route path="/utility-services/:serviceType/:providerId/document-upload" element={<DocumentUploadFlow />} />
          <Route path="/utility-services/:serviceType/:providerId/final-form" element={<FinalFormPage />} />
          
          {/* Company Formation Routes */}
          <Route path="/company-formation" element={<CompanyFormation />} />
          <Route path="/company-formation/:serviceId/document-upload" element={<DocumentUploadFlow />} />
          <Route path="/company-formation/:serviceId/final-form" element={<FinalFormPage />} />
          
          {/* Government Grants Routes */}
          <Route path="/government-grants" element={<GovernmentGrants />} />
          <Route path="/government-grants/:categoryId" element={<GovernmentGrants />} />
          <Route path="/government-grants/find-grant" element={<DocumentUploadFlow />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <ResponsiveLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="documents" element={<Documents />} />
            <Route path="services" element={<Services />} />
            <Route path="service-facilities/:serviceType" element={<ServiceFacilities />} />
            <Route path="service-providers/:serviceType/:facilityType" element={<ServiceProviders />} />
            <Route path="name-change-application/:serviceType" element={<NameChangeApplication />} />
            <Route path="applications" element={<Applications />} />
            <Route path="electricity" element={<NameChangeForm />} />
            <Route path="gas" element={<NameChangeForm />} />
            <Route path="water" element={<NameChangeForm />} />
            <Route path="property" element={<NameChangeForm />} />
            <Route path="new-connection" element={<NewConnectionForm />} />
            <Route path="supplier-verification" element={<SupplierVerification />} />
            <Route path="support" element={<Support />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
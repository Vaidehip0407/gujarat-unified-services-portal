import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Upload, CheckCircle, FileText, 
  Loader, AlertCircle, Eye, Edit, ArrowRight 
} from 'lucide-react';

const DocumentUploadFlow = () => {
  const { serviceType, providerId, serviceId } = useParams();
  const navigate = useNavigate();
  
  // Determine back URL based on current context
  const getBackUrl = () => {
    if (serviceId) {
      // Coming from company formation
      return '/company-formation';
    } else if (serviceType && providerId) {
      // Coming from utility services
      return '/utility-services';
    } else {
      // Default fallback
      return '/';
    }
  };
  
  const backUrl = getBackUrl();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  
  const [documents, setDocuments] = useState({
    identityProof: null,
    addressProof: null,
    nameChangeProof: null
  });
  
  const [extractedData, setExtractedData] = useState({
    identityProof: null,
    addressProof: null,
    nameChangeProof: null
  });

  const steps = [
    {
      id: 1,
      title: 'Upload Identity Proof',
      titleHindi: 'पहचान प्रमाण अपलोड करें',
      description: 'Aadhaar Card, PAN Card, or Passport',
      documentType: 'identityProof',
      icon: '🆔',
      extractFields: ['Name', 'DOB', 'Address', 'ID Number']
    },
    {
      id: 2,
      title: 'Upload Address Proof',
      titleHindi: 'पता प्रमाण अपलोड करें',
      description: 'Utility Bill, Ration Card, or Bank Statement',
      documentType: 'addressProof',
      icon: '📍',
      extractFields: ['Address', 'Service Number', 'Account Number']
    },
    {
      id: 3,
      title: 'Upload Name Change Proof',
      titleHindi: 'नाम परिवर्तन प्रमाण अपलोड करें',
      description: 'Marriage Certificate, Gazette, or Affidavit',
      documentType: 'nameChangeProof',
      icon: '📜',
      extractFields: ['Old Name', 'New Name', 'Date of Change']
    }
  ];

  const currentStepData = steps[currentStep - 1];

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    
    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setDocuments(prev => ({
      ...prev,
      [currentStepData.documentType]: file
    }));
    
    setUploading(false);
    setExtracting(true);

    // Simulate AI extraction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock extracted data
    const mockData = {
      identityProof: {
        name: 'Rajesh Kumar',
        dob: '15/08/1990',
        address: '123, MG Road, Ahmedabad, Gujarat - 380001',
        idNumber: '1234-5678-9012'
      },
      addressProof: {
        address: '123, MG Road, Ahmedabad, Gujarat - 380001',
        serviceNumber: 'TP2025123456',
        accountNumber: 'ACC123456789'
      },
      nameChangeProof: {
        oldName: 'Rajesh Kumar',
        newName: 'Rajesh Kumar Patel',
        dateOfChange: '01/01/2025'
      }
    };

    setExtractedData(prev => ({
      ...prev,
      [currentStepData.documentType]: mockData[currentStepData.documentType]
    }));
    
    setExtracting(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to final form
      navigate(`/utility-services/${serviceType}/${providerId}/final-form`, {
        state: { extractedData, documents }
      });
    }
  };

  const handleEdit = (field, value) => {
    setExtractedData(prev => ({
      ...prev,
      [currentStepData.documentType]: {
        ...prev[currentStepData.documentType],
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to={backUrl}
            className="inline-flex items-center gap-2 text-white hover:text-blue-100 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Services</span>
          </Link>
          
          <h1 className="text-3xl font-bold mb-2">Document Upload</h1>
          <p className="text-blue-100">Upload documents for AI-powered auto-fill</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-12">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all ${
                  currentStep > step.id 
                    ? 'bg-green-500 text-white' 
                    : currentStep === step.id 
                    ? 'bg-blue-600 text-white ring-4 ring-blue-200' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {currentStep > step.id ? <CheckCircle className="w-6 h-6" /> : step.id}
                </div>
                <p className={`text-xs mt-2 text-center ${
                  currentStep >= step.id ? 'text-gray-800 font-semibold' : 'text-gray-500'
                }`}>
                  Step {step.id}
                </p>
              </div>
              {idx < steps.length - 1 && (
                <div className={`h-1 flex-1 mx-2 ${
                  currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Current Step Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{currentStepData.icon}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600 mb-1">{currentStepData.titleHindi}</p>
            <p className="text-sm text-gray-500">{currentStepData.description}</p>
          </div>

          {/* Upload Area */}
          {!documents[currentStepData.documentType] && (
            <div className="border-3 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                disabled={uploading}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                {uploading ? (
                  <>
                    <Loader className="w-16 h-16 text-blue-600 animate-spin mb-4" />
                    <p className="text-lg font-semibold text-gray-700">Uploading...</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-lg font-semibold text-gray-700 mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">
                      PDF, JPG, PNG (Max 5MB)
                    </p>
                  </>
                )}
              </label>
            </div>
          )}

          {/* Extracting State */}
          {extracting && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 text-center">
              <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                🤖 AI Processing Document...
              </h3>
              <div className="space-y-2 text-sm text-blue-700">
                <p>✓ Document uploaded</p>
                <p>✓ OCR extraction complete</p>
                <p className="animate-pulse">⏳ Validating data...</p>
              </div>
            </div>
          )}

          {/* Extracted Data Display */}
          {extractedData[currentStepData.documentType] && !extracting && (
            <div className="space-y-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-900">
                    Data Extracted Successfully!
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {Object.entries(extractedData[currentStepData.documentType]).map(([key, value]) => (
                    <div key={key} className="bg-white rounded-lg p-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleEdit(key, e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3 text-sm text-gray-600">
                  <Eye className="w-4 h-4" />
                  <span>Review the extracted data and edit if needed</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setDocuments(prev => ({
                      ...prev,
                      [currentStepData.documentType]: null
                    }));
                    setExtractedData(prev => ({
                      ...prev,
                      [currentStepData.documentType]: null
                    }));
                  }}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Re-upload
                </button>
                
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center gap-2"
                >
                  {currentStep < steps.length ? 'Continue' : 'Proceed to Form'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h4 className="font-semibold text-blue-900 mb-3">💡 What happens next?</h4>
          <ul className="space-y-2 text-sm text-blue-700">
            <li>✓ AI will extract data from your documents</li>
            <li>✓ You can review and edit the extracted information</li>
            <li>✓ After all documents, you'll fill only remaining details</li>
            <li>✓ Application will be auto-submitted to the provider</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadFlow;

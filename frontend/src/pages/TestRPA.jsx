import React, { useState } from 'react';
import { Zap, Play, CheckCircle, AlertCircle, Settings } from 'lucide-react';
import axios from '../api/axios';

const TestRPA = () => {
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rpaTest, setRpaTest] = useState(null);
  const [rpaLoading, setRpaLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/torrent-power/test-connection');
      setTestResults(response.data);
    } catch (error) {
      setTestResults({
        success: false,
        message: 'Failed to test connection',
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const testRPASetup = async () => {
    setRpaLoading(true);
    try {
      const response = await axios.get('/api/torrent-power/test-rpa');
      setRpaTest(response.data);
    } catch (error) {
      setRpaTest({
        success: false,
        message: 'Failed to test RPA setup',
        error: error.message
      });
    } finally {
      setRpaLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <Settings className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">RPA Test Dashboard</h1>
          <p className="text-gray-600">Test Torrent Power RPA automation setup</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Connection Test */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Zap className="w-6 h-6 mr-3 text-orange-500" />
              Connection Test
            </h2>

            <button
              onClick={testConnection}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Testing...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Test Torrent Power Connection</span>
                </>
              )}
            </button>

            {testResults && (
              <div className={`mt-6 p-4 rounded-lg ${testResults.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-start">
                  {testResults.success ? (
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-500 mr-3 mt-0.5" />
                  )}
                  <div>
                    <h3 className={`font-semibold ${testResults.success ? 'text-green-800' : 'text-red-800'}`}>
                      {testResults.success ? 'Connection Successful' : 'Connection Failed'}
                    </h3>
                    <p className={`text-sm mt-1 ${testResults.success ? 'text-green-700' : 'text-red-700'}`}>
                      {testResults.message}
                    </p>
                    {testResults.status_code && (
                      <p className="text-xs mt-1 text-gray-600">Status Code: {testResults.status_code}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RPA Setup Test */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Settings className="w-6 h-6 mr-3 text-green-500" />
              RPA Setup Test
            </h2>

            <button
              onClick={testRPASetup}
              disabled={rpaLoading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {rpaLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Testing RPA...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Test RPA Setup</span>
                </>
              )}
            </button>

            {rpaTest && (
              <div className={`mt-6 p-4 rounded-lg ${rpaTest.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <div className="flex items-start">
                  {rpaTest.success ? (
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-red-500 mr-3 mt-0.5" />
                  )}
                  <div className="w-full">
                    <h3 className={`font-semibold ${rpaTest.success ? 'text-green-800' : 'text-red-800'}`}>
                      {rpaTest.success ? 'RPA Test Completed' : 'RPA Test Failed'}
                    </h3>
                    <p className={`text-sm mt-1 ${rpaTest.success ? 'text-green-700' : 'text-red-700'}`}>
                      {rpaTest.message}
                    </p>
                    
                    {rpaTest.test_results && (
                      <div className="mt-3 space-y-2">
                        <div className="text-xs">
                          <span className={`inline-block w-3 h-3 rounded-full mr-2 ${rpaTest.test_results.chrome_available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          Chrome: {rpaTest.test_results.chrome_available ? 'Available' : 'Not Available'}
                          {rpaTest.test_results.chrome_version && (
                            <span className="ml-2 text-gray-600">({rpaTest.test_results.chrome_version})</span>
                          )}
                        </div>
                        <div className="text-xs">
                          <span className={`inline-block w-3 h-3 rounded-full mr-2 ${rpaTest.test_results.chromedriver_available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          ChromeDriver: {rpaTest.test_results.chromedriver_available ? 'Available' : 'Not Available'}
                          {rpaTest.test_results.chromedriver_version && (
                            <span className="ml-2 text-gray-600">({rpaTest.test_results.chromedriver_version})</span>
                          )}
                        </div>
                        <div className="text-xs">
                          <span className={`inline-block w-3 h-3 rounded-full mr-2 ${rpaTest.test_results.selenium_working ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          Selenium: {rpaTest.test_results.selenium_working ? 'Working' : 'Not Working'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Test Instructions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Connection Test</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Tests if Torrent Power website is accessible</li>
                <li>• Checks network connectivity</li>
                <li>• Verifies website response</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">RPA Setup Test</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Tests Chrome browser installation</li>
                <li>• Verifies ChromeDriver availability</li>
                <li>• Checks Selenium WebDriver setup</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestRPA;
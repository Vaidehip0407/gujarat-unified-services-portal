import { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    portalName: 'Unified Services Portal',
    supportEmail: 'support@portal.com',
    supportPhone: '+91 98765 43210',
    maintenanceMode: false,
    emailNotifications: true,
    smsNotifications: false,
    whatsappNotifications: true
  });

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar */}
            <div className="col-span-3">
              <div className="bg-white rounded-lg shadow">
                <nav className="space-y-1 p-4">
                  <SettingNavItem
                    active={activeTab === 'general'}
                    onClick={() => setActiveTab('general')}
                    icon="⚙️"
                    label="General"
                  />
                  <SettingNavItem
                    active={activeTab === 'notifications'}
                    onClick={() => setActiveTab('notifications')}
                    icon="🔔"
                    label="Notifications"
                  />
                  <SettingNavItem
                    active={activeTab === 'email'}
                    onClick={() => setActiveTab('email')}
                    icon="📧"
                    label="Email"
                  />
                  <SettingNavItem
                    active={activeTab === 'payment'}
                    onClick={() => setActiveTab('payment')}
                    icon="💳"
                    label="Payment Gateway"
                  />
                  <SettingNavItem
                    active={activeTab === 'security'}
                    onClick={() => setActiveTab('security')}
                    icon="🔐"
                    label="Security"
                  />
                  <SettingNavItem
                    active={activeTab === 'backup'}
                    onClick={() => setActiveTab('backup')}
                    icon="💾"
                    label="Backup"
                  />
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="col-span-9">
              <div className="bg-white rounded-lg shadow p-6">
                {/* General Settings */}
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold mb-4">General Settings</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Portal Name</label>
                      <input
                        type="text"
                        value={settings.portalName}
                        onChange={(e) => setSettings({...settings, portalName: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                      <input
                        type="email"
                        value={settings.supportEmail}
                        onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Support Phone</label>
                      <input
                        type="tel"
                        value={settings.supportPhone}
                        onChange={(e) => setSettings({...settings, supportPhone: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.maintenanceMode}
                        onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
                        className="mr-2"
                      />
                      <label className="text-sm font-medium text-gray-700">Enable Maintenance Mode</label>
                    </div>
                  </div>
                )}

                {/* Notifications */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-600">Send notifications via email</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.emailNotifications}
                          onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                          className="toggle"
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-gray-600">Send notifications via SMS</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.smsNotifications}
                          onChange={(e) => setSettings({...settings, smsNotifications: e.target.checked})}
                          className="toggle"
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">WhatsApp Notifications</p>
                          <p className="text-sm text-gray-600">Send notifications via WhatsApp</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={settings.whatsappNotifications}
                          onChange={(e) => setSettings({...settings, whatsappNotifications: e.target.checked})}
                          className="toggle"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Email Settings */}
                {activeTab === 'email' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold mb-4">Email Configuration</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Server</label>
                      <input
                        type="text"
                        placeholder="smtp.gmail.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Port</label>
                        <input
                          type="number"
                          placeholder="587"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Encryption</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                          <option>TLS</option>
                          <option>SSL</option>
                          <option>None</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                      Test Connection
                    </button>
                  </div>
                )}

                {/* Payment Gateway */}
                {activeTab === 'payment' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold mb-4">Payment Gateway Settings</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payment Provider</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                        <option>Razorpay</option>
                        <option>PayU</option>
                        <option>Paytm</option>
                        <option>Stripe</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                      <input
                        type="text"
                        placeholder="Enter API Key"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">API Secret</label>
                      <input
                        type="password"
                        placeholder="Enter API Secret"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <label className="text-sm font-medium text-gray-700">Enable Test Mode</label>
                    </div>
                  </div>
                )}

                {/* Security */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                      <input
                        type="number"
                        defaultValue="30"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2" />
                      <label className="text-sm font-medium text-gray-700">Enable Two-Factor Authentication for Admins</label>
                    </div>

                    <div className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-2" />
                      <label className="text-sm font-medium text-gray-700">Require Strong Passwords</label>
                    </div>

                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <label className="text-sm font-medium text-gray-700">Enable IP Whitelisting</label>
                    </div>
                  </div>
                )}

                {/* Backup */}
                {activeTab === 'backup' && (
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold mb-4">Backup & Restore</h2>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <strong>Last Backup:</strong> Never
                      </p>
                    </div>

                    <div className="space-y-3">
                      <button className="w-full bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700">
                        📥 Backup Now
                      </button>
                      <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700">
                        📤 Restore from Backup
                      </button>
                    </div>

                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <label className="text-sm font-medium text-gray-700">Enable Automatic Daily Backups</label>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="mt-6 pt-6 border-t">
                  <button
                    onClick={handleSave}
                    className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function SettingNavItem({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        active
          ? 'bg-orange-50 text-orange-600'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

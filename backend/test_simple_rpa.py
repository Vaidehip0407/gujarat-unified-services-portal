#!/usr/bin/env python3

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.services.rpa_service import rpa_service

def test_rpa():
    print("🧪 Testing RPA Service...")
    
    # Test data
    test_data = {
        'city': 'Ahmedabad',
        'service_number': '3348226',
        't_no': '1234567',
        'applicant_name': 'Test User',
        'mobile': '9876543210',
        'email': 'test@example.com',
        'application_type': 'name_change'
    }
    
    try:
        print("📋 Test Data:", test_data)
        print("🚀 Starting RPA submission...")
        
        result = rpa_service.submit_torrent_power_application(test_data)
        
        print("✅ RPA Result:", result)
        
        if result['success']:
            print(f"🎉 SUCCESS! Confirmation: {result['confirmation_number']}")
        else:
            print(f"❌ FAILED: {result['error']}")
            
    except Exception as e:
        print(f"💥 EXCEPTION: {str(e)}")

if __name__ == "__main__":
    test_rpa()
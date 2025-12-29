#!/usr/bin/env python3

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.services.rpa_service import rpa_service

def test_property_rpa():
    print("🧪 Testing Property RPA Service...")
    
    # Test data for Property Name Transfer
    test_data = {
        'city': 'Ahmedabad',
        'survey_number': '9876543',
        'property_id': '0407',
        'applicant_name': 'Vaidehi panchal',
        'mobile': '+919601063752',
        'email': 'vaidehipanchal3@gmail.com',
        'application_type': 'name_transfer'
    }
    
    try:
        print("📋 Test Data:", test_data)
        print("🚀 Starting Property RPA submission...")
        
        result = rpa_service.submit_anyror_gujarat_application(test_data)
        
        print("✅ RPA Result:", result)
        
        if result['success']:
            print(f"🎉 SUCCESS! Confirmation: {result['confirmation_number']}")
        else:
            print(f"❌ FAILED: {result['error']}")
            
    except Exception as e:
        print(f"💥 EXCEPTION: {str(e)}")

if __name__ == "__main__":
    test_property_rpa()
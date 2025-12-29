#!/usr/bin/env python3
"""
Simple RPA Test Script
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.services.rpa_service import rpa_service

def test_adani_gas_rpa():
    """Test Adani Gas RPA submission"""
    
    test_data = {
        "city": "Ahmedabad",
        "consumer_number": "123456",
        "bp_number": "BP123",
        "applicant_name": "Test User",
        "mobile": "9876543210",
        "email": "test@example.com",
        "application_type": "name_change"
    }
    
    print("🧪 Testing Adani Gas RPA Submission...")
    print(f"📋 Test Data: {test_data}")
    print("-" * 50)
    
    try:
        result = rpa_service.submit_adani_gas_application(test_data)
        
        print("✅ RPA Test Result:")
        print(f"Success: {result.get('success')}")
        print(f"Message: {result.get('message')}")
        print(f"Confirmation: {result.get('confirmation_number')}")
        
        if result.get('error'):
            print(f"❌ Error: {result.get('error')}")
            
        return result.get('success', False)
        
    except Exception as e:
        print(f"❌ RPA Test Failed: {str(e)}")
        return False

if __name__ == "__main__":
    print("🚀 Starting RPA Test...")
    success = test_adani_gas_rpa()
    
    if success:
        print("\n🎉 RPA Test PASSED!")
    else:
        print("\n💥 RPA Test FAILED!")
        
    print("\n" + "="*50)
#!/usr/bin/env python3
"""
Test script to verify the complete auto-fill flow works
"""

import time
from app.services.rpa_service import rpa_service

def test_electricity_auto_fill():
    """Test electricity service auto-fill"""
    print("🧪 Testing Electricity Auto-Fill Flow...")
    
    test_data = {
        "applicant_name": "Test User",
        "mobile": "9876543210",
        "email": "test@example.com",
        "city": "Ahmedabad",
        "service_number": "TP123456789",
        "t_no": "T12345",
        "load_sanctioned": "3",
        "connection_type": "residential",
        "application_type": "name_change"
    }
    
    print("📝 Test Data:")
    for key, value in test_data.items():
        print(f"   {key}: {value}")
    
    print("\n🤖 Starting RPA Auto-Fill...")
    result = rpa_service.submit_torrent_power_application(test_data)
    
    if result["success"]:
        print(f"✅ SUCCESS! Confirmation Number: {result['confirmation_number']}")
        print(f"📸 Screenshot: {result.get('screenshot_path', 'N/A')}")
        return True
    else:
        print(f"❌ FAILED: {result.get('error', 'Unknown error')}")
        return False

def test_gas_auto_fill():
    """Test gas service auto-fill"""
    print("\n🧪 Testing Gas Auto-Fill Flow...")
    
    test_data = {
        "applicant_name": "Test User Gas",
        "mobile": "9876543210",
        "email": "test@example.com",
        "city": "Ahmedabad",
        "consumer_number": "AG123456789",
        "bp_number": "BP987654321",
        "gas_connection_type": "png_domestic",
        "aadhaar_number": "1234-5678-9012",
        "application_type": "name_change"
    }
    
    print("📝 Test Data:")
    for key, value in test_data.items():
        print(f"   {key}: {value}")
    
    print("\n🤖 Starting RPA Auto-Fill...")
    result = rpa_service.submit_adani_gas_application(test_data)
    
    if result["success"]:
        print(f"✅ SUCCESS! Confirmation Number: {result['confirmation_number']}")
        print(f"📸 Screenshot: {result.get('screenshot_path', 'N/A')}")
        return True
    else:
        print(f"❌ FAILED: {result.get('error', 'Unknown error')}")
        return False

if __name__ == "__main__":
    print("🚀 Testing Complete Auto-Fill Flow\n")
    
    # Test electricity
    electricity_success = test_electricity_auto_fill()
    
    # Wait a bit between tests
    time.sleep(2)
    
    # Test gas
    gas_success = test_gas_auto_fill()
    
    print("\n" + "="*50)
    print("📊 TEST RESULTS:")
    print(f"   Electricity Auto-Fill: {'✅ PASS' if electricity_success else '❌ FAIL'}")
    print(f"   Gas Auto-Fill: {'✅ PASS' if gas_success else '❌ FAIL'}")
    
    if electricity_success and gas_success:
        print("\n🎉 ALL TESTS PASSED!")
        print("   - RPA successfully opens demo government sites")
        print("   - Forms are auto-filled with portal data")
        print("   - Confirmation numbers are generated")
        print("   - Screenshots are captured")
    else:
        print("\n⚠️ SOME TESTS FAILED!")
        print("   - Check Chrome installation")
        print("   - Verify demo government sites are running")
        print("   - Check field mappings")
    
    print("\n🔍 Next Steps:")
    print("   1. Go to http://localhost:3005")
    print("   2. Login and go to Services")
    print("   3. Select any service and fill form")
    print("   4. Click 'Submit & Auto-Process'")
    print("   5. Watch Chrome auto-fill the demo government form")
    print("   6. See confirmation number in portal")
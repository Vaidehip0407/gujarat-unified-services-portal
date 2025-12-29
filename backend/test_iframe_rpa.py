#!/usr/bin/env python3
"""
Test script to verify iframe-based RPA experience
"""

import requests
import json
import urllib.parse

def test_iframe_rpa():
    """Test the iframe-based RPA flow"""
    
    base_url = "http://localhost:8000"
    
    print("🧪 Testing Iframe-Based RPA Experience")
    print("=" * 50)
    
    # Test data for RPA
    test_data = {
        "city": "Ahmedabad",
        "service_number": "TP123456789",
        "t_no": "T12345",
        "applicant_name": "Test User",
        "mobile": "9876543210",
        "email": "test@example.com",
        "application_type": "name_change"
    }
    
    # Test iframe URL with RPA parameters
    print("\n1. Testing Iframe RPA URLs...")
    
    services = ['torrent-power', 'adani-gas', 'amc-water', 'anyror-gujarat']
    
    for service in services:
        try:
            # Create iframe URL with RPA data
            encoded_data = urllib.parse.quote(json.dumps(test_data))
            iframe_url = f"{base_url}/demo-govt/{service}?rpa=true&data={encoded_data}"
            
            response = requests.get(iframe_url)
            if response.status_code == 200:
                print(f"   ✅ {service} iframe RPA - OK")
                
                # Check if RPA auto-fill script is present
                if "startRpaAutoFill" in response.text:
                    print(f"   ✅ {service} RPA script - OK")
                else:
                    print(f"   ⚠️  {service} RPA script - Missing")
            else:
                print(f"   ❌ {service} iframe RPA - Error {response.status_code}")
                
        except Exception as e:
            print(f"   ❌ {service} iframe RPA - Exception: {e}")
    
    print("\n2. Testing Frontend Integration...")
    
    # Test if frontend can access the iframe URLs
    frontend_url = "http://localhost:3003"
    
    try:
        # Test if frontend is accessible
        response = requests.get(frontend_url)
        if response.status_code == 200:
            print("   ✅ Frontend accessible - OK")
        else:
            print(f"   ❌ Frontend - Error {response.status_code}")
    except Exception as e:
        print(f"   ❌ Frontend - Exception: {e}")
    
    print("\n" + "=" * 50)
    print("🎯 Iframe RPA Test Complete!")
    print("\nHow it works now:")
    print("1. User fills portal form and clicks 'Submit & Auto-Process'")
    print("2. Same window shows iframe with actual government form")
    print("3. RPA auto-fill script runs inside iframe")
    print("4. User sees real government form being filled step-by-step")
    print("5. Confirmation number appears after submission")
    print("\n🚀 Test it at: http://localhost:3003")

if __name__ == "__main__":
    test_iframe_rpa()
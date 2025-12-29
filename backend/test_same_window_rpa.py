#!/usr/bin/env python3
"""
Test script to verify same-window RPA auto-fill experience
"""

import requests
import json
import time

def test_same_window_rpa():
    """Test the complete same-window RPA flow"""
    
    base_url = "http://localhost:8000"
    
    print("🧪 Testing Same-Window RPA Auto-Fill Experience")
    print("=" * 50)
    
    # Test 1: Check if demo government sites are accessible
    print("\n1. Testing Demo Government Sites...")
    
    demo_sites = [
        "/demo-govt/torrent-power",
        "/demo-govt/adani-gas", 
        "/demo-govt/amc-water",
        "/demo-govt/anyror-gujarat"
    ]
    
    for site in demo_sites:
        try:
            response = requests.get(f"{base_url}{site}")
            if response.status_code == 200:
                print(f"   ✅ {site} - OK")
            else:
                print(f"   ❌ {site} - Error {response.status_code}")
        except Exception as e:
            print(f"   ❌ {site} - Exception: {e}")
    
    # Test 2: Test form submission with RPA data
    print("\n2. Testing Form Submission...")
    
    test_data = {
        "city": "Ahmedabad",
        "serviceNumber": "TP123456789",
        "tNo": "T12345",
        "applicantName": "Test User",
        "mobile": "9876543210",
        "email": "test@example.com",
        "applicationType": "name_change"
    }
    
    try:
        response = requests.post(
            f"{base_url}/demo-govt/torrent-power/submit",
            data=test_data
        )
        
        if response.status_code == 200:
            print("   ✅ Form submission - OK")
            # Check if confirmation number is in response
            if "confirmation" in response.text.lower():
                print("   ✅ Confirmation number generated - OK")
            else:
                print("   ⚠️  Confirmation number not found in response")
        else:
            print(f"   ❌ Form submission - Error {response.status_code}")
            
    except Exception as e:
        print(f"   ❌ Form submission - Exception: {e}")
    
    # Test 3: Test RPA with query parameters (for iframe mode)
    print("\n3. Testing RPA Mode with Parameters...")
    
    rpa_data = json.dumps({
        "city": "Ahmedabad",
        "service_number": "TP123456789",
        "t_no": "T12345",
        "applicant_name": "Test User",
        "mobile": "9876543210",
        "email": "test@example.com",
        "application_type": "name_change"
    })
    
    try:
        import urllib.parse
        encoded_data = urllib.parse.quote(rpa_data)
        rpa_url = f"{base_url}/demo-govt/torrent-power?rpa=true&data={encoded_data}"
        
        response = requests.get(rpa_url)
        if response.status_code == 200:
            print("   ✅ RPA mode with parameters - OK")
            # Check if RPA JavaScript is present
            if "startRpaAutoFill" in response.text:
                print("   ✅ RPA auto-fill script found - OK")
            else:
                print("   ⚠️  RPA auto-fill script not found")
        else:
            print(f"   ❌ RPA mode - Error {response.status_code}")
            
    except Exception as e:
        print(f"   ❌ RPA mode - Exception: {e}")
    
    print("\n" + "=" * 50)
    print("🎯 Same-Window RPA Test Complete!")
    print("\nNext Steps:")
    print("1. Open http://localhost:3003 in your browser")
    print("2. Navigate to any service form")
    print("3. Fill your details and click 'Submit & Auto-Process'")
    print("4. Watch the RPA bot fill the government form step-by-step!")

if __name__ == "__main__":
    test_same_window_rpa()
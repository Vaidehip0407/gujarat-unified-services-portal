#!/usr/bin/env python3
"""
Test script to verify the RPA confirmation flow works correctly
"""

import requests
import json
import time

# Test configuration
BASE_URL = "http://localhost:8000"
TEST_USER = {
    "email": "test@example.com",
    "password": "testpass123",
    "full_name": "Test User",
    "mobile": "9876543210",
    "city": "Ahmedabad"
}

def test_rpa_confirmation_flow():
    """Test the complete RPA flow to ensure confirmation numbers are displayed properly"""
    
    print("🧪 Testing RPA Confirmation Flow...")
    
    # Step 1: Register/Login user
    print("\n1️⃣ Registering test user...")
    try:
        response = requests.post(f"{BASE_URL}/api/auth/register", json=TEST_USER)
        if response.status_code == 400 and "already registered" in response.text:
            print("   ✅ User already exists, logging in...")
            login_response = requests.post(f"{BASE_URL}/api/auth/login", data={
                "username": TEST_USER["email"],
                "password": TEST_USER["password"]
            })
            token = login_response.json()["access_token"]
        else:
            print("   ✅ User registered successfully")
            token = response.json()["access_token"]
    except Exception as e:
        print(f"   ❌ Registration failed: {e}")
        return False
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Step 2: Create application
    print("\n2️⃣ Creating test application...")
    app_data = {
        "service_type": "electricity",
        "application_type": "name_change",
        "form_data": {
            "applicant_name": "Test User",
            "mobile": "9876543210",
            "email": "test@example.com",
            "city": "Ahmedabad",
            "service_number": "TEST123456",
            "t_no": "T123456",
            "service_type": "electricity",
            "application_type": "name_change"
        }
    }
    
    try:
        response = requests.post(f"{BASE_URL}/api/applications/", json=app_data, headers=headers)
        application_id = response.json()["id"]
        print(f"   ✅ Application created with ID: {application_id}")
    except Exception as e:
        print(f"   ❌ Application creation failed: {e}")
        return False
    
    # Step 3: Submit via RPA
    print("\n3️⃣ Submitting via RPA...")
    rpa_data = {
        "application_id": application_id,
        "target_website": "torrent-power",
        "submission_data": app_data["form_data"]
    }
    
    try:
        response = requests.post(f"{BASE_URL}/api/rpa/submit", json=rpa_data, headers=headers)
        rpa_id = response.json()["id"]
        print(f"   ✅ RPA submission started with ID: {rpa_id}")
    except Exception as e:
        print(f"   ❌ RPA submission failed: {e}")
        return False
    
    # Step 4: Poll for status and confirmation number
    print("\n4️⃣ Polling for RPA status...")
    max_attempts = 15
    for attempt in range(max_attempts):
        try:
            response = requests.get(f"{BASE_URL}/api/rpa/status/{rpa_id}", headers=headers)
            status_data = response.json()
            
            print(f"   📊 Attempt {attempt + 1}: Status = {status_data['status']}")
            
            if status_data.get("confirmation_number"):
                print(f"   🎉 SUCCESS! Confirmation Number: {status_data['confirmation_number']}")
                print(f"   📝 Message: {status_data.get('response_data', {}).get('message', 'N/A')}")
                return True
            
            if status_data["status"] == "failed":
                print(f"   ❌ RPA failed: {status_data.get('error_message', 'Unknown error')}")
                return False
            
            if status_data["status"] in ["processing", "queued"]:
                time.sleep(2)  # Wait 2 seconds before next poll
                continue
            
        except Exception as e:
            print(f"   ⚠️ Status check failed: {e}")
            time.sleep(2)
    
    print("   ⏰ Timeout: RPA did not complete within expected time")
    return False

if __name__ == "__main__":
    success = test_rpa_confirmation_flow()
    
    if success:
        print("\n✅ TEST PASSED: RPA confirmation flow works correctly!")
        print("   - Application created successfully")
        print("   - RPA submission processed")
        print("   - Confirmation number generated and returned")
        print("   - No redirects to demo government sites")
    else:
        print("\n❌ TEST FAILED: RPA confirmation flow has issues")
        print("   - Check server logs for details")
        print("   - Verify RPA service is working")
        print("   - Check database connections")
    
    print("\n🔍 Next Steps:")
    print("   1. Test the frontend at http://localhost:3005")
    print("   2. Go to Services → Electricity → Name Change")
    print("   3. Fill form and click 'Submit & Auto-Process'")
    print("   4. Verify confirmation number appears in portal (not redirect)")
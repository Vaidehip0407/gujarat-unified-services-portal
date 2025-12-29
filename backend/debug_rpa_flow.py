#!/usr/bin/env python3
"""
Debug script to test RPA flow step by step
"""

import requests
import json
import time

BASE_URL = "http://localhost:8000"

def debug_rpa_flow():
    """Debug the RPA flow step by step"""
    
    print("🔍 Debugging RPA Flow...")
    
    # Step 1: Test user registration/login
    print("\n1️⃣ Testing user registration...")
    user_data = {
        "email": "debug@test.com",
        "password": "testpass123",
        "full_name": "Debug User",
        "mobile": "9876543210",
        "city": "Ahmedabad"
    }
    
    try:
        # Try to register
        response = requests.post(f"{BASE_URL}/api/auth/register", json=user_data)
        if response.status_code == 400:
            # User exists, try login
            login_response = requests.post(f"{BASE_URL}/api/auth/login", data={
                "username": user_data["email"],
                "password": user_data["password"]
            })
            if login_response.status_code == 200:
                token = login_response.json()["access_token"]
                print("✅ User logged in successfully")
            else:
                print(f"❌ Login failed: {login_response.text}")
                return False
        else:
            # Registration successful, now login
            login_response = requests.post(f"{BASE_URL}/api/auth/login", data={
                "username": user_data["email"],
                "password": user_data["password"]
            })
            if login_response.status_code == 200:
                token = login_response.json()["access_token"]
                print("✅ User registered and logged in successfully")
            else:
                print(f"❌ Login after registration failed: {login_response.text}")
                return False
    except Exception as e:
        print(f"❌ User auth failed: {e}")
        return False
    
    headers = {"Authorization": f"Bearer {token}"}
    
    # Step 2: Test application creation
    print("\n2️⃣ Testing application creation...")
    app_data = {
        "service_type": "property",
        "application_type": "name_transfer",
        "form_data": {
            "applicant_name": "Debug User",
            "mobile": "9876543210",
            "email": "debug@test.com",
            "city": "Ahmedabad",
            "survey_number": "123/1/A",
            "subdivision_number": "SD-45",
            "village": "Surat",
            "taluka": "Ahmedabad City",
            "property_type": "residential",
            "property_area": "1200"
        }
    }
    
    try:
        response = requests.post(f"{BASE_URL}/api/applications/", json=app_data, headers=headers)
        application_id = response.json()["id"]
        print(f"✅ Application created with ID: {application_id}")
    except Exception as e:
        print(f"❌ Application creation failed: {e}")
        return False
    
    # Step 3: Test RPA submission
    print("\n3️⃣ Testing RPA submission...")
    rpa_data = {
        "application_id": application_id,
        "target_website": "anyror-gujarat",
        "submission_data": app_data["form_data"]
    }
    
    try:
        response = requests.post(f"{BASE_URL}/api/rpa/submit", json=rpa_data, headers=headers)
        rpa_id = response.json()["id"]
        print(f"✅ RPA submission started with ID: {rpa_id}")
    except Exception as e:
        print(f"❌ RPA submission failed: {e}")
        print(f"Response: {e.response.text if hasattr(e, 'response') else 'No response'}")
        return False
    
    # Step 4: Poll for status
    print("\n4️⃣ Polling for RPA status...")
    for attempt in range(10):
        try:
            response = requests.get(f"{BASE_URL}/api/rpa/status/{rpa_id}", headers=headers)
            status_data = response.json()
            
            print(f"   📊 Attempt {attempt + 1}: Status = {status_data['status']}")
            
            if status_data.get("confirmation_number"):
                print(f"   🎉 SUCCESS! Confirmation Number: {status_data['confirmation_number']}")
                return True
            
            if status_data["status"] == "failed":
                print(f"   ❌ RPA failed: {status_data.get('error_message', 'Unknown error')}")
                return False
            
            time.sleep(2)
            
        except Exception as e:
            print(f"   ⚠️ Status check failed: {e}")
            time.sleep(2)
    
    print("   ⏰ Timeout: RPA did not complete")
    return False

if __name__ == "__main__":
    success = debug_rpa_flow()
    
    if success:
        print("\n✅ RPA FLOW WORKING!")
        print("The backend RPA system is functioning correctly.")
        print("If frontend is not working, the issue is in the React component.")
    else:
        print("\n❌ RPA FLOW FAILED!")
        print("There's an issue with the backend RPA system.")
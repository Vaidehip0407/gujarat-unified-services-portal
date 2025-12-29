#!/usr/bin/env python3

import requests
import json

# Test application creation
def test_application_create():
    base_url = "http://localhost:8000"
    
    # First login to get token
    login_data = {
        "username": "test@example.com",
        "password": "testpass123"
    }
    
    try:
        # Login
        login_response = requests.post(f"{base_url}/api/auth/login", data=login_data)
        print(f"Login Status: {login_response.status_code}")
        
        if login_response.status_code == 200:
            token = login_response.json()["access_token"]
            headers = {"Authorization": f"Bearer {token}"}
            
            # Create application
            app_data = {
                "service_type": "electricity",
                "application_type": "name_change",
                "form_data": {
                    "applicant_name": "Test User",
                    "mobile": "9876543210",
                    "city": "Ahmedabad"
                }
            }
            
            app_response = requests.post(
                f"{base_url}/api/applications/", 
                json=app_data, 
                headers=headers
            )
            print(f"Application Create Status: {app_response.status_code}")
            print(f"Application Response: {app_response.text}")
            
            if app_response.status_code == 200:
                app_id = app_response.json()["id"]
                print(f"Application ID: {app_id}")
                
                # Test RPA submission
                rpa_data = {
                    "application_id": app_id,
                    "target_website": "torrent-power",
                    "submission_data": app_data["form_data"]
                }
                
                rpa_response = requests.post(
                    f"{base_url}/api/rpa/submit",
                    json=rpa_data,
                    headers=headers
                )
                print(f"RPA Submit Status: {rpa_response.status_code}")
                print(f"RPA Response: {rpa_response.text}")
                
        else:
            print(f"Login failed: {login_response.text}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_application_create()
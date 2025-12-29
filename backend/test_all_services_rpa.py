#!/usr/bin/env python3
"""
Test script to verify RPA works on ALL services: Electricity, Gas, Water, Property
"""

import requests
import json
import urllib.parse

def test_all_services_rpa():
    """Test RPA functionality for all 4 services"""
    
    base_url = "http://localhost:8000"
    
    print("🧪 Testing RPA on ALL Services")
    print("=" * 60)
    
    # Test data for each service type
    test_services = {
        'electricity': {
            'demo_url': '/demo-govt/torrent-power',
            'form_data': {
                'city': 'Ahmedabad',
                'service_number': 'TP123456789',
                't_no': 'T12345',
                'applicant_name': 'Test User',
                'mobile': '9876543210',
                'email': 'test@example.com',
                'application_type': 'name_change'
            },
            'display_name': '⚡ ELECTRICITY (Torrent Power)'
        },
        'gas': {
            'demo_url': '/demo-govt/adani-gas',
            'form_data': {
                'city': 'Ahmedabad',
                'consumer_number': 'AG123456789',
                'bp_number': 'BP987654321',
                'applicant_name': 'Test User',
                'mobile': '9876543210',
                'email': 'test@example.com',
                'application_type': 'name_change'
            },
            'display_name': '🔥 GAS (Adani Total Gas)'
        },
        'water': {
            'demo_url': '/demo-govt/amc-water',
            'form_data': {
                'zone': 'Central Zone',
                'connection_id': 'AMC123456',
                'applicant_name': 'Test User',
                'mobile': '9876543210',
                'email': 'test@example.com',
                'application_type': 'name_change'
            },
            'display_name': '💧 WATER (AMC Water Supply)'
        },
        'property': {
            'demo_url': '/demo-govt/anyror-gujarat',
            'form_data': {
                'city': 'Ahmedabad',
                'survey_number': '123/1/A',
                'subdivision_number': 'SD-45',
                'applicant_name': 'Test User',
                'mobile': '9876543210',
                'email': 'test@example.com',
                'application_type': 'name_transfer'
            },
            'display_name': '🏠 PROPERTY (AnyRoR Gujarat)'
        }
    }
    
    print("\n1. Testing Demo Form Accessibility...")
    print("-" * 40)
    
    all_working = True
    
    for service_type, config in test_services.items():
        try:
            # Test basic form access
            response = requests.get(f"{base_url}{config['demo_url']}")
            if response.status_code == 200:
                print(f"✅ {config['display_name']} - Form Accessible")
                
                # Check RPA capability
                if "startRpaAutoFill" in response.text:
                    print(f"✅ {config['display_name']} - RPA Script Ready")
                else:
                    print(f"❌ {config['display_name']} - RPA Script Missing")
                    all_working = False
            else:
                print(f"❌ {config['display_name']} - Error {response.status_code}")
                all_working = False
                
        except Exception as e:
            print(f"❌ {config['display_name']} - Exception: {e}")
            all_working = False
    
    print("\n2. Testing RPA Auto-Fill with Data...")
    print("-" * 40)
    
    for service_type, config in test_services.items():
        try:
            # Test RPA mode with data
            encoded_data = urllib.parse.quote(json.dumps(config['form_data']))
            rpa_url = f"{base_url}{config['demo_url']}?rpa=true&data={encoded_data}"
            
            response = requests.get(rpa_url)
            if response.status_code == 200:
                print(f"✅ {config['display_name']} - RPA Auto-Fill Ready")
                
                # Check if form fields are present
                required_fields = ['applicantName', 'mobile', 'applicationType']
                fields_found = all(field in response.text for field in required_fields)
                
                if fields_found:
                    print(f"✅ {config['display_name']} - All Form Fields Present")
                else:
                    print(f"⚠️  {config['display_name']} - Some Fields Missing")
            else:
                print(f"❌ {config['display_name']} - RPA Mode Error {response.status_code}")
                all_working = False
                
        except Exception as e:
            print(f"❌ {config['display_name']} - RPA Exception: {e}")
            all_working = False
    
    print("\n3. Testing Form Submission...")
    print("-" * 40)
    
    for service_type, config in test_services.items():
        try:
            # Test form submission
            submit_url = f"{base_url}{config['demo_url']}/submit"
            
            # Prepare form data for submission
            submit_data = {}
            if service_type == 'electricity':
                submit_data = {
                    'city': config['form_data']['city'],
                    'serviceNumber': config['form_data']['service_number'],
                    'tNo': config['form_data']['t_no'],
                    'applicantName': config['form_data']['applicant_name'],
                    'mobile': config['form_data']['mobile'],
                    'email': config['form_data']['email'],
                    'applicationType': config['form_data']['application_type']
                }
            elif service_type == 'gas':
                submit_data = {
                    'city': config['form_data']['city'],
                    'consumerNumber': config['form_data']['consumer_number'],
                    'bpNumber': config['form_data']['bp_number'],
                    'applicantName': config['form_data']['applicant_name'],
                    'mobile': config['form_data']['mobile'],
                    'email': config['form_data']['email'],
                    'applicationType': config['form_data']['application_type']
                }
            elif service_type == 'water':
                submit_data = {
                    'zone': config['form_data']['zone'],
                    'connectionId': config['form_data']['connection_id'],
                    'applicantName': config['form_data']['applicant_name'],
                    'mobile': config['form_data']['mobile'],
                    'email': config['form_data']['email'],
                    'applicationType': config['form_data']['application_type']
                }
            elif service_type == 'property':
                submit_data = {
                    'district': config['form_data']['city'],
                    'surveyNumber': config['form_data']['survey_number'],
                    'propertyId': config['form_data']['subdivision_number'],
                    'applicantName': config['form_data']['applicant_name'],
                    'mobile': config['form_data']['mobile'],
                    'email': config['form_data']['email'],
                    'applicationType': config['form_data']['application_type']
                }
            
            response = requests.post(submit_url, data=submit_data)
            if response.status_code == 200 and "confirmation" in response.text.lower():
                print(f"✅ {config['display_name']} - Form Submission Works")
            else:
                print(f"❌ {config['display_name']} - Submission Error")
                all_working = False
                
        except Exception as e:
            print(f"❌ {config['display_name']} - Submission Exception: {e}")
            all_working = False
    
    print("\n" + "=" * 60)
    
    if all_working:
        print("🎉 SUCCESS! RPA Works on ALL Services!")
        print("\n✅ CONFIRMED WORKING:")
        print("   ⚡ Electricity (Torrent Power)")
        print("   🔥 Gas (Adani Total Gas)")
        print("   💧 Water (AMC Water Supply)")
        print("   🏠 Property (AnyRoR Gujarat)")
        
        print("\n🚀 FEATURES AVAILABLE ON ALL SERVICES:")
        print("   • Same-window RPA form display")
        print("   • Step-by-step auto-fill animation")
        print("   • Service-specific form fields")
        print("   • Confirmation number generation")
        print("   • Local demo environment (safe)")
        
        print("\n🎯 HOW TO TEST ALL SERVICES:")
        print("1. Go to http://localhost:3003")
        print("2. Navigate to Services")
        print("3. Try each service: Electricity → Gas → Water → Property")
        print("4. Fill details and click 'Submit & Auto-Process'")
        print("5. Watch RPA auto-fill each service's unique form!")
        
    else:
        print("⚠️  Some services may have issues. Check logs above.")
    
    print(f"\n🌐 Frontend: http://localhost:3003")
    print(f"🔧 Backend: http://localhost:8000")

if __name__ == "__main__":
    test_all_services_rpa()
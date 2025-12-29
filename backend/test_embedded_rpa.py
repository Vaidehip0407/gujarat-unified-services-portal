#!/usr/bin/env python3
"""
Test script to verify embedded RPA functionality
"""

import requests
import json

def test_embedded_rpa():
    """Test the embedded RPA flow"""
    
    print("🧪 Testing Embedded RPA Flow...")
    
    # Test 1: Check if backend is accessible
    try:
        response = requests.get("http://localhost:8000/")
        print("✅ Backend is accessible")
    except Exception as e:
        print(f"❌ Backend not accessible: {e}")
        return False
    
    # Test 2: Check if demo government sites are working
    demo_sites = [
        "torrent-power",
        "adani-gas", 
        "amc-water",
        "anyror-gujarat"
    ]
    
    for site in demo_sites:
        try:
            response = requests.get(f"http://localhost:8000/demo-govt/{site}")
            if response.status_code == 200:
                print(f"✅ Demo site {site} is working")
            else:
                print(f"❌ Demo site {site} returned {response.status_code}")
        except Exception as e:
            print(f"❌ Demo site {site} failed: {e}")
    
    # Test 3: Check if frontend is accessible
    try:
        response = requests.get("http://localhost:3003/")
        print("✅ Frontend is accessible")
    except Exception as e:
        print(f"❌ Frontend not accessible: {e}")
        return False
    
    print("\n🎯 Manual Test Steps:")
    print("1. Go to: http://localhost:3003")
    print("2. Register/Login with any credentials")
    print("3. Go to Services → Property → Name Transfer")
    print("4. Fill form with test data")
    print("5. Select 'Auto Submit' option")
    print("6. Click 'Submit & Auto-Process'")
    print("7. Check if center area shows embedded government form")
    
    return True

if __name__ == "__main__":
    test_embedded_rpa()
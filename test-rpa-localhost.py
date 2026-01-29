#!/usr/bin/env python3
"""
Test RPA Setup on Localhost
This script tests if Chrome, ChromeDriver, and Selenium are working locally
"""
import sys
import subprocess
import os
from pathlib import Path

def test_chrome():
    """Test if Chrome is installed"""
    print("🔍 Testing Chrome installation...")
    try:
        # Try different Chrome commands based on OS
        chrome_commands = [
            'google-chrome --version',
            'chrome --version', 
            'chromium --version',
            'chromium-browser --version'
        ]
        
        for cmd in chrome_commands:
            try:
                result = subprocess.run(cmd.split(), capture_output=True, text=True, timeout=10)
                if result.returncode == 0:
                    print(f"✅ Chrome found: {result.stdout.strip()}")
                    return True
            except:
                continue
        
        print("❌ Chrome not found. Please install Google Chrome.")
        print("   Download from: https://www.google.com/chrome/")
        return False
        
    except Exception as e:
        print(f"❌ Error testing Chrome: {e}")
        return False

def test_chromedriver():
    """Test if ChromeDriver is installed"""
    print("🔍 Testing ChromeDriver installation...")
    try:
        result = subprocess.run(['chromedriver', '--version'], capture_output=True, text=True, timeout=10)
        if result.returncode == 0:
            print(f"✅ ChromeDriver found: {result.stdout.strip()}")
            return True
        else:
            print("❌ ChromeDriver not found or not working")
            return False
    except FileNotFoundError:
        print("❌ ChromeDriver not found in PATH")
        print("   Install ChromeDriver:")
        print("   1. Download from: https://chromedriver.chromium.org/")
        print("   2. Add to PATH or place in /usr/local/bin/")
        return False
    except Exception as e:
        print(f"❌ Error testing ChromeDriver: {e}")
        return False

def test_selenium():
    """Test if Selenium can create a Chrome driver"""
    print("🔍 Testing Selenium with Chrome...")
    try:
        from selenium import webdriver
        from selenium.webdriver.chrome.options import Options
        from selenium.webdriver.chrome.service import Service
        
        # Setup Chrome options for testing
        chrome_options = Options()
        chrome_options.add_argument('--headless=new')  # Run in headless mode for testing
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-gpu')
        
        # Try to create driver
        try:
            # Try with system ChromeDriver first
            service = Service('/usr/local/bin/chromedriver')  # Adjust path as needed
            driver = webdriver.Chrome(service=service, options=chrome_options)
        except:
            # Fallback to webdriver-manager
            from webdriver_manager.chrome import ChromeDriverManager
            service = Service(ChromeDriverManager().install())
            driver = webdriver.Chrome(service=service, options=chrome_options)
        
        # Test basic functionality
        driver.get("https://www.google.com")
        title = driver.title
        driver.quit()
        
        print(f"✅ Selenium working! Successfully loaded: {title}")
        return True
        
    except ImportError as e:
        print(f"❌ Selenium not installed: {e}")
        print("   Install with: pip install selenium webdriver-manager")
        return False
    except Exception as e:
        print(f"❌ Selenium test failed: {e}")
        return False

def test_python_dependencies():
    """Test if required Python packages are installed"""
    print("🔍 Testing Python dependencies...")
    
    required_packages = [
        'selenium',
        'webdriver_manager', 
        'undetected_chromedriver',
        'fake_useragent'
    ]
    
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package)
            print(f"✅ {package} installed")
        except ImportError:
            print(f"❌ {package} not installed")
            missing_packages.append(package)
    
    if missing_packages:
        print(f"\n📦 Install missing packages:")
        print(f"   pip install {' '.join(missing_packages)}")
        return False
    
    return True

def main():
    """Run all tests"""
    print("🤖 RPA Setup Test for Localhost Development")
    print("=" * 50)
    
    tests = [
        ("Python Dependencies", test_python_dependencies),
        ("Chrome Browser", test_chrome),
        ("ChromeDriver", test_chromedriver),
        ("Selenium Integration", test_selenium)
    ]
    
    results = []
    
    for test_name, test_func in tests:
        print(f"\n{test_name}:")
        print("-" * 30)
        result = test_func()
        results.append((test_name, result))
    
    # Summary
    print("\n" + "=" * 50)
    print("📊 TEST SUMMARY:")
    print("=" * 50)
    
    all_passed = True
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name}: {status}")
        if not result:
            all_passed = False
    
    print("\n" + "=" * 50)
    if all_passed:
        print("🎉 ALL TESTS PASSED! RPA is ready for localhost development.")
        print("\nNext steps:")
        print("1. Start backend: uvicorn app.main:app --reload --host 0.0.0.0 --port 8000")
        print("2. Start frontend: npm run dev")
        print("3. Test Torrent Power RPA automation")
    else:
        print("⚠️  SOME TESTS FAILED! Please fix the issues above before testing RPA.")
        print("\nCommon fixes:")
        print("- Install Google Chrome browser")
        print("- Install ChromeDriver and add to PATH")
        print("- Install Python packages: pip install selenium webdriver-manager undetected-chromedriver fake-useragent")
    
    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())
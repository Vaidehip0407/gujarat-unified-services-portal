#!/usr/bin/env python3
"""
Simple Selenium Test for EC2 Environment
Tests basic Selenium functionality and Chrome setup
"""
import sys
import os
import time
import logging
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def test_selenium_basic():
    """Test basic Selenium functionality"""
    driver = None
    try:
        logger.info("🚀 Starting Selenium test...")
        
        # Chrome options for EC2 environment
        chrome_options = Options()
        chrome_options.add_argument('--headless=new')  # New headless mode
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--window-size=1920,1080')
        chrome_options.add_argument('--disable-web-security')
        chrome_options.add_argument('--disable-features=VizDisplayCompositor')
        chrome_options.add_argument('--disable-extensions')
        chrome_options.add_argument('--remote-debugging-port=9222')
        
        # Use system chromium binary
        chrome_options.binary_location = '/usr/bin/chromium'
        
        # Use system chromedriver
        service = Service('/usr/bin/chromedriver')
        
        # Create driver
        logger.info("📱 Creating Chrome WebDriver...")
        driver = webdriver.Chrome(service=service, options=chrome_options)
        
        # Set timeouts
        driver.implicitly_wait(10)
        driver.set_page_load_timeout(30)
        
        logger.info("✅ WebDriver created successfully!")
        
        # Test 1: Navigate to Google
        logger.info("🌐 Test 1: Navigating to Google...")
        driver.get("https://www.google.com")
        
        # Wait for page to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "q"))
        )
        
        title = driver.title
        logger.info(f"✅ Google loaded successfully! Title: {title}")
        
        # Test 2: Search functionality
        logger.info("🔍 Test 2: Testing search functionality...")
        search_box = driver.find_element(By.NAME, "q")
        search_box.send_keys("Gujarat Government Portal")
        search_box.submit()
        
        # Wait for results
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "search"))
        )
        
        logger.info("✅ Search completed successfully!")
        
        # Test 3: Navigate to Gujarat Gas website
        logger.info("🏢 Test 3: Testing Gujarat Gas website access...")
        driver.get("https://www.gujaratgas.com")
        
        # Wait for page load
        time.sleep(5)
        
        current_url = driver.current_url
        page_title = driver.title
        
        logger.info(f"✅ Gujarat Gas website accessed!")
        logger.info(f"   URL: {current_url}")
        logger.info(f"   Title: {page_title}")
        
        # Test 4: Check if we can access government sites
        logger.info("🏛️ Test 4: Testing government site access...")
        
        test_sites = [
            "https://anyror.gujarat.gov.in",
            "https://www.torrentpower.com",
            "https://iconnect.gujaratgas.com"
        ]
        
        accessible_sites = []
        blocked_sites = []
        
        for site in test_sites:
            try:
                logger.info(f"   Testing: {site}")
                driver.get(site)
                time.sleep(3)
                
                if "error" not in driver.title.lower() and "not found" not in driver.title.lower():
                    accessible_sites.append(site)
                    logger.info(f"   ✅ Accessible: {site}")
                else:
                    blocked_sites.append(site)
                    logger.info(f"   ❌ Blocked/Error: {site}")
                    
            except Exception as e:
                blocked_sites.append(site)
                logger.info(f"   ❌ Failed: {site} - {str(e)}")
        
        # Summary
        logger.info("\n" + "="*50)
        logger.info("🎉 SELENIUM TEST SUMMARY")
        logger.info("="*50)
        logger.info(f"✅ Chrome WebDriver: Working")
        logger.info(f"✅ Google Access: Working")
        logger.info(f"✅ Search Functionality: Working")
        logger.info(f"✅ Accessible Sites: {len(accessible_sites)}")
        logger.info(f"❌ Blocked Sites: {len(blocked_sites)}")
        
        if accessible_sites:
            logger.info("\n📋 Accessible Sites:")
            for site in accessible_sites:
                logger.info(f"   • {site}")
        
        if blocked_sites:
            logger.info("\n🚫 Blocked/Failed Sites:")
            for site in blocked_sites:
                logger.info(f"   • {site}")
        
        logger.info("\n🚀 Selenium is ready for automation!")
        
        return {
            "success": True,
            "accessible_sites": accessible_sites,
            "blocked_sites": blocked_sites,
            "driver_working": True
        }
        
    except Exception as e:
        logger.error(f"❌ Selenium test failed: {str(e)}")
        return {
            "success": False,
            "error": str(e),
            "driver_working": False
        }
        
    finally:
        if driver:
            try:
                driver.quit()
                logger.info("🧹 WebDriver cleaned up successfully")
            except:
                pass

def test_selenium_with_backend_config():
    """Test Selenium using backend configuration"""
    try:
        logger.info("🔧 Testing with backend Selenium configuration...")
        
        # Add backend path
        sys.path.append('/app')
        from app.services.selenium_config import selenium_config
        
        # Create driver using backend config
        driver = selenium_config.create_driver(headless=True, stealth_mode=True)
        
        # Test basic functionality
        driver.get("https://www.google.com")
        time.sleep(2)
        
        title = driver.title
        logger.info(f"✅ Backend config test successful! Title: {title}")
        
        # Get driver info
        info = selenium_config.get_driver_info(driver)
        logger.info(f"📊 Driver Info: {info}")
        
        # Cleanup
        selenium_config.cleanup_driver(driver)
        
        return {"success": True, "backend_config": "working"}
        
    except Exception as e:
        logger.error(f"❌ Backend config test failed: {str(e)}")
        return {"success": False, "error": str(e)}

if __name__ == "__main__":
    logger.info("🎯 Starting comprehensive Selenium tests...")
    
    # Test 1: Basic Selenium
    basic_result = test_selenium_basic()
    
    # Test 2: Backend configuration (if available)
    try:
        backend_result = test_selenium_with_backend_config()
    except:
        backend_result = {"success": False, "error": "Backend config not available"}
    
    # Final summary
    logger.info("\n" + "="*60)
    logger.info("🏁 FINAL TEST RESULTS")
    logger.info("="*60)
    logger.info(f"Basic Selenium Test: {'✅ PASS' if basic_result['success'] else '❌ FAIL'}")
    logger.info(f"Backend Config Test: {'✅ PASS' if backend_result['success'] else '❌ FAIL'}")
    
    if basic_result['success']:
        logger.info("\n🎉 Selenium is ready for Gujarat Government Portal automation!")
        logger.info("Next steps:")
        logger.info("1. Deploy updated code to EC2")
        logger.info("2. Test direct automation services")
        logger.info("3. Start with Gujarat Gas name change automation")
    else:
        logger.info("\n❌ Selenium setup needs fixing")
        logger.info("Check Chrome/Chromium installation and permissions")
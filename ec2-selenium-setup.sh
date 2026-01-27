#!/bin/bash
# EC2 Selenium Setup and Test Script
# Run this on EC2 to pull latest changes and test Selenium

echo "🚀 Starting EC2 Selenium Setup..."

# Navigate to project directory
cd ~/unified-portal

echo "📥 Pulling latest changes from GitHub..."
git pull origin main

echo "🛑 Stopping existing containers..."
docker-compose down

echo "🧹 Cleaning up old images..."
docker system prune -f

echo "🔨 Building fresh containers..."
docker-compose build --no-cache

echo "🚀 Starting containers..."
docker-compose up -d

echo "⏳ Waiting for containers to be ready..."
sleep 30

echo "🏥 Checking container health..."
docker ps

echo "🔍 Testing backend health..."
curl -f http://localhost:8000/health || echo "❌ Backend health check failed"

echo "🧪 Testing Selenium setup..."
docker exec -it unified-portal-backend python test-selenium-ec2.py

echo "📊 Checking Chrome installation..."
docker exec -it unified-portal-backend python -c "
import sys
sys.path.append('/app')
from app.services.selenium_config import selenium_config
result = selenium_config.check_chrome_installation()
print('Chrome Installation Check:')
for key, value in result.items():
    print(f'{key}: {value}')
"

echo "🎯 Testing direct automation service..."
docker exec -it unified-portal-backend python -c "
import sys
sys.path.append('/app')
from app.services.direct_automation_service import direct_automation_service

# Test data
test_data = {
    'consumer_number': 'TEST123456',
    'old_name': 'Test User',
    'new_name': 'New Test User',
    'mobile': '9876543210',
    'email': 'test@example.com',
    'address': 'Test Address, Gujarat',
    'reason': 'marriage',
    'city': 'ahmedabad'
}

print('🧪 Testing Gujarat Gas automation...')
try:
    result = direct_automation_service.submit_gujarat_gas_name_change(test_data)
    print(f'Result: {result}')
except Exception as e:
    print(f'Error: {e}')
"

echo "✅ EC2 Selenium setup completed!"
echo ""
echo "📋 Next Steps:"
echo "1. Check if all containers are healthy"
echo "2. Test the web interface at http://your-ec2-ip"
echo "3. Try the direct automation features"
echo "4. Check screenshots in backend/screenshots/ folder"
echo ""
echo "🔧 Useful Commands:"
echo "docker logs unified-portal-backend --tail 20"
echo "docker logs unified-portal-frontend --tail 20"
echo "docker logs unified-portal-nginx --tail 20"
echo "docker exec -it unified-portal-backend bash"
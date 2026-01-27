#!/bin/bash

echo "🚨 Emergency Fix for EC2 Docker Build Issues"
echo "============================================="

echo "Step 1: Clean up Docker completely"
docker-compose down
docker system prune -af
docker volume prune -f

echo -e "\nStep 2: Pull latest code (if not done)"
git pull origin main

echo -e "\nStep 3: Check if files exist"
ls -la create-test-user-ec2.py || echo "❌ create-test-user-ec2.py missing"
ls -la fix-nginx-ec2.sh || echo "❌ fix-nginx-ec2.sh missing"

echo -e "\nStep 4: Build backend separately (debug mode)"
echo "Building backend with verbose output..."
docker-compose build --no-cache backend

echo -e "\nStep 5: Build frontend separately"
echo "Building frontend..."
docker-compose build --no-cache frontend

echo -e "\nStep 6: Start containers one by one"
echo "Starting backend..."
docker-compose up -d backend
sleep 10

echo "Starting frontend..."
docker-compose up -d frontend
sleep 5

echo "Starting nginx..."
docker-compose up -d nginx
sleep 5

echo -e "\nStep 7: Check container status"
docker ps

echo -e "\nStep 8: Create test user manually (if file missing)"
if [ ! -f "create-test-user-ec2.py" ]; then
    echo "Creating test user manually..."
    docker exec -it unified-portal-backend python -c "
import sys
sys.path.append('/app')
from app.database import get_db
from app.models import User
from app.auth import get_password_hash
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

engine = create_engine('sqlite:///./unified_portal.db')
SessionLocal = sessionmaker(bind=engine)
db = SessionLocal()

# Check if user exists
existing = db.query(User).filter(User.email == 'test@example.com').first()
if existing:
    print('✅ Test user already exists')
else:
    user = User(
        email='test@example.com',
        mobile='9999999999',
        hashed_password=get_password_hash('test123'),
        full_name='Test User',
        city='Ahmedabad'
    )
    db.add(user)
    db.commit()
    print('✅ Test user created')
db.close()
"
else
    python3 create-test-user-ec2.py
fi

echo -e "\nStep 9: Test services"
echo "Testing backend..."
curl -f http://localhost:8000/health && echo "✅ Backend OK" || echo "❌ Backend failed"

echo -e "\nTesting login..."
curl -X POST http://localhost/api/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=test@example.com&password=test123" \
  && echo -e "\n✅ Login working!" || echo -e "\n❌ Login failed"

echo -e "\nStep 10: Show logs if failed"
if ! curl -f http://localhost:8000/health >/dev/null 2>&1; then
    echo "Backend logs:"
    docker logs unified-portal-backend --tail 10
fi

if ! curl -f http://localhost/ >/dev/null 2>&1; then
    echo "Nginx logs:"
    docker logs unified-portal-nginx --tail 10
fi

echo -e "\n🎯 Final Status:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

PUBLIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
echo "🌐 Access: http://$PUBLIC_IP"
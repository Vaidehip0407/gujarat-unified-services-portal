#!/bin/bash

echo "🔍 Diagnosing Gujarat Portal Deployment"
echo "========================================"
echo ""

echo "1. Checking Docker containers..."
docker-compose ps
echo ""

echo "2. Checking if port 80 is listening..."
sudo netstat -tulpn | grep :80 || echo "❌ Nothing listening on port 80"
echo ""

echo "3. Checking Nginx container logs (last 20 lines)..."
docker-compose logs --tail=20 nginx
echo ""

echo "4. Checking frontend container..."
docker-compose logs --tail=10 frontend
echo ""

echo "5. Checking backend container..."
docker-compose logs --tail=10 backend
echo ""

echo "6. Testing backend directly..."
curl -s http://localhost:8000/health || echo "❌ Backend not responding"
echo ""

echo "7. Testing frontend directly..."
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" http://localhost:3003/ || echo "❌ Frontend not responding"
echo ""

echo "8. Checking Docker network..."
docker network ls | grep gujarat
echo ""

echo "9. Inspecting containers on network..."
docker network inspect gujarat-portal-network | grep -A 5 "Containers"
echo ""

echo "10. AWS Security Group Check..."
echo "Make sure these ports are open in AWS Console:"
echo "  - Port 80 (HTTP) from 0.0.0.0/0"
echo "  - Port 22 (SSH) from your IP"
echo ""

echo "📋 Quick Fixes:"
echo "==============="
echo ""
echo "If Nginx is failing:"
echo "  docker-compose restart nginx"
echo ""
echo "If containers aren't running:"
echo "  docker-compose down"
echo "  docker-compose up -d"
echo ""
echo "If port 80 is blocked:"
echo "  sudo ufw allow 80/tcp"
echo "  sudo ufw status"
echo ""
echo "View live logs:"
echo "  docker-compose logs -f"

#!/bin/bash

echo "🔍 Checking what's using port 80..."
sudo netstat -tulpn | grep :80 || sudo lsof -i :80

echo ""
echo "Choose an option:"
echo "1. Stop host Nginx and use Docker Nginx on port 80 (Recommended)"
echo "2. Keep host Nginx and use Docker Nginx on port 8080"
echo "3. Configure host Nginx to proxy to Docker containers"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
  1)
    echo "Stopping host Nginx..."
    sudo systemctl stop nginx
    sudo systemctl disable nginx
    
    echo "Starting Docker containers..."
    docker-compose down
    docker-compose up -d
    
    echo "✅ Done! Access at: http://18.207.167.97"
    ;;
    
  2)
    echo "Docker Nginx will use port 8080..."
    echo "Starting Docker containers..."
    docker-compose down
    docker-compose up -d
    
    echo "✅ Done! Access at: http://18.207.167.97:8080"
    ;;
    
  3)
    echo "Configuring host Nginx to proxy to Docker..."
    
    # Create Nginx config for host
    sudo tee /etc/nginx/sites-available/gujarat-portal > /dev/null << 'EOF'
server {
    listen 80;
    server_name 18.207.167.97;

    location /api/ {
        proxy_pass http://localhost:8000/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /docs {
        proxy_pass http://localhost:8000/docs;
    }

    location /health {
        proxy_pass http://localhost:8000/health;
    }

    location / {
        proxy_pass http://localhost:3003/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

    # Enable site
    sudo ln -sf /etc/nginx/sites-available/gujarat-portal /etc/nginx/sites-enabled/
    sudo nginx -t && sudo systemctl reload nginx
    
    # Start containers without Nginx
    echo "Starting backend and frontend only..."
    docker-compose up -d backend frontend
    
    echo "✅ Done! Access at: http://18.207.167.97"
    ;;
    
  *)
    echo "Invalid choice"
    exit 1
    ;;
esac

echo ""
echo "Checking services..."
docker-compose ps

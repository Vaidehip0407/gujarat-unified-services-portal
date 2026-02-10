# 🚀 Simple Deployment Guide - Gujarat Portal

## Architecture (No Nginx)

```
Internet
    ↓
Port 80 → Frontend Container
Port 8000 → Backend Container
```

Simple and direct!

---

## 📦 What You Need

1. EC2 Instance (Ubuntu)
2. Docker & Docker Compose installed
3. Ports 80 and 8000 open in Security Group

---

## 🔧 EC2 Setup Commands

### 1. Connect to EC2
```bash
ssh -i your-key.pem ubuntu@18.207.167.97
```

### 2. Install Docker (if not installed)
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Logout and login again
exit
ssh -i your-key.pem ubuntu@18.207.167.97
```

### 3. Clone and Deploy
```bash
# Clone repository
git clone https://github.com/Vaidehip0407/gujarat-unified-services-portal.git
cd gujarat-unified-services-portal

# Build and start
docker-compose build
docker-compose up -d

# Check status
docker-compose ps
```

---

## 🔄 Update Deployment

```bash
# SSH to EC2
ssh -i your-key.pem ubuntu@18.207.167.97
cd gujarat-unified-services-portal

# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose build
docker-compose up -d

# Check status
docker-compose ps
```

---

## 🔍 Check Status

```bash
# View all containers
docker-compose ps

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Test backend
curl http://localhost:8000/health

# Test frontend
curl http://localhost:80
```

---

## 🌐 Access URLs

- **Frontend**: http://18.207.167.97
- **Backend API**: http://18.207.167.97:8000
- **API Docs**: http://18.207.167.97:8000/docs
- **Health Check**: http://18.207.167.97:8000/health

---

## 🔒 AWS Security Group

Open these ports:

| Port | Protocol | Source | Purpose |
|------|----------|--------|---------|
| 80 | TCP | 0.0.0.0/0 | Frontend |
| 8000 | TCP | 0.0.0.0/0 | Backend API |
| 22 | TCP | Your IP | SSH |

---

## 🐛 Troubleshooting

### Containers not starting
```bash
docker-compose logs
docker-compose down
docker-compose up -d
```

### Port already in use
```bash
# Check what's using the port
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :8000

# Stop conflicting service
sudo systemctl stop nginx  # if nginx is running
```

### Can't access from browser
1. Check AWS Security Group - ports 80 and 8000 open
2. Check containers are running: `docker-compose ps`
3. Check firewall: `sudo ufw status`
4. Test locally first: `curl http://localhost:8000/health`

### Clear browser cache
```javascript
// In browser console (F12)
localStorage.clear()
sessionStorage.clear()
location.reload(true)
```

---

## 📝 Useful Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Restart services
docker-compose restart

# View logs (live)
docker-compose logs -f

# Rebuild after code changes
docker-compose build --no-cache

# Remove everything and start fresh
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

---

## ✅ Success Checklist

- [ ] Docker installed on EC2
- [ ] Repository cloned
- [ ] Containers built and running
- [ ] Ports 80 and 8000 open in Security Group
- [ ] Frontend accessible at http://18.207.167.97
- [ ] Backend accessible at http://18.207.167.97:8000
- [ ] Can register/login
- [ ] All features working

---

**Repository**: https://github.com/Vaidehip0407/gujarat-unified-services-portal

**Simple. Direct. No Nginx needed!** 🎉

# Quick Deployment to AWS EC2

## Step 1: Prepare Your SSH Key

Make sure `gov-portal.pem` is in your home directory or current directory.

On Windows PowerShell:
```powershell
# Check if key exists
Test-Path "gov-portal.pem"

# Or if it's in your Downloads folder
Test-Path "$env:USERPROFILE\Downloads\gov-portal.pem"
```

## Step 2: Connect to EC2 Instance

```bash
ssh -i "gov-portal.pem" ubuntu@ec2-54-167-51-207.compute-1.amazonaws.com
```

If you get permission denied, fix the key permissions:
```bash
chmod 400 gov-portal.pem
```

## Step 3: Once Connected to EC2, Run These Commands

```bash
# Update system
sudo apt-get update
sudo apt-get upgrade -y

# Install Git
sudo apt-get install -y git

# Clone your repository
cd /home/ubuntu
git clone https://github.com/Vaidehip0407/unified-portal.git
cd unified-portal

# Make deploy script executable
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

## Step 4: Wait for Deployment to Complete

The script will:
- Install Docker
- Install Docker Compose
- Build your images
- Start all services

## Step 5: Access Your Application

Once deployment is complete, you'll see:

```
Frontend: http://ec2-54-167-51-207.compute-1.amazonaws.com:3000
Backend API: http://ec2-54-167-51-207.compute-1.amazonaws.com:8000
API Docs: http://ec2-54-167-51-207.compute-1.amazonaws.com:8000/docs
```

## Useful Commands After Deployment

```bash
# View logs
sudo docker-compose logs -f

# Check status
sudo docker-compose ps

# Stop services
sudo docker-compose down

# Restart services
sudo docker-compose restart

# View specific service logs
sudo docker-compose logs -f backend
sudo docker-compose logs -f frontend
```

## Troubleshooting

### If SSH connection fails:
1. Check security group allows port 22
2. Verify key file path is correct
3. Ensure key has correct permissions (400)

### If deployment script fails:
```bash
# Check Docker installation
docker --version
docker-compose --version

# Check if port 8000 or 3000 is already in use
sudo lsof -i :8000
sudo lsof -i :3000
```

### If containers won't start:
```bash
# View detailed logs
sudo docker-compose logs

# Rebuild images
sudo docker-compose build --no-cache
sudo docker-compose up -d
```

## Manual Deployment (If Script Fails)

```bash
# Navigate to project
cd /home/ubuntu/unified-portal

# Build images
sudo docker-compose build

# Start services
sudo docker-compose up -d

# Verify
sudo docker-compose ps
```

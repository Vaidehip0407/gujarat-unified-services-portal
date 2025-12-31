# Windows PowerShell Deployment Script for AWS EC2
# Usage: .\deploy.ps1 -KeyPath "path\to\gov-portal.pem" -InstanceIP "ec2-54-167-51-207.compute-1.amazonaws.com"

param(
    [string]$KeyPath = "gov-portal.pem",
    [string]$InstanceIP = "ec2-54-167-51-207.compute-1.amazonaws.com",
    [string]$User = "ubuntu"
)

Write-Host "=========================================="
Write-Host "Unified Portal - AWS EC2 Deployment"
Write-Host "=========================================="
Write-Host ""

# Check if key file exists
if (-not (Test-Path $KeyPath)) {
    Write-Host "ERROR: Key file not found at: $KeyPath" -ForegroundColor Red
    Write-Host "Please provide the correct path to gov-portal.pem"
    exit 1
}

Write-Host "Key file found: $KeyPath" -ForegroundColor Green
Write-Host "Instance: $InstanceIP" -ForegroundColor Green
Write-Host ""

# Test SSH connection
Write-Host "Testing SSH connection..." -ForegroundColor Yellow
ssh -i $KeyPath $User@$InstanceIP "echo 'Connection successful'" 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Cannot connect to instance" -ForegroundColor Red
    Write-Host "Please check:"
    Write-Host "1. Key file path is correct"
    Write-Host "2. Instance IP is correct"
    Write-Host "3. Security group allows port 22"
    exit 1
}

Write-Host "SSH connection successful!" -ForegroundColor Green
Write-Host ""

# Run deployment commands
Write-Host "Starting deployment..." -ForegroundColor Yellow
Write-Host ""

$commands = @"
set -e
echo "Updating system packages..."
sudo apt-get update
sudo apt-get upgrade -y

echo "Installing Docker..."
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu `$(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

echo "Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-`$(uname -s)-`$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo "Adding ubuntu to docker group..."
sudo usermod -aG docker ubuntu

echo "Installing Git..."
sudo apt-get install -y git

echo "Cloning repository..."
cd /home/ubuntu
git clone https://github.com/Vaidehip0407/unified-portal.git
cd unified-portal

echo "Building Docker images..."
sudo docker-compose build

echo "Starting services..."
sudo docker-compose up -d

echo ""
echo "=========================================="
echo "Deployment Complete!"
echo "=========================================="
echo "Frontend: http://$InstanceIP:3000"
echo "Backend API: http://$InstanceIP:8000"
echo "API Docs: http://$InstanceIP:8000/docs"
echo ""
echo "To view logs: sudo docker-compose logs -f"
echo "=========================================="
"@

ssh -i $KeyPath $User@$InstanceIP $commands

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Deployment completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your application is now running at:" -ForegroundColor Green
    Write-Host "  Frontend: http://$InstanceIP:3000"
    Write-Host "  Backend: http://$InstanceIP:8000"
    Write-Host "  API Docs: http://$InstanceIP:8000/docs"
} else {
    Write-Host ""
    Write-Host "Deployment failed. Check the output above for errors." -ForegroundColor Red
    exit 1
}

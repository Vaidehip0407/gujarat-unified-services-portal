#!/bin/bash

echo "🚀 Starting Unified Portal Development Environment"
echo "=================================================="

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $1 is already in use"
        return 1
    else
        echo "✅ Port $1 is available"
        return 0
    fi
}

# Check required ports
echo "🔍 Checking ports..."
check_port 8000  # Backend
check_port 5173  # Frontend (Vite)

echo ""
echo "📋 Development Setup Instructions:"
echo "=================================="
echo ""
echo "1. 🔧 Backend Setup (Terminal 1):"
echo "   cd backend"
echo "   python -m venv venv"
echo "   source venv/bin/activate  # On Windows: venv\\Scripts\\activate"
echo "   pip install -r requirements.txt"
echo "   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"
echo ""
echo "2. 🎨 Frontend Setup (Terminal 2):"
echo "   cd frontend"
echo "   npm install"
echo "   npm run dev"
echo ""
echo "3. 🌐 Access URLs:"
echo "   - Frontend: http://localhost:5173"
echo "   - Backend API: http://localhost:8000"
echo "   - API Docs: http://localhost:8000/docs"
echo ""
echo "4. 🤖 Test RPA Automation:"
echo "   - Login with test credentials"
echo "   - Go to Services → Electricity → Torrent Power"
echo "   - Fill name change form and test RPA"
echo ""
echo "5. 🔍 Debug RPA (if needed):"
echo "   - Check backend logs for Selenium errors"
echo "   - Test Chrome/ChromeDriver: http://localhost:8000/api/torrent-power/test-rpa"
echo "   - Test connectivity: http://localhost:8000/api/torrent-power/test-connection"

echo ""
echo "🔧 Troubleshooting:"
echo "=================="
echo "- If Chrome/ChromeDriver issues: Install Chrome and ChromeDriver locally"
echo "- If port conflicts: Kill processes using the ports"
echo "- If npm issues: Delete node_modules and package-lock.json, then npm install"
echo "- If Python issues: Check Python version (3.11+ recommended)"
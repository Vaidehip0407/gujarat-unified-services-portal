# Unified Services Portal

A single portal to manage all utility services - Electricity, Gas, Water & Property with auto-fill functionality.

## Features

- ⚡ **Electricity** - Name change, new connection
- 🔥 **Gas** - Name change, new connection  
- 💧 **Water** - Name change, new connection
- 🏠 **Property** - Name transfer, mutation

### Key Features
- User registration & authentication
- Document upload with OCR extraction
- Auto-fill forms from stored data
- RPA integration for external websites
- Application tracking

## Tech Stack

- **Backend**: Python FastAPI + PostgreSQL
- **Frontend**: React + Vite + Tailwind CSS
- **OCR**: Google Vision API / AWS Textract
- **RPA**: Selenium for external form filling

## Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env
# Edit .env with your database credentials

# Run server
uvicorn app.main:app --reload
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run dev server
npm run dev
```

### Database Setup

```sql
CREATE DATABASE unified_portal;
```

Tables are auto-created on first run.

## API Endpoints

### Auth
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login
- GET `/api/auth/me` - Get current user

### Users
- PUT `/api/users/profile` - Update profile
- POST `/api/users/documents/upload` - Upload document
- GET `/api/users/autofill-data` - Get all data for auto-fill

### Services
- GET/POST `/api/services/electricity` - Electricity accounts
- GET/POST `/api/services/gas` - Gas accounts
- GET/POST `/api/services/water` - Water accounts
- GET/POST `/api/services/property` - Property accounts

### Applications
- POST `/api/applications/` - Create application
- GET `/api/applications/prefill/{service}/{type}` - Get prefill data
- POST `/api/applications/{id}/submit` - Submit application

## Project Structure

```
unified-portal/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── auth.py
│   │   ├── routers/
│   │   │   ├── auth.py
│   │   │   ├── users.py
│   │   │   ├── services.py
│   │   │   └── applications.py
│   │   └── services/
│   │       ├── ocr_service.py
│   │       └── rpa_service.py
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── api/axios.js
    │   ├── context/AuthContext.jsx
    │   ├── components/Layout.jsx
    │   └── pages/
    │       ├── Login.jsx
    │       ├── Register.jsx
    │       ├── Dashboard.jsx
    │       ├── Profile.jsx
    │       ├── Documents.jsx
    │       ├── Services.jsx
    │       ├── Applications.jsx
    │       └── NameChangeForm.jsx
    └── package.json
```

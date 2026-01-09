# Admin Dashboard Setup Complete ✅

## What's Been Created

### Backend Changes

1. **Database Models Updated** (`backend/app/models.py`)
   - Added `role` field to User model (user, admin, officer)
   - Added `is_active` field for user status
   - Added `last_login` field to track login times
   - Added `assigned_officer_id` and `processing_notes` to Application model

2. **Admin Router Created** (`backend/app/routers/admin.py`)
   - Dashboard stats API
   - User management APIs (list, details, status update, role update)
   - Application management APIs (list, status update)
   - Document management APIs (list, verify/reject)

3. **Auth Updated** (`backend/app/routers/auth.py`)
   - Tracks last_login on user login
   - Includes role in JWT token

4. **Schemas Updated** (`backend/app/schemas.py`)
   - Added role, is_active, last_login to UserResponse

### Frontend Pages Created

1. **AdminDashboard.jsx** (`frontend/src/pages/admin/AdminDashboard.jsx`)
   - Overview with stats cards
   - Quick action buttons
   - Applications by service breakdown

2. **UserManagement.jsx** (`frontend/src/pages/admin/UserManagement.jsx`)
   - User list with search and filters
   - User details modal
   - Activate/Deactivate users
   - View user accounts and applications

3. **ApplicationManagement.jsx** (`frontend/src/pages/admin/ApplicationManagement.jsx`)
   - Application list with filters
   - Update application status
   - Add processing notes
   - View application details

4. **DocumentManagement.jsx** (`frontend/src/pages/admin/DocumentManagement.jsx`)
   - Document list with filters
   - Verify/Reject documents
   - View uploaded files

### Routes Added

- `/admin` - Admin Dashboard
- `/admin/users` - User Management
- `/admin/applications` - Application Management
- `/admin/documents` - Document Management

## How to Use

### 1. Create Admin User

First, you need to create an admin user manually in the database:

```bash
# Connect to EC2
ssh -i "your-key.pem" ubuntu@YOUR_EC2_IP

# Access backend container
docker-compose exec backend bash

# Open Python shell
python

# Run this code:
from app.database import SessionLocal
from app.models import User
from app.auth import get_password_hash

db = SessionLocal()

# Create admin user
admin = User(
    email="admin@portal.com",
    mobile="9999999999",
    hashed_password=get_password_hash("admin123"),
    full_name="Admin User",
    city="Gandhinagar",
    role="admin",
    is_active=1
)

db.add(admin)
db.commit()
print("Admin user created!")
exit()
```

### 2. Login as Admin

1. Go to `http://YOUR_EC2_IP/login`
2. Login with:
   - Email: `admin@portal.com`
   - Password: `admin123`

3. Navigate to: `http://YOUR_EC2_IP/admin`

### 3. Admin Features

**Dashboard:**
- View total users, applications, documents
- See pending/processing/completed counts
- Quick access to management pages

**User Management:**
- Search users by name, email, mobile
- Filter by role (user/admin/officer)
- Filter by status (active/inactive)
- View user details with all accounts
- Activate/Deactivate users

**Application Management:**
- Filter by service type (electricity/gas/water/property)
- Filter by status (pending/processing/completed/rejected)
- Update application status
- Add processing notes

**Document Management:**
- Filter by verification status
- View uploaded documents
- Verify or reject documents

## API Endpoints

### Dashboard
- `GET /api/admin/stats` - Get dashboard statistics

### User Management
- `GET /api/admin/users` - List all users (with filters)
- `GET /api/admin/users/{id}` - Get user details
- `PUT /api/admin/users/{id}/status` - Update user status
- `PUT /api/admin/users/{id}/role` - Update user role

### Application Management
- `GET /api/admin/applications` - List all applications (with filters)
- `PUT /api/admin/applications/{id}/status` - Update application status

### Document Management
- `GET /api/admin/documents` - List all documents (with filters)
- `PUT /api/admin/documents/{id}/verify` - Verify/reject document

## Security

- All admin routes require authentication
- Admin middleware checks if user.role == "admin"
- Returns 403 Forbidden if non-admin tries to access
- JWT token includes role information

## Next Steps

1. **Deploy to EC2:**
   ```bash
   cd unified-portal
   git add -A
   git commit -m "Add admin dashboard"
   git push origin main
   
   # On EC2
   git pull
   docker-compose down
   docker-compose up -d --build
   ```

2. **Create Admin User** (see step 1 above)

3. **Test Admin Features:**
   - Login as admin
   - Navigate to /admin
   - Test user management
   - Test application management
   - Test document verification

## Database Migration Note

Since we added new fields to existing models, you may need to:

**Option 1: Recreate Database (Development)**
```bash
# On EC2
docker-compose exec backend bash
rm unified_portal.db
python -c "from app.database import Base, engine; Base.metadata.create_all(bind=engine)"
```

**Option 2: Manual Update (Production)**
```bash
# Add columns manually
docker-compose exec backend bash
sqlite3 unified_portal.db

ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user';
ALTER TABLE users ADD COLUMN is_active INTEGER DEFAULT 1;
ALTER TABLE users ADD COLUMN last_login TIMESTAMP;
ALTER TABLE applications ADD COLUMN assigned_officer_id INTEGER;
ALTER TABLE applications ADD COLUMN processing_notes TEXT;
```

## Color Scheme

Admin dashboard uses professional colors:
- Primary: Blue (#0EA5E9)
- Success: Green (#10B981)
- Warning: Orange (#F59E0B)
- Danger: Red (#EF4444)
- Info: Purple (#8B5CF6)

## Features Summary

✅ Dashboard with statistics
✅ User management (list, search, filter, activate/deactivate)
✅ Application management (list, filter, update status)
✅ Document verification (list, verify/reject)
✅ Role-based access control
✅ Responsive design
✅ Clean professional UI
✅ Pagination on all lists
✅ Real-time data updates

---

**Admin Dashboard is ready to use!** 🎉

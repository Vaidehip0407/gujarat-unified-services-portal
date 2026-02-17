"""
Admin Panel API Routes
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from typing import List, Optional
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt
from ..database import get_db
from ..models_admin import (
    AdminUser, Package, AIRecommendation, AdminAuditLog, 
    SystemSetting, BadgeRule, AdminRole
)
from ..models import User, Application, ApplicationStatus
from pydantic import BaseModel

router = APIRouter(prefix="/api/admin", tags=["admin"])

# Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/admin/login")

SECRET_KEY = "your-secret-key-change-in-production"  # TODO: Move to env
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 480  # 8 hours

# ============================================
# PYDANTIC SCHEMAS
# ============================================

class AdminLoginRequest(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    admin: dict

class DashboardStats(BaseModel):
    total_users: int
    active_applications: int
    total_revenue: float
    pending_reviews: int
    active_grants: int
    support_tickets: int
    revenue_growth: float
    user_growth: float

class PackageCreate(BaseModel):
    name: str
    subtitle: Optional[str]
    description: Optional[str]
    price: float
    services_included: List[int]
    timeline: Optional[str]
    badge_type: Optional[str]
    badge_text: Optional[str]

class PackageUpdate(BaseModel):
    name: Optional[str]
    subtitle: Optional[str]
    price: Optional[float]
    services_included: Optional[List[int]]
    timeline: Optional[str]
    badge_type: Optional[str]
    badge_text: Optional[str]
    is_active: Optional[bool]
    priority_order: Optional[int]

class ApplicationUpdate(BaseModel):
    status: Optional[str]
    assigned_to: Optional[int]
    notes: Optional[str]

# ============================================
# AUTHENTICATION HELPERS
# ============================================

def verify_password(plain_password, hashed_password):
    import hashlib
    # First try SHA256 (for demo admin)
    sha256_hash = hashlib.sha256(plain_password.encode()).hexdigest()
    if sha256_hash == hashed_password:
        return True
    
    # Then try bcrypt
    try:
        return pwd_context.verify(plain_password, hashed_password)
    except:
        return False

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_admin_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    admin = db.query(AdminUser).filter(AdminUser.username == username).first()
    if admin is None:
        raise credentials_exception
    return admin

# ============================================
# AUTHENTICATION ENDPOINTS
# ============================================

@router.post("/login", response_model=Token)
async def admin_login(login_data: AdminLoginRequest, db: Session = Depends(get_db)):
    """Admin login endpoint"""
    admin = db.query(AdminUser).filter(AdminUser.username == login_data.username).first()
    
    if not admin or not verify_password(login_data.password, admin.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    if not admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin account is disabled"
        )
    
    # Update last login
    admin.last_login = datetime.utcnow()
    db.commit()
    
    # Create access token
    access_token = create_access_token(data={"sub": admin.username})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "admin": {
            "id": admin.id,
            "username": admin.username,
            "email": admin.email,
            "role": admin.role
        }
    }

@router.post("/create-admin")
async def create_admin_user(username: str, email: str, password: str, db: Session = Depends(get_db)):
    """Create first admin user (disable this in production)"""
    # Check if admin already exists
    existing = db.query(AdminUser).filter(AdminUser.username == username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Admin already exists")
    
    admin = AdminUser(
        username=username,
        email=email,
        password_hash=get_password_hash(password),
        role=AdminRole.SUPER_ADMIN
    )
    db.add(admin)
    db.commit()
    
    return {"message": "Admin created successfully"}

# ============================================
# DASHBOARD
# ============================================

@router.get("/dashboard", response_model=DashboardStats)
async def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin_user)
):
    """Get dashboard statistics"""
    
    # Total users
    total_users = db.query(func.count(User.id)).scalar()
    
    # Users from last month for growth calculation
    last_month = datetime.utcnow() - timedelta(days=30)
    users_last_month = db.query(func.count(User.id)).filter(
        User.created_at >= last_month
    ).scalar()
    
    # Active applications
    active_applications = db.query(func.count(Application.id)).filter(
        Application.status.in_([
            ApplicationStatus.PENDING,
            ApplicationStatus.PROCESSING,
            ApplicationStatus.SUBMITTED
        ])
    ).scalar()
    
    # Pending reviews
    pending_reviews = db.query(func.count(Application.id)).filter(
        Application.status == ApplicationStatus.PENDING
    ).scalar()
    
    # Total revenue (mock for now - add payment table later)
    total_revenue = 0
    revenue_last_month = 0
    
    # Calculate growth percentages
    revenue_growth = (revenue_last_month / total_revenue * 100) if total_revenue > 0 else 0
    user_growth = (users_last_month / total_users * 100) if total_users > 0 else 0
    
    return DashboardStats(
        total_users=total_users,
        active_applications=active_applications,
        total_revenue=float(total_revenue),
        pending_reviews=pending_reviews,
        active_grants=0,  # TODO: Implement grants count
        support_tickets=0,  # TODO: Implement support tickets
        revenue_growth=round(revenue_growth, 2),
        user_growth=round(user_growth, 2)
    )

# ============================================
# USER MANAGEMENT
# ============================================

@router.get("/users")
async def get_users(
    skip: int = 0,
    limit: int = 50,
    search: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin_user)
):
    """Get all users with filters"""
    query = db.query(User)
    
    if search:
        query = query.filter(
            (User.email.contains(search)) | 
            (User.full_name.contains(search))
        )
    
    if status == "active":
        query = query.filter(User.is_active == True)
    elif status == "blocked":
        query = query.filter(User.is_active == False)
    
    total = query.count()
    users = query.offset(skip).limit(limit).all()
    
    return {
        "total": total,
        "users": users
    }

@router.get("/users/{user_id}")
async def get_user_detail(
    user_id: int,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin_user)
):
    """Get detailed user information"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Get user's applications
    applications = db.query(Application).filter(
        Application.user_id == user_id
    ).all()
    
    # Get user's payments (mock for now)
    payments = []
    
    return {
        "user": user,
        "applications": applications,
        "payments": payments,
        "total_spent": 0
    }

@router.put("/users/{user_id}/block")
async def block_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin_user)
):
    """Block/Unblock a user"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_active = not user.is_active
    db.commit()
    
    # Log action
    log_audit(db, current_admin.id, "user_block_toggle", "user", user_id, 
              {"is_active": not user.is_active}, {"is_active": user.is_active})
    
    return {"message": f"User {'blocked' if not user.is_active else 'unblocked'} successfully"}

def log_audit(db: Session, admin_id: int, action: str, entity_type: str, 
              entity_id: int, old_value: dict, new_value: dict):
    """Log admin action"""
    log = AdminAuditLog(
        admin_id=admin_id,
        action=action,
        entity_type=entity_type,
        entity_id=entity_id,
        old_value=old_value,
        new_value=new_value
    )
    db.add(log)
    db.commit()

# ============================================
# PACKAGE MANAGEMENT
# ============================================

@router.get("/packages")
async def get_packages(
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin_user)
):
    """Get all packages"""
    packages = db.query(Package).order_by(Package.priority_order).all()
    return packages

@router.post("/packages")
async def create_package(
    package_data: PackageCreate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin_user)
):
    """Create new package"""
    package = Package(**package_data.dict())
    db.add(package)
    db.commit()
    db.refresh(package)
    
    log_audit(db, current_admin.id, "package_create", "package", package.id, None, package_data.dict())
    
    return package

@router.put("/packages/{package_id}")
async def update_package(
    package_id: int,
    package_data: PackageUpdate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin_user)
):
    """Update package"""
    package = db.query(Package).filter(Package.id == package_id).first()
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")
    
    old_data = {
        "name": package.name,
        "price": float(package.price),
        "is_active": package.is_active
    }
    
    for key, value in package_data.dict(exclude_unset=True).items():
        setattr(package, key, value)
    
    db.commit()
    
    log_audit(db, current_admin.id, "package_update", "package", package_id, 
              old_data, package_data.dict(exclude_unset=True))
    
    return package

@router.delete("/packages/{package_id}")
async def delete_package(
    package_id: int,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin_user)
):
    """Delete package"""
    package = db.query(Package).filter(Package.id == package_id).first()
    if not package:
        raise HTTPException(status_code=404, detail="Package not found")
    
    db.delete(package)
    db.commit()
    
    log_audit(db, current_admin.id, "package_delete", "package", package_id, None, None)
    
    return {"message": "Package deleted successfully"}

# ============================================
# APPLICATION MANAGEMENT
# ============================================

@router.get("/applications")
async def get_applications(
    skip: int = 0,
    limit: int = 50,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin_user)
):
    """Get all applications with filters"""
    query = db.query(Application)
    
    if status:
        query = query.filter(Application.status == status)
    
    total = query.count()
    applications = query.order_by(desc(Application.created_at)).offset(skip).limit(limit).all()
    
    return {
        "total": total,
        "applications": applications
    }

@router.get("/applications/{application_id}")
async def get_application_detail(
    application_id: int,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin_user)
):
    """Get detailed application information"""
    application = db.query(Application).filter(Application.id == application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    
    return application

@router.put("/applications/{application_id}")
async def update_application(
    application_id: int,
    update_data: ApplicationUpdate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin_user)
):
    """Update application status"""
    application = db.query(Application).filter(Application.id == application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found")
    
    old_status = application.status
    
    for key, value in update_data.dict(exclude_unset=True).items():
        setattr(application, key, value)
    
    db.commit()
    
    log_audit(db, current_admin.id, "application_update", "application", application_id,
              {"status": old_status}, {"status": application.status})
    
    return application

# ============================================
# PAYMENT MANAGEMENT (Mock for now)
# ============================================

@router.get("/payments")
async def get_payments(
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin_user)
):
    """Get all payments"""
    return {
        "total": 0,
        "payments": []
    }

@router.get("/payments/analytics")
async def get_payment_analytics(
    days: int = 30,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin_user)
):
    """Get payment analytics"""
    return {
        "total_revenue": 0,
        "transaction_count": 0,
        "daily_revenue": {}
    }

# ============================================
# AI RECOMMENDATION ANALYTICS
# ============================================

@router.get("/ai/analytics")
async def get_ai_analytics(
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin_user)
):
    """Get AI recommendation analytics"""
    total_recommendations = db.query(func.count(AIRecommendation.id)).scalar()
    accepted = db.query(func.count(AIRecommendation.id)).filter(
        AIRecommendation.was_accepted == True
    ).scalar()
    
    acceptance_rate = (accepted / total_recommendations * 100) if total_recommendations > 0 else 0
    
    # Most recommended package
    most_recommended = db.query(
        AIRecommendation.recommended_package_id,
        func.count(AIRecommendation.id).label('count')
    ).group_by(AIRecommendation.recommended_package_id).order_by(desc('count')).first()
    
    return {
        "total_recommendations": total_recommendations,
        "accepted": accepted,
        "acceptance_rate": round(acceptance_rate, 2),
        "most_recommended_package_id": most_recommended[0] if most_recommended else None
    }

# ============================================
# AUDIT LOGS
# ============================================

@router.get("/audit-logs")
async def get_audit_logs(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(get_current_admin_user)
):
    """Get audit logs"""
    logs = db.query(AdminAuditLog).order_by(desc(AdminAuditLog.created_at)).offset(skip).limit(limit).all()
    return logs

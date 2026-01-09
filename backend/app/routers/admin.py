from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import func, or_, desc
from typing import List, Optional
from datetime import datetime
from app.database import get_db
from app.models import (
    User, Application, Document, ElectricityAccount, 
    GasAccount, WaterAccount, PropertyAccount, ApplicationStatus
)
from app.auth import get_current_user
from app.schemas import UserResponse

router = APIRouter(prefix="/api/admin", tags=["Admin"])

# Middleware to check admin role
def require_admin(current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(403, "Admin access required")
    return current_user

# ============= DASHBOARD STATS =============
@router.get("/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    """Get dashboard statistics"""
    total_users = db.query(func.count(User.id)).scalar()
    active_users = db.query(func.count(User.id)).filter(User.is_active == 1).scalar()
    total_applications = db.query(func.count(Application.id)).scalar()
    pending_applications = db.query(func.count(Application.id)).filter(
        Application.status == ApplicationStatus.PENDING
    ).scalar()
    processing_applications = db.query(func.count(Application.id)).filter(
        Application.status == ApplicationStatus.PROCESSING
    ).scalar()
    completed_applications = db.query(func.count(Application.id)).filter(
        Application.status == ApplicationStatus.COMPLETED
    ).scalar()
    total_documents = db.query(func.count(Document.id)).scalar()
    verified_documents = db.query(func.count(Document.id)).filter(Document.is_verified == 1).scalar()
    
    # Applications by service type
    apps_by_service = db.query(
        Application.service_type,
        func.count(Application.id).label('count')
    ).group_by(Application.service_type).all()
    
    return {
        "users": {
            "total": total_users,
            "active": active_users,
            "inactive": total_users - active_users
        },
        "applications": {
            "total": total_applications,
            "pending": pending_applications,
            "processing": processing_applications,
            "completed": completed_applications
        },
        "documents": {
            "total": total_documents,
            "verified": verified_documents,
            "unverified": total_documents - verified_documents
        },
        "by_service": {str(item[0]): item[1] for item in apps_by_service}
    }

# ============= USER MANAGEMENT =============
@router.get("/users")
def get_all_users(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    search: Optional[str] = None,
    role: Optional[str] = None,
    status: Optional[str] = None,
    city: Optional[str] = None,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    """Get all users with filters and pagination"""
    query = db.query(User)
    
    # Search filter
    if search:
        query = query.filter(
            or_(
                User.full_name.ilike(f"%{search}%"),
                User.email.ilike(f"%{search}%"),
                User.mobile.ilike(f"%{search}%")
            )
        )
    
    # Role filter
    if role:
        query = query.filter(User.role == role)
    
    # Status filter
    if status:
        is_active = 1 if status == "active" else 0
        query = query.filter(User.is_active == is_active)
    
    # City filter
    if city:
        query = query.filter(User.city == city)
    
    # Get total count
    total = query.count()
    
    # Pagination
    users = query.order_by(desc(User.created_at)).offset(skip).limit(limit).all()
    
    return {
        "total": total,
        "users": users,
        "page": skip // limit + 1,
        "pages": (total + limit - 1) // limit
    }

@router.get("/users/{user_id}")
def get_user_details(
    user_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    """Get complete user details"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(404, "User not found")
    
    # Get all related data
    electricity_accounts = db.query(ElectricityAccount).filter(
        ElectricityAccount.user_id == user_id
    ).all()
    gas_accounts = db.query(GasAccount).filter(GasAccount.user_id == user_id).all()
    water_accounts = db.query(WaterAccount).filter(WaterAccount.user_id == user_id).all()
    property_accounts = db.query(PropertyAccount).filter(PropertyAccount.user_id == user_id).all()
    applications = db.query(Application).filter(Application.user_id == user_id).all()
    documents = db.query(Document).filter(Document.user_id == user_id).all()
    
    return {
        "user": user,
        "accounts": {
            "electricity": electricity_accounts,
            "gas": gas_accounts,
            "water": water_accounts,
            "property": property_accounts
        },
        "applications": applications,
        "documents": documents,
        "stats": {
            "total_applications": len(applications),
            "total_documents": len(documents),
            "verified_documents": sum(1 for d in documents if d.is_verified)
        }
    }

@router.put("/users/{user_id}/status")
def update_user_status(
    user_id: int,
    is_active: bool,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    """Activate or deactivate user"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(404, "User not found")
    
    user.is_active = 1 if is_active else 0
    db.commit()
    
    return {"message": f"User {'activated' if is_active else 'deactivated'} successfully"}

@router.put("/users/{user_id}/role")
def update_user_role(
    user_id: int,
    role: str,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    """Update user role"""
    if role not in ["user", "admin", "officer"]:
        raise HTTPException(400, "Invalid role")
    
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(404, "User not found")
    
    user.role = role
    db.commit()
    
    return {"message": f"User role updated to {role}"}

# ============= APPLICATION MANAGEMENT =============
@router.get("/applications")
def get_all_applications(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    service_type: Optional[str] = None,
    status: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    """Get all applications with filters"""
    query = db.query(Application).join(User)
    
    # Service type filter
    if service_type:
        query = query.filter(Application.service_type == service_type)
    
    # Status filter
    if status:
        query = query.filter(Application.status == status)
    
    # Search by user name or email
    if search:
        query = query.filter(
            or_(
                User.full_name.ilike(f"%{search}%"),
                User.email.ilike(f"%{search}%")
            )
        )
    
    total = query.count()
    applications = query.order_by(desc(Application.created_at)).offset(skip).limit(limit).all()
    
    # Add user info to each application
    result = []
    for app in applications:
        app_dict = {
            "id": app.id,
            "service_type": app.service_type,
            "application_type": app.application_type,
            "status": app.status,
            "form_data": app.form_data,
            "external_reference": app.external_reference,
            "processing_notes": app.processing_notes,
            "submitted_at": app.submitted_at,
            "created_at": app.created_at,
            "user": {
                "id": app.user.id,
                "full_name": app.user.full_name,
                "email": app.user.email,
                "mobile": app.user.mobile
            }
        }
        result.append(app_dict)
    
    return {
        "total": total,
        "applications": result,
        "page": skip // limit + 1,
        "pages": (total + limit - 1) // limit
    }

@router.put("/applications/{app_id}/status")
def update_application_status(
    app_id: int,
    status: str,
    notes: Optional[str] = None,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    """Update application status"""
    app = db.query(Application).filter(Application.id == app_id).first()
    if not app:
        raise HTTPException(404, "Application not found")
    
    # Validate status
    valid_statuses = ["draft", "pending", "submitted", "processing", "completed", "rejected"]
    if status not in valid_statuses:
        raise HTTPException(400, f"Invalid status. Must be one of: {valid_statuses}")
    
    app.status = status
    if notes:
        app.processing_notes = notes
    app.updated_at = datetime.utcnow()
    
    db.commit()
    
    return {"message": "Application status updated successfully"}

# ============= DOCUMENT MANAGEMENT =============
@router.get("/documents")
def get_all_documents(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    verified: Optional[bool] = None,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    """Get all documents"""
    query = db.query(Document).join(User)
    
    if verified is not None:
        query = query.filter(Document.is_verified == (1 if verified else 0))
    
    total = query.count()
    documents = query.order_by(desc(Document.created_at)).offset(skip).limit(limit).all()
    
    result = []
    for doc in documents:
        result.append({
            "id": doc.id,
            "doc_type": doc.doc_type,
            "file_url": doc.file_url,
            "file_name": doc.file_name,
            "is_verified": doc.is_verified,
            "created_at": doc.created_at,
            "user": {
                "id": doc.user.id,
                "full_name": doc.user.full_name,
                "email": doc.user.email
            }
        })
    
    return {
        "total": total,
        "documents": result,
        "page": skip // limit + 1,
        "pages": (total + limit - 1) // limit
    }

@router.put("/documents/{doc_id}/verify")
def verify_document(
    doc_id: int,
    is_verified: bool,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    """Verify or reject document"""
    doc = db.query(Document).filter(Document.id == doc_id).first()
    if not doc:
        raise HTTPException(404, "Document not found")
    
    doc.is_verified = 1 if is_verified else 0
    db.commit()
    
    return {"message": f"Document {'verified' if is_verified else 'rejected'} successfully"}

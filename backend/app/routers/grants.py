from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from typing import List, Optional
from datetime import datetime, date

from app.database import get_db
from app.models_grants import Grant, GrantApplication, GrantFavorite, GrantStatus, GrantCategory, Ministry, GrantLevel, GrantApplicationStatus
from app.models import User
from app.auth import get_current_user
from pydantic import BaseModel

router = APIRouter(prefix="/api/grants", tags=["grants"])

# Pydantic schemas
class GrantResponse(BaseModel):
    id: int
    name: str
    name_hindi: Optional[str]
    scheme_number: Optional[str]
    category: str
    ministry: str
    level: str
    min_amount: Optional[float]
    max_amount: Optional[float]
    amount_display: Optional[str]
    description: Optional[str]
    eligibility_summary: Optional[str]
    status: str
    application_end_date: Optional[date]
    tags: Optional[List[str]]
    priority: int
    view_count: int
    application_count: int
    
    class Config:
        from_attributes = True

class GrantDetailResponse(GrantResponse):
    description_hindi: Optional[str]
    objective: Optional[str]
    benefits: Optional[List[str]]
    eligibility_criteria: Optional[dict]
    required_documents: Optional[List[str]]
    application_start_date: Optional[date]
    official_website: Optional[str]
    notification_pdf: Optional[str]
    guidelines_pdf: Optional[str]
    
    class Config:
        from_attributes = True

class EligibilityCheckRequest(BaseModel):
    grant_id: int
    business_type: Optional[str] = None
    category: Optional[str] = None
    sector: Optional[str] = None
    turnover: Optional[float] = None
    registration: Optional[str] = None

class EligibilityCheckResponse(BaseModel):
    eligible: bool
    score: float  # 0-100
    matching_criteria: List[str]
    missing_criteria: List[str]
    recommendation: str

class GrantApplicationRequest(BaseModel):
    grant_id: int
    form_data: dict
    uploaded_documents: List[str]

@router.get("/", response_model=List[GrantResponse])
def get_grants(
    category: Optional[str] = None,
    ministry: Optional[str] = None,
    level: Optional[str] = None,
    status: Optional[str] = None,
    min_amount: Optional[float] = None,
    max_amount: Optional[float] = None,
    search: Optional[str] = None,
    skip: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    """
    Get all grants with optional filtering
    """
    query = db.query(Grant)
    
    # Apply filters
    if category:
        try:
            query = query.filter(Grant.category == GrantCategory(category))
        except ValueError:
            pass
    
    if ministry:
        try:
            query = query.filter(Grant.ministry == Ministry(ministry))
        except ValueError:
            pass
    
    if level:
        try:
            query = query.filter(Grant.level == GrantLevel(level))
        except ValueError:
            pass
    
    if status:
        try:
            query = query.filter(Grant.status == GrantStatus(status))
        except ValueError:
            pass
    
    if min_amount is not None:
        query = query.filter(Grant.max_amount >= min_amount)
    
    if max_amount is not None:
        query = query.filter(Grant.min_amount <= max_amount)
    
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            or_(
                Grant.name.ilike(search_term),
                Grant.description.ilike(search_term),
                Grant.eligibility_summary.ilike(search_term)
            )
        )
    
    # Order by priority and status
    query = query.order_by(Grant.priority.desc(), Grant.status)
    
    # Pagination
    grants = query.offset(skip).limit(limit).all()
    
    return grants

@router.get("/{grant_id}", response_model=GrantDetailResponse)
def get_grant_detail(
    grant_id: int,
    db: Session = Depends(get_db)
):
    """
    Get detailed information about a specific grant
    """
    grant = db.query(Grant).filter(Grant.id == grant_id).first()
    
    if not grant:
        raise HTTPException(status_code=404, detail="Grant not found")
    
    # Increment view count
    grant.view_count += 1
    db.commit()
    
    return grant

@router.get("/categories/list")
def get_categories(db: Session = Depends(get_db)):
    """
    Get all grant categories with counts
    """
    categories = []
    for category in GrantCategory:
        count = db.query(Grant).filter(Grant.category == category).count()
        categories.append({
            "value": category.value,
            "name": category.name,
            "count": count
        })
    
    return categories

@router.post("/check-eligibility", response_model=EligibilityCheckResponse)
def check_eligibility(
    request: EligibilityCheckRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Check user's eligibility for a grant using AI
    This is a mock implementation - can be replaced with actual AI
    """
    grant = db.query(Grant).filter(Grant.id == request.grant_id).first()
    
    if not grant:
        raise HTTPException(status_code=404, detail="Grant not found")
    
    # Mock AI eligibility check
    matching_criteria = []
    missing_criteria = []
    score = 0
    
    criteria = grant.eligibility_criteria or {}
    
    # Check business type
    if "business_type" in criteria:
        required_types = criteria["business_type"]
        if request.business_type and request.business_type in required_types:
            matching_criteria.append(f"Business type: {request.business_type}")
            score += 30
        else:
            missing_criteria.append(f"Business type must be one of: {', '.join(required_types)}")
    
    # Check category (SC/ST/Women)
    if "category" in criteria or "owner" in criteria:
        if request.category:
            matching_criteria.append(f"Category: {request.category}")
            score += 25
        else:
            missing_criteria.append("Category/ownership requirement not met")
    
    # Check sector
    if "sector" in criteria:
        if request.sector:
            matching_criteria.append(f"Sector: {request.sector}")
            score += 20
        else:
            missing_criteria.append(f"Sector requirement: {criteria['sector']}")
    
    # Check registration
    if "registration" in criteria:
        if request.registration:
            matching_criteria.append(f"Registration: {request.registration}")
            score += 25
        else:
            missing_criteria.append(f"Registration required: {criteria['registration']}")
    
    # Determine eligibility
    eligible = score >= 50
    
    # Generate recommendation
    if eligible:
        recommendation = f"You are eligible for this grant with a {score}% match. {len(matching_criteria)} criteria met."
    else:
        recommendation = f"You may not be eligible. Only {score}% match. Please ensure you meet: {', '.join(missing_criteria[:2])}"
    
    return EligibilityCheckResponse(
        eligible=eligible,
        score=score,
        matching_criteria=matching_criteria,
        missing_criteria=missing_criteria,
        recommendation=recommendation
    )

@router.post("/apply")
def apply_for_grant(
    request: GrantApplicationRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Submit a grant application
    """
    grant = db.query(Grant).filter(Grant.id == request.grant_id).first()
    
    if not grant:
        raise HTTPException(status_code=404, detail="Grant not found")
    
    # Check if already applied
    existing = db.query(GrantApplication).filter(
        and_(
            GrantApplication.user_id == current_user.id,
            GrantApplication.grant_id == request.grant_id,
            GrantApplication.status != GrantApplicationStatus.REJECTED
        )
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="You have already applied for this grant")
    
    # Generate application number
    app_number = f"GA{datetime.now().strftime('%Y%m%d')}{current_user.id:04d}{request.grant_id:03d}"
    
    # Create application
    application = GrantApplication(
        user_id=current_user.id,
        grant_id=request.grant_id,
        application_number=app_number,
        status=GrantApplicationStatus.SUBMITTED,
        form_data=request.form_data,
        uploaded_documents=request.uploaded_documents,
        submitted_at=datetime.now(),
        timeline=[{
            "status": "submitted",
            "timestamp": datetime.now().isoformat(),
            "description": "Application submitted successfully"
        }]
    )
    
    db.add(application)
    
    # Update grant application count
    grant.application_count += 1
    
    db.commit()
    db.refresh(application)
    
    return {
        "success": True,
        "application_number": app_number,
        "message": "Application submitted successfully",
        "application_id": application.id
    }

@router.get("/applications/my")
def get_my_applications(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get current user's grant applications
    """
    applications = db.query(GrantApplication).filter(
        GrantApplication.user_id == current_user.id
    ).order_by(GrantApplication.created_at.desc()).all()
    
    result = []
    for app in applications:
        grant = db.query(Grant).filter(Grant.id == app.grant_id).first()
        result.append({
            "id": app.id,
            "application_number": app.application_number,
            "grant_name": grant.name if grant else "Unknown",
            "grant_amount": grant.amount_display if grant else None,
            "status": app.status.value,
            "submitted_at": app.submitted_at,
            "timeline": app.timeline
        })
    
    return result

@router.post("/favorites/{grant_id}")
def add_to_favorites(
    grant_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Add a grant to favorites
    """
    # Check if already favorited
    existing = db.query(GrantFavorite).filter(
        and_(
            GrantFavorite.user_id == current_user.id,
            GrantFavorite.grant_id == grant_id
        )
    ).first()
    
    if existing:
        return {"message": "Already in favorites"}
    
    favorite = GrantFavorite(
        user_id=current_user.id,
        grant_id=grant_id
    )
    
    db.add(favorite)
    db.commit()
    
    return {"message": "Added to favorites"}

@router.delete("/favorites/{grant_id}")
def remove_from_favorites(
    grant_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Remove a grant from favorites
    """
    favorite = db.query(GrantFavorite).filter(
        and_(
            GrantFavorite.user_id == current_user.id,
            GrantFavorite.grant_id == grant_id
        )
    ).first()
    
    if favorite:
        db.delete(favorite)
        db.commit()
        return {"message": "Removed from favorites"}
    
    raise HTTPException(status_code=404, detail="Not in favorites")

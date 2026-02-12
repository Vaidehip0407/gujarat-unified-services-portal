from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON, Enum, Text, Float, Boolean, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum

class GrantStatus(str, enum.Enum):
    OPEN = "open"
    CLOSED = "closed"
    UPCOMING = "upcoming"

class GrantCategory(str, enum.Enum):
    STARTUP = "startup"
    MSME = "msme"
    EXPORT = "export"
    TECHNOLOGY = "technology"
    WOMEN = "women"
    SCST = "scst"
    MINORITY = "minority"
    AGRICULTURE = "agriculture"
    MANUFACTURING = "manufacturing"

class Ministry(str, enum.Enum):
    MSME = "Ministry of MSME"
    DPIIT = "DPIIT"
    MEITY = "Ministry of Electronics and IT"
    AGRICULTURE = "Ministry of Agriculture"
    COMMERCE = "Ministry of Commerce"
    WOMEN_CHILD = "Ministry of Women and Child Development"
    SOCIAL_JUSTICE = "Ministry of Social Justice"

class GrantLevel(str, enum.Enum):
    CENTRAL = "central"
    STATE = "state"
    BOTH = "both"

class Grant(Base):
    __tablename__ = "grants"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(500), nullable=False)
    name_hindi = Column(String(500))
    scheme_number = Column(String(100))  # Official govt scheme number
    
    # Categorization
    category = Column(Enum(GrantCategory), nullable=False)
    ministry = Column(Enum(Ministry), nullable=False)
    level = Column(Enum(GrantLevel), default=GrantLevel.CENTRAL)
    
    # Financial details
    min_amount = Column(Float)  # Minimum grant amount
    max_amount = Column(Float)  # Maximum grant amount
    amount_display = Column(String(100))  # e.g., "₹10-25 Lakhs"
    
    # Description
    description = Column(Text)
    description_hindi = Column(Text)
    objective = Column(Text)
    benefits = Column(JSON)  # List of benefits
    
    # Eligibility
    eligibility_criteria = Column(JSON)  # Detailed eligibility rules
    eligibility_summary = Column(String(500))  # Short summary
    
    # Documents
    required_documents = Column(JSON)  # List of required documents
    
    # Timeline
    status = Column(Enum(GrantStatus), default=GrantStatus.OPEN)
    application_start_date = Column(Date)
    application_end_date = Column(Date)
    announcement_date = Column(Date)
    
    # Official links
    official_website = Column(String(500))
    notification_pdf = Column(String(500))
    guidelines_pdf = Column(String(500))
    
    # Metadata
    tags = Column(JSON)  # Searchable tags
    priority = Column(Integer, default=0)  # For sorting featured grants
    view_count = Column(Integer, default=0)
    application_count = Column(Integer, default=0)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    applications = relationship("GrantApplication", back_populates="grant")

class GrantApplicationStatus(str, enum.Enum):
    DRAFT = "draft"
    SUBMITTED = "submitted"
    UNDER_REVIEW = "under_review"
    DOCUMENT_VERIFICATION = "document_verification"
    APPROVED = "approved"
    REJECTED = "rejected"
    DISBURSED = "disbursed"

class GrantApplication(Base):
    __tablename__ = "grant_applications"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    grant_id = Column(Integer, ForeignKey("grants.id"), nullable=False)
    
    # Application details
    application_number = Column(String(50), unique=True, index=True)
    status = Column(Enum(GrantApplicationStatus), default=GrantApplicationStatus.DRAFT)
    
    # Eligibility
    eligibility_score = Column(Float)  # 0-100 score from AI
    eligibility_details = Column(JSON)  # Detailed matching criteria
    ai_recommendation = Column(Text)  # AI explanation
    
    # Form data
    form_data = Column(JSON)  # All form fields
    uploaded_documents = Column(JSON)  # Document references
    
    # Processing
    submitted_at = Column(DateTime(timezone=True))
    reviewed_at = Column(DateTime(timezone=True))
    approved_at = Column(DateTime(timezone=True))
    rejected_at = Column(DateTime(timezone=True))
    
    # Officer details
    assigned_officer_id = Column(Integer)
    officer_comments = Column(Text)
    rejection_reason = Column(Text)
    
    # Timeline tracking
    timeline = Column(JSON)  # Array of status changes with timestamps
    
    # Disbursement
    approved_amount = Column(Float)
    disbursement_date = Column(Date)
    disbursement_reference = Column(String(100))
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    grant = relationship("Grant", back_populates="applications")
    user = relationship("User", foreign_keys=[user_id])

class GrantFavorite(Base):
    """User's saved/favorited grants"""
    __tablename__ = "grant_favorites"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    grant_id = Column(Integer, ForeignKey("grants.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", foreign_keys=[user_id])
    grant = relationship("Grant", foreign_keys=[grant_id])

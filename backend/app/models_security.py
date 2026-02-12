from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON, Enum, Text, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum

class UserRole(str, enum.Enum):
    USER = "user"
    OFFICER = "officer"
    VERIFIER = "verifier"
    ADMIN = "admin"

class AuditAction(str, enum.Enum):
    # User actions
    LOGIN = "login"
    LOGOUT = "logout"
    REGISTER = "register"
    
    # Document actions
    DOCUMENT_UPLOAD = "document_upload"
    DOCUMENT_VIEW = "document_view"
    DOCUMENT_DOWNLOAD = "document_download"
    DOCUMENT_DELETE = "document_delete"
    
    # Grant actions
    GRANT_VIEW = "grant_view"
    GRANT_SEARCH = "grant_search"
    GRANT_APPLY = "grant_apply"
    ELIGIBILITY_CHECK = "eligibility_check"
    
    # Application actions
    APPLICATION_SUBMIT = "application_submit"
    APPLICATION_VIEW = "application_view"
    APPLICATION_UPDATE = "application_update"
    APPLICATION_REVIEW = "application_review"
    APPLICATION_APPROVE = "application_approve"
    APPLICATION_REJECT = "application_reject"
    
    # Admin actions
    USER_ROLE_CHANGE = "user_role_change"
    GRANT_CREATE = "grant_create"
    GRANT_UPDATE = "grant_update"
    GRANT_DELETE = "grant_delete"

class SecurityAlertType(str, enum.Enum):
    DUPLICATE_DOCUMENT = "duplicate_document"
    MULTIPLE_APPLICATIONS = "multiple_applications"
    SUSPICIOUS_ACTIVITY = "suspicious_activity"
    FAILED_LOGIN_ATTEMPTS = "failed_login_attempts"
    UNAUTHORIZED_ACCESS = "unauthorized_access"
    DOCUMENT_TAMPERING = "document_tampering"

class UserRoleModel(Base):
    """User roles for RBAC"""
    __tablename__ = "user_roles"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.USER)
    assigned_by = Column(Integer, ForeignKey("users.id"))
    assigned_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # For officers - department assignment
    department = Column(String(100))
    permissions = Column(JSON)  # Additional granular permissions
    
    user = relationship("User", foreign_keys=[user_id])

class AuditLog(Base):
    """Comprehensive audit trail for all actions"""
    __tablename__ = "audit_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Who
    user_id = Column(Integer, ForeignKey("users.id"))
    user_email = Column(String(255))
    user_role = Column(String(50))
    
    # What
    action = Column(Enum(AuditAction), nullable=False)
    resource_type = Column(String(100))  # grant, application, document, etc.
    resource_id = Column(Integer)
    
    # Details
    description = Column(Text)
    changes = Column(JSON)  # Before/after state for updates
    meta_data = Column(JSON)  # Additional context (renamed from metadata to avoid SQLAlchemy conflict)
    
    # When
    timestamp = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    
    # Where
    ip_address = Column(String(50))
    user_agent = Column(String(500))
    location = Column(String(200))  # City, State from IP
    
    # Result
    success = Column(Boolean, default=True)
    error_message = Column(Text)
    
    user = relationship("User", foreign_keys=[user_id])

class DocumentSecurity(Base):
    """Document encryption and access tracking"""
    __tablename__ = "document_security"
    
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"), nullable=False)
    
    # Encryption
    encryption_key_hash = Column(String(255))  # Hash of encryption key
    file_hash = Column(String(255))  # SHA-256 hash of file content
    is_encrypted = Column(Boolean, default=False)
    
    # Access control
    access_token = Column(String(500))  # Time-limited access token
    token_expires_at = Column(DateTime(timezone=True))
    
    # Watermarking
    has_watermark = Column(Boolean, default=False)
    watermark_text = Column(String(255))
    
    # Access tracking
    view_count = Column(Integer, default=0)
    download_count = Column(Integer, default=0)
    last_accessed_at = Column(DateTime(timezone=True))
    last_accessed_by = Column(Integer, ForeignKey("users.id"))
    
    # Verification
    is_verified = Column(Boolean, default=False)
    verified_by = Column(Integer, ForeignKey("users.id"))
    verified_at = Column(DateTime(timezone=True))
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    document = relationship("Document", foreign_keys=[document_id])

class SecurityAlert(Base):
    """Security alerts and fraud detection"""
    __tablename__ = "security_alerts"
    
    id = Column(Integer, primary_key=True, index=True)
    
    # Alert details
    alert_type = Column(Enum(SecurityAlertType), nullable=False)
    severity = Column(String(20))  # low, medium, high, critical
    
    # Related entities
    user_id = Column(Integer, ForeignKey("users.id"))
    resource_type = Column(String(100))
    resource_id = Column(Integer)
    
    # Description
    title = Column(String(500))
    description = Column(Text)
    details = Column(JSON)  # Additional context
    
    # Status
    is_resolved = Column(Boolean, default=False)
    resolved_by = Column(Integer, ForeignKey("users.id"))
    resolved_at = Column(DateTime(timezone=True))
    resolution_notes = Column(Text)
    
    # Actions taken
    auto_action_taken = Column(String(200))  # e.g., "Account locked", "Document flagged"
    
    created_at = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    
    user = relationship("User", foreign_keys=[user_id])

class LoginAttempt(Base):
    """Track login attempts for security"""
    __tablename__ = "login_attempts"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), index=True)
    ip_address = Column(String(50))
    user_agent = Column(String(500))
    
    success = Column(Boolean, default=False)
    failure_reason = Column(String(200))
    
    timestamp = Column(DateTime(timezone=True), server_default=func.now(), index=True)

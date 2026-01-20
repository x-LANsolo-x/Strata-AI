"""
Startup Profile & Settings Endpoints
"""
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

from app.api.v1.deps import get_current_user
from app.models.user import User

router = APIRouter()


# ============== Schemas ==============

class CreateStartupInput(BaseModel):
    name: str
    industry: Optional[str] = "Technology"
    stage: Optional[str] = "mvp"
    description: Optional[str] = None
    team_size: Optional[int] = 1
    initial_cash_balance: Optional[float] = None
    initial_monthly_expenses: Optional[float] = None
    initial_monthly_revenue: Optional[float] = None
    goals: Optional[List[str]] = None


class StartupProfile(BaseModel):
    id: str
    name: str
    industry: str
    stage: str
    description: Optional[str] = None
    team_size: int
    initial_cash_balance: Optional[float] = None
    initial_monthly_expenses: Optional[float] = None
    initial_monthly_revenue: Optional[float] = None
    goals: Optional[List[str]] = None
    created_at: datetime
    updated_at: datetime


class UserSettings(BaseModel):
    notifications_enabled: bool = True
    email_reports: bool = False
    theme: str = "light"
    llm_provider: str = "groq"


class UpdateSettingsInput(BaseModel):
    notifications_enabled: Optional[bool] = None
    email_reports: Optional[bool] = None
    theme: Optional[str] = None
    llm_provider: Optional[str] = None


# In-memory storage (in production, use MongoDB)
startup_profiles = {}
user_settings = {}


# ============== Startup Profile Endpoints ==============

@router.post("/profile", response_model=StartupProfile)
async def create_startup_profile(
    input: CreateStartupInput,
    current_user: User = Depends(get_current_user)
):
    """Create a startup profile for the current user."""
    user_id = str(current_user.id)
    
    now = datetime.utcnow()
    profile = StartupProfile(
        id=user_id,
        name=input.name,
        industry=input.industry or "Technology",
        stage=input.stage or "mvp",
        description=input.description,
        team_size=input.team_size or 1,
        initial_cash_balance=input.initial_cash_balance,
        initial_monthly_expenses=input.initial_monthly_expenses,
        initial_monthly_revenue=input.initial_monthly_revenue,
        goals=input.goals,
        created_at=now,
        updated_at=now
    )
    
    startup_profiles[user_id] = profile
    return profile


@router.get("/profile", response_model=StartupProfile)
async def get_startup_profile(
    current_user: User = Depends(get_current_user)
):
    """Get the startup profile for the current user."""
    user_id = str(current_user.id)
    
    if user_id not in startup_profiles:
        raise HTTPException(status_code=404, detail="Startup profile not found")
    
    return startup_profiles[user_id]


@router.put("/profile", response_model=StartupProfile)
async def update_startup_profile(
    input: CreateStartupInput,
    current_user: User = Depends(get_current_user)
):
    """Update the startup profile for the current user."""
    user_id = str(current_user.id)
    
    if user_id not in startup_profiles:
        raise HTTPException(status_code=404, detail="Startup profile not found")
    
    existing = startup_profiles[user_id]
    
    profile = StartupProfile(
        id=user_id,
        name=input.name or existing.name,
        industry=input.industry or existing.industry,
        stage=input.stage or existing.stage,
        description=input.description or existing.description,
        team_size=input.team_size or existing.team_size,
        initial_cash_balance=input.initial_cash_balance or existing.initial_cash_balance,
        initial_monthly_expenses=input.initial_monthly_expenses or existing.initial_monthly_expenses,
        initial_monthly_revenue=input.initial_monthly_revenue or existing.initial_monthly_revenue,
        goals=input.goals or existing.goals,
        created_at=existing.created_at,
        updated_at=datetime.utcnow()
    )
    
    startup_profiles[user_id] = profile
    return profile


# ============== Settings Endpoints ==============

@router.get("/settings", response_model=UserSettings)
async def get_settings(
    current_user: User = Depends(get_current_user)
):
    """Get user settings."""
    user_id = str(current_user.id)
    
    if user_id not in user_settings:
        user_settings[user_id] = UserSettings()
    
    return user_settings[user_id]


@router.put("/settings", response_model=UserSettings)
async def update_settings(
    input: UpdateSettingsInput,
    current_user: User = Depends(get_current_user)
):
    """Update user settings."""
    user_id = str(current_user.id)
    
    if user_id not in user_settings:
        user_settings[user_id] = UserSettings()
    
    current = user_settings[user_id]
    
    updated = UserSettings(
        notifications_enabled=input.notifications_enabled if input.notifications_enabled is not None else current.notifications_enabled,
        email_reports=input.email_reports if input.email_reports is not None else current.email_reports,
        theme=input.theme or current.theme,
        llm_provider=input.llm_provider or current.llm_provider
    )
    
    user_settings[user_id] = updated
    return updated


# ============== User Info Endpoints ==============

@router.get("/me")
async def get_current_user_info(
    current_user: User = Depends(get_current_user)
):
    """Get current user info including onboarding status."""
    user_id = str(current_user.id)
    
    return {
        "id": user_id,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "is_active": current_user.is_active,
        "onboarding_completed": user_id in startup_profiles
    }


# ============== Data Export ==============

@router.get("/export")
async def export_all_data(
    current_user: User = Depends(get_current_user)
):
    """Export all user data."""
    user_id = str(current_user.id)
    
    return {
        "user": {
            "id": user_id,
            "email": current_user.email,
            "full_name": current_user.full_name
        },
        "startup_profile": startup_profiles.get(user_id),
        "settings": user_settings.get(user_id, UserSettings()),
        "exported_at": datetime.utcnow().isoformat()
    }


@router.delete("/account")
async def delete_account(
    current_user: User = Depends(get_current_user)
):
    """Delete user account and all data."""
    user_id = str(current_user.id)
    
    # Remove from in-memory storage
    if user_id in startup_profiles:
        del startup_profiles[user_id]
    if user_id in user_settings:
        del user_settings[user_id]
    
    # In production, also delete from MongoDB
    # await current_user.delete()
    
    return {
        "message": "Account deleted successfully",
        "deleted_at": datetime.utcnow().isoformat()
    }

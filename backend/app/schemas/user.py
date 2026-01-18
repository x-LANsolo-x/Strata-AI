from typing import Optional
from pydantic import BaseModel, EmailStr

# Properties to receive via API on creation
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None

# Properties to return via API (no password!)
class UserResponse(BaseModel):
    id: str # Beanie IDs are Pydantic ObjectIds, we'll serialize to string
    email: EmailStr
    full_name: Optional[str] = None
    is_active: bool

    class Config:
        from_attributes = True

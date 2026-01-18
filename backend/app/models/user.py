from typing import Optional
from datetime import datetime
from beanie import Document, Indexed
from pydantic import EmailStr, Field

class User(Document):
    email: Indexed(EmailStr, unique=True)
    hashed_password: str
    full_name: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = None

    class Settings:
        name = "users" # Collection name

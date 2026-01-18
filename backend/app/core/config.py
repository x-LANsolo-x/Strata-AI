from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"
    DEBUG: bool = False

    # Auth & DB
    SECRET_KEY: str
    MONGODB_URI: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day

    class Config:
        env_file = ".env"
        case_sensitive = True
        extra = "ignore" # Allow extra fields in .env

settings = Settings()

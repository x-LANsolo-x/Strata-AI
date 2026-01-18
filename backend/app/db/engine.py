from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.core.config import settings
from app.models.user import User

async def init_db():
    client = AsyncIOMotorClient(settings.MONGODB_URI)
    # Initialize Beanie with the User document class
    await init_beanie(database=client.strata_ai, document_models=[User])

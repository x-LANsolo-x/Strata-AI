import certifi
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.core.config import settings
from app.models.user import User
from app.models.financial import FinancialRecord

async def init_db():
    """
    Initialize MongoDB connection with Beanie ODM.
    
    SSL Configuration:
    - Uses certifi certificate bundle for SSL connections
    - If you encounter SSL errors on Windows/Python 3.14, ensure:
      1. Your IP is whitelisted in MongoDB Atlas (Network Access)
      2. Your MongoDB Atlas cluster is running
      3. Connection string in .env is correct
    """
    client = AsyncIOMotorClient(
        settings.MONGODB_URI, 
        tlsCAFile=certifi.where()
    )
    await init_beanie(
        database=client.strata_ai,
        document_models=[User, FinancialRecord]
    )

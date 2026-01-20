"""
Database Engine - Optimized MongoDB Connection with Connection Pooling
"""
import certifi
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.core.config import settings
from app.models.user import User
from app.models.financial import FinancialRecord
import logging

logger = logging.getLogger(__name__)

# Global client instance for connection reuse
_client: AsyncIOMotorClient | None = None


async def init_db():
    """
    Initialize MongoDB connection with Beanie ODM.
    
    Optimizations:
    - Connection pooling with min/max pool size
    - Server selection timeout for faster failover
    - Compression enabled for reduced bandwidth
    - Retry writes enabled for reliability
    """
    global _client
    
    # Connection pool settings optimized for production
    _client = AsyncIOMotorClient(
        settings.MONGODB_URI,
        tlsCAFile=certifi.where(),
        # Connection pool settings
        minPoolSize=5,           # Minimum connections to keep open
        maxPoolSize=50,          # Maximum connections
        maxIdleTimeMS=30000,     # Close idle connections after 30s
        # Timeout settings
        connectTimeoutMS=10000,  # Connection timeout: 10s
        serverSelectionTimeoutMS=10000,  # Server selection: 10s
        socketTimeoutMS=20000,   # Socket timeout: 20s
        # Performance settings
        compressors=["zstd", "snappy", "zlib"],  # Enable compression
        retryWrites=True,        # Retry failed writes
        retryReads=True,         # Retry failed reads
        w="majority",            # Write concern for data safety
    )
    
    await init_beanie(
        database=_client.strata_ai,
        document_models=[User, FinancialRecord]
    )
    
    logger.info("MongoDB connection pool initialized")


async def close_db():
    """
    Close database connection gracefully.
    Called during application shutdown.
    """
    global _client
    if _client:
        _client.close()
        _client = None
        logger.info("MongoDB connection closed")


def get_client() -> AsyncIOMotorClient:
    """Get the current database client instance."""
    if _client is None:
        raise RuntimeError("Database not initialized. Call init_db() first.")
    return _client


def get_database():
    """Get the database instance for direct queries if needed."""
    return get_client().strata_ai

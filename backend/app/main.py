"""
STRATA-AI Backend - Optimized for Production
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import ORJSONResponse
from app.core.config import settings
from app.db.engine import init_db, close_db
from app.api.v1.endpoints import auth, financials, ai, forecast, scenarios, roadmaps
import time
import logging

# Configure logging
logging.basicConfig(level=logging.INFO if not settings.DEBUG else logging.DEBUG)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifecycle manager for startup/shutdown events.
    Handles database connection pooling efficiently.
    """
    # Startup
    logger.info("Starting STRATA-AI API...")
    await init_db()
    logger.info("Database connected successfully")
    yield
    # Shutdown
    logger.info("Shutting down STRATA-AI API...")
    await close_db()
    logger.info("Database connection closed")


# Use ORJSONResponse for faster JSON serialization (2-3x faster than standard json)
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json" if settings.DEBUG else None,  # Disable in prod
    docs_url="/docs" if settings.DEBUG else None,  # Disable Swagger in prod
    redoc_url="/redoc" if settings.DEBUG else None,  # Disable ReDoc in prod
    lifespan=lifespan,
    debug=settings.DEBUG,
    default_response_class=ORJSONResponse,  # Faster JSON responses
)

# GZip compression for responses > 500 bytes (reduces bandwidth significantly)
app.add_middleware(GZipMiddleware, minimum_size=500)

# CORS Configuration - Production ready
origins = [
    "http://localhost:5173",  # Vite dev
    "http://localhost:3000",  # React dev
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]

# Add production frontend URL from environment
if settings.FRONTEND_URL:
    origins.append(settings.FRONTEND_URL)

# Allow all origins in development
if settings.ENVIRONMENT == "development":
    origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    max_age=86400,  # Cache preflight requests for 24 hours
)


# Request timing middleware (useful for performance monitoring)
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.perf_counter()
    response = await call_next(request)
    process_time = time.perf_counter() - start_time
    response.headers["X-Process-Time"] = f"{process_time:.4f}"
    return response


# Register Routers with optimized prefixes
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(financials.router, prefix=f"{settings.API_V1_STR}/financials", tags=["financials"])
app.include_router(ai.router, prefix=f"{settings.API_V1_STR}/ai", tags=["ai"])
app.include_router(forecast.router, prefix=f"{settings.API_V1_STR}/forecast", tags=["forecast"])
app.include_router(scenarios.router, prefix=f"{settings.API_V1_STR}/scenarios", tags=["scenarios"])
app.include_router(roadmaps.router, prefix=f"{settings.API_V1_STR}/roadmaps", tags=["roadmaps"])


@app.get("/", response_class=ORJSONResponse)
async def root():
    """Root endpoint - lightweight health indicator."""
    return {"message": "STRATA-AI API", "status": "running", "version": "1.0.0"}


@app.get("/health", response_class=ORJSONResponse)
async def health_check():
    """
    Health check endpoint for load balancers and monitoring.
    Returns quickly to minimize resource usage.
    """
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "version": "1.0.0"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="127.0.0.1",
        port=8000,
        reload=settings.DEBUG,
        workers=1 if settings.DEBUG else 4,  # Multiple workers in production
        log_level="debug" if settings.DEBUG else "info",
    )

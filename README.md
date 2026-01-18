# 06_SRC Structure

## backend/
Core API services built with Python/FastAPI.

### Key Components
- **app/main.py**: Entry point. Registers routers and handles DB lifecycle.
- **app/core/**: Configuration (`config.py`) and Security (`security.py`).
- **app/db/**: Database engine (`engine.py`) and init logic.
- **app/models/**: Beanie/MongoDB documents (`user.py`, `financial.py`).
- **app/schemas/**: Pydantic models for API validation (`user.py`, `token.py`, `financial.py`).
- **app/services/**: Business logic (`runway_engine.py`).
- **app/api/v1/endpoints/**: Route handlers (`auth.py`, `financials.py`).

### Dependencies
Managed via `requirements.txt` and `venv`.
Key libs: `fastapi`, `uvicorn`, `beanie`, `motor`, `python-jose`, `passlib`.

## frontend/
(To be initialized)
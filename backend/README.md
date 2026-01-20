# 🔧 STRATA-AI Backend

FastAPI backend for the STRATA-AI startup survival and strategy assistant.

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Setup](#-setup)
- [API Endpoints](#-api-endpoints)
- [Services](#-services)
- [Testing](#-testing)
- [Environment Variables](#-environment-variables)

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **FastAPI** | 0.109+ | Async web framework |
| **Python** | 3.11+ | Runtime |
| **MongoDB** | Atlas | Database |
| **Beanie** | 1.25+ | Async ODM for MongoDB |
| **Pydantic** | 2.x | Data validation |
| **python-jose** | 3.3+ | JWT authentication |
| **bcrypt** | 4.1+ | Password hashing |
| **Groq** | 0.4+ | LLM API client |
| **scikit-learn** | 1.4+ | ML forecasting |
| **pandas** | 2.2+ | Data manipulation |

---

## 📁 Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app entry point
│   │
│   ├── api/
│   │   └── v1/
│   │       ├── deps.py         # Dependency injection (auth)
│   │       └── endpoints/
│   │           ├── auth.py     # Register, Login
│   │           ├── financials.py # Financial CRUD + runway
│   │           ├── forecast.py # Future projections
│   │           ├── scenarios.py # What-if analysis
│   │           ├── ai.py       # AI strategy suggestions
│   │           └── roadmaps.py # Execution roadmaps
│   │
│   ├── core/
│   │   ├── config.py           # Settings from .env
│   │   └── security.py         # JWT & password utils
│   │
│   ├── db/
│   │   └── engine.py           # MongoDB connection
│   │
│   ├── models/
│   │   ├── user.py             # User document model
│   │   └── financial.py        # Financial record model
│   │
│   ├── schemas/
│   │   ├── user.py             # User request/response
│   │   ├── token.py            # JWT token schema
│   │   ├── financial.py        # Financial data schemas
│   │   ├── forecast.py         # Forecast schemas
│   │   ├── scenario.py         # Scenario schemas
│   │   └── roadmap.py          # Roadmap schemas
│   │
│   └── services/
│       ├── runway_engine.py    # Burn rate & runway calc
│       ├── forecast_engine.py  # Multi-method forecasting
│       ├── scenario_engine.py  # What-if simulations
│       ├── ai_service.py       # LLM integration
│       ├── ml_forecast.py      # ML revenue prediction
│       ├── csv_service.py      # CSV import handling
│       └── roadmap_service.py  # Roadmap generation
│
├── tests/                      # Test files
├── .env.example                # Environment template
├── requirements.txt            # Python dependencies
└── README.md                   # This file
```

---

## 🚀 Setup

### 1. Create Virtual Environment

```bash
python -m venv venv

# Windows
.\venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your values:
- `MONGODB_URI` - MongoDB Atlas connection string
- `SECRET_KEY` - Random string for JWT signing (32+ chars)
- `GROQ_API_KEY` - Groq API key from [console.groq.com](https://console.groq.com)

### 4. Run the Server

```bash
# Development (with auto-reload)
uvicorn app.main:app --reload

# Production
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### 5. Access

| URL | Description |
|-----|-------------|
| http://127.0.0.1:8000 | API root |
| http://127.0.0.1:8000/docs | Swagger UI (interactive) |
| http://127.0.0.1:8000/redoc | ReDoc documentation |
| http://127.0.0.1:8000/health | Health check |

---

## 📚 API Endpoints

### 🔐 Authentication (`/api/v1/auth`)

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/register` | POST | ❌ | Register new user |
| `/login` | POST | ❌ | Login (returns JWT token) |

**Register Request:**
```json
{
  "email": "founder@startup.com",
  "password": "SecurePass123!",
  "full_name": "Jane Founder"
}
```

**Login Request:** (form-urlencoded)
```
username=founder@startup.com&password=SecurePass123!
```

**Login Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer"
}
```

---

### 💰 Financials (`/api/v1/financials`)

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/` | POST | ✅ | Create monthly financial record |
| `/runway` | GET | ✅ | Get current runway status |
| `/import` | POST | ✅ | Import CSV file |
| `/forecast` | GET | ✅ | ML-based revenue forecast |
| `/export` | GET | ✅ | Export all records |

**Create Financial Record:**
```json
{
  "month": "2025-03",
  "revenue_recurring": 5000,
  "revenue_one_time": 500,
  "expenses_salaries": 6000,
  "expenses_marketing": 1000,
  "expenses_infrastructure": 500,
  "expenses_other": 200,
  "cash_balance": 50000
}
```

**Runway Response:**
```json
{
  "current_month": "2025-03",
  "cash_balance": 50000,
  "monthly_burn_rate": 2200,
  "runway_months": 22.7,
  "status": "Healthy"
}
```

---

### 🔮 Forecast (`/api/v1/forecast`)

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/generate` | POST | ✅ | Generate multi-period forecast |
| `/project-to-date` | POST | ✅ | Project to specific date |
| `/methods` | GET | ❌ | List available methods |

**Forecast Methods:**
- `linear` - Linear regression trend
- `moving_average` - Smoothed historical average
- `exponential_smoothing` - Weighted recent data
- `ensemble` - Combined methods (recommended)

**Generate Forecast Request:**
```json
{
  "periods": 6,
  "method": "ensemble"
}
```

**Forecast Response:**
```json
{
  "method_used": "ensemble",
  "forecast_generated_at": "2025-03-15T10:30:00",
  "historical_months": 6,
  "forecast_months": 6,
  "projections": [
    {
      "month": "2025-04",
      "predicted_revenue": 6500,
      "predicted_expenses": 7800,
      "predicted_cash_balance": 48700,
      "predicted_burn_rate": 1300,
      "predicted_runway_months": 37.5,
      "confidence_lower": 5800,
      "confidence_upper": 7200,
      "risk_level": "low"
    }
  ],
  "summary": {
    "current_cash_balance": 50000,
    "average_predicted_burn_rate": 1500,
    "final_predicted_cash_balance": 41000,
    "final_predicted_runway_months": 27.3,
    "critical_runway_month": null,
    "trend": "improving",
    "recommendation": "Growth metrics trending positive. Consider strategic investments."
  }
}
```

---

### 🎯 Scenarios (`/api/v1/scenarios`)

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/simulate` | POST | ✅ | Run single what-if scenario |
| `/compare` | POST | ✅ | Compare multiple scenarios |
| `/templates` | GET | ❌ | Get pre-built templates |
| `/baseline` | GET | ✅ | Get current baseline |

**Scenario Types:**
- `hire_employee` - Test hiring impact
- `change_marketing` - Adjust marketing spend
- `change_pricing` - Revenue change from pricing
- `lose_customer` - Customer churn impact
- `receive_investment` - Funding round impact
- `cut_expenses` - Cost reduction
- `custom` - Custom scenario

**Simulate Request:**
```json
{
  "scenario_type": "hire_employee",
  "name": "Hire Senior Developer",
  "new_salary": 8000,
  "num_hires": 1
}
```

**Compare Request:**
```json
{
  "scenarios": [
    {
      "scenario_type": "hire_employee",
      "name": "Hire Developer",
      "new_salary": 6000,
      "num_hires": 1
    },
    {
      "scenario_type": "receive_investment",
      "name": "Seed Round",
      "investment_amount": 250000
    }
  ]
}
```

---

### 💡 AI (`/api/v1/ai`)

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/suggest-strategy` | POST | ✅ | Get AI-generated pivot strategies |

**Response:**
```json
{
  "suggestions": [
    {
      "title": "Vertical SaaS for Logistics",
      "description": "Pivot to serve mid-market logistics companies...",
      "impact_score": 8,
      "difficulty": "Medium"
    },
    {
      "title": "API-as-a-Service Model",
      "description": "Productize your backend capabilities...",
      "impact_score": 7,
      "difficulty": "Low"
    }
  ]
}
```

---

### 🗺️ Roadmaps (`/api/v1/roadmaps`)

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/` | GET | ✅ | List all roadmaps |
| `/` | POST | ✅ | Create roadmap |
| `/{id}` | GET | ✅ | Get roadmap details |
| `/{id}` | PUT | ✅ | Update roadmap |
| `/{id}` | DELETE | ✅ | Delete roadmap |

---

## ⚙️ Services

### Runway Engine (`runway_engine.py`)
Core financial calculations:
- `calculate_burn_rate(record)` → Net monthly burn
- `calculate_runway_months(cash, burn)` → Months until zero cash

### Forecast Engine (`forecast_engine.py`)
Multi-method financial forecasting:
- Linear regression
- Moving average
- Exponential smoothing
- Ensemble (weighted combination)

### Scenario Engine (`scenario_engine.py`)
What-if simulation engine:
- Baseline calculation
- Scenario impact analysis
- Multi-scenario comparison
- Risk level assessment

### AI Service (`ai_service.py`)
LLM integration for strategy suggestions:
- Groq API (Llama 3.3 70B)
- Context-aware prompting
- JSON-formatted responses

---

## 🧪 Testing

```bash
# Run all tests
python -m pytest tests/ -v

# Run with coverage
python -m pytest tests/ --cov=app --cov-report=html
```

**Test Coverage:**
- ✅ Runway calculations
- ✅ Forecast methods
- ✅ Scenario simulations
- ✅ Authentication/JWT
- ✅ Schema validation
- ✅ API endpoint structure

---

## 🔐 Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PROJECT_NAME` | ❌ | STRATA-AI | App name |
| `API_V1_STR` | ❌ | /api/v1 | API prefix |
| `ENVIRONMENT` | ❌ | development | Environment name |
| `DEBUG` | ❌ | False | Debug mode |
| `SECRET_KEY` | ✅ | - | JWT signing key |
| `MONGODB_URI` | ✅ | - | MongoDB connection |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | ❌ | 1440 | Token lifetime |
| `GROQ_API_KEY` | ✅ | - | Groq API key |
| `LLM_MODEL` | ❌ | llama-3.3-70b-versatile | LLM model |

---

## 📄 License

MIT License - see [LICENSE](../LICENSE) for details.

# 🏗️ STRATA-AI Architecture Documentation

This folder contains the complete technical architecture documentation for the STRATA-AI project.

---

## 📋 Document Index

| # | Document | Description | Lines |
|---|----------|-------------|-------|
| 1 | [01_system_overview.md](./01_system_overview.md) | High-level system architecture, components, and data flows | ~390 |
| 2 | [02_database_schema.md](./02_database_schema.md) | MongoDB collections, schemas, indexes, and relationships | ~560 |
| 3 | [03_api_specification.md](./03_api_specification.md) | Complete REST API with 40+ endpoints, request/response examples | ~1110 |
| 4 | [04_llm_integration.md](./04_llm_integration.md) | LLM abstraction layer, providers, and prompt templates | ~930 |
| 5 | [05_frontend_architecture.md](./05_frontend_architecture.md) | React component hierarchy, state management, routing | ~580 |
| 6 | [06_security_architecture.md](./06_security_architecture.md) | Authentication, authorization, and data protection | ~590 |
| 7 | [07_deployment_architecture.md](./07_deployment_architecture.md) | Infrastructure, CI/CD, and environment configuration | ~500 |

**Total:** ~4,660 lines of architecture documentation

---

## 🎯 Architecture Principles

| Principle | Description |
|-----------|-------------|
| **Separation of Concerns** | Clear boundaries between frontend, backend, and AI layers |
| **Provider Agnostic** | LLM layer abstracted to support multiple providers |
| **Stateless Backend** | No server-side sessions; JWT for authentication |
| **Free-Tier Compatible** | All components designed to run on free hosting tiers |
| **Privacy-First Option** | Support for local LLM deployment via Ollama |
| **Type Safety** | TypeScript on frontend, Python type hints on backend |
| **Async First** | All I/O operations use async patterns |

---

## 🏛️ System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                           STRATA-AI                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  FRONTEND (Vercel)              │  BACKEND (Render)                 │
│  ──────────────────             │  ────────────────                 │
│  React 19 + TypeScript          │  FastAPI + Python 3.11            │
│  Vite 7 (build tool)            │  Pydantic v2 (validation)         │
│  Tailwind CSS 4 (styling)       │  Motor (async MongoDB)            │
│  TanStack Query 5 (state)       │  HTTPX (async HTTP)               │
│  React Router 7 (routing)       │  python-jose (JWT)                │
│  Chart.js 4 (charts)            │  passlib (password hashing)       │
│  Framer Motion (animations)     │                                   │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  DATABASE (MongoDB Atlas)       │  LLM PROVIDERS                    │
│  ─────────────────────────      │  ──────────────                   │
│  • users collection             │  • Groq (default, free)           │
│  • startups collection          │  • Google Gemini (fallback)       │
│  • financials collection        │  • OpenAI (optional)              │
│  • scenarios collection         │  • Ollama (local/private)         │
│  • ideas collection             │  • Custom endpoints               │
│  • roadmaps collection          │                                   │
│  • settings collection          │                                   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Data Flow

```
User Browser
     │
     ▼
┌─────────────┐     HTTPS      ┌─────────────┐
│   React     │ ◄────────────► │   FastAPI   │
│   Frontend  │                │   Backend   │
│   (Vercel)  │                │   (Render)  │
└─────────────┘                └──────┬──────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
                    ▼                 ▼                 ▼
             ┌───────────┐    ┌───────────┐    ┌───────────┐
             │  MongoDB  │    │    LLM    │    │  External │
             │   Atlas   │    │ Providers │    │   APIs    │
             └───────────┘    └───────────┘    └───────────┘
```

---

## 🔧 Implementation Status

| Component | Status | Notes |
|-----------|--------|-------|
| System Overview | ✅ Complete | Full architecture documented |
| Database Schema | ✅ Complete | 7 collections defined |
| API Specification | ✅ Complete | 40+ endpoints specified |
| LLM Integration | ✅ Complete | 5 providers supported |
| Frontend Architecture | ✅ Complete | Component hierarchy defined |
| Security Architecture | ✅ Complete | Auth & data protection |
| Deployment Architecture | ✅ Complete | CI/CD pipelines defined |

---

## 🚀 Quick Links

### For Frontend Developers
- [Frontend Architecture](./05_frontend_architecture.md) - Component structure, hooks, services
- [API Specification](./03_api_specification.md) - Endpoints to integrate with

### For Backend Developers
- [System Overview](./01_system_overview.md) - High-level architecture
- [Database Schema](./02_database_schema.md) - MongoDB collections
- [API Specification](./03_api_specification.md) - Endpoint implementations
- [LLM Integration](./04_llm_integration.md) - AI provider implementation
- [Security Architecture](./06_security_architecture.md) - Auth implementation

### For DevOps
- [Deployment Architecture](./07_deployment_architecture.md) - Infrastructure setup
- [Security Architecture](./06_security_architecture.md) - Security requirements

---

## 📦 Key Technologies

### Frontend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI Framework |
| TypeScript | 5.9.3 | Type Safety |
| Vite | 7.2.4 | Build Tool |
| Tailwind CSS | 4.1.18 | Styling |
| TanStack Query | 5.90.19 | Server State |
| React Router | 7.12.0 | Routing |
| Chart.js | 4.5.1 | Data Visualization |
| Framer Motion | 12.26.2 | Animations |

### Backend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| Python | 3.11+ | Language |
| FastAPI | 0.109+ | API Framework |
| Pydantic | 2.0+ | Validation |
| Motor | 3.3+ | MongoDB Driver |
| python-jose | 3.3+ | JWT Auth |
| passlib | 1.7+ | Password Hashing |
| httpx | 0.26+ | HTTP Client |

### Infrastructure
| Service | Tier | Limits |
|---------|------|--------|
| Vercel | Free | 100GB bandwidth |
| Render | Free | 750 hrs/month |
| MongoDB Atlas | M0 Free | 512MB storage |
| Groq | Free | ~30 req/min |

---

## 📝 Document Conventions

- **Code Examples:** All code is production-ready and type-safe
- **Diagrams:** ASCII art for portability across viewers
- **Tables:** Used for comparisons and specifications
- **Links:** All internal links are relative

---

## Last Updated
2026-01-18T17:46:00Z

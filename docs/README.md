# 📚 STRATA-AI Documentation

Complete documentation for the STRATA-AI startup survival and strategy assistant.

---

## 📋 Documentation Index

| Document | Description |
|----------|-------------|
| [**Product Requirements (PRD)**](./prd/prd.md) | Full product requirements, user personas, features |
| [**Architecture Overview**](./architecture/README.md) | Technical architecture documentation |

---

## 🏗️ Architecture Documentation

| Document | Description |
|----------|-------------|
| [System Overview](./architecture/01_system_overview.md) | High-level architecture, components, data flows |
| [Database Schema](./architecture/02_database_schema.md) | MongoDB collections, schemas, relationships |
| [API Specification](./architecture/03_api_specification.md) | REST API endpoints, requests, responses |
| [LLM Integration](./architecture/04_llm_integration.md) | LLM abstraction, providers, prompts |
| [Frontend Architecture](./architecture/05_frontend_architecture.md) | React components, state, routing |
| [Security Architecture](./architecture/06_security_architecture.md) | Auth, authorization, data protection |
| [Deployment Architecture](./architecture/07_deployment_architecture.md) | Infrastructure, CI/CD, environments |

---

## 🚀 Quick Links

### For Developers
- [Backend README](../backend/README.md) - Setup & API reference
- [Frontend README](../frontend/README.md) - Setup & component guide
- [Main README](../README.md) - Project overview

### For Product/Business
- [PRD](./prd/prd.md) - Full product requirements
- [User Personas](./prd/prd.md#4-target-users--use-cases) - Target users
- [Features](./prd/prd.md#6-functional-requirements) - Feature specifications

---

## 🎯 Feature Requirements Summary

| ID | Feature | Status |
|----|---------|--------|
| FR-1 | User Authentication & Onboarding | ✅ Implemented |
| FR-2 | Financial Data Management | ✅ Implemented |
| FR-3 | AI Runway Predictor | ✅ Implemented |
| FR-4 | Future Condition Simulator | ✅ Implemented |
| FR-5 | What-If Scenario Analyzer | ✅ Implemented |
| FR-6 | AI Ideation & Pivot Engine | ✅ Implemented |
| FR-7 | Smart Execution Roadmaps | ✅ Implemented |
| FR-8 | Visualization Dashboard | ✅ Implemented |
| FR-9 | Hybrid LLM Provider System | ✅ Implemented |

---

## 🛠️ Tech Stack Overview

### Backend
```
FastAPI + Python 3.11+
├── MongoDB Atlas (Database)
├── Beanie ODM (Object-Document Mapper)
├── Pydantic v2 (Validation)
├── python-jose (JWT Auth)
├── Groq API (LLM)
└── scikit-learn (ML Forecasting)
```

### Frontend
```
React 19 + TypeScript
├── Vite (Build Tool)
├── TailwindCSS (Styling)
├── Zustand (State Management)
├── React Query (Server State)
├── Chart.js (Visualizations)
└── Framer Motion (Animations)
```

---

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                           STRATA-AI                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────┐              ┌─────────────────────────────┐  │
│  │    FRONTEND     │              │          BACKEND            │  │
│  │  (Vercel/CDN)   │    REST      │         (Render)            │  │
│  │                 │◄────────────►│                             │  │
│  │  React 19       │    JSON      │  FastAPI                    │  │
│  │  TypeScript     │              │  Python 3.11+               │  │
│  │  TailwindCSS    │              │                             │  │
│  │  Chart.js       │              │  ┌─────────────────────┐   │  │
│  │                 │              │  │     Services        │   │  │
│  └─────────────────┘              │  │  ┌───────────────┐  │   │  │
│                                   │  │  │ Runway Engine │  │   │  │
│                                   │  │  │ Forecast Eng. │  │   │  │
│                                   │  │  │ Scenario Eng. │  │   │  │
│                                   │  │  │ AI Service    │  │   │  │
│                                   │  │  └───────────────┘  │   │  │
│                                   │  └─────────────────────┘   │  │
│                                   └──────────────┬──────────────┘  │
│                                                  │                  │
│                          ┌───────────────────────┼──────────────┐  │
│                          │                       │              │  │
│                          ▼                       ▼              │  │
│               ┌──────────────────┐    ┌──────────────────┐     │  │
│               │  MongoDB Atlas   │    │   LLM Providers  │     │  │
│               │  (Database)      │    │                  │     │  │
│               │                  │    │  • Groq (default)│     │  │
│               │  • Users         │    │  • OpenAI        │     │  │
│               │  • Financials    │    │  • Gemini        │     │  │
│               │  • Roadmaps      │    │  • Ollama        │     │  │
│               └──────────────────┘    └──────────────────┘     │  │
│                                                                  │  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📝 Contributing to Documentation

1. All docs are in Markdown format
2. Place architecture docs in `/docs/architecture/`
3. Update this README index when adding new docs
4. Keep docs synchronized with code changes

---

## 📅 Last Updated

**2026-01-20**

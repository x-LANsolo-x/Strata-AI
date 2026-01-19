# 🏗️ STRATA-AI Architecture Documentation

This folder contains the complete technical architecture documentation for the STRATA-AI project.

## Document Index

| Document | Description |
|----------|-------------|
| [01_system_overview.md](./01_system_overview.md) | High-level system architecture, components, and data flows |
| [02_database_schema.md](./02_database_schema.md) | MongoDB collections, schemas, and relationships |
| [03_api_specification.md](./03_api_specification.md) | Complete REST API endpoints, requests, and responses |
| [04_llm_integration.md](./04_llm_integration.md) | LLM abstraction layer, providers, and prompt templates |
| [05_frontend_architecture.md](./05_frontend_architecture.md) | React component hierarchy, state management, routing |
| [06_security_architecture.md](./06_security_architecture.md) | Authentication, authorization, and data protection |
| [07_deployment_architecture.md](./07_deployment_architecture.md) | Infrastructure, CI/CD, and environment configuration |

## Architecture Principles

1. **Separation of Concerns** - Clear boundaries between frontend, backend, and AI layers
2. **Provider Agnostic** - LLM layer abstracted to support multiple providers
3. **Stateless Backend** - No server-side sessions; JWT for authentication
4. **Free-Tier Compatible** - All components designed to run on free hosting tiers
5. **Privacy-First Option** - Support for local LLM deployment via Ollama

## Quick Reference

```
┌─────────────────────────────────────────────────────────────────┐
│                         STRATA-AI                                │
├─────────────────────────────────────────────────────────────────┤
│  FRONTEND (Vercel)          │  BACKEND (Render)                 │
│  ─────────────────          │  ───────────────                  │
│  React 18 + TypeScript      │  FastAPI + Python 3.11            │
│  Tailwind CSS               │  Pydantic v2                      │
│  Chart.js                   │  Motor (async MongoDB)            │
│  React Query                │  HTTPX (async HTTP)               │
├─────────────────────────────────────────────────────────────────┤
│  DATABASE (MongoDB Atlas)   │  LLM PROVIDERS                    │
│  ─────────────────────────  │  ─────────────                    │
│  Users, Startups            │  Groq (default)                   │
│  Financials, Scenarios      │  Gemini, OpenAI                   │
│  Roadmaps, Ideas            │  Ollama (local)                   │
└─────────────────────────────────────────────────────────────────┘
```

## Last Updated
2026-01-18

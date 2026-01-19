# 🧠 DECISION LOG (AUTO-MAINTAINED)

This file records **important product, technical, and architectural decisions**.

## Rules
- Every non-trivial choice must be documented
- Focus on reasoning and trade-offs
- Prevents repeated debates and confusion

---

## ADR-001: Frontend Framework Selection

**Date:** 2026-01-18  
**Status:** ✅ Accepted

**Context:** Need to choose a frontend framework for building the STRATA-AI user interface. Must support complex data visualization, form handling, and real-time updates.

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| React | Large ecosystem, team familiarity, excellent tooling | Requires additional libraries for state |
| Vue.js | Simpler learning curve, good performance | Smaller ecosystem than React |
| Svelte | Excellent performance, less boilerplate | Newer, smaller community |
| Next.js | SSR capabilities, full-stack | Overkill for SPA, adds complexity |

**Chosen Option:** React 19 with Vite

**Reasoning:**
- Industry standard with massive ecosystem
- Excellent TypeScript support
- Rich charting library options (Chart.js, Recharts)
- Team familiarity assumed for most developers
- Vite provides fastest build times and HMR
- React 19 includes performance improvements

**Impact:** All frontend code uses React components with TypeScript. State management via TanStack Query + Zustand.

---

## ADR-002: State Management Strategy

**Date:** 2026-01-18  
**Status:** ✅ Accepted

**Context:** Need a state management approach that handles both server state (API data) and client state (UI state) effectively.

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| Redux Toolkit | Powerful, predictable | Boilerplate heavy for small apps |
| Zustand | Simple, minimal boilerplate | Less structured |
| TanStack Query | Excellent for server state | Only handles server state |
| Jotai/Recoil | Atomic state model | Learning curve |

**Chosen Option:** TanStack Query (server) + Zustand (client)

**Reasoning:**
- TanStack Query handles caching, refetching, and loading states automatically
- Zustand provides simple API for client-only state (auth token, UI preferences)
- Clear separation: server state vs. client state
- Minimal boilerplate compared to Redux
- Both libraries are lightweight

**Impact:** 
- API data fetched via `useQuery` hooks
- Auth token stored in Zustand with localStorage persistence
- No global state for component-local concerns

---

## ADR-003: Backend Framework Selection

**Date:** 2026-01-18  
**Status:** ✅ Accepted

**Context:** Need a backend framework for building REST API, handling authentication, and integrating with LLM providers.

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| FastAPI | Async, auto-docs, Pydantic validation | Python (not Node.js) |
| Express.js | Simple, JavaScript ecosystem | No built-in validation, no auto-docs |
| NestJS | Structured, TypeScript | Heavy for MVP |
| Django | Batteries included | Synchronous, heavyweight |

**Chosen Option:** FastAPI with Python 3.11+

**Reasoning:**
- Native async support for LLM API calls
- Automatic OpenAPI documentation
- Pydantic v2 provides excellent validation
- Python ecosystem superior for AI/ML integrations
- Type hints improve code quality
- Excellent performance (Starlette + Uvicorn)

**Impact:** Backend written in Python. All endpoints have automatic OpenAPI docs. Request/response validation via Pydantic models.

---

## ADR-004: Database Selection

**Date:** 2026-01-18  
**Status:** ✅ Accepted

**Context:** Need a database that supports flexible schema for startup data, works with free tier hosting, and handles document-style records.

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| MongoDB Atlas | Flexible schema, 512MB free | NoSQL learning curve |
| PostgreSQL (Supabase) | Relational, 500MB free | Schema migrations needed |
| PlanetScale | MySQL, generous free tier | Relational constraints |
| Firebase Firestore | Real-time, generous free | Vendor lock-in |

**Chosen Option:** MongoDB Atlas (M0 Free Tier)

**Reasoning:**
- Flexible schema ideal for varied startup profiles
- Document model matches data structure (nested objects)
- 512MB free tier is sufficient for MVP (~10,000 startups)
- Easy horizontal scaling path
- Motor provides excellent async Python driver

**Impact:** All data stored in MongoDB collections. Schema defined in architecture docs but not enforced by database (application-level validation).

---

## ADR-005: LLM Provider Architecture

**Date:** 2026-01-18  
**Status:** ✅ Accepted

**Context:** Need to support multiple LLM providers for AI features (ideation, roadmaps) while keeping costs at $0 and allowing user configuration.

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| Single provider (OpenAI) | Simple implementation | Costs money, no flexibility |
| Multiple providers hardcoded | More options | Code duplication |
| Provider abstraction layer | Flexible, swappable | More initial work |
| LangChain | Full framework | Heavy dependency |

**Chosen Option:** Custom provider abstraction layer with factory pattern

**Reasoning:**
- Single interface for all providers (`generate`, `stream`)
- Easy to add new providers without changing business logic
- Fallback chain handles provider failures gracefully
- Users can configure via environment variables
- Ollama support enables complete privacy (local LLM)
- Lighter than full LangChain dependency

**Impact:** 
- Default: Groq (free, fastest)
- Fallback: Gemini (free)
- Optional: OpenAI, Ollama, custom endpoints
- All configured via `.env` file

---

## ADR-006: Authentication Strategy

**Date:** 2026-01-18  
**Status:** ✅ Accepted

**Context:** Need secure authentication that works with stateless backend and supports future OAuth providers.

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| Session-based | Simple, secure | Requires server state |
| JWT | Stateless, scalable | Token management |
| OAuth only | No password management | Requires external providers |
| Firebase Auth | Full solution | Vendor lock-in |

**Chosen Option:** JWT with bcrypt password hashing

**Reasoning:**
- Stateless backend enables horizontal scaling
- JWT works well with React SPA
- bcrypt provides secure password hashing
- Can add OAuth providers later without changing architecture
- No external dependencies for core auth

**Impact:**
- Access tokens: 24-hour expiry
- Refresh tokens: 7-day expiry
- Passwords hashed with bcrypt (cost factor 12)
- Token stored in Zustand with localStorage persistence

---

## ADR-007: Styling Approach

**Date:** 2026-01-18  
**Status:** ✅ Accepted

**Context:** Need a styling solution that enables rapid UI development while maintaining consistency.

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| Tailwind CSS | Utility-first, fast development | Learning curve |
| styled-components | Component-scoped, dynamic | Bundle size |
| CSS Modules | Scoped, familiar | More files |
| Material UI | Pre-built components | Opinionated design |

**Chosen Option:** Tailwind CSS 4

**Reasoning:**
- Rapid prototyping with utility classes
- Consistent design system out of the box
- Excellent purging for small production bundles
- Works perfectly with React components
- Tailwind 4 has improved performance

**Impact:** All styling via Tailwind utility classes. Custom components use consistent spacing, colors, and typography from Tailwind config.

---

## ADR-008: Charting Library Selection

**Date:** 2026-01-18  
**Status:** ✅ Accepted

**Context:** Need charts for runway visualization, cash flow trends, and scenario comparisons.

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| Chart.js | Lightweight, sufficient features | Less customizable |
| Recharts | React-native, composable | Larger bundle |
| D3.js | Ultimate flexibility | Overkill complexity |
| Victory | Modular, React-based | Steeper learning curve |

**Chosen Option:** Chart.js with react-chartjs-2

**Reasoning:**
- Lightweight (~60KB gzipped)
- Sufficient for financial charts (line, bar, gauge)
- Good documentation
- react-chartjs-2 provides clean React integration
- Easy to customize colors and labels

**Impact:** All charts use Chart.js. Cash flow chart implemented. Runway gauge will use custom SVG + Chart.js.

---

## ADR-009: Animation Library

**Date:** 2026-01-18  
**Status:** ✅ Accepted

**Context:** Want smooth animations for page transitions and UI interactions to improve user experience.

**Options Considered:**
| Option | Pros | Cons |
|--------|------|------|
| Framer Motion | Declarative, powerful | Bundle size |
| React Spring | Physics-based | Steeper learning curve |
| CSS Transitions | Zero bundle cost | Limited capabilities |
| GSAP | Professional grade | License considerations |

**Chosen Option:** Framer Motion

**Reasoning:**
- Declarative API matches React patterns
- Easy page transitions with AnimatePresence
- Layout animations for list reordering
- Gesture support for future interactions
- Active development and community

**Impact:** Page transitions, sidebar animations, and component enter/exit animations use Framer Motion.

---

## ADR-010: Hosting Infrastructure

**Date:** 2026-01-18  
**Status:** ✅ Accepted

**Context:** Need free hosting that supports React SPA (frontend) and Python FastAPI (backend).

**Options Considered:**
| Option | Frontend | Backend |
|--------|----------|---------|
| Vercel + Render | ✅ Excellent | ✅ Good |
| Netlify + Railway | Good | Good |
| GitHub Pages + Fly.io | Limited | Good |
| Cloudflare Pages + Workers | Fast | Different runtime |

**Chosen Option:** Vercel (frontend) + Render (backend) + MongoDB Atlas (database)

**Reasoning:**
- Vercel: Best-in-class for React, global CDN, instant deploys
- Render: Good FastAPI support, 750 free hours/month
- MongoDB Atlas: 512MB free, auto-scaling path
- All have GitHub integration for CI/CD
- Combined free tiers sufficient for MVP

**Impact:**
- Frontend: Vercel with automatic preview deployments
- Backend: Render with auto-sleep (cold starts ~30s)
- Database: MongoDB Atlas M0 in same region as Render
- Cold start handling required in frontend UX

---

## Last Updated
2026-01-18T17:46:00Z

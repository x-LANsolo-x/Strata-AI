# 📘 PROJECT CONTEXT (AUTO-MAINTAINED)

This file represents the **current, shared understanding** of the project.
It evolves as decisions are made or understanding deepens.

## Rules
- Must always align with the latest PRD
- Updated automatically after design, implementation, or scope changes
- Written for humans AND AI continuity

---

## Current Understanding

**STRATA-AI** is an AI-powered startup survival and strategy assistant designed to help early-stage founders make data-driven decisions. The system provides:

1. **AI Runway Predictor** - Real-time calculation of financial runway based on cash balance and burn rate
2. **Future Condition Simulator** - Project startup health on any future date with risk assessments
3. **What-If Scenario Analyzer** - Test impact of business decisions (hiring, pricing, cost-cutting) before executing
4. **AI Ideation & Pivot Engine** - LLM-generated pivot suggestions based on founder profile and startup context
5. **Smart Execution Roadmaps** - Convert strategies into milestone-based action plans with KPIs
6. **Visualization Dashboard** - Charts for runway trend, cash flow, burn rate, scenario comparisons

**Target Users:** First-time founders, serial entrepreneurs, accelerator program managers

**Core Problem Solved:** No existing tool combines real-time financial tracking + survival prediction + AI-generated pivot strategies + executable roadmaps in a single workflow for early-stage startups.

---

## Current Phase

**🎨 Implementation Phase - UI Design System Overhaul (In Progress)**

The frontend is feature-complete with mock data. Currently undergoing a comprehensive UI redesign to match a modern financial dashboard design with:
- **Green primary theme** (`#1B8A6B`)
- **Cream backgrounds** (`#F5F5F0`)
- **Professional card styling** with subtle shadows
- **Redesigned components**: Sidebar, Header, StatCard, Charts

### Design System Status ✅ COMPLETE
| Component | Status |
|-----------|--------|
| Tailwind Config (colors, tokens) | ✅ Complete |
| Sidebar (sections, upgrade CTA) | ✅ Complete |
| Header (search, tabs, profile) | ✅ Complete |
| MainLayout (cream background) | ✅ Complete |
| StatCard (icons, new styling) | ✅ Complete |
| CashFlowChart (multi-line) | ✅ Complete |
| ExpenseBreakdown (donut) | ✅ Complete |
| RevenueComparison (bar) | ✅ Complete |
| DashboardPage (new layout) | ✅ Complete |
| Button (green theme) | ✅ Complete |
| AuthLayout (green logo, cream bg) | ✅ Complete |
| LoginPage (icons, new styling) | ✅ Complete |
| RegisterPage (icons, new styling) | ✅ Complete |
| ScenariosPage (empty states) | ✅ Complete |
| IdeationPage (hero card, form) | ✅ Complete |
| RoadmapsPage (empty states) | ✅ Complete |
| SettingsPage (5 tabbed sections) | ✅ Complete |
| ScenarioCard (type icons, badges) | ✅ Complete |
| IdeaCard (progress bar, badges) | ✅ Complete |
| RoadmapCard (progress bar, hover) | ✅ Complete |
| Modal (header/content sections) | ✅ Complete |
| ScenarioForm (icons, grid layout) | ✅ Complete |
| ErrorPage (error card, buttons) | ✅ Complete |
| OnboardingWizard (step icons) | ✅ Complete |
| RoadmapDetailPage (progress ring) | ✅ Complete |

### What's Been Built

#### Frontend (06_SRC/frontend/)
- ✅ **Project Setup:** Vite 7 + React 19 + TypeScript 5.9. Configured for Tailwind CSS 4, Vitest, and React Query 5.
- ✅ **Core Layout:** Implemented `MainLayout`, `Sidebar` (with Framer Motion animations), and `Header` components.
- ✅ **Routing:** `react-router-dom` is set up with routes for all pages, including protected routes and a custom error page.
- ✅ **Dashboard Page:** Implemented with `StatCard`, `CashFlowChart`, and `RunwayGauge` components.
- ✅ **Scenarios Page:** Implemented with a list view and an interactive creation modal.
- ✅ **AI Ideation Page:** Implemented with a form to generate mock AI ideas.
- ✅ **Roadmaps Page:** Implemented with a list view and a detail view, including a flow to generate roadmaps from ideas.
- ✅ **Settings Page:** Implemented with a tabbed interface for editing user and startup profiles.
- ✅ **User Authentication:** Full login, logout, and registration flow.
- ✅ **Onboarding:** A multi-step wizard for new users to provide initial data.

#### Implemented Components
| Component | Location | Description |
|-----------|----------|-------------|
| `App.tsx` | `/src/App.tsx` | Root component with QueryClientProvider and ModalController |
| `Router.tsx` | `/src/Router.tsx` | Route definitions with MainLayout |
| `MainLayout.tsx` | `/src/components/layout/` | Main app shell with sidebar + header |
| `Sidebar.tsx` | `/src/components/layout/` | Navigation sidebar with animated links |
| `Header.tsx` | `/src/components/layout/` | Top header with user info and logout |
| `ErrorPage.tsx` | `/src/pages/ErrorPage.tsx` | Custom error boundary for routing |
| `DashboardPage.tsx`| `/src/pages/dashboard/` | Main dashboard with metrics and charts |
| `ScenariosPage.tsx` | `/src/pages/scenarios/` | Page for viewing and creating scenarios |
| `IdeationPage.tsx` | `/src/pages/ideation/` | Page for AI idea generation |
| `RoadmapsPage.tsx` | `/src/pages/roadmaps/` | Page for viewing roadmaps |
| `RoadmapDetailPage.tsx`| `/src/pages/roadmaps/` | Page for viewing a single roadmap's details |
| `SettingsPage.tsx` | `/src/pages/settings/` | Page for user and startup settings |
| `OnboardingWizard.tsx`| `/src/pages/onboarding/` | Multi-step form for new user setup |
| `AuthLayout.tsx` | `/src/components/layout/` | Layout for authentication pages |
| `LoginPage.tsx` | `/src/pages/auth/` | User login form |
| `RegisterPage.tsx` | `/src/pages/auth/` | User registration form |
| `ProtectedRoute.tsx` | `/src/components/shared/` | Component to protect routes |
| `StatCard.tsx` | `/src/components/shared/` | Reusable metric card |
| `CashFlowChart.tsx` | `/src/components/charts/` | Line chart for cash flow |
| `RunwayGauge.tsx` | `/src/components/charts/` | Animated gauge for financial runway |
| `Button.tsx` | `/src/components/ui/` | Reusable button |
| `ScenarioCard.tsx` | `/src/components/shared/` | Card for displaying a scenario |
| `IdeaCard.tsx` | `/src/components/shared/` | Card for displaying an AI idea |
| `RoadmapCard.tsx` | `/src/components/shared/` | Card for displaying a roadmap |
| `Modal.tsx` | `/src/components/ui/` | Generic animated modal |
| `ScenarioForm.tsx` | `/src/components/forms/` | Form for creating scenarios |
| `ProfileSettingsForm.tsx`| `/src/components/forms/` | Form for editing user profile |
| `StartupProfileForm.tsx`| `/src/components/forms/` | Form for editing startup profile |
| `ModalController.tsx`| `/src/components/shared/` | Renders the currently active modal |

#### Implemented Services & Hooks
| File | Description |
|------|-------------|
| `auth.service.ts` | Mock service for login/register |
| `auth.store.ts` | Zustand store for auth state |
| `dashboard.service.ts` | Mock service for dashboard data |
| `useDashboard.ts`| React Query hook for dashboard |
| `scenario.service.ts` | Mock service for scenarios |
| `useScenarios.ts`| React Query hooks for scenarios |
| `ai.service.ts` | Mock service for AI ideation |
| `useIdeation.ts` | React Query hook for ideation |
| `roadmap.service.ts` | Mock service for roadmaps |
| `useRoadmaps.ts` | React Query hooks for roadmaps |
| `user.service.ts` | Mock service for user profile |
| `useUser.ts` | React Query hooks for user profile |
| `startup.service.ts` | Mock service for startup profile |
| `useStartup.ts` | React Query hooks for startup profile |
| `ui.store.ts` | Zustand store for UI state |

---

## Key Principles
- **Zero Budget:** All infrastructure must use free-tier services (Vercel, Render, MongoDB Atlas, Groq)
- **Hybrid LLM Architecture:** Default Groq (free), user-configurable to Gemini, OpenAI, Ollama, or custom endpoints
- **Privacy-First Option:** Ollama support for users requiring complete data privacy
- **Explainability:** All AI outputs must show reasoning (formulas, deltas, rationale)
- **MVP Focus:** Strict scope control - no feature creep beyond defined MVP features
- **Autonomous Documentation:** AI agent maintains all project documentation automatically

---

## Tech Stack Summary

... (This section remains largely the same)

---

## Navigation Structure

```
/                 → Dashboard (implemented, protected)
/scenarios        → Scenario Analyzer (implemented, protected)
/ideation         → AI Ideation (implemented, protected)
/roadmaps         → Roadmaps (implemented, protected)
/settings         → Settings (implemented, protected)
/login            → User Login (implemented, public)
/register         → User Registration (implemented, public)
/onboarding       → Onboarding Wizard (implemented, protected)
```

---

## Current Data Flow

... (This section remains largely the same, but is now more comprehensive)

---

## Test Status

**All checks passing as of 2026-01-18:**
| Check | Status | Details |
|-------|--------|---------|
| Dependencies | ✅ Pass | 301 packages, 0 vulnerabilities |
| Unit Tests | ✅ Pass | 16/16 tests passing (8 test files) |
| TypeScript | ✅ Pass | No type errors |
| ESLint | ✅ Pass | No linting errors |
| Production Build | ✅ Pass | Successfully built |
| Dev Server | ✅ Pass | HTTP 200 response |

---

## Next Steps

1. **Backend Development:** Begin implementation of the FastAPI backend, starting with project setup and the authentication endpoints.
2. **API Integration:** Replace mock services one-by-one with live API calls as backend endpoints become available.
3. **End-to-End Testing:** Add Playwright or Cypress tests for critical user flows.

---

## Last Updated
2026-01-19T21:45:00Z

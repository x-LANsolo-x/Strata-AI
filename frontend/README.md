# 🎨 STRATA-AI Frontend

React TypeScript frontend for the STRATA-AI startup survival and strategy assistant.

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Setup](#-setup)
- [Available Scripts](#-available-scripts)
- [Pages & Features](#-pages--features)
- [Component Library](#-component-library)
- [State Management](#-state-management)
- [API Integration](#-api-integration)
- [Testing](#-testing)
- [Styling](#-styling)

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.x | UI framework |
| **TypeScript** | 5.9+ | Type safety |
| **Vite** | 7.x | Build tool & dev server |
| **TailwindCSS** | 4.x | Utility-first CSS |
| **Zustand** | 5.x | State management |
| **React Query** | 5.x | Server state & caching |
| **React Router** | 7.x | Client-side routing |
| **React Hook Form** | 7.x | Form handling |
| **Zod** | 4.x | Schema validation |
| **Chart.js** | 4.x | Financial charts |
| **Framer Motion** | 12.x | Animations |
| **Lucide React** | 0.5+ | Icons |

---

## 📁 Project Structure

```
frontend/
├── public/
│   └── vite.svg
│
├── src/
│   ├── assets/                 # Static assets
│   │
│   ├── components/
│   │   ├── charts/             # Financial visualizations
│   │   │   ├── CashFlowChart.tsx
│   │   │   ├── ExpenseBreakdown.tsx
│   │   │   ├── RevenueChart.tsx
│   │   │   ├── RunwayGauge.tsx
│   │   │   └── ScenarioComparisonChart.tsx
│   │   │
│   │   ├── forms/              # Input forms
│   │   │   ├── FinancialForm.tsx
│   │   │   └── OnboardingForm.tsx
│   │   │
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MainLayout.tsx
│   │   │
│   │   ├── shared/             # Shared components
│   │   │   ├── RoadmapCard.tsx
│   │   │   ├── ScenarioCard.tsx
│   │   │   └── StrategyCard.tsx
│   │   │
│   │   └── ui/                 # Base UI components
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Input.tsx
│   │       ├── Modal.tsx
│   │       └── Loading.tsx
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useDashboard.ts
│   │   └── useScenarios.ts
│   │
│   ├── pages/                  # Route pages
│   │   ├── auth/
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   └── DashboardPage.tsx
│   │   │
│   │   ├── scenarios/
│   │   │   └── ScenariosPage.tsx
│   │   │
│   │   ├── ideation/
│   │   │   └── IdeationPage.tsx
│   │   │
│   │   ├── roadmaps/
│   │   │   ├── RoadmapsPage.tsx
│   │   │   └── RoadmapDetailPage.tsx
│   │   │
│   │   ├── onboarding/
│   │   │   ├── OnboardingWizard.tsx
│   │   │   └── SmartOnboarding.tsx
│   │   │
│   │   └── settings/
│   │       └── SettingsPage.tsx
│   │
│   ├── services/               # API layer
│   │   ├── api.client.ts       # Base HTTP client
│   │   ├── auth.service.ts     # Authentication
│   │   ├── dashboard.service.ts
│   │   ├── scenario.service.ts
│   │   ├── ai.service.ts
│   │   ├── roadmap.service.ts
│   │   └── startup.service.ts
│   │
│   ├── stores/                 # Zustand stores
│   │   ├── auth.store.ts       # Auth state
│   │   └── ui.store.ts         # UI state
│   │
│   ├── types/                  # TypeScript definitions
│   │   ├── dashboard.types.ts
│   │   ├── scenario.types.ts
│   │   ├── ideation.types.ts
│   │   ├── roadmap.types.ts
│   │   └── startup.types.ts
│   │
│   ├── App.tsx                 # Root component
│   ├── App.css                 # Global styles
│   ├── Router.tsx              # Route definitions
│   ├── main.tsx                # Entry point
│   ├── index.css               # Tailwind imports
│   └── setupTests.ts           # Test setup
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 🚀 Setup

### Prerequisites

- **Node.js 18+**
- **npm** or **yarn**

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (hot reload) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest tests |

---

## 📄 Pages & Features

### 🔐 Authentication

| Page | Route | Features |
|------|-------|----------|
| **Login** | `/login` | Email/password login, JWT storage |
| **Register** | `/register` | User registration with validation |

### 📊 Dashboard

| Page | Route | Features |
|------|-------|----------|
| **Dashboard** | `/` | Runway gauge, cash flow chart, expense breakdown, quick stats |

**Key Metrics Displayed:**
- Current runway (months)
- Monthly burn rate
- Cash balance
- Revenue trend
- Risk status indicator

### 🎯 Scenarios

| Page | Route | Features |
|------|-------|----------|
| **Scenarios** | `/scenarios` | What-if analyzer, scenario templates, comparison view |

**Scenario Types:**
- Hire employee
- Change marketing spend
- Adjust pricing
- Lose customer
- Receive investment
- Cut expenses
- Custom scenario

### 💡 AI Ideation

| Page | Route | Features |
|------|-------|----------|
| **Ideation** | `/ideation` | AI-powered pivot suggestions, strategy cards |

### 🗺️ Roadmaps

| Page | Route | Features |
|------|-------|----------|
| **Roadmaps** | `/roadmaps` | List all roadmaps, create new |
| **Detail** | `/roadmaps/:id` | View/edit roadmap, milestones, progress |

### ⚙️ Settings

| Page | Route | Features |
|------|-------|----------|
| **Settings** | `/settings` | Profile, LLM provider config, data export |

### 🎓 Onboarding

| Page | Route | Features |
|------|-------|----------|
| **Onboarding** | `/onboarding` | Multi-step wizard for new users |

---

## 🧩 Component Library

### Charts (`/components/charts/`)

| Component | Description |
|-----------|-------------|
| `RunwayGauge` | Circular gauge showing runway months |
| `CashFlowChart` | Line chart of cash over time |
| `RevenueChart` | Revenue trend visualization |
| `ExpenseBreakdown` | Pie/bar chart of expenses |
| `ScenarioComparisonChart` | Compare multiple scenarios |

### Layout (`/components/layout/`)

| Component | Description |
|-----------|-------------|
| `Header` | Top navigation with notifications |
| `Sidebar` | Left navigation menu |
| `MainLayout` | Authenticated page wrapper |

### UI (`/components/ui/`)

| Component | Description |
|-----------|-------------|
| `Button` | Styled button with variants |
| `Card` | Content container |
| `Input` | Form input with validation |
| `Modal` | Dialog/modal component |
| `Loading` | Loading spinner/skeleton |

---

## 🗃️ State Management

### Auth Store (`auth.store.ts`)

```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
}
```

**Persistence:** Token stored in localStorage (`auth-storage`)

### UI Store (`ui.store.ts`)

```typescript
interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  setTheme: (theme: string) => void;
}
```

---

## 🔌 API Integration

### API Client (`api.client.ts`)

Base HTTP client with:
- Automatic JWT token injection
- Error handling
- JSON parsing
- Form data support

```typescript
import { apiClient } from './services/api.client';

// GET request
const data = await apiClient.get<ResponseType>('/endpoint');

// POST request
const result = await apiClient.post<ResponseType>('/endpoint', payload);

// Form POST (for login)
const token = await apiClient.postForm<TokenResponse>('/auth/login', {
  username: email,
  password: password
});
```

### Services

| Service | Purpose |
|---------|---------|
| `auth.service.ts` | Login, register, logout |
| `dashboard.service.ts` | Runway, financials, metrics |
| `scenario.service.ts` | What-if simulations |
| `ai.service.ts` | Strategy suggestions |
| `roadmap.service.ts` | Roadmap CRUD |
| `startup.service.ts` | Startup profile |

---

## 🧪 Testing

### Test Setup

- **Framework:** Vitest
- **Library:** React Testing Library
- **DOM:** jsdom

### Run Tests

```bash
# Run all tests
npm test

# Run with watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage
```

### Test Files

| File | Coverage |
|------|----------|
| `App.test.tsx` | App routing & auth redirect |
| `Header.test.tsx` | Header rendering |
| `Sidebar.test.tsx` | Navigation links |
| `MainLayout.test.tsx` | Layout structure |
| `RunwayGauge.test.tsx` | Gauge component |
| `RoadmapCard.test.tsx` | Card rendering |
| `RoadmapDetailPage.test.tsx` | Detail page |
| `RegisterPage.test.tsx` | Registration form |

---

## 🎨 Styling

### TailwindCSS

Utility-first CSS framework with custom configuration.

**Configuration:** `tailwind.config.js`

### Theme Colors

```css
/* Primary colors */
--primary: #3B82F6;     /* Blue */
--success: #10B981;     /* Green */
--warning: #F59E0B;     /* Amber */
--danger: #EF4444;      /* Red */

/* Risk status colors */
--risk-low: #10B981;
--risk-medium: #F59E0B;
--risk-high: #F97316;
--risk-critical: #EF4444;
```

### Responsive Breakpoints

| Breakpoint | Width |
|------------|-------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

---

## 🌐 Environment

### Backend URL

The API client connects to:
```typescript
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';
```

For production, update this in `api.client.ts` or use environment variables.

---

## 📄 License

MIT License - see [LICENSE](../LICENSE) for details.

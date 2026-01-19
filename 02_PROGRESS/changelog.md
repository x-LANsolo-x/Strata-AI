# 🧾 CHANGELOG (AUTO-GENERATED)

This file logs **every meaningful change** in the project.

## Rules
- Append-only (never rewrite history)
- Every decision, scope change, or milestone is logged
- Used for reviews, evaluation, and retrospectives

---

## 2026-01-18

### PRD Finalized
- **What changed:** Complete Product Requirements Document created at `00_PRD/prd.md`
- **Why:** Establishes the authoritative specification for STRATA-AI
- **Impact:** Project now has clear scope, requirements, and success criteria. Ready to begin architecture and implementation.

### Project State Initialized
- **What changed:** All project memory files initialized (`context.md`, `state.json`, `tasks.md`, `changelog.md`, `history.md`)
- **Why:** Following orchestration contract for autonomous documentation
- **Impact:** AI agent can now maintain continuity across sessions; project state is fully tracked

### Architecture Documentation Complete
- **What changed:** Created comprehensive architecture folder (07_ARCHITECTURE/) with 7 detailed documents
- **Why:** Provides technical blueprint for implementation; ensures consistency across development
- **Impact:** Project ready for implementation phase; all technical decisions documented

### Frontend Foundation Built
- **What changed:** Initialized the frontend project, installed dependencies, configured tooling (Vite, Vitest, Tailwind), and created the core directory structure.
- **Why:** To create a solid, maintainable foundation for the entire user interface.
- **Impact:** The development environment is fully prepared for building UI components.

### Core UI and Routing Implemented
- **What changed:** Created the `MainLayout`, `Sidebar`, and `Header` components. Implemented application-wide routing using `react-router-dom` for all primary pages. Added animations for page transitions and sidebar navigation.
- **Why:** To establish the main application shell and navigation structure.
- **Impact:** The application now has a consistent, professional-looking layout and users can navigate between different sections.

### Initial Dashboard Implemented
- **What changed:** Built the main `DashboardPage`, including `StatCard` and `CashFlowChart` components. Implemented a mock data service and a `useDashboard` hook with React Query to fetch and display data.
- **Why:** To create the first core feature page and establish data fetching patterns.
- **Impact:** The dashboard provides a functional, albeit mocked, overview of a startup's key metrics, demonstrating the UI's data visualization capabilities.

### Runway Gauge Component Implemented
- **What changed:** Implemented the `RunwayGauge` component using Chart.js and Framer Motion, and integrated it into the `DashboardPage`. Unit tests were also added for the component.
- **Why:** To provide a dynamic and visually appealing representation of the startup's financial runway on the dashboard.
- **Impact:** The dashboard now includes a key visualization, enhancing the user's ability to quickly grasp their financial standing.

### Scenarios Page Implemented
- **What changed:** Created the `ScenariosPage`, including `scenario.types.ts`, `services/scenario.service.ts` (mock), `hooks/useScenarios.ts`, `hooks/useCreateScenario.ts`, `components/ui/Button.tsx`, and `components/shared/ScenarioCard.tsx`.
- **Why:** To provide an interface for users to view and manage what-if scenarios, a core feature of the application.
- **Impact:** The application now has a functional list view for scenarios, demonstrating data fetching and display for this crucial feature.

### Scenario Creation Form and Modal Implemented
- **What changed:** Implemented a reusable `Modal` component, a Zustand `useUiStore` for modal state management, the `ScenarioForm` with `react-hook-form` and `zod` for validation, and a `ModalController` to render active modals.
- **Why:** To allow users to create new scenarios interactively through a polished user experience.
- **Impact:** Users can now create, validate, and submit new scenarios, making the Scenarios feature fully interactive.

### AI Ideation Page Implemented
- **What changed:** Implemented the `IdeationPage`, including `ideation.types.ts`, `services/ai.service.ts` (mock), `hooks/useIdeation.ts`, `components/shared/IdeaCard.tsx`, and integrated it into the application.
- **Why:** To provide an interface for users to generate AI-powered pivot and growth ideas, a core AI-driven feature.
- **Impact:** Users can now interact with the AI Ideation Engine to get mock idea suggestions.

### Roadmaps Page Implemented
- **What changed:** Implemented the `RoadmapsPage` (list view), `RoadmapDetailPage`, `RoadmapCard`, and related services/hooks (`roadmap.types.ts`, `roadmap.service.ts`, `useRoadmaps.ts`). Also connected the Ideation page to allow generating roadmaps from ideas.
- **Why:** To allow users to view and manage execution roadmaps and link them to generated ideas.
- **Impact:** The application now supports the full flow from idea generation to viewing an actionable roadmap.

### User Authentication Flow Implemented
- **What changed:** Implemented the core user authentication flow, including `stores/auth.store.ts` (Zustand, persisted), `services/auth.service.ts` (mock login), `components/layout/AuthLayout.tsx`, `pages/auth/LoginPage.tsx`, and `components/shared/ProtectedRoute.tsx`. Also updated `Router.tsx` to include auth routes and protect main app routes, and `Header.tsx` to display user info and a logout button.
- **Why:** To establish secure user access and persist authentication state, a fundamental requirement for any real-world application.
- **Impact:** The application now has a functional login gate, persistent user sessions, and protected routes, making it feel like a more complete product.

### User Registration Flow Implemented
- **What changed:** Created the `RegisterPage` component with a registration form, updated the mock `auth.service.ts` with a `register` function, and linked it from the `LoginPage`.
- **Why:** To allow new users to sign up for the application, completing the core authentication experience.
- **Impact:** The application now supports a full (mocked) user lifecycle from registration to login to using the protected application.

### Settings Page Implemented
- **What changed:** Created the `SettingsPage` with a tabbed interface for "My Profile" and "Startup Profile". Implemented forms for updating user and startup information using mock services.
- **Why:** To allow users to manage their personal and startup-related data.
- **Impact:** The application now has a functional settings management area.

### Onboarding Wizard Implemented
- **What changed:** Created a multi-step `OnboardingWizard` component that guides new users through setting up their startup profile after registration.
- **Why:** To provide a guided and user-friendly experience for initial data collection.
- **Impact:** The application now has a complete, seamless flow for new users from registration to onboarding to using the main application.

### Comprehensive Frontend Testing & Bug Fixes
- **What changed:** Ran intensive testing on the entire frontend codebase. Fixed 3 files with type/lint errors:
  - `ScenarioForm.tsx`: Fixed Zod v4 + react-hook-form type mismatch (changed `z.coerce.number()` to `z.number()` with `valueAsNumber: true`)
  - `OnboardingWizard.tsx`: Fixed same Zod v4 type issue with number fields
  - `auth.service.ts`: Fixed unused `_password` parameter ESLint errors
- **Why:** To ensure 100% confidence in frontend code quality before backend development begins.
- **Impact:** All checks now pass:
  - ✅ 16/16 unit tests passing
  - ✅ 0 TypeScript errors
  - ✅ 0 ESLint errors  
  - ✅ Production build successful
  - ✅ Dev server runs correctly
- **Technical Note:** Zod v4 has breaking changes with `z.coerce` and `@hookform/resolvers` v5. The solution is to use plain `z.number()` and handle coercion via `valueAsNumber: true` in the form register options.

---

## 2026-01-19

### UI Design System Overhaul Started
- **What changed:** Updated `tailwind.config.js` with a comprehensive new color palette and design tokens to match a modern financial dashboard design.
- **Why:** To adopt a professional, polished UI design with green primary theme, cream backgrounds, and consistent styling.
- **Impact:** New design tokens available:
  - **Primary Green**: `#1B8A6B` (primary-500) with full shade range (50-900)
  - **Cream Background**: `#F5F5F0` (cream-100) for main page backgrounds
  - **Semantic Colors**: success (`#22c55e`), danger (`#ef4444`), warning (`#f97316`)
  - **Design Tokens**: `rounded-xl` (12px), `rounded-2xl` (16px), `shadow-card`, `shadow-card-hover`
  - **Font**: Inter as primary typeface
- **Files Modified:** `tailwind.config.js`, `07_ARCHITECTURE/05_frontend_architecture.md`

### Sidebar Component Redesigned
- **What changed:** Completely redesigned `Sidebar.tsx` with new layout, styling, and features.
- **Why:** To match the new UI design system with green theme, sectioned navigation, and upgrade CTA.
- **Impact:** New sidebar features:
  - **Logo Section**: Green icon box with "Strata-AI" text
  - **Menu Section**: Dashboard, Scenarios, Ideation, Roadmaps with section header
  - **General Section**: Settings, Help, Logout with section header
  - **Active State**: Green text + left border + light green background
  - **Upgrade Card**: Gradient card with "Upgrade Now" CTA at bottom
  - Width increased from `w-60` to `w-64`
- **Files Modified:** `Sidebar.tsx`, `MainLayout.tsx` (added cream background)

### Header Component Redesigned
- **What changed:** Completely redesigned `Header.tsx` with dynamic page configuration, search bar, tabs, and user profile.
- **Why:** To match the reference UI design with contextual headers per page.
- **Impact:** New header features:
  - **Dynamic Page Config**: Title, subtitle, tabs, and action buttons configured per route
  - **Search Bar**: Rounded search input with icon and focus states
  - **Context-Specific Action Buttons**: "New Scenario", "New Idea", "New Roadmap" based on current page
  - **Tab Navigation**: Overview, Analytics, Reports tabs with active state styling
  - **Notification Bell**: With red indicator dot
  - **User Profile**: Avatar with initials, name, email, and dropdown menu
  - **Export Button**: For data export functionality
- **Files Modified:** `Header.tsx`

### StatCard Component Redesigned
- **What changed:** Redesigned `StatCard.tsx` with icons, new styling, and warning state support. Updated `dashboard.types.ts` with new types.
- **Why:** To match the reference UI design with icon boxes and colored change indicators.
- **Impact:** New StatCard features:
  - **Icon Support**: Dynamic icon rendering with icon mapping (dollar-sign, trending-up, wallet, etc.)
  - **Three Change States**: positive (green), negative (red), warning (orange)
  - **Colored Badges**: Change indicators now have background colors with rounded corners
  - **New Styling**: `rounded-2xl`, `shadow-card`, hover effects
  - **Icon Box**: Gray background icon in top-right corner
- **Types Updated**: Added `warning` changeType, `icon` field, `ExpenseCategory`, `RevenueComparison` interfaces
- **Files Modified:** `StatCard.tsx`, `dashboard.types.ts`

### CashFlowChart Component Redesigned
- **What changed:** Completely redesigned `CashFlowChart.tsx` with multiple data lines, custom legend, and time range dropdown.
- **Why:** To match the reference UI design with Income/Expenses/Net visualization.
- **Impact:** New CashFlowChart features:
  - **Three Data Lines**: Income (green solid), Expenses (red dashed), Net (orange dashed)
  - **Custom Legend**: Colored dots with labels in header
  - **Time Range Dropdown**: "This Year", "Last Year", "Last 6 Months", "Last 3 Months"
  - **Improved Tooltips**: White background, currency formatting, multi-line display
  - **Better Styling**: Smooth curves, hover effects on points, grid customization
  - **New Card Styling**: `rounded-2xl`, `shadow-card`, clean header layout
- **Files Modified:** `CashFlowChart.tsx`

### ExpenseBreakdown Component Created
- **What changed:** Created new `ExpenseBreakdown.tsx` donut chart component.
- **Why:** To display expense categories as shown in the reference UI design.
- **Impact:** New component features:
  - **Donut Chart**: 70% cutout with green color shades
  - **Center Text**: Total expenses displayed in the middle
  - **Custom Legend**: 2-column grid showing category names and values
  - **Hover Effects**: Segments expand on hover
  - **Default Data**: Fallback data for Marketing, Operations, Services, Infrastructure
- **Files Created:** `ExpenseBreakdown.tsx`

### RevenueComparison Component Created
- **What changed:** Created new `RevenueComparison.tsx` grouped bar chart component.
- **Why:** To display year-over-year revenue comparison as shown in the reference UI design.
- **Impact:** New component features:
  - **Grouped Bar Chart**: Side-by-side bars for current vs previous year
  - **Color Scheme**: Dark green for current year, light green for previous year
  - **Custom Legend**: Year labels with colored dots in header
  - **Rounded Bars**: 4px border radius on all bars
  - **Tooltips**: Currency-formatted values on hover
  - **Default Data**: 12-month mock data for demonstration
- **Files Created:** `RevenueComparison.tsx`

### DashboardPage Layout Updated
- **What changed:** Redesigned `DashboardPage.tsx` layout to match the reference UI design.
- **Why:** To integrate all new chart components in the correct layout structure.
- **Impact:** New dashboard layout:
  - **Row 1**: 4 StatCards in a grid
  - **Row 2**: CashFlowChart (2/3 width) + ExpenseBreakdown (1/3 width)
  - **Row 3**: RevenueComparison (full width)
  - Removed RunwayGauge (replaced with new charts)
  - Updated loading spinner to use primary color
  - Updated error styling with new design tokens
- **Files Modified:** `DashboardPage.tsx`

### Button Component Updated
- **What changed:** Enhanced `Button.tsx` with green theme and additional variants/sizes.
- **Why:** To provide a comprehensive button system matching the new design.
- **Impact:** New button features:
  - **5 Variants**: primary (green), secondary (gray), outline (bordered), ghost (transparent), danger (red)
  - **3 Sizes**: sm, md, lg
  - **Green Theme**: Primary buttons now use `bg-primary-500`
  - **Rounded Corners**: All buttons use `rounded-xl`
  - **Disabled States**: opacity and cursor styling
  - **Custom className**: Support for additional styling
- **Files Modified:** `Button.tsx`

### UI Design System Overhaul Complete ✅
- **Summary:** Successfully adapted the entire frontend UI to match the reference financial dashboard design.
- **Total Files Modified:** 12 files
- **Total Files Created:** 2 files (ExpenseBreakdown.tsx, RevenueComparison.tsx)
- **Key Changes:**
  - Green primary color theme (#1B8A6B)
  - Cream background (#F5F5F0)
  - Redesigned Sidebar with sections and upgrade CTA
  - Redesigned Header with dynamic page config, search, tabs, and profile
  - New StatCard with icons and colored badges
  - Multi-line CashFlowChart with Income/Expenses/Net
  - New ExpenseBreakdown donut chart
  - New RevenueComparison bar chart
  - Updated DashboardPage layout
  - Enhanced Button component

### Auth Pages Redesigned
- **What changed:** Redesigned `AuthLayout.tsx`, `LoginPage.tsx`, and `RegisterPage.tsx` with the new green theme.
- **Why:** To provide a consistent user experience from login to dashboard.
- **Impact:** Auth pages now feature:
  - **AuthLayout**: Green logo icon, cream background, tagline, footer
  - **LoginPage**: Input fields with icons (Mail, Lock), forgot password link, green primary button
  - **RegisterPage**: Input fields with icons (User, Mail, Lock), terms of service, password requirements hint
  - Form validation errors use `text-danger` color
  - All inputs use `rounded-xl` and `focus:ring-primary-500`
- **Files Modified:** `AuthLayout.tsx`, `LoginPage.tsx`, `RegisterPage.tsx`

### All Main Pages Updated with Green Theme
- **What changed:** Updated `ScenariosPage.tsx`, `IdeationPage.tsx`, `RoadmapsPage.tsx`, and `SettingsPage.tsx`.
- **Why:** To ensure consistent styling across all application pages.
- **Impact:**
  - **ScenariosPage**: Empty state with icon and CTA, green loading spinner, styled error state
  - **IdeationPage**: Hero card with green icon, styled form with label, green submit button
  - **RoadmapsPage**: Empty state with icon and link to Ideation, green loading spinner
  - **SettingsPage**: Complete redesign with 5 tabbed sections (Profile, Startup, Notifications, Security, Appearance), toggle switches, theme selector
- **Files Modified:** `ScenariosPage.tsx`, `IdeationPage.tsx`, `RoadmapsPage.tsx`, `SettingsPage.tsx`

### Shared Card Components Updated with Green Theme
- **What changed:** Redesigned `ScenarioCard.tsx`, `IdeaCard.tsx`, and `RoadmapCard.tsx` with new styling.
- **Why:** To provide consistent card styling across all list views.
- **Impact:**
  - **ScenarioCard**: Green icon box with type-specific icons (Users for hiring, DollarSign for pricing, TrendingDown for cost-cutting), colored impact badges (success/danger), `rounded-2xl`, hover effects
  - **IdeaCard**: Green Lightbulb icon, feasibility progress bar with green fill, market opportunity badges using semantic colors, outline button with arrow animation on hover
  - **RoadmapCard**: Green GanttChart icon, duration with Clock icon, progress bar with color coding (gray → warning → primary → success), arrow animation on hover
  - All cards use `shadow-card`, `hover:shadow-card-hover`, `rounded-2xl`, group hover effects
- **Files Modified:** `ScenarioCard.tsx`, `IdeaCard.tsx`, `RoadmapCard.tsx`

### Remaining Components Updated with Green Theme
- **What changed:** Updated `Modal.tsx`, `ScenarioForm.tsx`, `ErrorPage.tsx`, `OnboardingWizard.tsx`, and `RoadmapDetailPage.tsx`.
- **Why:** To complete the UI redesign across all remaining components.
- **Impact:**
  - **Modal**: Separated header/content sections, `rounded-2xl`, close button with `rounded-xl`, improved animations
  - **ScenarioForm**: Input fields with icons (FileText, Tag, TrendingUp, TrendingDown), 2-column grid for financial inputs, outline cancel button
  - **ErrorPage**: Cream background, error card with AlertTriangle icon, error code display, "Go Back" and "Dashboard" buttons
  - **OnboardingWizard**: Complete redesign with green logo, step indicator with icons and checkmarks, emoji options in stage select, progress through steps with ChevronRight, success state with CheckCircle
  - **RoadmapDetailPage**: Header card with circular progress ring, back link, phase cards with progress bars, task items with hover states, phase completion indicators
- **Files Modified:** `Modal.tsx`, `ScenarioForm.tsx`, `ErrorPage.tsx`, `OnboardingWizard.tsx`, `RoadmapDetailPage.tsx`

### UI Redesign 100% Complete ✅
- **Summary:** All frontend components have been updated with the green theme.
- **Total Components Updated:** 25+
- **Design Consistency:** All components now use:
  - Primary green (`#1B8A6B`)
  - Cream background (`#F5F5F0`)
  - `rounded-xl` / `rounded-2xl` corners
  - `shadow-card` / `shadow-card-hover` shadows
  - Semantic colors (success, danger, warning)
  - Consistent input styling with icons
  - Lucide icons throughout

### Tests Fixed for UI Changes
- **What changed:** Updated 3 test files to match new UI text and structure.
- **Why:** UI changes altered button text, progress display format, and component structure.
- **Impact:**
  - **App.test.tsx**: Changed "Log In" → "Sign In" button text
  - **RoadmapCard.test.tsx**: Changed "50% complete" → "50%" progress format
  - **RoadmapDetailPage.test.tsx**: Added MemoryRouter wrapper for Link component, changed phase name format
- **Result:** All 16 tests passing ✅, 0 TypeScript errors, 0 ESLint errors

### Green Theme Polish & Improvements
- **What changed:** Enhanced green theme consistency across all interactive elements.
- **Why:** To ensure green accents are visible on all hover states, selections, and focus states.
- **Impact:**
  - **index.css**: Added CSS `@theme` variables for Tailwind v4, Inter font import, global focus styles, custom scrollbar, text selection color, utility classes (`border-l-3`, `bg-gradient-primary`), component classes (`.card`, `.link-primary`)
  - **Sidebar**: Green hover states on nav items (`hover:bg-primary-50 hover:text-primary-600`), red hover on logout, green "Learn More" link
  - **Header**: Green hover on profile dropdown items
  - **CashFlowChart**: Green hover and active states in time range dropdown
  - **Settings**: Green hover on inactive tabs and theme selector buttons
  - **Cards (StatCard, ScenarioCard, IdeaCard, RoadmapCard)**: Added `hover:border-primary-200` for green border on hover, icon color transitions
  - **Empty States**: Added underline on hover for CTA links
- **Result:** All 16 tests passing ✅

### Sidebar Help & Support Card
- **What changed:** Replaced "Upgrade to Pro" box with "Help & Support" section in the sidebar.
- **Why:** To provide quick access to documentation, support, and feedback options.
- **Impact:**
  - Removed: "Upgrade to Pro" card with upgrade buttons
  - Added: "Help & Support" card with three links:
    - 📚 Documentation (`/docs`)
    - 💬 Contact Support (`/support`)
    - ✉️ Send Feedback (`/feedback`)
  - Icons: BookOpen, MessageCircle, Send from lucide-react
  - Green hover states on all links
- **Files Modified:** `Sidebar.tsx`

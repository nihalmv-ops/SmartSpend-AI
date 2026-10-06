# SmartSpend AI

> **Smart expense tracking, budgeting, and spending insights.**

SmartSpend AI is a modern personal financial dashboard and expense tracking application built with React, Vite, React Router, Recharts, and Tailwind CSS. Designed with a clean SaaS aesthetic, responsive multi-device layouts, accessible component architecture, and beginner-friendly React patterns.

---

## 🚀 Progress & Milestones

### Day 1 — Setup & UI Foundation
- ⚡ **Modern Vite + React Setup**: Fast, modern frontend architecture configured with Tailwind CSS.
- 🎨 **SaaS-Grade UI**: Minimal, clean aesthetic with generous whitespace, rounded cards, subtle borders, and soft shadows.
- 📱 **Fully Responsive Layout**: Seamless experience across mobile, tablet, laptop, and desktop viewports.
- 🧭 **Sidebar Navigation**: Dashboard, Transactions, Analytics, Budget, Reports, and Settings, plus an AI Smart Insights card and mobile drawer.
- 🔍 **Top Navigation Header**: Search bar, notification alerts, and user profile avatar with accessible states.
- 📊 **Financial Summary Cards**: High-visibility metric cards for Total Income (₹40,000), Total Expenses (₹1,699), Current Balance (₹38,301), and Monthly Budget (₹30,000).
- ♿ **Accessibility & Semantics**: Semantic HTML (`<aside>`, `<header>`, `<main>`, `<section>`), keyboard-navigable controls, and ARIA attributes.

### Day 2 — Core Dashboard & Multi-Page UI
- 🗺️ **Client-Side Routing with React Router**: Full routing across `/`, `/transactions`, `/analytics`, `/budget`, and `/reports` with active NavLink indicators.
- 💳 **Transactions Page (`/transactions`)**: Full management view featuring search input, type filters (All, Income, Expense), category dropdown, desktop table, and mobile card views without horizontal scrolling.
- ➕ **Transaction Modal (`TransactionModal.jsx`)**: Accessible modal dialog with type selector (Income/Expense), description, amount (₹), category dropdown, date picker, notes, and keyboard trapping/escape listener.
- 📈 **Analytics Page (`/analytics`)**: Timeframe toggle (Monthly/Yearly), KPI cards (Total Spending, Average Daily, Top Category, Savings Rate), and prepared Recharts chart placeholders.
- 🎯 **Budget Planning Page (`/budget`)**: Target limit visualization, utilization percentage, category allocation bars, and interactive "Set Budget" configuration form.
- 📑 **Financial Reports Page (`/reports`)**: Cash flow summary cards, statements preview, and CSV/PDF export UI actions.

### Day 3 — Functional Transaction System & LocalStorage Persistence
- 💾 **Permanent LocalStorage Persistence**: Transactions are saved and loaded in browser storage using `JSON.stringify()` and `JSON.parse()`.
- ➕ **Add Transactions**: Fully functional modal form with validation, controlled inputs, and `e.preventDefault()`.
- 🗑️ **Delete Transactions**: Delete any transaction instantly with accessible Trash icon action buttons.
- 🔍 **Real-Time Search & Multi-Filters**: Instant case-insensitive search by description or notes, and filtering by Type (Income/Expense) and Category.
- 🧮 **Dynamic Financial Calculations**: Live calculation of Total Income, Total Expenses, and Current Balance using `reduce()` and formatted in Indian Rupees (`toLocaleString('en-IN')`).
- 🛡️ **Defensive Architecture & Error Boundary**: Robust normalization of all transactions and top-level `ErrorBoundary` to completely prevent white screen crashes.
- 📚 **Beginner-Friendly Code Comments**: Clear educational explanations of `useState`, `useEffect`, `props`, `map()`, `filter()`, `reduce()`, controlled inputs, and React keys.

### Day 4 — Real Analytics, Recharts, Budget Tracking & Spending Insights
- 📊 **Dynamic Category PieChart**: Generated from actual expense transactions using Recharts `PieChart`, `Pie`, `Cell`, `Tooltip`, and `Legend` with custom Indian Rupee currency tooltips.
- 📈 **Monthly/Weekly Spending BarChart**: Responsive Recharts `BarChart` illustrating spending velocity across weekly and monthly billing cycles.
- 🔄 **Monthly / Yearly View Toggle**: Dynamic period selector toggling between 30-day and 365-day tracking scopes.
- 🎯 **Persistent Budget Management**: User-configurable monthly budget saved permanently in `localStorage` under `smartspend_budget`.
- 🚨 **3 Budget Warning Statuses**: Multi-state budget monitoring (Safe <70%, Warning 70-90%, Danger/Exceeded >90%) complete with contextual status badges, icons, and capped progress bars.
- 💡 **Smart Spending Insights (`SpendingInsights.jsx`)**: Reusable rule-based engine evaluating spending velocity, category dominance, and savings performance.
- 🏷️ **Top Category & Daily Average**: Dynamic spotlight cards identifying the primary expense category and average daily spending rate.
- 📱 **100% Responsive & Zero Scroll Overflow**: Responsive charts wrapped in `ResponsiveContainer` that adapt to mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack

- **Framework**: React 19
- **Routing**: React Router v7 (`react-router-dom`)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts Engine**: Recharts
- **Storage**: Browser LocalStorage (`smartspend_transactions`, `smartspend_budget`)
- **Currency**: Indian Rupee (₹)

---

## 📂 Project Structure

```text
smartspend-ai/
├── public/
├── src/
│   ├── components/
│   │   ├── ErrorBoundary.jsx      # Catches runtime errors to prevent blank screen crashes
│   │   ├── PageHeader.jsx         # Reusable page header with title, subtitle & action slots
│   │   ├── SpendingInsights.jsx   # Rule-based financial insight & budget warning cards
│   │   ├── TransactionList.jsx    # Responsive transaction table/card list with delete actions
│   │   ├── TransactionModal.jsx   # Accessible modal dialog for adding income/expense
│   │   ├── Sidebar.jsx            # Responsive navigation & NavLinks with active indicators
│   │   ├── Header.jsx             # Top bar with search, quick add, notifications & profile
│   │   ├── SummaryCard.jsx        # Reusable metric card with color variants
│   │   ├── BudgetCard.jsx         # Dynamic budget progress, remaining buffer & status alerts
│   │   └── RecentTransactions.jsx # Sorted chronological transaction feed on main dashboard
│   ├── pages/
│   │   ├── Dashboard.jsx          # Live financial overview with Recharts chart & insights
│   │   ├── Transactions.jsx       # Transaction management with search, filter & delete
│   │   ├── Analytics.jsx          # Recharts PieChart/BarChart, top category & daily stats
│   │   ├── Budget.jsx             # Budget tracking, 3 status states, progress & target form
│   │   └── Reports.jsx            # Dynamic statements & export UI
│   ├── data/
│   │   └── categories.js          # Core categories, hex colors & Recharts color palettes
│   ├── utils/
│   │   └── storage.js             # LocalStorage helpers (transactions, budget) & date formatting
│   ├── App.jsx                    # Root routes layout, state management & LocalStorage sync
│   ├── index.css                  # Tailwind CSS import & base styles
│   └── main.jsx                   # React entrypoint wrapped in ErrorBoundary & BrowserRouter
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🗓️ 6-Day Development Roadmap

- [x] **Day 1**: Project Setup, Tailwind UI Foundation & Responsive Dashboard Layout
- [x] **Day 2**: React Router Navigation, Transactions Management, Modal Form & Full Page Architecture
- [x] **Day 3**: Functional Transaction System, Add/Delete, Search/Filter & LocalStorage Persistence
- [x] **Day 4**: Recharts Visualizations, Dynamic Analytics, Budget Tracking & Spending Insights
- [ ] **Day 5**: Advanced AI-Assisted Insights & Category-Level Budgets
- [ ] **Day 6**: Polish, Accessibility Audit & Vercel Live Deployment

---

## 💻 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or pnpm

### Installation

1. Clone repository:
   ```bash
   git clone https://github.com/nihalmv-ops/SmartSpend-AI.git
   cd SmartSpend-AI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

---

## 📄 License

MIT License. Designed and built with ❤️ by Nihal.

# SmartSpend AI

> **Smart expense tracking, budgeting, and spending insights.**

SmartSpend AI is a modern personal financial dashboard and expense tracking application built with React, Vite, React Router, and Tailwind CSS. Designed with a clean SaaS aesthetic, responsive multi-device layouts, and an accessible component architecture.

---

## 🚀 Progress & Milestones

### Day 1 — Setup & UI Foundation
- ⚡ **Modern Vite + React Setup**: Fast, modern frontend architecture configured with Tailwind CSS.
- 🎨 **SaaS-Grade UI**: Minimal, clean aesthetic with generous whitespace, rounded cards, subtle borders, and soft shadows.
- 📱 **Fully Responsive Layout**: Seamless experience across mobile, tablet, laptop, and desktop viewports.
- 🧭 **Sidebar Navigation**: Dashboard, Transactions, Analytics, Budget, Reports, and Settings, plus an AI Smart Insights card and mobile drawer.
- 🔍 **Top Navigation Header**: Search bar, notification alerts, and user profile avatar with accessible states.
- 📊 **Financial Summary Cards**: High-visibility metric cards for Total Income (₹45,000), Total Expenses (₹18,500), Current Balance (₹26,500), and Monthly Budget (₹30,000).
- 📈 **Spending Overview (Day 3 Placeholder)**: Structured chart container reserved for interactive Recharts visualizations.
- 🎯 **Monthly Budget Progress**: 62% utilization progress indicator showing ₹11,500 remaining.
- 🍔 **Recent Transactions Panel**: Clean transaction feed with category emojis, subtle income/expense color indicators, and timestamp metadata.
- ♿ **Accessibility & Semantics**: Semantic HTML (`<aside>`, `<header>`, `<main>`, `<section>`), keyboard-navigable controls, and ARIA attributes.

### Day 2 — Core Dashboard & Multi-Page UI
- 🗺️ **Client-Side Routing with React Router**: Full routing across `/`, `/transactions`, `/analytics`, `/budget`, and `/reports` with active NavLink indicators.
- 💳 **Transactions Page (`/transactions`)**: Full management view featuring real-time search, filters (All, Income, Expense, Category), responsive desktop table, and mobile card views without horizontal scrolling.
- ➕ **Transaction Modal (`TransactionModal.jsx`)**: Accessible modal dialog with type selector (Income/Expense), description, amount (₹), category dropdown, date picker, notes, and keyboard trapping/escape listener.
- 📈 **Analytics Page (`/analytics`)**: Timeframe toggle (Monthly/Yearly), KPI cards (Total Spending, Average Daily, Top Category, Savings Rate), and prepared Recharts chart placeholders.
- 🎯 **Budget Planning Page (`/budget`)**: Target limit visualization, utilization percentage, category allocation bars, and interactive "Set Budget" configuration form.
- 📑 **Financial Reports Page (`/reports`)**: Cash flow summary cards, 6-month historical performance audit table, and CSV/PDF export UI actions.
- 🧩 **Component Architecture & Reuse**: Modular `PageHeader`, `SummaryCard`, `BudgetCard`, `RecentTransactions`, `TransactionModal`, `Sidebar`, and `Header` components.

---

## 🛠️ Tech Stack

- **Framework**: React 19
- **Routing**: React Router v7 (`react-router-dom`)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts Engine**: Recharts (installed, interactive charts active Day 3)
- **Currency**: Indian Rupee (₹)

---

## 📂 Project Structure

```text
smartspend-ai/
├── public/
├── src/
│   ├── components/
│   │   ├── PageHeader.jsx         # Reusable page header with title, subtitle & action slots
│   │   ├── TransactionModal.jsx   # Accessible modal dialog for adding income/expense
│   │   ├── Sidebar.jsx            # Responsive navigation & NavLinks with active indicators
│   │   ├── Header.jsx             # Top bar with search, quick add, notifications & profile
│   │   ├── SummaryCard.jsx        # Reusable metric card with color variants
│   │   ├── BudgetCard.jsx         # Monthly budget progress & remaining balance
│   │   └── RecentTransactions.jsx # Transaction history list with router links
│   ├── pages/
│   │   ├── Dashboard.jsx          # Main financial dashboard overview
│   │   ├── Transactions.jsx       # Transaction management with search & filter table/cards
│   │   ├── Analytics.jsx          # KPI metrics & Recharts analytics placeholders
│   │   ├── Budget.jsx             # Budget utilization & target allocation form
│   │   └── Reports.jsx            # Monthly statements & CSV/PDF export UI
│   ├── data/
│   │   └── categories.js          # Core expense & income categories
│   ├── utils/
│   │   └── storage.js             # LocalStorage helper functions (future persistence)
│   ├── App.jsx                    # Root routes layout & global modal state
│   ├── index.css                  # Tailwind CSS import & base styles
│   └── main.jsx                   # React entrypoint wrapped in BrowserRouter
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🗓️ 6-Day Development Roadmap

- [x] **Day 1**: Project Setup, Tailwind UI Foundation & Responsive Dashboard Layout
- [x] **Day 2**: React Router Navigation, Transactions Management, Modal Form & Full Page Architecture
- [ ] **Day 3**: Recharts Visualizations & Expense Analytics Breakdown
- [ ] **Day 4**: AI-Powered Spending Insights & Budget Alerts
- [ ] **Day 5**: LocalStorage Persistence & Category Management
- [ ] **Day 6**: Polish, Accessibility Audit & Production Deployment

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

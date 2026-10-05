# SmartSpend AI

> **Smart expense tracking, budgeting, and spending insights.**

SmartSpend AI is a modern personal financial dashboard and expense tracking application built with React, Vite, and Tailwind CSS. Designed with a clean SaaS aesthetic, responsive multi-device layouts, and an accessible component architecture.

---

## 🚀 Day 1 — Setup & UI Foundation

Day 1 delivers the foundational design system and component architecture:

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

---

## 🛠️ Tech Stack

- **Framework**: React 19
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
│   │   ├── Sidebar.jsx            # Responsive navigation & Smart Insights card
│   │   ├── Header.jsx             # Top bar with search, notification & profile
│   │   ├── SummaryCard.jsx        # Reusable metric card with color variants
│   │   ├── BudgetCard.jsx         # Monthly budget progress & remaining balance
│   │   └── RecentTransactions.jsx # Transaction history list
│   ├── pages/
│   │   └── Dashboard.jsx          # Main financial dashboard view
│   ├── data/
│   │   └── categories.js          # Core expense & income categories
│   ├── utils/
│   │   └── storage.js             # LocalStorage helper functions (future persistence)
│   ├── App.jsx                    # Root layout with responsive drawer state
│   ├── index.css                  # Tailwind CSS import & base styles
│   └── main.jsx                   # React entrypoint
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🗓️ 6-Day Development Roadmap

- [x] **Day 1**: Project Setup, Tailwind UI Foundation & Responsive Dashboard Layout
- [ ] **Day 2**: Transaction Management & Modal Form (Add/Delete/Filter)
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

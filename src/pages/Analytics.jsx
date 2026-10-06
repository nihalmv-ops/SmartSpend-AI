import React, { useState } from 'react';
import {
  TrendingDown,
  TrendingUp,
  Wallet,
  Percent,
  Calendar,
  Utensils,
  Plus,
  Inbox,
  PieChart as PieChartIcon,
  BarChart3,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import PageHeader from '../components/PageHeader';
import SummaryCard from '../components/SummaryCard';
import SpendingInsights from '../components/SpendingInsights';
import { CATEGORY_COLORS, CHART_PALETTE } from '../data/categories';

/**
 * Custom Tooltip Component for Recharts PieChart & BarChart
 * Formats hover values with the Indian Rupee symbol (₹).
 */
const CustomChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const value = Number(data.value || 0).toLocaleString('en-IN');
    return (
      <div className="rounded-xl border border-slate-100 bg-white/95 p-3 shadow-md backdrop-blur-xs">
        <p className="text-xs font-semibold text-slate-800">
          {label || data.name}
        </p>
        <p className="mt-1 text-sm font-bold text-indigo-600">
          ₹{value}
        </p>
      </div>
    );
  }
  return null;
};

/**
 * Analytics Page Component
 * 
 * Demonstrates:
 * - useState: toggles between 'monthly' and 'yearly' analytics view.
 * - filter() & reduce(): extracts subsets and aggregates financial totals.
 * - Data preparation for Recharts: transforms raw transaction objects into
 *   name/value pairs required by PieChart and BarChart.
 * - Responsive Recharts components: uses ResponsiveContainer with percentage widths
 *   to ensure charts look great on mobile and desktop alike.
 * - Conditional rendering: displays helpful empty states when no expenses exist.
 *
 * @param {Array} transactions - Active transactions from App state
 * @param {number} budget - Monthly budget target
 * @param {Function} [onOpenAddModal] - Callback to open the Add Transaction modal
 */
export default function Analytics({
  transactions = [],
  budget = 30000,
  onOpenAddModal,
}) {
  // Toggle state: "monthly" or "yearly"
  const [period, setPeriod] = useState('monthly');

  // ========================================================
  // DYNAMIC FINANCIAL AGGREGATIONS
  // ========================================================

  // 1. Filter expense transactions only
  // Income transactions should not be included when analyzing spending by category.
  const expenseTransactions = (transactions || []).filter(
    (tx) => tx && tx.type === 'expense'
  );

  // 2. Filter income transactions only
  const incomeTransactions = (transactions || []).filter(
    (tx) => tx && tx.type === 'income'
  );

  // 3. calculate total income using reduce()
  const totalIncome = incomeTransactions.reduce(
    (sum, tx) => sum + (Number(tx.amount) || 0),
    0
  );

  // 4. calculate total expenses using reduce()
  const totalExpenses = expenseTransactions.reduce(
    (sum, tx) => sum + (Number(tx.amount) || 0),
    0
  );

  // 5. Current balance = Total Income - Total Expenses
  const currentBalance = totalIncome - totalExpenses;

  // 6. Savings rate calculation: ((Income - Expenses) / Income) * 100
  // Guarded against division by zero: if income is 0, display 0%
  const rawSavingsRate =
    totalIncome > 0
      ? ((totalIncome - totalExpenses) / totalIncome) * 100
      : 0;
  const savingsRate = Math.max(0, rawSavingsRate).toFixed(1);

  // ========================================================
  // REUSABLE CATEGORY SPENDING DATA PREPARATION
  // ========================================================

  // Loop/reduce through expenses to compute total spent per category
  // Result object: { Food: 2500, Transport: 1200, Bills: 3000 }
  const categoryTotals = expenseTransactions.reduce((acc, tx) => {
    const cat = tx.category || 'Other';
    const amt = Number(tx.amount) || 0;
    acc[cat] = (acc[cat] || 0) + amt;
    return acc;
  }, {});

  // Transform category totals into the array format required by Recharts PieChart
  // Result format: [{ name: 'Food', value: 2500 }, ...]
  const categoryChartData = Object.entries(categoryTotals)
    .map(([name, value]) => ({
      name,
      value,
    }))
    .sort((a, b) => b.value - a.value);

  // ========================================================
  // TOP SPENDING CATEGORY
  // ========================================================
  let topCategory = 'None';
  let topCategoryAmount = 0;

  if (categoryChartData.length > 0) {
    topCategory = categoryChartData[0].name;
    topCategoryAmount = categoryChartData[0].value;
  }

  // ========================================================
  // AVERAGE DAILY SPENDING
  // ========================================================
  // In monthly view we divide by a 30-day billing cycle; in yearly view by 365 days.
  const relevantDays = period === 'monthly' ? 30 : 365;
  const averageDaily = Math.round(totalExpenses / relevantDays);

  // ========================================================
  // MONTHLY / PERIOD SPENDING TREND DATA FOR BARCHART
  // ========================================================
  // Prepare timeline bar chart data based on transactions
  let timelineChartData = [];
  if (period === 'monthly') {
    // Group expenses into weekly breakdown
    const weeks = [
      { name: 'Week 1', spending: 0 },
      { name: 'Week 2', spending: 0 },
      { name: 'Week 3', spending: 0 },
      { name: 'Week 4', spending: 0 },
    ];

    expenseTransactions.forEach((tx) => {
      const amt = Number(tx.amount) || 0;
      // Distribute by day of month if available, or hash by ID
      let day = 1;
      if (tx.rawDate) {
        day = new Date(tx.rawDate).getDate() || 1;
      } else if (typeof tx.date === 'string' && tx.date.includes('-')) {
        const parts = tx.date.split('-');
        day = parseInt(parts[2], 10) || 1;
      } else {
        day = (tx.id % 28) + 1;
      }

      if (day <= 7) weeks[0].spending += amt;
      else if (day <= 14) weeks[1].spending += amt;
      else if (day <= 21) weeks[2].spending += amt;
      else weeks[3].spending += amt;
    });

    timelineChartData = weeks;
  } else {
    // Yearly view: Group by calendar months
    const months = [
      { name: 'Jan', spending: 0 },
      { name: 'Feb', spending: 0 },
      { name: 'Mar', spending: 0 },
      { name: 'Apr', spending: 0 },
      { name: 'May', spending: 0 },
      { name: 'Jun', spending: 0 },
      { name: 'Jul', spending: 0 },
      { name: 'Aug', spending: 0 },
      { name: 'Sep', spending: 0 },
      { name: 'Oct', spending: 0 },
      { name: 'Nov', spending: 0 },
      { name: 'Dec', spending: 0 },
    ];

    expenseTransactions.forEach((tx) => {
      const amt = Number(tx.amount) || 0;
      let monthIdx = 9; // Default to October (index 9) for current cycle
      if (tx.rawDate) {
        monthIdx = new Date(tx.rawDate).getMonth();
      } else if (typeof tx.date === 'string' && tx.date.includes('-')) {
        const parts = tx.date.split('-');
        monthIdx = (parseInt(parts[1], 10) - 1) || 9;
      }
      if (monthIdx >= 0 && monthIdx < 12) {
        months[monthIdx].spending += amt;
      }
    });

    timelineChartData = months;
  }

  const hasExpenses = expenseTransactions.length > 0;

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <PageHeader
        label="Insights & Trends"
        title="ANALYTICS"
        subtitle="Understand where your money goes."
      >
        {/* Period Selector Tabs: Monthly vs Yearly */}
        <div
          className="flex items-center rounded-xl bg-slate-100 p-1"
          role="group"
          aria-label="Select analytics timeframe"
        >
          <button
            type="button"
            onClick={() => setPeriod('monthly')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              period === 'monthly'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setPeriod('yearly')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              period === 'yearly'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Yearly
          </button>
        </div>
      </PageHeader>

      {/* Analytics Summary Cards (Total Income, Total Expenses, Current Balance, Savings Rate) */}
      <section
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Analytics KPI Metrics"
      >
        <SummaryCard
          title="Total Income"
          value={`₹${totalIncome.toLocaleString('en-IN')}`}
          icon={TrendingUp}
          variant="emerald"
          subtitle={`${incomeTransactions.length} income deposits`}
        />
        <SummaryCard
          title="Total Expenses"
          value={`₹${totalExpenses.toLocaleString('en-IN')}`}
          icon={TrendingDown}
          variant="rose"
          subtitle={`${expenseTransactions.length} recorded purchases`}
        />
        <SummaryCard
          title="Current Balance"
          value={`₹${currentBalance.toLocaleString('en-IN')}`}
          icon={Wallet}
          variant="indigo"
          subtitle={currentBalance >= 0 ? 'Positive net balance' : 'Operating deficit'}
        />
        <SummaryCard
          title="Savings Rate"
          value={`${savingsRate}%`}
          icon={Percent}
          variant="purple"
          subtitle={Number(savingsRate) >= 20 ? 'Above 20% benchmark' : 'Target: 20%'}
        />
      </section>

      {/* Top Category & Average Daily Spending Spotlight Cards */}
      <section
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        aria-label="Spending Highlights"
      >
        <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Top Spending Category
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-bold text-slate-900">
                {topCategory !== 'None' ? topCategory : 'No spending data'}
              </span>
              {topCategoryAmount > 0 && (
                <span className="text-sm font-semibold text-rose-600">
                  ₹{topCategoryAmount.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-400">
              {topCategoryAmount > 0 && totalExpenses > 0
                ? `${Math.round((topCategoryAmount / totalExpenses) * 100)}% of total outflows`
                : 'No expense records found'}
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 shadow-2xs">
            <Utensils className="h-6 w-6" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Average Daily Spending
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-xl font-bold text-slate-900">
                ₹{averageDaily.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-medium text-slate-400">/ day</span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Calculated across {relevantDays} days ({period} tracking)
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 shadow-2xs">
            <Calendar className="h-6 w-6" />
          </div>
        </div>
      </section>

      {/* Main Charts Section */}
      {!hasExpenses ? (
        /* Empty State when no expense transactions exist */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/80 bg-white p-12 text-center shadow-xs">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-4 shadow-2xs">
            <Inbox className="h-7 w-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            No analytics available yet
          </h3>
          <p className="mt-1 text-sm text-slate-500 max-w-sm">
            Add your first transaction to unlock dynamic Recharts visualizations and spending breakdowns.
          </p>
          {onOpenAddModal && (
            <button
              type="button"
              onClick={onOpenAddModal}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Transaction</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 1. Spending by Category PieChart */}
          <section
            className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs"
            aria-label="Spending by Category Chart"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Spending by Category
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Proportional category distribution
                </p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <PieChartIcon className="h-4 w-4" />
              </div>
            </div>

            {/* Recharts PieChart Component */}
            <div className="mt-6 h-[300px] w-full">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={95}
                    innerRadius={55}
                    paddingAngle={3}
                  >
                    {categoryChartData.map((entry, index) => {
                      const fillColor =
                        CATEGORY_COLORS[entry.name] ||
                        CHART_PALETTE[index % CHART_PALETTE.length];
                      return <Cell key={`cell-${entry.name}`} fill={fillColor} />;
                    })}
                  </Pie>
                  <Tooltip content={<CustomChartTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ paddingTop: '16px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* 2. Spending Trend BarChart */}
          <section
            className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs"
            aria-label="Spending Trend BarChart"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {period === 'monthly' ? 'Weekly Spending Trend' : 'Monthly Spending Trend'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Outflows over time ({period} view)
                </p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <BarChart3 className="h-4 w-4" />
              </div>
            </div>

            {/* Recharts BarChart Component */}
            <div className="mt-6 h-[300px] w-full">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={timelineChartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickFormatter={(val) => `₹${val}`}
                  />
                  <Tooltip content={<CustomChartTooltip />} />
                  <Bar
                    dataKey="spending"
                    name="Spending"
                    fill="#6366f1"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      )}

      {/* Automated Spending Insights Section */}
      <section aria-label="Smart Insights">
        <SpendingInsights
          totalExpenses={totalExpenses}
          totalIncome={totalIncome}
          budget={budget}
          savingsRate={savingsRate}
          topCategory={topCategory}
          topCategoryAmount={topCategoryAmount}
        />
      </section>
    </div>
  );
}

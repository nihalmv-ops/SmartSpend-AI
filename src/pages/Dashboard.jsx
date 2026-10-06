import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Target,
  Plus,
  BarChart3,
  Calendar,
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SummaryCard from '../components/SummaryCard';
import BudgetCard from '../components/BudgetCard';
import RecentTransactions from '../components/RecentTransactions';

/**
 * Dashboard Page Component
 * 
 * Demonstrates:
 * - filter() & reduce(): dynamically calculating total income and expenses
 * - Dynamic state values in summary cards instead of hardcoded numbers
 * - toLocaleString("en-IN"): formatting numbers with Indian currency notation (e.g., 40,000)
 *
 * @param {Array} transactions - All transaction objects from App state
 * @param {Function} onOpenAddModal - Opens the Add Transaction modal
 */
export default function Dashboard({
  transactions = [],
  onOpenAddModal,
}) {
  const [timeframe, setTimeframe] = useState('Monthly');

  // ========================================================
  // DYNAMIC FINANCIAL CALCULATIONS
  // ========================================================

  // First select income transactions using filter(),
  // then use reduce() to calculate their total amount.
  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);

  // Select expense transactions using filter(),
  // then calculate their total sum using reduce().
  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);

  // Calculate the current balance by subtracting total expenses from total income.
  const balance = totalIncome - totalExpenses;

  // Monthly budget constant (temporary static value for Day 3)
  const monthlyBudget = 30000;
  const remainingBudget = Math.max(0, monthlyBudget - totalExpenses);
  const budgetPercentage = Math.min(
    100,
    Math.round((totalExpenses / monthlyBudget) * 100)
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Dashboard Top Header */}
      <PageHeader
        label="Financial Overview"
        title="Good morning 👋"
        subtitle="Here's your live financial overview for this month."
      >
        <button
          type="button"
          onClick={onOpenAddModal}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-all hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          aria-label="Add new transaction"
        >
          <Plus className="h-4 w-4" />
          <span>Add Transaction</span>
        </button>
      </PageHeader>

      {/* 
        Dynamic Summary Cards Grid:
        Values are computed dynamically in real-time from the transactions array!
      */}
      <section
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Key Financial Metrics"
      >
        {/* Dynamic Total Income */}
        <SummaryCard
          title="Total Income"
          value={`₹${totalIncome.toLocaleString('en-IN')}`}
          icon={TrendingUp}
          variant="emerald"
          subtitle={`${transactions.filter((t) => t.type === 'income').length} credit transactions`}
        />

        {/* Dynamic Total Expenses */}
        <SummaryCard
          title="Total Expenses"
          value={`₹${totalExpenses.toLocaleString('en-IN')}`}
          icon={TrendingDown}
          variant="rose"
          subtitle={`${transactions.filter((t) => t.type === 'expense').length} debit transactions`}
        />

        {/* Dynamic Current Balance */}
        <SummaryCard
          title="Current Balance"
          value={`₹${balance.toLocaleString('en-IN')}`}
          icon={Wallet}
          variant="indigo"
          subtitle="Net available balance"
        />

        {/* Monthly Budget Target */}
        <SummaryCard
          title="Monthly Budget"
          value={`₹${monthlyBudget.toLocaleString('en-IN')}`}
          icon={Target}
          variant="purple"
          subtitle="Set for October 2026"
        />
      </section>

      {/* Main Grid: Spending Overview (Chart Placeholder) + Dynamic Budget Progress */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Spending Overview Panel */}
        <section
          className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs lg:col-span-2"
          aria-label="Spending Overview Chart"
        >
          {/* Panel Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Spending Overview
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Your spending activity this month
              </p>
            </div>

            {/* Timeframe Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="timeframe-select" className="sr-only">
                Select timeframe
              </label>
              <div className="relative">
                <select
                  id="timeframe-select"
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-slate-50 py-1.5 pr-8 pl-3 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
                  <Calendar className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Chart Placeholder Area (Scheduled for Day 4 Recharts implementation) */}
          <div className="relative mt-6 flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
            {/* Silhouette preview */}
            <div
              className="absolute inset-x-6 bottom-8 flex h-32 items-end justify-between gap-3 opacity-25 pointer-events-none"
              aria-hidden="true"
            >
              <div className="w-full h-[40%] rounded-t bg-indigo-300" />
              <div className="w-full h-[65%] rounded-t bg-indigo-400" />
              <div className="w-full h-[50%] rounded-t bg-indigo-300" />
              <div className="w-full h-[85%] rounded-t bg-indigo-500" />
              <div className="w-full h-[60%] rounded-t bg-indigo-400" />
              <div className="w-full h-[75%] rounded-t bg-indigo-500" />
              <div className="w-full h-[45%] rounded-t bg-indigo-300" />
            </div>

            {/* Info callout */}
            <div className="relative z-10 flex flex-col items-center max-w-sm rounded-xl bg-white/95 p-5 shadow-xs border border-slate-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-3 shadow-2xs">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">
                Interactive Chart Area
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Reserved for Recharts spending analytics and breakdown charts coming in future days.
              </p>
              <span className="mt-3 inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-700">
                Recharts Analytics
              </span>
            </div>

            {/* Week labels */}
            <div
              className="absolute inset-x-6 bottom-2 flex justify-between text-[10px] font-medium text-slate-400"
              aria-hidden="true"
            >
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>
        </section>

        {/* Dynamic Monthly Budget Card */}
        <section aria-label="Monthly Budget Progress">
          <BudgetCard
            spent={`₹${totalExpenses.toLocaleString('en-IN')}`}
            total={`₹${monthlyBudget.toLocaleString('en-IN')}`}
            remaining={`₹${remainingBudget.toLocaleString('en-IN')}`}
            percentage={budgetPercentage}
          />
        </section>
      </div>

      {/* Dynamic Recent Transactions List */}
      <section aria-label="Recent Transactions List">
        <RecentTransactions
          transactions={transactions}
          onOpenAddModal={onOpenAddModal}
        />
      </section>
    </div>
  );
}

import React, { useState } from 'react';
import { Target, CheckCircle2, AlertCircle, Save, Sparkles } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SummaryCard from '../components/SummaryCard';

/**
 * Budget Page Component
 * 
 * Demonstrates:
 * - Controlled input for budget configuration.
 * - Dynamic spent amount calculated from expense transactions via reduce().
 * - Dynamic percentage utilization and remaining balance.
 *
 * @param {Array} transactions - Active transactions array from App state
 */
export default function Budget({ transactions = [] }) {
  const [budgetAmount, setBudgetAmount] = useState('30000');
  const [savedNotification, setSavedNotification] = useState(false);

  // Dynamically calculate spent amount from actual expense transactions
  const dynamicSpentAmount = (transactions || [])
    .filter((tx) => tx && tx.type === 'expense')
    .reduce((sum, tx) => {
      const amt =
        typeof tx.amount === 'number'
          ? isNaN(tx.amount) ? 0 : tx.amount
          : Number(String(tx.amount || 0).replace(/[^0-9.-]+/g, '')) || 0;
      return sum + amt;
    }, 0);

  const budgetNum = Number(budgetAmount) || 30000;
  const remaining = Math.max(0, budgetNum - dynamicSpentAmount);
  const percentage = Math.min(
    100,
    Math.round((dynamicSpentAmount / budgetNum) * 100)
  );

  const handleSaveBudget = (e) => {
    e.preventDefault();
    setSavedNotification(true);
    setTimeout(() => {
      setSavedNotification(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <PageHeader
        label="Financial Planning"
        title="Monthly Budget"
        subtitle="Track spending against your target and set spending limits."
      />

      {/* Budget Overview Metrics Cards */}
      <section
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Budget Key Metrics"
      >
        <SummaryCard
          title="Budget Amount"
          value={`₹${budgetNum.toLocaleString('en-IN')}`}
          icon={Target}
          variant="purple"
          subtitle="Configured target"
        />
        <SummaryCard
          title="Spent"
          value={`₹${dynamicSpentAmount.toLocaleString('en-IN')}`}
          icon={AlertCircle}
          variant="rose"
          subtitle={`${percentage}% of monthly limit`}
        />
        <SummaryCard
          title="Remaining"
          value={`₹${remaining.toLocaleString('en-IN')}`}
          icon={CheckCircle2}
          variant="emerald"
          subtitle="Available for rest of month"
        />
        <SummaryCard
          title="Progress"
          value={`${percentage}%`}
          icon={Sparkles}
          variant="indigo"
          subtitle="Target utilization"
        />
      </section>

      {/* Main Budget Grid: Progress Bar Card & Set Budget Form */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Progress Card (Spans 2 columns) */}
        <section
          className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs lg:col-span-2"
          aria-label="Budget Progress Visualization"
        >
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Spending Progress
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Current pace across the billing cycle
                </p>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  percentage <= 80
                    ? 'bg-emerald-50 text-emerald-700'
                    : percentage <= 100
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-rose-50 text-rose-700'
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{percentage <= 80 ? 'On Track' : percentage <= 100 ? 'Near Limit' : 'Over Budget'}</span>
              </span>
            </div>

            {/* Main Progress Bar */}
            <div className="mt-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-bold tracking-tight text-slate-900">
                    ₹{dynamicSpentAmount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm font-medium text-slate-400 ml-2">
                    of ₹{budgetNum.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-sm font-bold text-slate-700">
                  {percentage}%
                </span>
              </div>

              {/* Progress track */}
              <div
                className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-valuenow={percentage}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="Monthly budget spending progress"
              >
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${
                    percentage <= 80
                      ? 'bg-indigo-600'
                      : percentage <= 100
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(100, percentage)}%` }}
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>₹0</span>
                <span>₹{(budgetNum / 2).toLocaleString('en-IN')}</span>
                <span>₹{budgetNum.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Insight Callout */}
            <div className="mt-6 rounded-xl bg-indigo-50/60 p-4 border border-indigo-100/50">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-2xs">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-indigo-900">
                    Smart Spend AI Recommendation
                  </h3>
                  <p className="mt-0.5 text-xs text-indigo-700 leading-relaxed">
                    You have ₹{remaining.toLocaleString('en-IN')} remaining. Based on your spending velocity, your budget is well-balanced.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between text-xs text-slate-400">
            <span>Cycle resets in 24 days</span>
            <span>Target: ₹{budgetNum.toLocaleString('en-IN')}/mo</span>
          </div>
        </section>

        {/* Set Budget Form Card */}
        <section
          className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs"
          aria-label="Set Budget Target"
        >
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900">Configure Target</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Update monthly spending limit
            </p>
          </div>

          {savedNotification && (
            <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-xs font-semibold text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Budget updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSaveBudget} className="mt-5 space-y-4">
            <div>
              <label
                htmlFor="monthly-budget-input"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5"
              >
                Monthly Limit (₹)
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-sm font-semibold text-slate-400">
                  ₹
                </span>
                <input
                  id="monthly-budget-input"
                  type="number"
                  min="1000"
                  step="500"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pr-3.5 pl-8 text-sm font-semibold text-slate-800 transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Default baseline is ₹30,000 / month.
              </p>
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            >
              <Save className="h-4 w-4" />
              <span>Save Budget</span>
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

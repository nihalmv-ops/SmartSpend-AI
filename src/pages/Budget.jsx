import React, { useState } from 'react';
import { Target, CheckCircle2, AlertCircle, Save, Sparkles } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SummaryCard from '../components/SummaryCard';

export default function Budget() {
  const [budgetAmount, setBudgetAmount] = useState('30000');
  const [spentAmount] = useState(18500);
  const [savedNotification, setSavedNotification] = useState(false);

  const budgetNum = Number(budgetAmount) || 30000;
  const remaining = Math.max(0, budgetNum - spentAmount);
  const percentage = Math.min(100, Math.round((spentAmount / budgetNum) * 100));

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
          value={`₹${budgetNum.toLocaleString()}`}
          icon={Target}
          variant="purple"
          subtitle="Configured target"
        />
        <SummaryCard
          title="Spent"
          value={`₹${spentAmount.toLocaleString()}`}
          icon={AlertCircle}
          variant="rose"
          subtitle={`${percentage}% of monthly limit`}
        />
        <SummaryCard
          title="Remaining"
          value={`₹${remaining.toLocaleString()}`}
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
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>On Track</span>
              </span>
            </div>

            {/* Main Progress Bar */}
            <div className="mt-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-bold tracking-tight text-slate-900">
                    ₹{spentAmount.toLocaleString()}
                  </span>
                  <span className="text-sm font-medium text-slate-400 ml-2">
                    of ₹{budgetNum.toLocaleString()}
                  </span>
                </div>
                <span className="text-sm font-bold text-indigo-600">
                  {percentage}%
                </span>
              </div>

              <div
                className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-valuenow={percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Budget spending progress"
              >
                <div
                  className="h-full rounded-full bg-indigo-600 transition-all duration-500 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs font-medium text-slate-500">
                <span>0%</span>
                <span className="font-semibold text-slate-700">
                  ₹{remaining.toLocaleString()} remaining this month
                </span>
                <span>100%</span>
              </div>
            </div>

            {/* Category Budgets Sub-breakdown */}
            <div className="mt-8 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Category Allocations
              </h3>

              {/* Food */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">🍔 Food & Dining</span>
                  <span className="text-slate-500">₹7,800 / ₹10,000 (78%)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-amber-500 w-[78%]" />
                </div>
              </div>

              {/* Transport */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">🚗 Transport & Commute</span>
                  <span className="text-slate-500">₹3,400 / ₹6,000 (56%)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-blue-500 w-[56%]" />
                </div>
              </div>

              {/* Bills */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">🧾 Utility Bills</span>
                  <span className="text-slate-500">₹4,200 / ₹8,000 (52%)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-indigo-500 w-[52%]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Set Budget Form Section */}
        <section
          className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs flex flex-col justify-between"
          aria-label="Set Monthly Budget Limit"
        >
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Set Budget
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update your overall spending cap
                </p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Target className="h-4 w-4" />
              </div>
            </div>

            <form onSubmit={handleSaveBudget} className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="set-budget-input"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5"
                >
                  Budget Amount (₹)
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 font-bold text-sm">
                    ₹
                  </span>
                  <input
                    id="set-budget-input"
                    type="number"
                    min="1000"
                    step="500"
                    required
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pr-4 pl-9 text-base font-bold text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-colors"
                  />
                </div>
                <p className="mt-1.5 text-xs text-slate-400">
                  Recommended budget: ₹25,000 – ₹35,000 based on previous income.
                </p>
              </div>

              {savedNotification && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-xs font-medium text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Budget target successfully updated!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Save Budget</span>
              </button>
            </form>
          </div>

          <div className="mt-6 rounded-xl bg-slate-50 p-3.5 text-xs text-slate-500">
            💡 <strong className="text-slate-700">Tip:</strong> Allocating at least 20% of your total income to savings helps maintain long-term financial security.
          </div>
        </section>
      </div>
    </div>
  );
}

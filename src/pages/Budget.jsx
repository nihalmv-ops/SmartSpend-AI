import React, { useState } from 'react';
import {
  Target,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Save,
  Sparkles,
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SummaryCard from '../components/SummaryCard';
import SpendingInsights from '../components/SpendingInsights';
import { CATEGORY_COLORS } from '../data/categories';

/**
 * Budget Page Component
 * 
 * Demonstrates:
 * - useState: manages the controlled budget input value and save notifications.
 * - Derived state: synchronizes input state whenever parent budget prop updates.
 * - reduce() & Math.min(): computes total spent, remaining buffer, and capped progress bar width.
 * - 3 Status States: Safe (<70%), Warning (70-90%), and Danger/Exceeded (>90%) with text & icons.
 * - LocalStorage persistence: calls onUpdateBudget to save the budget permanently.
 *
 * @param {Array} transactions - Active transactions from App state
 * @param {number} budget - Monthly budget from App state
 * @param {Function} onUpdateBudget - Callback to update and persist budget in App/LocalStorage
 */
export default function Budget({
  transactions = [],
  budget = 30000,
  onUpdateBudget,
}) {
  // Controlled input state initialized to the current budget
  const [budgetInput, setBudgetInput] = useState(String(budget));
  const [prevBudget, setPrevBudget] = useState(budget);
  const [savedNotification, setSavedNotification] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Keep input in sync if parent budget prop changes during render
  if (budget !== prevBudget) {
    setPrevBudget(budget);
    setBudgetInput(String(budget));
  }

  // ========================================================
  // DYNAMIC BUDGET CALCULATIONS
  // ========================================================

  // Calculate actual total spent from expense transactions using reduce()
  const totalExpenses = (transactions || [])
    .filter((tx) => tx && tx.type === 'expense')
    .reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);

  // Calculate total income for insights
  const totalIncome = (transactions || [])
    .filter((tx) => tx && tx.type === 'income')
    .reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);

  const budgetNum = Number(budget) || 30000;

  // Remaining budget: can be positive or negative
  const remainingBudget = budgetNum - totalExpenses;
  const isOverBudget = remainingBudget < 0;

  // Percentage used calculation: (totalExpenses / budget) * 100
  // Guarded against division by zero
  const rawPercentage =
    budgetNum > 0 ? (totalExpenses / budgetNum) * 100 : 0;
  const budgetPercentage = Math.round(rawPercentage);

  // Math.min() prevents the visual progress bar from overflowing past 100%
  const progressWidth = Math.min(Math.max(0, budgetPercentage), 100);

  // Savings rate calculation
  const savingsRate =
    totalIncome > 0
      ? Math.max(0, ((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)
      : '0.0';

  // ========================================================
  // 3 BUDGET STATUS STATES
  // ========================================================
  let statusInfo = {
    title: "You're on track",
    subtext: 'Your current spending is well within your monthly allocation.',
    badgeText: 'On Track',
    badgeClass: 'bg-emerald-50 text-emerald-700',
    barClass: 'bg-indigo-600',
    icon: CheckCircle2,
    iconColor: 'text-emerald-500',
  };

  if (isOverBudget) {
    statusInfo = {
      title: 'Budget exceeded',
      subtext: `Budget exceeded by ₹${Math.abs(remainingBudget).toLocaleString('en-IN')}`,
      badgeText: 'Budget Exceeded',
      badgeClass: 'bg-rose-50 text-rose-700',
      barClass: 'bg-rose-500',
      icon: AlertCircle,
      iconColor: 'text-rose-500',
    };
  } else if (budgetPercentage >= 90) {
    statusInfo = {
      title: "You're close to exceeding your budget",
      subtext: 'High alert: Very small spending buffer remaining this cycle.',
      badgeText: 'Critical Buffer',
      badgeClass: 'bg-rose-50 text-rose-700',
      barClass: 'bg-rose-500',
      icon: AlertCircle,
      iconColor: 'text-rose-500',
    };
  } else if (budgetPercentage >= 70) {
    statusInfo = {
      title: "You're approaching your budget",
      subtext: 'Warning: Watch discretionary expenses for the rest of the month.',
      badgeText: 'Approaching Limit',
      badgeClass: 'bg-amber-50 text-amber-700',
      barClass: 'bg-amber-500',
      icon: AlertTriangle,
      iconColor: 'text-amber-500',
    };
  }

  const StatusIcon = statusInfo.icon;

  // ========================================================
  // CATEGORY-WISE SPENDING BREAKDOWN
  // ========================================================
  const categoryTotals = (transactions || [])
    .filter((tx) => tx && tx.type === 'expense')
    .reduce((acc, tx) => {
      const cat = tx.category || 'Other';
      const amt = Number(tx.amount) || 0;
      acc[cat] = (acc[cat] || 0) + amt;
      return acc;
    }, {});

  const categoryEntries = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  );

  const topCategory = categoryEntries.length > 0 ? categoryEntries[0][0] : 'None';
  const topCategoryAmount = categoryEntries.length > 0 ? categoryEntries[0][1] : 0;

  // Handle Save Budget submission
  const handleSaveBudget = (e) => {
    e.preventDefault();
    const newAmount = Number(budgetInput);

    if (isNaN(newAmount) || newAmount <= 0) {
      setErrorMessage('Please enter a valid positive budget amount.');
      return;
    }

    if (onUpdateBudget) {
      onUpdateBudget(newAmount);
    }

    setErrorMessage('');
    setSavedNotification(true);
    setTimeout(() => {
      setSavedNotification(false);
    }, 3500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <PageHeader
        label="Financial Planning"
        title="Monthly Budget"
        subtitle="Track spending against your target and set spending limits."
      />

      {/* Budget Key Metrics Cards Grid */}
      <section
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Budget Key Metrics"
      >
        <SummaryCard
          title="Monthly Budget"
          value={`₹${budgetNum.toLocaleString('en-IN')}`}
          icon={Target}
          variant="purple"
          subtitle="Configured spending ceiling"
        />
        <SummaryCard
          title="Total Spent"
          value={`₹${totalExpenses.toLocaleString('en-IN')}`}
          icon={AlertCircle}
          variant={isOverBudget ? 'rose' : 'indigo'}
          subtitle={`${budgetPercentage}% of monthly limit`}
        />
        <SummaryCard
          title="Remaining Budget"
          value={
            isOverBudget
              ? `-₹${Math.abs(remainingBudget).toLocaleString('en-IN')}`
              : `₹${remainingBudget.toLocaleString('en-IN')}`
          }
          icon={isOverBudget ? AlertCircle : CheckCircle2}
          variant={isOverBudget ? 'rose' : 'emerald'}
          subtitle={
            isOverBudget
              ? `Budget exceeded by ₹${Math.abs(remainingBudget).toLocaleString('en-IN')}`
              : 'Available for remainder of month'
          }
        />
        <SummaryCard
          title="Budget Usage"
          value={`${budgetPercentage}%`}
          icon={Sparkles}
          variant={budgetPercentage > 90 ? 'rose' : budgetPercentage > 70 ? 'amber' : 'emerald'}
          subtitle={statusInfo.badgeText}
        />
      </section>

      {/* Main Budget Grid: Progress Card (2 cols) & Set Target Form (1 col) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Budget Progress Visualization Panel (Spans 2 columns on desktop) */}
        <section
          className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs lg:col-span-2"
          aria-label="Budget Progress Visualization"
        >
          <div>
            {/* Panel Header with Status Badge */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Spending Progress
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Current pace across the monthly billing cycle
                </p>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${statusInfo.badgeClass}`}
              >
                <StatusIcon className={`h-3.5 w-3.5 ${statusInfo.iconColor}`} />
                <span>{statusInfo.badgeText}</span>
              </span>
            </div>

            {/* Main Numbers and Progress Bar */}
            <div className="mt-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                    ₹{totalExpenses.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm font-medium text-slate-400 ml-2">
                    of ₹{budgetNum.toLocaleString('en-IN')}
                  </span>
                </div>
                <span
                  className={`text-sm font-bold ${
                    isOverBudget ? 'text-rose-600' : 'text-slate-800'
                  }`}
                >
                  {budgetPercentage}% used
                </span>
              </div>

              {/* Visual Progress Bar Track */}
              <div
                className="mt-4 h-3.5 w-full overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-valuenow={progressWidth}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Monthly budget spending progress"
              >
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${statusInfo.barClass}`}
                  style={{ width: `${progressWidth}%` }}
                />
              </div>

              {/* Axis Milestones */}
              <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400 font-medium">
                <span>₹0</span>
                <span>50% (₹{(budgetNum / 2).toLocaleString('en-IN')})</span>
                <span>₹{budgetNum.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Status Feedback Banner */}
            <div
              className={`mt-6 flex items-start gap-3 rounded-xl border p-4 ${
                isOverBudget
                  ? 'border-rose-100 bg-rose-50/70 text-rose-900'
                  : budgetPercentage >= 70
                  ? 'border-amber-100 bg-amber-50/70 text-amber-900'
                  : 'border-emerald-100 bg-emerald-50/70 text-emerald-900'
              }`}
            >
              <StatusIcon
                className={`h-5 w-5 shrink-0 mt-0.5 ${statusInfo.iconColor}`}
              />
              <div>
                <h3 className="text-sm font-bold">{statusInfo.title}</h3>
                <p className="mt-0.5 text-xs leading-relaxed opacity-90">
                  {statusInfo.subtext}
                </p>
              </div>
            </div>

            {/* Category Breakdown Progress */}
            {categoryEntries.length > 0 && (
              <div className="mt-8 border-t border-slate-100 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Category Spending Breakdown
                  </h3>
                  <span className="text-xs font-semibold text-slate-500">
                    {categoryEntries.length} Categories
                  </span>
                </div>

                <div className="space-y-3.5">
                  {categoryEntries.map(([catName, spentAmt]) => {
                    const catPct =
                      budgetNum > 0 ? Math.round((spentAmt / budgetNum) * 100) : 0;
                    const catColor = CATEGORY_COLORS[catName] || '#6366f1';

                    return (
                      <div key={catName}>
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1">
                          <span className="flex items-center gap-1.5">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: catColor }}
                            />
                            {catName}
                          </span>
                          <span>
                            ₹{spentAmt.toLocaleString('en-IN')}{' '}
                            <span className="text-slate-400 font-normal">
                              ({catPct}% of budget)
                            </span>
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${Math.min(catPct, 100)}%`,
                              backgroundColor: catColor,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between text-xs text-slate-400">
            <span>Cycle resets on the 1st of each month</span>
            <span>Active Limit: ₹{budgetNum.toLocaleString('en-IN')}</span>
          </div>
        </section>

        {/* Set Target Form Card (1 column on desktop) */}
        <section
          className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs"
          aria-label="Set Budget Target"
        >
          <div>
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900">
                Configure Target
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Update monthly spending ceiling
              </p>
            </div>

            {/* Success Feedback Alert */}
            {savedNotification && (
              <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-xs font-semibold text-emerald-700 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Budget updated & saved to LocalStorage!</span>
              </div>
            )}

            {/* Error Feedback Alert */}
            {errorMessage && (
              <div className="mt-4 rounded-xl bg-rose-50 border border-rose-100 p-3 text-xs font-semibold text-rose-700 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Budget Configuration Form */}
            <form onSubmit={handleSaveBudget} className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="monthly-budget-input"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5"
                >
                  Monthly Budget Amount (₹)
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-sm font-semibold text-slate-400">
                    ₹
                  </span>
                  <input
                    id="monthly-budget-input"
                    type="number"
                    min="500"
                    step="500"
                    required
                    value={budgetInput}
                    onChange={(e) => setBudgetInput(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pr-3.5 pl-8 text-sm font-semibold text-slate-800 transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    placeholder="30000"
                  />
                </div>
                <p className="mt-1.5 text-[11px] text-slate-400">
                  Default target is ₹30,000 / month. Persisted in LocalStorage.
                </p>
              </div>

              {/* Quick Select Preset Buttons */}
              <div>
                <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Quick Presets
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {['20000', '30000', '50000'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setBudgetInput(preset)}
                      className={`rounded-lg py-1.5 text-xs font-semibold transition-colors border ${
                        budgetInput === preset
                          ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      ₹{Number(preset).toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>Save Budget</span>
              </button>
            </form>
          </div>

          <div className="mt-8 rounded-xl bg-slate-50 p-4 border border-slate-100">
            <div className="flex items-start gap-2.5">
              <Sparkles className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Changes made here immediately update dashboard indicators and automated spending warnings.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Automated Spending Insights Section */}
      <section aria-label="Smart Insights">
        <SpendingInsights
          totalExpenses={totalExpenses}
          totalIncome={totalIncome}
          budget={budgetNum}
          savingsRate={savingsRate}
          topCategory={topCategory}
          topCategoryAmount={topCategoryAmount}
        />
      </section>
    </div>
  );
}

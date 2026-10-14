// SmartSpend AI - SpendingInsights Component

import React, { useState } from 'react';
import {
  Brain,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
  Target,
  Lightbulb,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Calendar,
  ShieldAlert,
  Info,
  PlusCircle,
} from 'lucide-react';

export default function SpendingInsights({
  transactions = [],
  totalIncome,
  totalExpenses,
  budget = 30000,
  savingsRate,
  topCategory,
  topCategoryAmount,
}) {
  const [currentDate] = useState(() => new Date());
  const incomeNum =
    totalIncome !== undefined
      ? Number(totalIncome) || 0
      : (transactions || [])
          .filter((t) => t && t.type === 'income')
          .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const expensesNum =
    totalExpenses !== undefined
      ? Number(totalExpenses) || 0
      : (transactions || [])
          .filter((t) => t && t.type === 'expense')
          .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const budgetNum = Number(budget) || 0;
  const balanceNum = incomeNum - expensesNum;

  const savingsRateNum =
    savingsRate !== undefined
      ? parseFloat(String(savingsRate)) || 0
      : incomeNum > 0
      ? Math.max(0, ((incomeNum - expensesNum) / incomeNum) * 100)
      : 0;
  const savingsRateDisplay = savingsRateNum.toFixed(1);

  const expenseTxs = (transactions || []).filter(
    (tx) => tx && tx.type === 'expense'
  );

  const categoryTotals = expenseTxs.reduce((acc, tx) => {
    const cat = tx.category || 'Other';
    acc[cat] = (acc[cat] || 0) + (Number(tx.amount) || 0);
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  );

  const resolvedTopCategory =
    topCategory && topCategory !== 'None'
      ? topCategory
      : sortedCategories.length > 0
      ? sortedCategories[0][0]
      : 'None';

  const resolvedTopCategoryAmount =
    topCategoryAmount !== undefined && topCategoryAmount > 0
      ? Number(topCategoryAmount)
      : sortedCategories.length > 0
      ? sortedCategories[0][1]
      : 0;

  const topCategoryPercentage =
    expensesNum > 0
      ? Math.round((resolvedTopCategoryAmount / expensesNum) * 100)
      : 0;

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const elapsedDaysInMonth = Math.max(1, currentDay);
  const monthName = currentDate.toLocaleString('en-US', { month: 'long' });

  const currentMonthExpenseTxs = expenseTxs.filter((tx) => {
    if (!tx || !tx.date || tx.date === 'Today' || tx.date === 'Yesterday') {
      return true;
    }
    try {
      const d = new Date(tx.date);
      if (!isNaN(d.getTime())) {
        return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
      }
    } catch {
      return true;
    }
    return true;
  });

  const currentMonthExpenses = currentMonthExpenseTxs.reduce(
    (sum, tx) => sum + (Number(tx.amount) || 0),
    0
  );

  const effectiveMonthExpenses =
    currentMonthExpenses > 0 ? currentMonthExpenses : expensesNum;

  const estimatedMonthlyExpenses =
    effectiveMonthExpenses > 0
      ? Math.round((effectiveMonthExpenses / elapsedDaysInMonth) * daysInMonth)
      : 0;

  const averageDailyExpenses =
    effectiveMonthExpenses > 0
      ? Math.round(effectiveMonthExpenses / elapsedDaysInMonth)
      : 0;

  const budgetUsagePercentage =
    budgetNum > 0 ? Math.round((expensesNum / budgetNum) * 100) : 0;

  let budgetAlert = {
    title: 'Your spending is currently within your budget.',
    variant: 'healthy',
    badge: 'On Track',
    icon: CheckCircle2,
    description: `Healthy spending at ${budgetUsagePercentage}% utilization with ₹${Math.max(
      0,
      budgetNum - expensesNum
    ).toLocaleString('en-IN')} remaining.`,
  };

  if (budgetNum <= 0) {
    budgetAlert = {
      title: 'No monthly budget target configured.',
      variant: 'neutral',
      badge: 'Unset',
      icon: Target,
      description:
        'Set a target monthly budget to enable active spending warnings and pacing alerts.',
    };
  } else if (budgetUsagePercentage > 100) {
    budgetAlert = {
      title: 'You have exceeded your budget.',
      variant: 'danger',
      badge: 'Exceeded',
      icon: AlertCircle,
      description: `Spending is ₹${(expensesNum - budgetNum).toLocaleString(
        'en-IN'
      )} over your ₹${budgetNum.toLocaleString('en-IN')} limit.`,
    };
  } else if (budgetUsagePercentage >= 90) {
    budgetAlert = {
      title: 'Warning: You are close to reaching your budget.',
      variant: 'danger',
      badge: 'Critical',
      icon: ShieldAlert,
      description: `Only ₹${(budgetNum - expensesNum).toLocaleString(
        'en-IN'
      )} remains before reaching your monthly limit.`,
    };
  } else if (budgetUsagePercentage >= 75) {
    budgetAlert = {
      title: 'Your spending is approaching your budget limit.',
      variant: 'warning',
      badge: 'Approaching',
      icon: AlertTriangle,
      description: `${budgetUsagePercentage}% of your total budget has been utilized across ${elapsedDaysInMonth} elapsed days.`,
    };
  } else if (budgetUsagePercentage >= 50) {
    budgetAlert = {
      title: 'Keep monitoring your spending.',
      variant: 'moderate',
      badge: 'Moderate',
      icon: Target,
      description: `You have crossed the halfway mark with ₹${(
        budgetNum - expensesNum
      ).toLocaleString('en-IN')} remaining.`,
    };
  }

  let spendingBehavior = 'Moderate Spending';
  let behaviorColor = 'text-indigo-600 bg-indigo-50 border-indigo-200';
  if (expensesNum === 0) {
    spendingBehavior = 'Awaiting Data';
    behaviorColor = 'text-slate-600 bg-slate-50 border-slate-200';
  } else if (balanceNum < 0) {
    spendingBehavior = 'Deficit Spending';
    behaviorColor = 'text-rose-600 bg-rose-50 border-rose-200';
  } else if (budgetNum > 0 && budgetUsagePercentage > 100) {
    spendingBehavior = 'Budget Overage';
    behaviorColor = 'text-rose-600 bg-rose-50 border-rose-200';
  } else if (savingsRateNum >= 30) {
    spendingBehavior = 'Disciplined Saver';
    behaviorColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';
  } else if (savingsRateNum >= 15) {
    spendingBehavior = 'Balanced Wealth Pacing';
    behaviorColor = 'text-indigo-600 bg-indigo-50 border-indigo-200';
  }

  const recommendations = [];

  if ((transactions || []).length === 0) {
    recommendations.push({
      id: 'empty-prompt',
      title: 'Begin Financial Tracking',
      text: 'Start by adding your regular income and daily expenses to activate AI-driven cash flow insights and proactive budgeting alerts.',
      icon: PlusCircle,
      type: 'info',
      tag: 'Getting Started',
    });
  } else {
    if (balanceNum < 0) {
      recommendations.push({
        id: 'negative-balance',
        title: 'Negative Cash Flow Alert',
        text: `Your recorded outflows exceed total earnings by ₹${Math.abs(
          balanceNum
        ).toLocaleString(
          'en-IN'
        )}. Prioritize non-discretionary commitments and avoid new discretionary charges this cycle.`,
        icon: AlertCircle,
        type: 'danger',
        tag: 'Cash Flow Warning',
      });
    }

    const topCatLower = resolvedTopCategory.toLowerCase();
    if (
      topCatLower.includes('food') ||
      topCatLower.includes('dining') ||
      topCatLower.includes('restaurant')
    ) {
      recommendations.push({
        id: 'rec-food',
        title: 'Optimize Food & Dining Expenses',
        text: `Food accounts for ₹${resolvedTopCategoryAmount.toLocaleString(
          'en-IN'
        )} (${topCategoryPercentage}% of spending). Meal planning and reducing food delivery orders could unlock significant monthly savings.`,
        icon: Lightbulb,
        type: 'warning',
        tag: 'Category Optimization',
      });
    } else if (topCatLower.includes('shop')) {
      recommendations.push({
        id: 'rec-shopping',
        title: 'Implement a Shopping Cooling-Off Rule',
        text: `Shopping is your largest expense at ₹${resolvedTopCategoryAmount.toLocaleString(
          'en-IN'
        )}. Adopt a 48-hour pause rule for non-essential purchases and set a dedicated weekly retail cap.`,
        icon: Lightbulb,
        type: 'warning',
        tag: 'Spending Guardrail',
      });
    } else if (
      topCatLower.includes('transport') ||
      topCatLower.includes('fuel') ||
      topCatLower.includes('travel')
    ) {
      recommendations.push({
        id: 'rec-transport',
        title: 'Review Transit & Fuel Costs',
        text: `Transport represents your highest expense at ₹${resolvedTopCategoryAmount.toLocaleString(
          'en-IN'
        )}. Consider combining commutes, using monthly transit passes, or carpooling to curb recurring costs.`,
        icon: Lightbulb,
        type: 'info',
        tag: 'Mobility Savings',
      });
    } else if (
      topCatLower.includes('bill') ||
      topCatLower.includes('utilities')
    ) {
      recommendations.push({
        id: 'rec-bills',
        title: 'Audit Recurring Utility & Bill Charges',
        text: `Bills form your primary expenditure at ₹${resolvedTopCategoryAmount.toLocaleString(
          'en-IN'
        )}. Review automated recurring subscriptions and negotiate high internet or mobile plans.`,
        icon: Lightbulb,
        type: 'info',
        tag: 'Fixed Overhead',
      });
    } else if (
      resolvedTopCategory !== 'None' &&
      resolvedTopCategoryAmount > 0
    ) {
      recommendations.push({
        id: 'rec-generic-cat',
        title: `Manage ${resolvedTopCategory} Outflows`,
        text: `${resolvedTopCategory} is your largest expense category (₹${resolvedTopCategoryAmount.toLocaleString(
          'en-IN'
        )}). Allocating a strict weekly sub-limit will prevent unexpected budget creep.`,
        icon: Lightbulb,
        type: 'info',
        tag: 'Targeted Allocation',
      });
    }

    if (budgetNum > 0 && budgetUsagePercentage >= 90) {
      recommendations.push({
        id: 'budget-exhausted',
        title: 'Tighten Discretionary Spending',
        text: `Your budget is ${budgetUsagePercentage}% utilized. To prevent overdrafts or deficit borrowing, freeze non-essential leisure expenditures for the rest of ${monthName}.`,
        icon: ShieldAlert,
        type: 'danger',
        tag: 'Budget Protection',
      });
    } else if (
      budgetNum > 0 &&
      budgetUsagePercentage < 75 &&
      expensesNum > 0
    ) {
      recommendations.push({
        id: 'budget-healthy-rec',
        title: 'Favorable Budget Cushion',
        text: `You have consumed only ${budgetUsagePercentage}% of your allocated budget. You are on track to preserve extra capital for your emergency savings fund or investments.`,
        icon: CheckCircle2,
        type: 'success',
        tag: 'Positive Habit',
      });
    }

    if (savingsRateNum >= 20) {
      recommendations.push({
        id: 'savings-stellar',
        title: 'Outstanding Savings Discipline',
        text: `You are saving ${savingsRateDisplay}% of your income, beating the traditional 20% financial independence benchmark. Consider channeling surplus cash into high-yield deposits or investments.`,
        icon: Sparkles,
        type: 'success',
        tag: 'Wealth Building',
      });
    }
  }

  const getCardStyle = (type) => {
    switch (type) {
      case 'danger':
        return {
          bg: 'bg-rose-50/60 border-rose-200/80',
          iconBg: 'bg-rose-100 text-rose-600',
          badge: 'bg-rose-100 text-rose-800',
          title: 'text-rose-950',
          text: 'text-rose-700',
        };
      case 'warning':
        return {
          bg: 'bg-amber-50/60 border-amber-200/80',
          iconBg: 'bg-amber-100 text-amber-700',
          badge: 'bg-amber-100 text-amber-800',
          title: 'text-amber-950',
          text: 'text-amber-700',
        };
      case 'success':
        return {
          bg: 'bg-emerald-50/60 border-emerald-200/80',
          iconBg: 'bg-emerald-100 text-emerald-600',
          badge: 'bg-emerald-100 text-emerald-800',
          title: 'text-emerald-950',
          text: 'text-emerald-700',
        };
      case 'info':
      default:
        return {
          bg: 'bg-indigo-50/60 border-indigo-200/80',
          iconBg: 'bg-indigo-100 text-indigo-600',
          badge: 'bg-indigo-100 text-indigo-800',
          title: 'text-indigo-950',
          text: 'text-indigo-700',
        };
    }
  };

  const getAlertStyle = (variant) => {
    switch (variant) {
      case 'danger':
        return {
          wrapper: 'border-rose-200 bg-rose-50/70',
          title: 'text-rose-900',
          text: 'text-rose-700',
          badge: 'bg-rose-100 text-rose-700',
          bar: 'bg-rose-500',
        };
      case 'warning':
        return {
          wrapper: 'border-amber-200 bg-amber-50/70',
          title: 'text-amber-900',
          text: 'text-amber-700',
          badge: 'bg-amber-100 text-amber-800',
          bar: 'bg-amber-500',
        };
      case 'healthy':
        return {
          wrapper: 'border-emerald-200 bg-emerald-50/70',
          title: 'text-emerald-900',
          text: 'text-emerald-700',
          badge: 'bg-emerald-100 text-emerald-800',
          bar: 'bg-emerald-500',
        };
      case 'moderate':
        return {
          wrapper: 'border-indigo-200 bg-indigo-50/70',
          title: 'text-indigo-900',
          text: 'text-indigo-700',
          badge: 'bg-indigo-100 text-indigo-800',
          bar: 'bg-indigo-500',
        };
      default:
        return {
          wrapper: 'border-slate-200 bg-slate-50',
          title: 'text-slate-800',
          text: 'text-slate-600',
          badge: 'bg-slate-100 text-slate-700',
          bar: 'bg-slate-400',
        };
    }
  };

  const alertStyle = getAlertStyle(budgetAlert.variant);
  const AlertIcon = budgetAlert.icon;

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
              <Brain className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">
              AI Spending Insights
            </h2>
            <span className="inline-flex items-center gap-1 rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-700">
              <Sparkles className="h-3 w-3 text-indigo-600" />
              Smart Analysis
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Understand your spending. Make smarter financial decisions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
            <Target className="h-3.5 w-3.5 text-indigo-600" />
            <span>Rule-Based Financial Intelligence</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs hover:shadow-xs transition-shadow">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Spending Summary
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Wallet className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-bold tracking-tight text-slate-900">
                ₹{expensesNum.toLocaleString('en-IN')}
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <span
                  className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold ${behaviorColor}`}
                >
                  {spendingBehavior}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-slate-100 pt-3 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-500">
              <span>Total Inflow:</span>
              <span className="font-semibold text-slate-700">
                ₹{incomeNum.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-500">
              <span className="flex items-center gap-1">
                {balanceNum >= 0 ? (
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5 text-rose-600" />
                )}
                <span>Net Cash Flow:</span>
              </span>
              <span
                className={`font-semibold ${
                  balanceNum >= 0 ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {balanceNum >= 0 ? '+' : ''}₹{balanceNum.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-500">
              <span>Daily Average:</span>
              <span className="font-semibold text-slate-700">
                ₹{averageDailyExpenses.toLocaleString('en-IN')}/day
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs hover:shadow-xs transition-shadow">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Budget Health
              </span>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  budgetUsagePercentage > 100
                    ? 'bg-rose-50 text-rose-600'
                    : budgetUsagePercentage >= 75
                    ? 'bg-amber-50 text-amber-600'
                    : 'bg-emerald-50 text-emerald-600'
                }`}
              >
                <AlertIcon className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  {budgetUsagePercentage}%
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  of ₹{budgetNum.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${alertStyle.bar}`}
                  style={{ width: `${Math.min(100, budgetUsagePercentage)}%` }}
                />
              </div>
            </div>
          </div>

          <div
            className={`mt-3 rounded-lg border p-2.5 text-xs ${alertStyle.wrapper}`}
          >
            <div className="flex items-start gap-2">
              <AlertIcon className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <p className={`font-semibold leading-snug ${alertStyle.title}`}>
                  {budgetAlert.title}
                </p>
                <p className={`mt-0.5 text-[11px] leading-tight ${alertStyle.text}`}>
                  {budgetAlert.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs hover:shadow-xs transition-shadow">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Monthly Estimate
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <Calendar className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-3">
              <div className="text-2xl font-bold tracking-tight text-slate-900">
                ₹{estimatedMonthlyExpenses.toLocaleString('en-IN')}
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="inline-flex items-center rounded-md border border-purple-200 bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                  Estimated End-of-Month
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-slate-100 pt-3 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-500">
              <span>Pacing vs Target:</span>
              <span
                className={`font-semibold ${
                  budgetNum > 0 && estimatedMonthlyExpenses > budgetNum
                    ? 'text-rose-600'
                    : 'text-emerald-600'
                }`}
              >
                {budgetNum > 0
                  ? estimatedMonthlyExpenses > budgetNum
                    ? `+₹${(
                        estimatedMonthlyExpenses - budgetNum
                      ).toLocaleString('en-IN')} over`
                    : `₹${(
                        budgetNum - estimatedMonthlyExpenses
                      ).toLocaleString('en-IN')} under`
                  : 'On Track'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Calculated using (₹{effectiveMonthExpenses.toLocaleString('en-IN')} /{' '}
              {elapsedDaysInMonth}d) × {daysInMonth}d in {monthName}. Assumes current pace continues.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs hover:shadow-xs transition-shadow">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Top Category
              </span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <TrendingDown className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-3">
              <div className="truncate text-2xl font-bold tracking-tight text-slate-900">
                {resolvedTopCategory}
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="inline-flex items-center rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                  {topCategoryPercentage}% of total outflows
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-slate-100 pt-3 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-slate-500">
              <span>Amount Spent:</span>
              <span className="font-semibold text-slate-800">
                ₹{resolvedTopCategoryAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-500">
              <span>Category Rank:</span>
              <span className="font-semibold text-indigo-600">
                #1 Highest Spend
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Lightbulb className="h-3.5 w-3.5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Personalized Saving Tips & Positive Financial Habits
            </h3>
          </div>
          <span className="text-[11px] font-medium text-slate-400">
            Based on active transactions
          </span>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec) => {
            const styles = getCardStyle(rec.type);
            const RecIcon = rec.icon;
            return (
              <div
                key={rec.id}
                className={`flex flex-col justify-between rounded-xl border p-4 transition-all hover:shadow-xs ${styles.bg}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg shadow-2xs ${styles.iconBg}`}
                    >
                      <RecIcon className="h-4 w-4" />
                    </div>
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${styles.badge}`}
                    >
                      {rec.tag}
                    </span>
                  </div>
                  <h4 className={`text-sm font-bold ${styles.title}`}>
                    {rec.title}
                  </h4>
                  <p className={`mt-1 text-xs leading-relaxed ${styles.text}`}>
                    {rec.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-t border-slate-200/60 pt-3 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span>
              SmartSpend AI uses smart rule-based financial algorithms. No external AI APIs or data sharing involved.
            </span>
          </div>
          <span>Savings Rate: {savingsRateDisplay}%</span>
        </div>
      </div>
    </div>
  );
}

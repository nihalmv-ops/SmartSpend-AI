// SmartSpend AI - SpendingInsights Component

import React from 'react';
import {
  Sparkles,
  TrendingDown,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Wallet,
  TrendingUp,
  Target,
  Info,
} from 'lucide-react';

export default function SpendingInsights({
  totalExpenses = 0,
  totalIncome = 0,
  budget = 30000,
  savingsRate = 0,
  topCategory = 'None',
  topCategoryAmount = 0,
}) {
  const expensesNum = Number(totalExpenses) || 0;
  const incomeNum = Number(totalIncome) || 0;
  const budgetNum = Number(budget) || 30000;
  const savingsRateNum = parseFloat(String(savingsRate)) || 0;

  const insights = [];

  if (topCategory && topCategory !== 'None' && topCategoryAmount > 0) {
    insights.push({
      id: 'top-category',
      type: 'category',
      title: 'Primary Spending Category',
      description: `${topCategory} is your highest spending category this month with ₹${topCategoryAmount.toLocaleString('en-IN')} allocated so far.`,
      icon: TrendingDown,
      color: 'purple',
      badge: 'Category Insight',
    });
  }

  if (budgetNum > 0) {
    if (expensesNum > budgetNum) {
      const overAmount = expensesNum - budgetNum;
      insights.push({
        id: 'budget-exceeded',
        type: 'danger',
        title: 'Budget Limit Exceeded',
        description: `Your spending has exceeded your monthly budget by ₹${overAmount.toLocaleString('en-IN')}. Consider pausing non-essential purchases for the rest of this cycle.`,
        icon: AlertCircle,
        color: 'rose',
        badge: 'Budget Alert',
      });
    } else if (expensesNum >= budgetNum * 0.9) {
      const usedPct = Math.round((expensesNum / budgetNum) * 100);
      insights.push({
        id: 'budget-warning',
        type: 'warning',
        title: 'Approaching Budget Limit',
        description: `You've used ${usedPct}% of your ₹${budgetNum.toLocaleString('en-IN')} monthly target. You have ₹${(budgetNum - expensesNum).toLocaleString('en-IN')} remaining.`,
        icon: AlertTriangle,
        color: 'amber',
        badge: 'Budget Warning',
      });
    } else if (expensesNum <= budgetNum * 0.7 && expensesNum > 0) {
      const usedPct = Math.round((expensesNum / budgetNum) * 100);
      insights.push({
        id: 'budget-healthy',
        type: 'success',
        title: 'Spending Within Budget',
        description: `You're currently spending within your budget target (${usedPct}% utilized). Great financial discipline!`,
        icon: CheckCircle2,
        color: 'emerald',
        badge: 'On Track',
      });
    } else if (expensesNum > 0) {
      insights.push({
        id: 'budget-moderate',
        type: 'info',
        title: 'Moderate Spending Pace',
        description: `You have ₹${(budgetNum - expensesNum).toLocaleString('en-IN')} remaining in your monthly allocation.`,
        icon: Target,
        color: 'indigo',
        badge: 'Balanced',
      });
    }
  }

  if (incomeNum > 0) {
    if (savingsRateNum >= 20) {
      insights.push({
        id: 'savings-strong',
        type: 'success',
        title: 'Strong Savings Rate',
        description: `Great job! Your current savings rate is strong at ${savingsRateNum}%, comfortably exceeding the recommended 20% benchmark.`,
        icon: Wallet,
        color: 'emerald',
        badge: 'Savings Milestone',
      });
    } else if (savingsRateNum > 0 && savingsRateNum < 10) {
      insights.push({
        id: 'savings-low',
        type: 'warning',
        title: 'Low Net Savings',
        description: `Your savings rate is currently ${savingsRateNum}%. Review recurring subscriptions and flexible living expenses to retain more income.`,
        icon: TrendingUp,
        color: 'blue',
        badge: 'Savings Tip',
      });
    } else if (savingsRateNum >= 10 && savingsRateNum < 20) {
      insights.push({
        id: 'savings-moderate',
        type: 'info',
        title: 'Healthy Savings Momentum',
        description: `You are saving ${savingsRateNum}% of your total earnings. Aiming for 20% will build long-term financial security.`,
        icon: Sparkles,
        color: 'indigo',
        badge: 'Savings Rate',
      });
    }
  }

  if (insights.length === 0) {
    insights.push({
      id: 'no-data',
      type: 'info',
      title: 'Awaiting Transaction Activity',
      description: 'Add your income and expenses to automatically generate rule-based financial insights and budget warnings.',
      icon: Info,
      color: 'slate',
      badge: 'Getting Started',
    });
  }

  const getColorClasses = (color) => {
    switch (color) {
      case 'rose':
        return {
          bg: 'bg-rose-50/70 border-rose-100',
          iconBg: 'bg-rose-100 text-rose-600',
          badge: 'bg-rose-100 text-rose-700',
          title: 'text-rose-950',
          desc: 'text-rose-700',
        };
      case 'amber':
        return {
          bg: 'bg-amber-50/70 border-amber-100',
          iconBg: 'bg-amber-100 text-amber-700',
          badge: 'bg-amber-100 text-amber-800',
          title: 'text-amber-950',
          desc: 'text-amber-700',
        };
      case 'emerald':
        return {
          bg: 'bg-emerald-50/70 border-emerald-100',
          iconBg: 'bg-emerald-100 text-emerald-600',
          badge: 'bg-emerald-100 text-emerald-700',
          title: 'text-emerald-950',
          desc: 'text-emerald-700',
        };
      case 'purple':
        return {
          bg: 'bg-purple-50/70 border-purple-100',
          iconBg: 'bg-purple-100 text-purple-600',
          badge: 'bg-purple-100 text-purple-700',
          title: 'text-purple-950',
          desc: 'text-purple-700',
        };
      case 'blue':
        return {
          bg: 'bg-blue-50/70 border-blue-100',
          iconBg: 'bg-blue-100 text-blue-600',
          badge: 'bg-blue-100 text-blue-700',
          title: 'text-blue-950',
          desc: 'text-blue-700',
        };
      case 'indigo':
      default:
        return {
          bg: 'bg-indigo-50/70 border-indigo-100',
          iconBg: 'bg-indigo-100 text-indigo-600',
          badge: 'bg-indigo-100 text-indigo-700',
          title: 'text-indigo-950',
          desc: 'text-indigo-700',
        };
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">Smart Insights</h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700">
              <Sparkles className="h-3 w-3" />
              Automated
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated insights based on your spending activity
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {insights.map((item) => {
          const Icon = item.icon;
          const styles = getColorClasses(item.color);

          return (
            <div
              key={item.id}
              className={`flex flex-col justify-between rounded-xl border p-4 transition-all hover:shadow-xs ${styles.bg}`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl shadow-2xs ${styles.iconBg}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${styles.badge}`}
                  >
                    {item.badge}
                  </span>
                </div>
                <h3 className={`text-sm font-bold ${styles.title}`}>
                  {item.title}
                </h3>
                <p className={`mt-1 text-xs leading-relaxed ${styles.desc}`}>
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


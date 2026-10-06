import React from 'react';
import { Target, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

/**
 * BudgetCard Component
 * 
 * Displays the monthly budget utilization on the dashboard with dynamic progress bar
 * and 3 distinct status states (Safe, Warning, Danger / Exceeded).
 * 
 * Beginner React Concepts:
 * - props: receives formatted spending numbers and percentage.
 * - Math.min(): prevents the visual progress bar width from exceeding 100%.
 * - Conditional rendering: dynamically chooses status text, icons, and colors.
 *
 * @param {string} spent - Formatted spent amount (e.g. "₹18,500")
 * @param {string} total - Formatted total budget (e.g. "₹30,000")
 * @param {string} remaining - Formatted remaining amount (e.g. "₹11,500")
 * @param {number} percentage - Numeric percentage (e.g. 62)
 * @param {boolean} [isOverBudget] - Whether spending exceeded budget
 */
export default function BudgetCard({
  spent = '₹18,500',
  total = '₹30,000',
  remaining = '₹11,500',
  percentage = 62,
  isOverBudget = false,
}) {
  const pctNum = Number(percentage) || 0;
  // Ensure visual progress bar never exceeds 100% of container width
  const progressWidth = Math.min(Math.max(0, pctNum), 100);

  // Status configuration based on threshold
  let statusBadge = {
    text: 'On track for this cycle',
    icon: CheckCircle2,
    color: 'text-emerald-600',
    iconColor: 'text-emerald-500',
    barColor: 'bg-indigo-600',
  };

  if (isOverBudget || pctNum > 100) {
    statusBadge = {
      text: 'Budget exceeded',
      icon: AlertCircle,
      color: 'text-rose-600',
      iconColor: 'text-rose-500',
      barColor: 'bg-rose-500',
    };
  } else if (pctNum >= 90) {
    statusBadge = {
      text: 'Close to budget limit',
      icon: AlertTriangle,
      color: 'text-rose-600',
      iconColor: 'text-rose-500',
      barColor: 'bg-rose-500',
    };
  } else if (pctNum >= 70) {
    statusBadge = {
      text: 'Approaching budget',
      icon: AlertTriangle,
      color: 'text-amber-600',
      iconColor: 'text-amber-500',
      barColor: 'bg-amber-500',
    };
  }

  const StatusIcon = statusBadge.icon;

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Monthly Budget</h2>
            <p className="text-xs text-slate-400 mt-0.5">Your spending progress</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Target className="h-4 w-4" />
          </div>
        </div>

        {/* Amount Display */}
        <div className="mt-5">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {spent}
            </span>
            <span className="text-sm font-medium text-slate-400">
              of {total}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs font-medium mb-1.5">
              <span className="text-slate-500">Utilization</span>
              <span className={`font-semibold ${pctNum > 100 ? 'text-rose-600' : 'text-indigo-600'}`}>
                {pctNum}%
              </span>
            </div>
            <div
              className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100"
              role="progressbar"
              aria-valuenow={progressWidth}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Monthly budget utilization"
            >
              <div
                className={`h-full rounded-full transition-all duration-500 ease-out ${statusBadge.barColor}`}
                style={{ width: `${progressWidth}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 flex items-center justify-between rounded-xl bg-slate-50 p-3 text-xs">
        <div className="flex items-center gap-1.5 font-medium">
          <StatusIcon className={`h-3.5 w-3.5 ${statusBadge.iconColor}`} />
          <span className={statusBadge.color}>{statusBadge.text}</span>
        </div>
        <span className="font-semibold text-slate-700">
          {remaining}
        </span>
      </div>
    </div>
  );
}

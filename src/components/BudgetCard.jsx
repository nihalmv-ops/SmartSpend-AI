// SmartSpend AI - BudgetCard Component

import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';

export default function BudgetCard({
  spent = '₹18,500',
  total = '₹30,000',
  remaining = '₹11,500',
  percentage = 62,
}) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Monthly Budget</h2>
            <p className="text-xs text-slate-400 mt-0.5">Your spending progress</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Target className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {spent}
            </span>
            <span className="text-sm font-medium text-slate-400">
              of {total}
            </span>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-xs font-medium mb-1.5">
              <span className="text-slate-500">Utilization</span>
              <span className="font-semibold text-indigo-600">{percentage}%</span>
            </div>
            <div
              className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100"
              role="progressbar"
              aria-valuenow={percentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Monthly budget utilization"
            >
              <div
                className="h-full rounded-full bg-indigo-600 transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl bg-slate-50 p-3 text-xs">
        <div className="flex items-center gap-1.5 text-slate-600 font-medium">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
          <span>On track for this cycle</span>
        </div>
        <span className="font-semibold text-slate-700">
          {remaining} left
        </span>
      </div>
    </div>
  );
}


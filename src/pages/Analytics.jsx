// SmartSpend AI - Analytics Page

import React, { useState } from 'react';
import {
  TrendingDown,
  Calendar,
  Utensils,
  Percent,
  BarChart3,
  PieChart,
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SummaryCard from '../components/SummaryCard';

export default function Analytics({ transactions = [] }) {
  const [period, setPeriod] = useState('Monthly');

  const totalExpenses = (transactions || [])
    .filter((tx) => tx && tx.type === 'expense')
    .reduce((sum, tx) => {
      const amt =
        typeof tx.amount === 'number'
          ? isNaN(tx.amount) ? 0 : tx.amount
          : Number(String(tx.amount || 0).replace(/[^0-9.-]+/g, '')) || 0;
      return sum + amt;
    }, 0);

  const totalIncome = (transactions || [])
    .filter((tx) => tx && tx.type === 'income')
    .reduce((sum, tx) => {
      const amt =
        typeof tx.amount === 'number'
          ? isNaN(tx.amount) ? 0 : tx.amount
          : Number(String(tx.amount || 0).replace(/[^0-9.-]+/g, '')) || 0;
      return sum + amt;
    }, 0);

  const averageDaily = Math.round(totalExpenses / 30);

  const categoryTotals = (transactions || [])
    .filter((tx) => tx && tx.type === 'expense')
    .reduce((acc, tx) => {
      const cat = tx.category || 'Other';
      const amt =
        typeof tx.amount === 'number'
          ? isNaN(tx.amount) ? 0 : tx.amount
          : Number(String(tx.amount || 0).replace(/[^0-9.-]+/g, '')) || 0;
      acc[cat] = (acc[cat] || 0) + amt;
      return acc;
    }, {});

  let topCategory = 'None';
  let highestAmount = 0;
  Object.entries(categoryTotals).forEach(([cat, amount]) => {
    if (amount > highestAmount) {
      highestAmount = amount;
      topCategory = cat;
    }
  });

  const savingsRate =
    totalIncome > 0
      ? Math.max(0, ((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1) + '%'
      : '0.0%';

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        label="Insights & Trends"
        title="ANALYTICS"
        subtitle="Understand where your money goes."
      >
        <div
          className="flex items-center rounded-xl bg-slate-100 p-1"
          role="group"
          aria-label="Select analytics timeframe"
        >
          <button
            type="button"
            onClick={() => setPeriod('Monthly')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              period === 'Monthly'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setPeriod('Yearly')}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              period === 'Yearly'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Yearly
          </button>
        </div>
      </PageHeader>

      <section
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Analytics KPI Metrics"
      >
        <SummaryCard
          title="Total Spending"
          value={`₹${totalExpenses.toLocaleString('en-IN')}`}
          icon={TrendingDown}
          variant="rose"
          subtitle="Total outflows recorded"
        />
        <SummaryCard
          title="Average Daily"
          value={`₹${averageDaily.toLocaleString('en-IN')}`}
          icon={Calendar}
          variant="indigo"
          subtitle="Based on 30-day tracking"
        />
        <SummaryCard
          title="Top Category"
          value={topCategory}
          icon={Utensils}
          variant="purple"
          subtitle={
            highestAmount > 0
              ? `₹${highestAmount.toLocaleString('en-IN')} total spent`
              : 'No recorded expenses'
          }
        />
        <SummaryCard
          title="Savings Rate"
          value={savingsRate}
          icon={Percent}
          variant="emerald"
          subtitle="Net savings ratio"
        />
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section
          className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs"
          aria-label="Spending by Category"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Spending by Category
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Category allocation breakdown
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
              {period}
            </span>
          </div>

          <div className="relative mt-6 flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
            <div
              className="flex h-36 w-36 items-center justify-center rounded-full border-8 border-indigo-200 border-t-indigo-600 border-r-indigo-400 opacity-40 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col items-center max-w-xs mt-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-2 shadow-2xs">
                <PieChart className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">
                Category Breakdown Chart
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Ready for Recharts PieChart component coming in future milestones.
              </p>
            </div>
          </div>
        </section>

        <section
          className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs"
          aria-label="Monthly Spending Trend"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Monthly Spending Trend
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Outflow trajectory over time
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
              6 Months
            </span>
          </div>

          <div className="relative mt-6 flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
            <div
              className="absolute inset-x-8 bottom-6 flex h-28 items-end justify-between gap-4 opacity-25 pointer-events-none"
              aria-hidden="true"
            >
              <div className="w-full h-[40%] rounded-t bg-indigo-300" />
              <div className="w-full h-[60%] rounded-t bg-indigo-400" />
              <div className="w-full h-[80%] rounded-t bg-indigo-500" />
              <div className="w-full h-[55%] rounded-t bg-indigo-300" />
              <div className="w-full h-[90%] rounded-t bg-indigo-600" />
              <div className="w-full h-[70%] rounded-t bg-indigo-400" />
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-2 shadow-2xs">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">
                Monthly Trend Chart
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Ready for Recharts ResponsiveContainer and BarChart.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}


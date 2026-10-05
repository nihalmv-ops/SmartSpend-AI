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

export default function Analytics() {
  const [period, setPeriod] = useState('Monthly');

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <PageHeader
        label="Insights & Trends"
        title="ANALYTICS"
        subtitle="Understand where your money goes."
      >
        {/* Period Selector Tabs */}
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

      {/* Analytics Summary Cards (Reusing SummaryCard) */}
      <section
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Analytics KPI Metrics"
      >
        <SummaryCard
          title="Total Spending"
          value="₹18,500"
          icon={TrendingDown}
          variant="rose"
          subtitle="Total outflows recorded"
        />
        <SummaryCard
          title="Average Daily"
          value="₹616"
          icon={Calendar}
          variant="indigo"
          subtitle="Based on 30-day tracking"
        />
        <SummaryCard
          title="Top Category"
          value="Food"
          icon={Utensils}
          variant="purple"
          subtitle="42% of total expenses"
        />
        <SummaryCard
          title="Savings Rate"
          value="58.9%"
          icon={Percent}
          variant="emerald"
          subtitle="Above recommended 20%"
        />
      </section>

      {/* Chart Placeholders Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Spending by Category Placeholder */}
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
                Breakdown across your active expense buckets
              </p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <PieChart className="h-4 w-4" />
            </div>
          </div>

          {/* Chart Placeholder Box */}
          <div className="relative mt-6 flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
            {/* Silhouette preview */}
            <div className="flex items-center justify-center gap-6 opacity-30 pointer-events-none mb-4" aria-hidden="true">
              <div className="h-28 w-28 rounded-full border-8 border-indigo-500 border-t-purple-400 border-r-pink-400" />
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-xs rounded-xl bg-white/95 p-4 shadow-xs border border-slate-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 mb-2">
                <PieChart className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">
                Category Distribution
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Interactive Recharts donut chart with category distribution scheduled for Day 3.
              </p>
              <span className="mt-2.5 inline-flex items-center rounded-full bg-purple-50 px-2.5 py-0.5 text-[10px] font-semibold text-purple-700">
                Day 3 Recharts Component
              </span>
            </div>

            {/* Category breakdown pill preview */}
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-[11px] font-medium text-slate-500">
              <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-0.5 border border-slate-200">
                🍔 Food (42%)
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-0.5 border border-slate-200">
                🚗 Transport (24%)
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-0.5 border border-slate-200">
                🧾 Bills (18%)
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-0.5 border border-slate-200">
                🛍️ Shopping (16%)
              </span>
            </div>
          </div>
        </section>

        {/* Monthly Spending Placeholder */}
        <section
          className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs"
          aria-label="Monthly Spending Trend"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Monthly Spending
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Spending velocity compared over time
              </p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <BarChart3 className="h-4 w-4" />
            </div>
          </div>

          {/* Chart Placeholder Box */}
          <div className="relative mt-6 flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
            {/* Visual silhouette background mimicking bar chart */}
            <div
              className="absolute inset-x-6 bottom-8 flex h-28 items-end justify-between gap-3 opacity-25 pointer-events-none"
              aria-hidden="true"
            >
              <div className="w-full h-[55%] rounded-t bg-indigo-400" />
              <div className="w-full h-[70%] rounded-t bg-indigo-500" />
              <div className="w-full h-[45%] rounded-t bg-indigo-400" />
              <div className="w-full h-[85%] rounded-t bg-indigo-600" />
              <div className="w-full h-[60%] rounded-t bg-indigo-400" />
              <div className="w-full h-[40%] rounded-t bg-indigo-300" />
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-xs rounded-xl bg-white/95 p-4 shadow-xs border border-slate-100">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-2">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">
                Historical Trend Chart
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Recharts multi-bar and area comparisons will be activated in Day 3.
              </p>
              <span className="mt-2.5 inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-[10px] font-semibold text-indigo-700">
                Day 3 Recharts Component
              </span>
            </div>

            {/* Months preview */}
            <div
              className="absolute inset-x-6 bottom-2 flex justify-between text-[10px] font-medium text-slate-400"
              aria-hidden="true"
            >
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

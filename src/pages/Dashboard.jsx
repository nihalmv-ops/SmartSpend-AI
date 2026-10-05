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

export default function Dashboard({ onOpenAddModal }) {
  const [timeframe, setTimeframe] = useState('Monthly');

  return (
    <div className="space-y-6 pb-12">
      {/* Dashboard Page Header */}
      <PageHeader
        label="Financial Overview"
        title="Good morning 👋"
        subtitle="Here's your financial overview for this month."
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

      {/* 4 Summary Cards Grid */}
      <section
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Key Financial Metrics"
      >
        <SummaryCard
          title="Total Income"
          value="₹45,000"
          icon={TrendingUp}
          variant="emerald"
          subtitle="+12% from last month"
        />
        <SummaryCard
          title="Total Expenses"
          value="₹18,500"
          icon={TrendingDown}
          variant="rose"
          subtitle="41% of total income"
        />
        <SummaryCard
          title="Current Balance"
          value="₹26,500"
          icon={Wallet}
          variant="indigo"
          subtitle="Available for savings"
        />
        <SummaryCard
          title="Monthly Budget"
          value="₹30,000"
          icon={Target}
          variant="purple"
          subtitle="Set for October 2026"
        />
      </section>

      {/* Main Insights Grid: Spending Overview (Chart Placeholder) + Budget Card */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Spending Overview Panel (Spans 2 columns on desktop) */}
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

            {/* Timeframe Select Dropdown */}
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

          {/* Chart Placeholder Area */}
          <div className="relative mt-6 flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
            {/* Visual silhouette background mimicking a chart */}
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

            {/* Placeholder info box */}
            <div className="relative z-10 flex flex-col items-center max-w-sm rounded-xl bg-white/95 p-5 shadow-xs border border-slate-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-3 shadow-2xs">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">
                Interactive Chart Area
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Reserved for Recharts spending analytics and breakdown charts coming in Day 3.
              </p>
              <span className="mt-3 inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-700">
                Day 3 Analytics
              </span>
            </div>

            {/* Timeline axis labels */}
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

        {/* Monthly Budget Card */}
        <section aria-label="Monthly Budget Progress">
          <BudgetCard
            spent="₹18,500"
            total="₹30,000"
            remaining="₹11,500"
            percentage={62}
          />
        </section>
      </div>

      {/* Recent Transactions Section */}
      <section aria-label="Recent Transactions List">
        <RecentTransactions />
      </section>
    </div>
  );
}

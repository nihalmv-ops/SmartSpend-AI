// SmartSpend AI - Reports Page

import React, { useState } from 'react';
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  CheckCircle2,
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SummaryCard from '../components/SummaryCard';

export default function Reports({ transactions = [] }) {
  const [period, setPeriod] = useState('Monthly');
  const [exportNotice, setExportNotice] = useState(null);

  const totalIncome = (transactions || [])
    .filter((t) => t && t.type === 'income')
    .reduce((sum, t) => {
      const amt =
        typeof t.amount === 'number'
          ? isNaN(t.amount) ? 0 : t.amount
          : Number(String(t.amount || 0).replace(/[^0-9.-]+/g, '')) || 0;
      return sum + amt;
    }, 0);

  const totalExpenses = (transactions || [])
    .filter((t) => t && t.type === 'expense')
    .reduce((sum, t) => {
      const amt =
        typeof t.amount === 'number'
          ? isNaN(t.amount) ? 0 : t.amount
          : Number(String(t.amount || 0).replace(/[^0-9.-]+/g, '')) || 0;
      return sum + amt;
    }, 0);

  const netSavings = totalIncome - totalExpenses;
  const savingsRate =
    totalIncome > 0
      ? ((netSavings / totalIncome) * 100).toFixed(1)
      : '0.0';

  const handleExport = (type) => {
    setExportNotice(`${type} export feature will be fully activated in subsequent releases!`);
    setTimeout(() => {
      setExportNotice(null);
    }, 3500);
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        label="Financial Statements"
        title="REPORTS"
        subtitle="Review, audit, and export your financial statements."
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => handleExport('CSV')}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            aria-label="Export report as CSV"
          >
            <Download className="h-3.5 w-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={() => handleExport('PDF')}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            aria-label="Export report as PDF"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Export PDF</span>
          </button>
        </div>
      </PageHeader>

      {exportNotice && (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50/80 p-3.5 text-xs font-medium text-indigo-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0" />
            <span>{exportNotice}</span>
          </div>
          <span className="text-[10px] text-indigo-500 font-semibold uppercase">
            UI-Only
          </span>
        </div>
      )}

      <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-slate-400" />
          <span className="text-xs font-semibold text-slate-700">
            Statement Period:
          </span>
        </div>

        <div
          className="flex items-center rounded-xl bg-slate-100 p-1"
          role="group"
          aria-label="Select report period"
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
      </div>

      <section
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Statement Metrics"
      >
        <SummaryCard
          title="Gross Income"
          value={`₹${totalIncome.toLocaleString('en-IN')}`}
          icon={TrendingUp}
          variant="emerald"
          subtitle="Total inflows received"
        />
        <SummaryCard
          title="Total Outflow"
          value={`₹${totalExpenses.toLocaleString('en-IN')}`}
          icon={TrendingDown}
          variant="rose"
          subtitle="Operating living expenses"
        />
        <SummaryCard
          title="Net Savings"
          value={`₹${netSavings.toLocaleString('en-IN')}`}
          icon={PiggyBank}
          variant="indigo"
          subtitle={`Savings rate: ${savingsRate}%`}
        />
        <SummaryCard
          title="Statement Status"
          value="Reconciled"
          icon={CheckCircle2}
          variant="purple"
          subtitle="Ready for audit"
        />
      </section>

      <section
        className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs"
        aria-label="Statement Preview"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Statement Summary
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Live consolidated balance sheet
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            {period} Summary
          </span>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
            <span className="text-sm font-semibold text-slate-700">Total Credits</span>
            <span className="text-sm font-bold text-emerald-600">
              +₹{totalIncome.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
            <span className="text-sm font-semibold text-slate-700">Total Debits</span>
            <span className="text-sm font-bold text-rose-600">
              -₹{totalExpenses.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-indigo-50/50 p-4 border border-indigo-100/50">
            <span className="text-sm font-bold text-indigo-950">Net Retained Cash</span>
            <span className="text-base font-bold text-indigo-700">
              ₹{netSavings.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}


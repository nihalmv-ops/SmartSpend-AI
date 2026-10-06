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

  // Dynamic calculations from transactions
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

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
      {/* Page Header with Export Action Buttons */}
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

      {/* Export Feedback Banner */}
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

      {/* Period Selector Bar */}
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

      {/* Summary Cards */}
      <section
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        aria-label="Financial Report Summary"
      >
        <SummaryCard
          title="Income"
          value={`₹${totalIncome.toLocaleString('en-IN')}`}
          icon={TrendingUp}
          variant="emerald"
          subtitle="Total verified cash inflow"
        />
        <SummaryCard
          title="Expenses"
          value={`₹${totalExpenses.toLocaleString('en-IN')}`}
          icon={TrendingDown}
          variant="rose"
          subtitle="Total recorded expenses"
        />
        <SummaryCard
          title="Savings"
          value={`₹${netSavings.toLocaleString('en-IN')}`}
          icon={PiggyBank}
          variant="indigo"
          subtitle={`Net retained surplus (${savingsRate}%)`}
        />
      </section>

      {/* Monthly Financial Breakdown Table */}
      <section
        className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs"
        aria-label="Monthly Breakdown Table"
      >
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-base font-bold text-slate-900">
            Monthly Performance Summary
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit of past 6 months cash flow & net savings
          </p>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/70 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <tr>
                <th scope="col" className="px-4 py-3">Month</th>
                <th scope="col" className="px-4 py-3">Income</th>
                <th scope="col" className="px-4 py-3">Expenses</th>
                <th scope="col" className="px-4 py-3">Net Savings</th>
                <th scope="col" className="px-4 py-3 text-right">Savings Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { month: 'October 2026 (Current)', income: '₹45,000', expenses: '₹18,500', savings: '₹26,500', rate: '58.9%', isCurrent: true },
                { month: 'September 2026', income: '₹42,000', expenses: '₹19,200', savings: '₹22,800', rate: '54.2%', isCurrent: false },
                { month: 'August 2026', income: '₹40,000', expenses: '₹21,100', savings: '₹18,900', rate: '47.2%', isCurrent: false },
                { month: 'July 2026', income: '₹40,000', expenses: '₹17,400', savings: '₹22,600', rate: '56.5%', isCurrent: false },
                { month: 'June 2026', income: '₹38,000', expenses: '₹16,500', savings: '₹21,500', rate: '56.5%', isCurrent: false },
              ].map((row, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors hover:bg-slate-50/70 ${
                    row.isCurrent ? 'bg-indigo-50/30 font-medium' : ''
                  }`}
                >
                  <td className="px-4 py-3.5 text-slate-900 font-semibold">
                    {row.month}
                  </td>
                  <td className="px-4 py-3.5 text-emerald-600 font-medium">
                    {row.income}
                  </td>
                  <td className="px-4 py-3.5 text-rose-600 font-medium">
                    {row.expenses}
                  </td>
                  <td className="px-4 py-3.5 text-slate-900 font-semibold">
                    {row.savings}
                  </td>
                  <td className="px-4 py-3.5 text-right font-bold text-indigo-600">
                    {row.rate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

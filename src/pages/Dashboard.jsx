// SmartSpend AI - Dashboard Page

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
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import PageHeader from '../components/PageHeader';
import SummaryCard from '../components/SummaryCard';
import BudgetCard from '../components/BudgetCard';
import RecentTransactions from '../components/RecentTransactions';
import SpendingInsights from '../components/SpendingInsights';

const CustomOverviewTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const value = Number(payload[0].value || 0).toLocaleString('en-IN');
    return (
      <div className="rounded-xl border border-slate-100 bg-white/95 p-3 shadow-md backdrop-blur-xs">
        <p className="text-xs font-semibold text-slate-700">{label}</p>
        <p className="mt-1 text-sm font-bold text-indigo-600">₹{value}</p>
      </div>
    );
  }
  return null;
};

export default function Dashboard({
  transactions = [],
  budget = 30000,
  onOpenAddModal,
}) {
  const [timeframe, setTimeframe] = useState('Monthly');

  const totalIncome = (transactions || [])
    .filter((tx) => tx && tx.type === 'income')
    .reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);

  const expenseTransactions = (transactions || []).filter(
    (tx) => tx && tx.type === 'expense'
  );

  const totalExpenses = expenseTransactions.reduce(
    (sum, tx) => sum + (Number(tx.amount) || 0),
    0
  );

  const currentBalance = totalIncome - totalExpenses;

  const budgetNum = Number(budget) || 30000;
  const remainingBudget = budgetNum - totalExpenses;
  const isOverBudget = remainingBudget < 0;
  const budgetPercentage =
    budgetNum > 0 ? Math.round((totalExpenses / budgetNum) * 100) : 0;

  const savingsRate =
    totalIncome > 0
      ? Math.max(0, ((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)
      : '0.0';

  const categoryTotals = expenseTransactions.reduce((acc, tx) => {
    const cat = tx.category || 'Other';
    acc[cat] = (acc[cat] || 0) + (Number(tx.amount) || 0);
    return acc;
  }, {});

  const categoryEntries = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1]
  );
  const topCategory = categoryEntries.length > 0 ? categoryEntries[0][0] : 'None';
  const topCategoryAmount = categoryEntries.length > 0 ? categoryEntries[0][1] : 0;

  const chartData = [
    { name: 'Week 1', spending: 0 },
    { name: 'Week 2', spending: 0 },
    { name: 'Week 3', spending: 0 },
    { name: 'Week 4', spending: 0 },
  ];

  expenseTransactions.forEach((tx) => {
    const amt = Number(tx.amount) || 0;
    let day = 1;
    if (tx.rawDate) {
      day = new Date(tx.rawDate).getDate() || 1;
    } else if (typeof tx.date === 'string' && tx.date.includes('-')) {
      const parts = tx.date.split('-');
      day = parseInt(parts[2], 10) || 1;
    } else {
      day = (tx.id % 28) + 1;
    }

    if (day <= 7) chartData[0].spending += amt;
    else if (day <= 14) chartData[1].spending += amt;
    else if (day <= 21) chartData[2].spending += amt;
    else chartData[3].spending += amt;
  });

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        label="Financial Overview"
        title="Good morning 👋"
        subtitle="Here's your live financial overview for this month."
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

      <section
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Key Financial Metrics"
      >
        <SummaryCard
          title="Total Income"
          value={`₹${totalIncome.toLocaleString('en-IN')}`}
          icon={TrendingUp}
          variant="emerald"
          subtitle={`${transactions.filter((t) => t && t.type === 'income').length} income records`}
        />
        <SummaryCard
          title="Total Expenses"
          value={`₹${totalExpenses.toLocaleString('en-IN')}`}
          icon={TrendingDown}
          variant="rose"
          subtitle={
            totalIncome > 0
              ? `${Math.round((totalExpenses / totalIncome) * 100)}% of total income`
              : 'Outflows recorded'
          }
        />
        <SummaryCard
          title="Current Balance"
          value={`₹${currentBalance.toLocaleString('en-IN')}`}
          icon={Wallet}
          variant="indigo"
          subtitle={currentBalance >= 0 ? 'Positive net savings' : 'Budget deficit'}
        />
        <SummaryCard
          title="Monthly Budget"
          value={`₹${budgetNum.toLocaleString('en-IN')}`}
          icon={Target}
          variant="purple"
          subtitle={`${budgetPercentage}% used this month`}
        />
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section
          className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs lg:col-span-2"
          aria-label="Spending Overview Chart"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Spending Overview
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Weekly spending activity this month
              </p>
            </div>

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

          <div className="mt-6 h-[260px] w-full">
            {expenseTransactions.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-2">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <h3 className="text-xs font-bold text-slate-700">
                  No spending recorded yet
                </h3>
                <p className="mt-1 text-[11px] text-slate-400 max-w-xs">
                  Add expense transactions to see your weekly distribution chart.
                </p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickFormatter={(val) => `₹${val}`}
                  />
                  <Tooltip content={<CustomOverviewTooltip />} />
                  <Bar
                    dataKey="spending"
                    name="Spending"
                    fill="#6366f1"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        <section aria-label="Monthly Budget Progress">
          <BudgetCard
            spent={`₹${totalExpenses.toLocaleString('en-IN')}`}
            total={`₹${budgetNum.toLocaleString('en-IN')}`}
            remaining={
              isOverBudget
                ? `Over by ₹${Math.abs(remainingBudget).toLocaleString('en-IN')}`
                : `₹${remainingBudget.toLocaleString('en-IN')}`
            }
            percentage={budgetPercentage}
            isOverBudget={isOverBudget}
          />
        </section>
      </div>

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

      <section aria-label="Recent Transactions List">
        <RecentTransactions
          transactions={transactions}
          onOpenAddModal={onOpenAddModal}
        />
      </section>
    </div>
  );
}


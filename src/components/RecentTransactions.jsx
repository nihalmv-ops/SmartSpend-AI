import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownLeft, ChevronRight } from 'lucide-react';

const SAMPLE_TRANSACTIONS = [
  {
    id: 1,
    title: 'Food',
    subtitle: 'Today · Restaurant',
    amount: '-₹450',
    type: 'expense',
    emoji: '🍔',
    badgeBg: 'bg-orange-50 text-orange-600',
  },
  {
    id: 2,
    title: 'Salary',
    subtitle: 'Yesterday · Monthly salary',
    amount: '+₹40,000',
    type: 'income',
    emoji: '💼',
    badgeBg: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: 3,
    title: 'Transport',
    subtitle: 'Yesterday · Fuel',
    amount: '-₹250',
    type: 'expense',
    emoji: '🚗',
    badgeBg: 'bg-blue-50 text-blue-600',
  },
];

export default function RecentTransactions({ transactions = SAMPLE_TRANSACTIONS }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">Recent Transactions</h2>
          <p className="text-xs text-slate-400 mt-0.5">Your latest income and expenses</p>
        </div>
        <Link
          to="/transactions"
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg px-2 py-1"
          aria-label="View all transactions"
        >
          <span>View all</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Transaction List */}
      <div className="divide-y divide-slate-100">
        {transactions.map((tx) => {
          const isIncome = tx.type === 'income';

          return (
            <div
              key={tx.id}
              className="group flex items-center justify-between py-3.5 transition-colors first:pt-4 last:pb-1"
            >
              {/* Left Details */}
              <div className="flex items-center gap-3.5">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${tx.badgeBg} shadow-2xs`}
                  aria-hidden="true"
                >
                  {tx.emoji}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    {tx.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-medium">
                    {tx.subtitle}
                  </p>
                </div>
              </div>

              {/* Right Amount */}
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-semibold ${
                    isIncome ? 'text-emerald-600' : 'text-slate-800'
                  }`}
                >
                  {tx.amount}
                </span>
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full ${
                    isIncome ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'
                  }`}
                  aria-hidden="true"
                >
                  {isIncome ? (
                    <ArrowDownLeft className="h-3 w-3" />
                  ) : (
                    <ArrowUpRight className="h-3 w-3" />
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownLeft, ChevronRight, Inbox, Plus } from 'lucide-react';

/**
 * RecentTransactions Component
 * 
 * Displays the 4 most recent income/expense items on the Dashboard.
 * Demonstrates:
 * - slice(): taking a subset of items to show on the dashboard overview
 * - map(): mapping each transaction to a clean row with indicators
 * - Conditional rendering: showing an empty state if no transactions exist yet
 *
 * @param {Array} [transactions=[]] - Array of transaction objects from state
 * @param {Function} [onOpenAddModal] - Callback to open the Add Transaction modal
 */
export default function RecentTransactions({
  transactions = [],
  onOpenAddModal,
}) {
  // Take only the top 4 most recent transactions for the dashboard preview
  const recentList = transactions.slice(0, 4);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
      {/* Header: Title, subtitle, and View All link */}
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

      {/* Conditional rendering: if no transactions exist, show empty state */}
      {recentList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400 mb-2">
            <Inbox className="h-5 w-5" />
          </div>
          <p className="text-sm font-semibold text-slate-700">No transactions yet</p>
          <p className="text-xs text-slate-400 mt-0.5">
            Add your first income or expense to see it here.
          </p>
          {onOpenAddModal && (
            <button
              type="button"
              onClick={onOpenAddModal}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Transaction</span>
            </button>
          )}
        </div>
      ) : (
        /* Transaction List */
        <div className="divide-y divide-slate-100">
          {recentList.map((tx) => {
            const isIncome = tx.type === 'income';

            return (
              <div
                key={tx.id}
                className="group flex items-center justify-between py-3.5 transition-colors first:pt-4 last:pb-1"
              >
                {/* Left Details: Category and Description */}
                <div className="flex items-center gap-3.5">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${
                      isIncome ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'
                    } shadow-2xs`}
                    aria-hidden="true"
                  >
                    {isIncome ? '💼' : '💳'}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">
                      {tx.description}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {tx.date} · {tx.category}
                    </p>
                  </div>
                </div>

                {/* Right Amount & Direction Indicator */}
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-semibold ${
                      isIncome ? 'text-emerald-600' : 'text-slate-800'
                    }`}
                  >
                    {isIncome
                      ? `+₹${tx.amount.toLocaleString('en-IN')}`
                      : `-₹${tx.amount.toLocaleString('en-IN')}`}
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
      )}
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownLeft, ChevronRight, Inbox, Plus } from 'lucide-react';

const formatAmount = (amount) => {
  const num =
    typeof amount === 'number'
      ? isNaN(amount) ? 0 : amount
      : Number(String(amount || 0).replace(/[^0-9.-]+/g, '')) || 0;
  return Math.abs(num).toLocaleString('en-IN');
};

/**
 * RecentTransactions Component
 * 
 * Displays the 5 latest income and expense entries on the main dashboard.
 * Normalizes transaction fields to ensure compatibility between standard Day 3 objects,
 * user-created entries, and legacy sample objects.
 *
 * @param {Array} transactions - Active transactions from App state
 * @param {Function} [onOpenAddModal] - Callback to open Add Transaction modal
 */
export default function RecentTransactions({ transactions = [], onOpenAddModal }) {
  const displayItems = (transactions || []).slice(0, 5);

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

      {/* Empty State when no transactions exist */}
      {displayItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-3">
            <Inbox className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800">
            No transactions yet
          </h3>
          <p className="mt-1 text-xs text-slate-400 max-w-xs">
            Add your first income or expense to see it here on your dashboard.
          </p>
          {onOpenAddModal && (
            <button
              type="button"
              onClick={onOpenAddModal}
              className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Transaction</span>
            </button>
          )}
        </div>
      ) : (
        /* Transaction List */
        <div className="divide-y divide-slate-100">
          {displayItems.map((tx) => {
            if (!tx) return null;
            const isIncome = tx.type === 'income';
            const title = tx.description || tx.title || 'Untitled Transaction';
            const date = tx.date || 'Today';
            const category = tx.category || 'General';
            const subtitle = tx.subtitle || `${date} · ${category}`;
            const emoji =
              tx.emoji || tx.iconEmoji || (isIncome ? '💰' : '💳');
            const badgeBg =
              tx.badgeBg ||
              (isIncome
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-slate-100 text-slate-700');
            const formattedAmount = `${isIncome ? '+' : '-'}₹${formatAmount(tx.amount)}`;

            return (
              <div
                key={tx.id}
                className="group flex items-center justify-between py-3.5 transition-colors first:pt-4 last:pb-1"
              >
                {/* Left Details */}
                <div className="flex items-center gap-3.5">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${badgeBg} shadow-2xs`}
                    aria-hidden="true"
                  >
                    {emoji}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">
                      {title}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {subtitle}
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
                    {formattedAmount}
                  </span>
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full ${
                      isIncome
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-rose-50 text-rose-500'
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

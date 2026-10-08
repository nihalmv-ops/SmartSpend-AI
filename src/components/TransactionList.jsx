// SmartSpend AI - TransactionList Component

import React from 'react';
import {
  ArrowDownLeft,
  ArrowUpRight,
  Trash2,
  Inbox,
  SearchX,
  Plus,
} from 'lucide-react';
import { formatDisplayDate } from '../utils/storage';

const formatAmount = (amount) => {
  const num =
    typeof amount === 'number'
      ? isNaN(amount) ? 0 : amount
      : Number(String(amount || 0).replace(/[^0-9.-]+/g, '')) || 0;
  return Math.abs(num).toLocaleString('en-IN');
};

export default function TransactionList({
  transactions = [],
  totalCount = 0,
  onDelete,
  onOpenAddModal,
}) {
  if (totalCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-4 shadow-2xs">
          <Inbox className="h-7 w-7" />
        </div>
        <h3 className="text-base font-bold text-slate-900">
          No transactions yet
        </h3>
        <p className="mt-1 text-sm text-slate-500 max-w-sm">
          Start tracking your finances by adding your first income or expense.
        </p>
        {onOpenAddModal && (
          <button
            type="button"
            onClick={onOpenAddModal}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>+ Add Transaction</span>
          </button>
        )}
      </div>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-3">
          <SearchX className="h-6 w-6" />
        </div>
        <h3 className="text-sm font-semibold text-slate-800">
          No matching transactions found
        </h3>
        <p className="mt-1 text-xs text-slate-400 max-w-xs">
          Try adjusting your search terms or clearing active filters to view all entries.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="border-b border-slate-100 bg-slate-50/70 text-xs font-semibold uppercase tracking-wider text-slate-400">
            <tr>
              <th scope="col" className="px-6 py-3.5">
                Description
              </th>
              <th scope="col" className="px-6 py-3.5">
                Category
              </th>
              <th scope="col" className="px-6 py-3.5">
                Date
              </th>
              <th scope="col" className="px-6 py-3.5">
                Type
              </th>
              <th scope="col" className="px-6 py-3.5 text-right">
                Amount
              </th>
              <th scope="col" className="px-6 py-3.5 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map((transaction) => {
              if (!transaction) return null;
              const isIncome = transaction.type === 'income';
              const description =
                transaction.description || transaction.title || 'Untitled Transaction';
              const formattedAmt = formatAmount(transaction.amount);
              const displayDate = formatDisplayDate(transaction.date);

              return (
                <tr
                  key={transaction.id}
                  className="transition-colors hover:bg-slate-50/70 group"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-900">
                      {description}
                    </div>
                    {transaction.notes && (
                      <div className="text-xs text-slate-400 font-normal mt-0.5">
                        {transaction.notes}
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                      {transaction.category || 'Other'}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-xs font-medium text-slate-500 whitespace-nowrap">
                    {displayDate}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold ${
                        isIncome ? 'text-emerald-600' : 'text-slate-600'
                      }`}
                    >
                      {isIncome ? (
                        <ArrowDownLeft className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <ArrowUpRight className="h-3.5 w-3.5 text-rose-500" />
                      )}
                      <span className="capitalize">{transaction.type || 'expense'}</span>
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <span
                      className={`text-sm font-bold tracking-tight ${
                        isIncome ? 'text-emerald-600' : 'text-slate-900'
                      }`}
                    >
                      {isIncome ? `+₹${formattedAmt}` : `-₹${formattedAmt}`}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onDelete && onDelete(transaction.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
                      aria-label={`Delete transaction ${description}`}
                      title="Delete transaction"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-slate-100 md:hidden">
        {transactions.map((transaction) => {
          if (!transaction) return null;
          const isIncome = transaction.type === 'income';
          const description =
            transaction.description || transaction.title || 'Untitled Transaction';
          const formattedAmt = formatAmount(transaction.amount);
          const displayDate = formatDisplayDate(transaction.date);

          return (
            <div
              key={transaction.id}
              className="flex flex-col gap-2 p-4 transition-colors hover:bg-slate-50/50"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {description}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span>{displayDate}</span>
                    <span>•</span>
                    <span className="font-medium text-slate-600">
                      {transaction.category || 'Other'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div
                      className={`text-sm font-bold ${
                        isIncome ? 'text-emerald-600' : 'text-slate-900'
                      }`}
                    >
                      {isIncome ? `+₹${formattedAmt}` : `-₹${formattedAmt}`}
                    </div>
                    <span
                      className={`inline-flex items-center text-[10px] font-semibold uppercase tracking-wider ${
                        isIncome ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {transaction.type || 'expense'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onDelete && onDelete(transaction.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
                    aria-label={`Delete ${description}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {transaction.notes && (
                <p className="text-xs text-slate-400 font-normal">
                  {transaction.notes}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}


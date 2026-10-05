import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  ArrowDownLeft,
  ArrowUpRight,
  Calendar,
  Layers,
  ChevronDown,
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { CATEGORIES } from '../data/categories';

const INITIAL_TRANSACTIONS = [
  {
    id: 1,
    title: 'Salary',
    category: 'Salary',
    date: 'Today',
    rawDate: '2026-10-05',
    amount: 40000,
    type: 'income',
    notes: 'Monthly corporate salary credit',
    iconEmoji: '💼',
    badgeBg: 'bg-emerald-50 text-emerald-700',
  },
  {
    id: 2,
    title: 'Restaurant',
    category: 'Food',
    date: 'Yesterday',
    rawDate: '2026-10-04',
    amount: 450,
    type: 'expense',
    notes: 'Dinner with colleagues',
    iconEmoji: '🍔',
    badgeBg: 'bg-orange-50 text-orange-700',
  },
  {
    id: 3,
    title: 'Fuel',
    category: 'Transport',
    date: 'Yesterday',
    rawDate: '2026-10-04',
    amount: 250,
    type: 'expense',
    notes: 'Petrol top-up',
    iconEmoji: '🚗',
    badgeBg: 'bg-blue-50 text-blue-700',
  },
  {
    id: 4,
    title: 'Internet Bill',
    category: 'Bills',
    date: 'Oct 2',
    rawDate: '2026-10-02',
    amount: 999,
    type: 'expense',
    notes: 'Fiber broadband monthly recharge',
    iconEmoji: '🧾',
    badgeBg: 'bg-amber-50 text-amber-700',
  },
];

export default function Transactions({
  onOpenAddModal,
  transactions = INITIAL_TRANSACTIONS,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all'); // all | income | expense
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        // Search filter
        const matchesSearch =
          tx.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (tx.notes && tx.notes.toLowerCase().includes(searchTerm.toLowerCase()));

        // Type filter
        const matchesType =
          typeFilter === 'all' || tx.type === typeFilter;

        // Category filter
        const matchesCategory =
          categoryFilter === 'all' || tx.category === categoryFilter;

        return matchesSearch && matchesType && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'highest') return b.amount - a.amount;
        if (sortBy === 'lowest') return a.amount - b.amount;
        return b.id - a.id; // newest by id
      });
  }, [transactions, searchTerm, typeFilter, categoryFilter, sortBy]);

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <PageHeader
        label="Finance Management"
        title="TRANSACTIONS"
        subtitle="Manage your income and expenses."
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

      {/* Search and Filters Bar */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <label htmlFor="tx-search-input" className="sr-only">
              Search transactions
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              id="tx-search-input"
              type="search"
              placeholder="Search transactions by title, category, or note..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pr-4 pl-10 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Type Filter Buttons */}
            <div
              className="flex items-center rounded-xl bg-slate-100 p-1"
              role="group"
              aria-label="Filter by transaction type"
            >
              <button
                type="button"
                onClick={() => setTypeFilter('all')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  typeFilter === 'all'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter('income')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  typeFilter === 'income'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Income
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter('expense')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  typeFilter === 'expense'
                    ? 'bg-white text-rose-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Expense
              </button>
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <label htmlFor="tx-category-filter" className="sr-only">
                Filter by Category
              </label>
              <select
                id="tx-category-filter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2 pr-8 pl-3 text-xs font-semibold text-slate-700 hover:bg-slate-100 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
                <ChevronDown className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Date/Sort Dropdown */}
            <div className="relative">
              <label htmlFor="tx-sort-select" className="sr-only">
                Sort transactions
              </label>
              <select
                id="tx-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2 pr-8 pl-3 text-xs font-semibold text-slate-700 hover:bg-slate-100 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="newest">Sort: Newest</option>
                <option value="highest">Amount: High to Low</option>
                <option value="lowest">Amount: Low to High</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
                <Calendar className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction List Container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        {filteredTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-3">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800">
              No transactions found
            </h3>
            <p className="mt-1 text-xs text-slate-400 max-w-xs">
              Try adjusting your search query or clear active filters to view all entries.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="border-b border-slate-100 bg-slate-50/70 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <tr>
                    <th scope="col" className="px-6 py-3.5">
                      Transaction
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTransactions.map((tx) => {
                    const isIncome = tx.type === 'income';

                    return (
                      <tr
                        key={tx.id}
                        className="transition-colors hover:bg-slate-50/70"
                      >
                        {/* Transaction Name & Emoji */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-base">
                              {tx.iconEmoji || (isIncome ? '💰' : '💳')}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900">
                                {tx.title}
                              </div>
                              {tx.notes && (
                                <div className="text-xs text-slate-400 font-normal">
                                  {tx.notes}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium ${
                              tx.badgeBg || 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {tx.category}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 text-xs font-medium text-slate-500">
                          {tx.date}
                        </td>

                        {/* Type */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-semibold ${
                              isIncome ? 'text-emerald-600' : 'text-slate-600'
                            }`}
                          >
                            {isIncome ? (
                              <ArrowDownLeft className="h-3 w-3 text-emerald-600" />
                            ) : (
                              <ArrowUpRight className="h-3 w-3 text-rose-500" />
                            )}
                            <span className="capitalize">{tx.type}</span>
                          </span>
                        </td>

                        {/* Amount */}
                        <td className="px-6 py-4 text-right">
                          <span
                            className={`text-sm font-bold tracking-tight ${
                              isIncome ? 'text-emerald-600' : 'text-slate-900'
                            }`}
                          >
                            {isIncome ? `+₹${tx.amount.toLocaleString()}` : `-₹${tx.amount.toLocaleString()}`}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View (No horizontal scrolling) */}
            <div className="divide-y divide-slate-100 md:hidden">
              {filteredTransactions.map((tx) => {
                const isIncome = tx.type === 'income';

                return (
                  <div
                    key={tx.id}
                    className="flex flex-col gap-2 p-4 transition-colors hover:bg-slate-50/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg">
                          {tx.iconEmoji || (isIncome ? '💰' : '💳')}
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-slate-900">
                            {tx.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                            <span>{tx.date}</span>
                            <span>•</span>
                            <span className="font-medium text-slate-600">
                              {tx.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div
                          className={`text-sm font-bold ${
                            isIncome ? 'text-emerald-600' : 'text-slate-900'
                          }`}
                        >
                          {isIncome
                            ? `+₹${tx.amount.toLocaleString()}`
                            : `-₹${tx.amount.toLocaleString()}`}
                        </div>
                        <span
                          className={`inline-flex items-center gap-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                            isIncome ? 'text-emerald-600' : 'text-rose-600'
                          }`}
                        >
                          {isIncome ? 'Income' : 'Expense'}
                        </span>
                      </div>
                    </div>

                    {tx.notes && (
                      <p className="text-xs text-slate-400 pl-13 font-normal">
                        {tx.notes}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

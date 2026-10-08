// SmartSpend AI - Transactions Page

import React, { useState } from 'react';
import { Plus, Search, ChevronDown } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import TransactionList from '../components/TransactionList';
import { CATEGORIES } from '../data/categories';

export default function Transactions({
  transactions = [],
  categories = [],
  onOpenAddModal,
  onDeleteTransaction,
}) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const activeCategories =
    categories && categories.length > 0 ? categories : CATEGORIES;

  const filteredTransactions = (transactions || []).filter((transaction) => {
    if (!transaction) return false;

    const desc = (transaction.description || transaction.title || '').toLowerCase();
    const notes = (transaction.notes || '').toLowerCase();
    const query = (search || '').toLowerCase().trim();

    const matchesSearch =
      !query || desc.includes(query) || notes.includes(query);

    const matchesType =
      typeFilter === 'all' || transaction.type === typeFilter;

    const matchesCategory =
      categoryFilter === 'all' || transaction.category === categoryFilter;

    return matchesSearch && matchesType && matchesCategory;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (a.rawDate && b.rawDate) {
      return new Date(b.rawDate) - new Date(a.rawDate);
    }
    return (b.id || 0) - (a.id || 0);
  });

  return (
    <div className="space-y-6 pb-12">
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

      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pr-4 pl-10 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
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
                {activeCategories.map((cat) => (
                  <option key={cat.id || cat.name} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400">
                <ChevronDown className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <TransactionList
          transactions={sortedTransactions}
          totalCount={(transactions || []).length}
          onDelete={onDeleteTransaction}
          onOpenAddModal={onOpenAddModal}
        />
      </div>
    </div>
  );
}


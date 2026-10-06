import React, { useState, useEffect } from 'react';
import { X, PlusCircle, ArrowDownLeft, ArrowUpRight, AlertCircle } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

/**
 * Helper to get the current date in YYYY-MM-DD format.
 * Kept outside component so render remains pure.
 */
const getTodayDate = () => new Date().toISOString().split('T')[0];

/**
 * TransactionModal Component
 * 
 * Demonstrates:
 * - Controlled inputs (React state controls the input value)
 * - Form validation (checking required fields and amount > 0)
 * - onSubmit & preventDefault() (preventing browser page refresh)
 * - Accessibility (role="dialog", aria-modal, keyboard focus)
 *
 * @param {boolean} isOpen - Whether modal is visible
 * @param {Function} onClose - Closes the modal
 * @param {Function} onAddTransaction - Callback invoked with new transaction object
 */
export default function TransactionModal({ isOpen, onClose, onAddTransaction }) {
  // Controlled input states:
  // Each form field is tied directly to a React useState hook.
  const [type, setType] = useState('expense'); // 'income' or 'expense'
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(getTodayDate);
  const [notes, setNotes] = useState('');

  // State to hold user-friendly validation error messages
  const [error, setError] = useState('');

  // Keyboard accessibility: Close modal when Escape key is pressed
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Helper to reset form inputs and errors
  const resetForm = () => {
    setType('expense');
    setDescription('');
    setAmount('');
    setCategory('Food');
    setDate(getTodayDate());
    setNotes('');
    setError('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Form submission handler
  const handleSubmit = (e) => {
    // Prevent the browser from refreshing the page when the form is submitted.
    e.preventDefault();

    // Frontend validation: check description
    if (!description.trim()) {
      setError('Please enter a description for this transaction.');
      return;
    }

    // Frontend validation: check amount is a positive number
    const numericAmount = Number(amount);
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid amount greater than ₹0.');
      return;
    }

    // Frontend validation: check date
    if (!date) {
      setError('Please select a transaction date.');
      return;
    }

    // Create a new transaction object from the controlled form values.
    // Date.now() creates a simple unique number ID based on the timestamp.
    const newTransaction = {
      id: Date.now(),
      type,
      description: description.trim(),
      amount: numericAmount,
      category,
      date,
      notes: notes.trim(),
    };

    // Pass the new transaction to the parent component
    if (onAddTransaction) {
      onAddTransaction(newTransaction);
    }

    // Reset the form and close the modal dialog
    handleClose();
  };

  // Do not render anything if the modal is closed
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="transaction-modal-title"
    >
      {/* Semi-transparent backdrop: clicking outside closes the modal */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-900/10 z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <PlusCircle className="h-4 w-4" />
            </div>
            <h2
              id="transaction-modal-title"
              className="text-base font-bold text-slate-900"
            >
              Add New Transaction
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* User-friendly validation error banner */}
          {error && (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-700 animate-in fade-in"
            >
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Transaction Type Segment Switch: Expense vs Income */}
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Transaction Type
            </span>
            <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => {
                  setType('expense');
                  setError('');
                }}
                className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  type === 'expense'
                    ? 'bg-white text-rose-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
                <span>Expense</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setType('income');
                  setError('');
                }}
                className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  type === 'income'
                    ? 'bg-white text-emerald-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ArrowDownLeft className="h-3.5 w-3.5" />
                <span>Income</span>
              </button>
            </div>
          </div>

          {/* Description: Controlled input */}
          <div>
            <label
              htmlFor="tx-description"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5"
            >
              Description <span className="text-rose-500">*</span>
            </label>
            {/* This is a controlled input. React state controls the current value of the input. */}
            <input
              id="tx-description"
              type="text"
              placeholder="e.g., Salary, Restaurant, Fuel, Internet Bill"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (error) setError('');
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Amount & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Amount input */}
            <div>
              <label
                htmlFor="tx-amount"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5"
              >
                Amount (₹) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 font-semibold text-sm">
                  ₹
                </span>
                {/* This is a controlled input for the numeric amount */}
                <input
                  id="tx-amount"
                  type="number"
                  min="1"
                  step="any"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    if (error) setError('');
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-8 pr-3.5 py-2 text-sm font-semibold text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            {/* Category selection */}
            <div>
              <label
                htmlFor="tx-category"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5"
              >
                Category
              </label>
              {/* Controlled select dropdown mapped from categories.js */}
              <select
                id="tx-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label
              htmlFor="tx-date"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5"
            >
              Date <span className="text-rose-500">*</span>
            </label>
            <input
              id="tx-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-800 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Notes (Optional) */}
          <div>
            <label
              htmlFor="tx-notes"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5"
            >
              Notes <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <textarea
              id="tx-notes"
              rows={2}
              placeholder="Add payment method or memo..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
            />
          </div>

          {/* Action Buttons: Cancel and Add Transaction */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

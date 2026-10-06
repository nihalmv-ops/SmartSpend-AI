import React, { useState, useEffect } from 'react';
import { X, PlusCircle, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

/**
 * Returns today's date formatted as YYYY-MM-DD for standard HTML date input.
 */
const getTodayDate = () => new Date().toISOString().split('T')[0];

/**
 * Initial empty form state helper.
 */
const getInitialFormState = () => ({
  type: 'expense',
  description: '',
  amount: '',
  category: 'Food',
  date: getTodayDate(),
  notes: '',
});

/**
 * TransactionModal Component
 * 
 * Demonstrates:
 * - Controlled inputs: React state acts as the "single source of truth" for each form input.
 * - e.preventDefault(): stops native browser form submission and page reload.
 * - Form validation: verifies that required fields are properly filled before saving.
 * - Props: receives isOpen, onClose, and onAddTransaction callback from App.
 *
 * @param {boolean} isOpen - Whether the modal dialog is open
 * @param {Function} onClose - Callback to close the modal
 * @param {Function} onAddTransaction - Callback to pass the new transaction back to App
 */
export default function TransactionModal({
  isOpen,
  onClose,
  onAddTransaction,
}) {
  // State for all form fields
  const [formData, setFormData] = useState(getInitialFormState);
  const [errorMessage, setErrorMessage] = useState('');

  // Close modal when Escape key is pressed
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

  // If modal is not open, return null to render nothing
  if (!isOpen) return null;

  /**
   * Handle form submission.
   * e.preventDefault() prevents default browser form submission that would reload the page.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate description
    if (!formData.description.trim()) {
      setErrorMessage('Please enter a transaction description.');
      return;
    }

    // Validate amount
    const parsedAmount = Number(formData.amount);
    if (!formData.amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage('Please enter a valid positive amount.');
      return;
    }

    // Create safe transaction object
    const newTx = {
      id: Date.now(), // Date.now() provides a simple unique ID
      type: formData.type,
      description: formData.description.trim(),
      amount: parsedAmount,
      category: formData.category,
      date: formData.date || getTodayDate(),
      notes: formData.notes.trim(),
    };

    // Pass new transaction up to parent App component via callback prop
    if (onAddTransaction) {
      onAddTransaction(newTx);
    }

    // Reset form fields and close modal
    setFormData(getInitialFormState());
    setErrorMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="transaction-modal-title"
    >
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Window */}
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
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Error Message Alert */}
          {errorMessage && (
            <div className="rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-700">
              {errorMessage}
            </div>
          )}

          {/* Transaction Type Segment Switch */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'expense' })}
                className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  formData.type === 'expense'
                    ? 'bg-white text-rose-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
                <span>Expense</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'income' })}
                className={`flex items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  formData.type === 'income'
                    ? 'bg-white text-emerald-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ArrowDownLeft className="h-3.5 w-3.5" />
                <span>Income</span>
              </button>
            </div>
          </div>

          {/* Description Input */}
          <div>
            <label
              htmlFor="tx-description"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5"
            >
              Description <span className="text-rose-500">*</span>
            </label>
            <input
              id="tx-description"
              type="text"
              required
              placeholder="e.g. Restaurant, Monthly Salary, Fuel"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Amount & Date Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Amount Input */}
            <div>
              <label
                htmlFor="tx-amount"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5"
              >
                Amount (₹) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-sm font-semibold text-slate-400">
                  ₹
                </span>
                <input
                  id="tx-amount"
                  type="number"
                  required
                  min="0"
                  step="any"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pr-3.5 pl-8 text-sm font-semibold text-slate-800 placeholder-slate-400 transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            {/* Date Input */}
            <div>
              <label
                htmlFor="tx-date"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5"
              >
                Date
              </label>
              <input
                id="tx-date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-800 transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label
              htmlFor="tx-category"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5"
            >
              Category
            </label>
            <select
              id="tx-category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm font-medium text-slate-800 transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Notes Input */}
          <div>
            <label
              htmlFor="tx-notes"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5"
            >
              Notes (Optional)
            </label>
            <textarea
              id="tx-notes"
              rows={2}
              placeholder="Add optional notes or memo..."
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
            />
          </div>

          {/* Modal Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

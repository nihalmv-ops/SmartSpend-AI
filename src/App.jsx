import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TransactionModal from './components/TransactionModal';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Analytics from './pages/Analytics';
import Budget from './pages/Budget';
import Reports from './pages/Reports';
import { getTransactions, saveTransactions } from './utils/storage';

/**
 * App Root Component
 * 
 * Demonstrates core React concepts:
 * 1. useState: holds application state for transactions, modal, and mobile drawer.
 * 2. useEffect with []: runs once on component mount to load stored data from LocalStorage.
 * 3. useEffect with [transactions]: runs whenever transactions change to persist data.
 * 4. Props: passes data down to pages and receives user actions via callbacks.
 * 5. Immutable state updates: using setTransactions((prev) => [...prev, newTx])
 *    and setTransactions((prev) => prev.filter(...)) instead of array mutations.
 */
export default function App() {
  // Mobile sidebar drawer open/closed state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Add Transaction modal open/closed state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Store all transaction objects in React state.
  // When this state changes, React updates the UI automatically.
  const [transactions, setTransactions] = useState([]);

  // ========================================================
  // LOCALSTORAGE PERSISTENCE LIFECYCLE
  // ========================================================

  // Load previously saved transactions when the component first loads.
  // The empty dependency array [] tells React to run this effect
  // only once when the App component initially mounts.
  useEffect(() => {
    const savedTransactions = getTransactions();
    // oxlint-disable-next-line react/set-state-in-effect
    setTransactions(savedTransactions);
  }, []);

  // Save the latest transactions whenever the transaction state changes.
  // The [transactions] dependency array tells React to run this effect
  // whenever a new transaction is added or an existing one is deleted.
  useEffect(() => {
    // Only save once the initial load has populated or set transactions
    if (transactions.length > 0 || localStorage.getItem('smartspend_transactions') !== null) {
      saveTransactions(transactions);
    }
  }, [transactions]);

  // Keyboard accessibility: dismiss mobile sidebar if Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  // ========================================================
  // TRANSACTION ACTION HANDLERS
  // ========================================================

  /**
   * Add a new transaction to state.
   * Add the new transaction to the existing transaction array.
   * We create a new array instead of directly modifying the old state.
   *
   * @param {Object} newTransaction - Transaction object from form
   */
  const handleAddTransaction = (newTransaction) => {
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  /**
   * Delete a transaction by its unique ID.
   * filter() creates a new array without the transaction being deleted.
   *
   * @param {number|string} id - The unique ID of the transaction to delete
   */
  const handleDeleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 antialiased">
      {/* Sidebar Navigation (Persistent on desktop, drawer on mobile) */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Layout Container */}
      <div className="flex flex-1 flex-col min-w-0 overflow-x-hidden">
        {/* Top Header with search, quick add, notifications & profile */}
        <Header
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
          onOpenAddModal={() => setIsModalOpen(true)}
        />

        {/* Page Content Viewport */}
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* React Router Views */}
            <Routes>
              {/* Dashboard: Financial overview with dynamic KPIs and recent items */}
              <Route
                path="/"
                element={
                  <Dashboard
                    transactions={transactions}
                    onOpenAddModal={() => setIsModalOpen(true)}
                  />
                }
              />

              {/* Transactions: Filterable list with search, delete, and add modal */}
              <Route
                path="/transactions"
                element={
                  <Transactions
                    transactions={transactions}
                    onOpenAddModal={() => setIsModalOpen(true)}
                    onDeleteTransaction={handleDeleteTransaction}
                  />
                }
              />

              {/* Analytics: KPI metrics & category spending */}
              <Route
                path="/analytics"
                element={<Analytics transactions={transactions} />}
              />

              {/* Budget: Spending limits dynamically calculated against expenses */}
              <Route
                path="/budget"
                element={<Budget transactions={transactions} />}
              />

              {/* Reports: Financial statements & export UI with dynamic summary */}
              <Route
                path="/reports"
                element={<Reports transactions={transactions} />}
              />

              {/* Settings placeholder route */}
              <Route
                path="/settings"
                element={
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-xs">
                    <h2 className="text-xl font-bold text-slate-900">Settings</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      User preferences and account configuration coming in upcoming milestones.
                    </p>
                  </div>
                }
              />

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>

      {/* Global Add Transaction Modal Form */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
}

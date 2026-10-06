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
import {
  getTransactions,
  saveTransactions,
  normalizeTransaction,
  getBudget,
  saveBudget,
} from './utils/storage';


export default function App() {
  // Mobile sidebar drawer open/closed state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Add Transaction modal open/closed state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Store all transactions in React state.
  // We use a function inside useState so getTransactions() runs once on initial mount.
  const [transactions, setTransactions] = useState(() => getTransactions());

  // Store monthly target budget in React state, initialized from LocalStorage
  const [budget, setBudget] = useState(() => getBudget());


  // LOCALSTORAGE PERSISTENCE LIFECYCLE


  // Save transactions to LocalStorage whenever the transaction state changes.
  // The [transactions] dependency array tells React to run this effect
  // whenever a new transaction is added or an existing one is deleted.
  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  // Save budget to LocalStorage whenever the budget state changes.
  useEffect(() => {
    saveBudget(budget);
  }, [budget]);

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

 
  const handleAddTransaction = (newTransaction) => {
    const normalized = normalizeTransaction(newTransaction);
    if (normalized) {
      setTransactions((prev) => [normalized, ...prev]);
    }
  };

  /**
   * Delete a transaction by its unique ID.
   * filter() creates a new array without the transaction being deleted.
   *
   * @param {number|string} id - The unique ID of the transaction to delete
   */
  const handleDeleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction && transaction.id !== id)
    );
  };

  /**
   * Update the monthly target budget.
   *
   * @param {number|string} newBudget - Target budget amount in Rupees
   */
  const handleUpdateBudget = (newBudget) => {
    const num = Number(newBudget);
    if (!isNaN(num) && num > 0) {
      setBudget(num);
    }
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
                    budget={budget}
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

              {/* Analytics: Recharts spending visualizations & KPI metrics */}
              <Route
                path="/analytics"
                element={
                  <Analytics
                    transactions={transactions}
                    budget={budget}
                    onOpenAddModal={() => setIsModalOpen(true)}
                  />
                }
              />

              {/* Budget: Spending limits dynamically calculated against expenses */}
              <Route
                path="/budget"
                element={
                  <Budget
                    transactions={transactions}
                    budget={budget}
                    onUpdateBudget={handleUpdateBudget}
                  />
                }
              />

              {/* Reports: Financial statements & export UI with dynamic summary */}
              <Route
                path="/reports"
                element={
                  <Reports
                    transactions={transactions}
                    budget={budget}
                  />
                }
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

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

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

  // Close sidebar on Escape key press for accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  const handleAddTransaction = (newTx) => {
    const formatted = {
      id: Date.now(),
      title: newTx.description,
      category: newTx.category,
      date: 'Today',
      rawDate: newTx.date,
      amount: Number(newTx.amount),
      type: newTx.type,
      notes: newTx.notes,
      iconEmoji: newTx.type === 'income' ? '💰' : '💳',
      badgeBg:
        newTx.type === 'income'
          ? 'bg-emerald-50 text-emerald-700'
          : 'bg-slate-100 text-slate-700',
    };
    setTransactions((prev) => [formatted, ...prev]);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-x-hidden">
        <Header
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
          onOpenAddModal={() => setIsModalOpen(true)}
        />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    onOpenAddModal={() => setIsModalOpen(true)}
                  />
                }
              />
              <Route
                path="/transactions"
                element={
                  <Transactions
                    onOpenAddModal={() => setIsModalOpen(true)}
                    transactions={transactions}
                  />
                }
              />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/reports" element={<Reports />} />
              {/* Settings placeholder route redirecting or showing clean view */}
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
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>

      {/* Add Transaction Global Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTransaction={handleAddTransaction}
      />
    </div>
  );
}

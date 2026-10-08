// SmartSpend AI - App Component

import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TransactionModal from './components/TransactionModal';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Analytics from './pages/Analytics';
import Budget from './pages/Budget';
import Reports from './pages/Reports';
import Login from './pages/Login';
import {
  getTransactions,
  saveTransactions,
  normalizeTransaction,
  getCategories,
  saveCategories,
  getUser,
  saveUser,
  removeUser,
} from './utils/storage';

export default function App() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState(() => getTransactions());
  const [categories, setCategories] = useState(() => getCategories());
  const [user, setUser] = useState(() => getUser());

  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  useEffect(() => {
    saveUser(user);
  }, [user]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  const handleAddTransaction = (newTransaction) => {
    const normalized = normalizeTransaction(newTransaction);
    if (normalized) {
      setTransactions((prev) => [normalized, ...prev]);
    }
  };

  const handleDeleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction && transaction.id !== id)
    );
  };

  const handleAddCategory = (newCategory) => {
    if (!newCategory || !newCategory.name) return;
    setCategories((prev) => {
      const exists = prev.some(
        (c) => c.name.toLowerCase() === newCategory.name.toLowerCase()
      );
      if (exists) return prev;
      return [...prev, newCategory];
    });
  };

  const handleLogin = (authenticatedUser) => {
    setUser(authenticatedUser);
    saveUser(authenticatedUser);
  };

  const handleLogout = () => {
    setUser(null);
    removeUser();
  };

  if (location.pathname === '/login') {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 antialiased">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col min-w-0 overflow-x-hidden">
        <Header
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
          onOpenAddModal={() => setIsModalOpen(true)}
          user={user}
          onLogout={handleLogout}
        />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    transactions={transactions}
                    onOpenAddModal={() => setIsModalOpen(true)}
                  />
                }
              />

              <Route
                path="/transactions"
                element={
                  <Transactions
                    transactions={transactions}
                    categories={categories}
                    onOpenAddModal={() => setIsModalOpen(true)}
                    onDeleteTransaction={handleDeleteTransaction}
                  />
                }
              />

              <Route
                path="/analytics"
                element={<Analytics transactions={transactions} />}
              />

              <Route
                path="/budget"
                element={<Budget transactions={transactions} />}
              />

              <Route
                path="/reports"
                element={<Reports transactions={transactions} />}
              />

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

              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTransaction={handleAddTransaction}
        categories={categories}
        onAddCategory={handleAddCategory}
      />
    </div>
  );
}

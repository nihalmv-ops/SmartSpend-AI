// SmartSpend AI - Sidebar Component

import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowLeftRight,
  BarChart3,
  Target,
  FileText,
  Settings,
  Sparkles,
  X,
  WalletCards,
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard',
     name: 'Dashboard',
      icon: LayoutDashboard,
       path: '/',
        end: true },

  { id: 'transactions',
     name: 'Transactions',
      icon: ArrowLeftRight, 
      path: '/transactions' },

  { id: 'analytics',
     name: 'Analytics',
      icon: BarChart3,
       path: '/analytics' },

  { id: 'budget',
     name: 'Budget',
      icon: Target,
       path: '/budget' },

  { id: 'reports',
     name: 'Reports',
      icon: FileText,
       path: '/reports' },

  { id: 'settings',
     name: 'Settings',
      icon: Settings,
       path: '/settings' },
];

export default function Sidebar({ isOpen = false, onClose }) {
  const handleNavClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          role="presentation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col justify-between border-r border-slate-200/80 bg-white p-5 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Main Navigation"
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <NavLink
              to="/"
              onClick={handleNavClick}
              className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200">
                <WalletCards className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold tracking-tight text-slate-900">
                    SmartSpend
                  </span>
                  <span className="rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-indigo-600">
                    AI
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-400">AI Finance</p>
              </div>
            </NavLink>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-1.5" aria-label="Sidebar Sections">
            <span className="px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Menu
            </span>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end={item.end}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `group flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      isActive
                        ? 'bg-indigo-50/80 text-indigo-700 shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`h-4 w-4 transition-colors ${
                          isActive
                            ? 'text-indigo-600'
                            : 'text-slate-400 group-hover:text-slate-600'
                        }`}
                      />
                      <span>{item.name}</span>
                      {isActive && (
                        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="rounded-2xl border border-purple-100 bg-purple-50/70 p-4">
          <div className="flex items-center gap-2 text-purple-900">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
              <Sparkles className="h-4 w-4" />
            </div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-purple-900">
              Smart Insights
            </h2>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-purple-800/80">
            AI-powered spending insights coming soon.
          </p>
          <div className="mt-3">
            <span className="inline-flex items-center rounded-full bg-purple-200/60 px-2 py-0.5 text-[10px] font-medium text-purple-800">
              Coming Soon
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}


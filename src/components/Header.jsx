import React from 'react';
import { Search, Bell, Menu, WalletCards } from 'lucide-react';

export default function Header({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-xs sm:px-6 lg:px-8">
      {/* Left Section: Mobile Menu + Mobile Brand / Desktop Search */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Mobile Brand Title */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <WalletCards className="h-4 w-4" />
          </div>
          <span className="text-base font-bold text-slate-900">SmartSpend AI</span>
        </div>

        {/* Desktop Search Input */}
        <div className="relative hidden w-72 md:block lg:w-80">
          <label htmlFor="search-transactions" className="sr-only">
            Search transactions
          </label>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            id="search-transactions"
            type="search"
            placeholder="Search transactions..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2 pr-4 pl-9 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      {/* Right Section: Notification & User Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notification Button */}
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
        </button>

        <div className="h-6 w-px bg-slate-200" />

        {/* Profile Avatar & Info */}
        <div className="flex items-center gap-3 pl-1">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white shadow-xs"
            aria-hidden="true"
          >
            N
          </div>
          <div className="hidden text-left sm:block">
            <div className="text-sm font-semibold text-slate-800 leading-tight">
              Nihal
            </div>
            <div className="text-[11px] font-medium text-slate-400">
              Personal Account
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// SmartSpend AI - Login Page

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  WalletCards,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  const handleFillDemo = () => {
    setFormData({
      name: 'Nihal',
      email: 'nihal@smartspend.ai',
      password: 'password123',
    });
    setError('');
  };

  const handleQuickDemoLogin = () => {
    const demoUser = {
      name: 'Nihal',
      email: 'nihal@smartspend.ai',
      role: 'Personal Account',
      avatar: 'N',
    };
    if (onLogin) {
      onLogin(demoUser);
    }
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isSignUp && !formData.name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    const userName = isSignUp
      ? formData.name.trim()
      : formData.email.split('@')[0].charAt(0).toUpperCase() +
        formData.email.split('@')[0].slice(1);

    const user = {
      name: userName || 'Nihal',
      email: formData.email.trim(),
      role: 'Personal Account',
      avatar: (userName || 'N').charAt(0).toUpperCase(),
    };

    if (onLogin) {
      onLogin(user);
    }

    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl">
        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-xl"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30 group-hover:bg-indigo-500 transition-colors">
                <WalletCards className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-white">
                    SmartSpend
                  </span>
                  <span className="rounded-md bg-indigo-500/20 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-indigo-300 border border-indigo-400/30">
                    AI
                  </span>
                </div>
                <p className="text-xs text-indigo-200/70">Personal Finance</p>
              </div>
            </Link>

            <div className="mt-12 space-y-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 px-3 py-1 text-xs font-semibold text-indigo-200">
                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                Modern Finance SaaS
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Smart expense tracking & budgeting.
              </h1>
              <p className="text-sm text-indigo-200/80 leading-relaxed">
                Take complete control of your personal finances with automated insights, category limits, and interactive analytics.
              </p>
            </div>

            <div className="mt-8 space-y-3.5 text-xs text-indigo-100/90">
              <div className="flex items-center gap-2.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <span>Real-time budget tracking & proactive warnings</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <span>Custom categories with LocalStorage persistence</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <span>Private & client-side without third-party tracking</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-10 border-t border-indigo-800/50 mt-10 flex items-center justify-between text-xs text-indigo-300/80">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              100% Client-Side Safe
            </span>
            <span>Indian Rupee (₹)</span>
          </div>
        </div>

        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  {isSignUp ? 'Create an account' : 'Welcome back'}
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  {isSignUp
                    ? 'Enter your details to register your workspace'
                    : 'Sign in to access your dashboard and transactions'}
                </p>
              </div>

              <button
                type="button"
                onClick={handleFillDemo}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50/80 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors"
                title="Fill sample demo credentials"
              >
                <Zap className="h-3.5 w-3.5" />
                <span>Fill Demo</span>
              </button>
            </div>

            {error && (
              <div className="mt-5 flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-100 p-3 text-xs font-semibold text-rose-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {successNotice && (
              <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>{successNotice}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {isSignUp && (
                <div>
                  <label
                    htmlFor="login-name"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5"
                  >
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                      <User className="h-4 w-4" />
                    </span>
                    <input
                      id="login-name"
                      type="text"
                      required={isSignUp}
                      placeholder="e.g. Nihal M V"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pr-3.5 pl-10 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="login-email"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5"
                >
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    id="login-email"
                    type="email"
                    required
                    placeholder="e.g. nihal@smartspend.ai"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pr-3.5 pl-10 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="login-password"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-500"
                  >
                    Password <span className="text-rose-500">*</span>
                  </label>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() =>
                        setSuccessNotice(
                          'Password reset instructions sent to your email (demo simulation).'
                        )
                      }
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                    <Lock className="h-4 w-4" />
                  </span>
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pr-10 pl-10 text-sm text-slate-800 placeholder-slate-400 transition-colors focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-xs font-medium text-slate-600">
                    Remember me on this browser
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-xs hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 font-semibold text-slate-400">
                  Or instant access
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50/70 px-4 py-2.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <Zap className="h-4 w-4 text-indigo-600" />
                <span>One-Click Demo</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/')}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <span>Skip to Dashboard</span>
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between text-xs text-slate-500">
            <span>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </span>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setSuccessNotice('');
              }}
              className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              {isSignUp ? 'Sign in instead' : 'Create an account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


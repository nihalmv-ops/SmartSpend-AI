import React from 'react';
import { AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';

/**
 * ErrorBoundary Component
 * 
 * Catches JavaScript errors anywhere in its child component tree,
 * logs the errors, and displays a friendly fallback UI instead of crashing
 * to a blank white screen.
 * 
 * In React, an uncaught error in any component unmounts the entire app.
 * Using an Error Boundary prevents the "white screen of death" and lets
 * the user recover easily.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // State to track whether an error has been caught
    this.state = { hasError: false, error: null };
  }

  // Update state so the next render shows the fallback UI
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Log error details for debugging
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught a runtime error:', error, errorInfo);
  }

  // Reset corrupted LocalStorage data and reload the application
  handleResetData = () => {
    try {
      localStorage.removeItem('smartspend_transactions');
      localStorage.removeItem('smartspend_budget');
      localStorage.removeItem('smartspend_settings');
    } catch (e) {
      console.warn('Could not clear localStorage:', e);
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-center antialiased">
          <div className="mx-auto max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 mb-5">
              <AlertTriangle className="h-7 w-7" />
            </div>

            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Something went wrong
            </h1>

            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              An unexpected error occurred while rendering this page. You can reload or reset stored data to recover.
            </p>

            {this.state.error && (
              <div className="mt-4 overflow-x-auto rounded-xl bg-slate-100 p-3 text-left text-xs font-mono text-slate-700">
                {this.state.error.message || String(this.state.error)}
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Reload Page</span>
              </button>

              <button
                type="button"
                onClick={this.handleResetData}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5 text-rose-500" />
                <span>Reset Data</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

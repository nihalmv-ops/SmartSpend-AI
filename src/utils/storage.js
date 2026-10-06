/**
 * SmartSpend AI - LocalStorage Helper Utilities
 * 
 * LocalStorage allows the browser to store key-value data permanently
 * across page refreshes and browser restarts.
 * 
 * Key React & Web Concepts used here:
 * - JSON.stringify(): Converts JavaScript objects/arrays into a string format
 *   because LocalStorage can only store plain text strings.
 * - JSON.parse(): Parses a JSON string back into real JavaScript objects/arrays.
 * - Defensive Normalization: Converts older formats (e.g. Day 2 objects with `title`)
 *   into the Day 3 standard `{ id, type, description, amount, category, date, notes }`.
 * - SSR & Environment Safety: Guards against `typeof localStorage === 'undefined'`
 *   so the code safely runs in both browser and server/test environments without crashing.
 */

// Storage keys used in browser localStorage
const STORAGE_KEY_TRANSACTIONS = 'smartspend_transactions';
const STORAGE_KEY_BUDGET = 'smartspend_budget';

export const STORAGE_KEYS = {
  TRANSACTIONS: STORAGE_KEY_TRANSACTIONS,
  BUDGET: STORAGE_KEY_BUDGET,
  SETTINGS: 'smartspend_settings',
};

// Initial sample transactions loaded on first-time visit
export const DEFAULT_TRANSACTIONS = [
  {
    id: 1,
    type: 'income',
    description: 'Salary',
    amount: 40000,
    category: 'Salary',
    date: '2026-10-06',
    notes: 'Monthly corporate salary credit',
  },
  {
    id: 2,
    type: 'expense',
    description: 'Restaurant',
    amount: 450,
    category: 'Food',
    date: '2026-10-06',
    notes: 'Dinner with colleagues',
  },
  {
    id: 3,
    type: 'expense',
    description: 'Fuel',
    amount: 250,
    category: 'Transport',
    date: '2026-10-05',
    notes: 'Petrol top-up',
  },
  {
    id: 4,
    type: 'expense',
    description: 'Internet Bill',
    amount: 999,
    category: 'Bills',
    date: '2026-10-02',
    notes: 'Fiber broadband recharge',
  },
];

// Default monthly target budget in Indian Rupees (₹)
export const DEFAULT_BUDGET = 30000;

/**
 * Normalizes a transaction object ensuring all fields exist and are safe.
 * Ensures backward compatibility with any previous data that used `title` instead of `description`,
 * or had currency strings like `"-₹450"`.
 *
 * @param {Object} item - Raw transaction object from storage or input
 * @returns {Object} Safe normalized transaction object
 */
export const normalizeTransaction = (item) => {
  if (!item || typeof item !== 'object') return null;

  // Clean numeric amount from number or formatted string (e.g., "+₹40,000" -> 40000)
  let numAmount = 0;
  if (typeof item.amount === 'number') {
    numAmount = isNaN(item.amount) ? 0 : item.amount;
  } else if (typeof item.amount === 'string') {
    const cleaned = item.amount.replace(/[^0-9.-]+/g, '');
    numAmount = Number(cleaned) || 0;
  }

  return {
    id: item.id || Date.now(),
    type: item.type === 'income' ? 'income' : 'expense',
    // Fallback between description and legacy title
    description: item.description || item.title || 'Untitled Transaction',
    amount: Math.abs(numAmount),
    category: item.category || 'Other',
    date: item.date || 'Today',
    notes: item.notes || '',
  };
};

/**
 * Save transactions to LocalStorage.
 * 
 * LocalStorage only stores strings,
 * so we convert the transaction array into a JSON string using JSON.stringify() before saving.
 *
 * @param {Array} transactions - Array of transaction objects
 */
export const saveTransactions = (transactions) => {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }
    const sanitized = (transactions || [])
      .map(normalizeTransaction)
      .filter(Boolean);
    localStorage.setItem(STORAGE_KEY_TRANSACTIONS, JSON.stringify(sanitized));
  } catch (error) {
    console.error('Error saving transactions to LocalStorage:', error);
  }
};

/**
 * Retrieve transactions from LocalStorage.
 * 
 * JSON.parse() parses a JSON string back into real JavaScript objects.
 * If no data is stored yet (first visit), return DEFAULT_TRANSACTIONS.
 *
 * @returns {Array} List of safe transaction objects
 */
export const getTransactions = () => {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return DEFAULT_TRANSACTIONS;
    }
    const data = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
    // If user already has stored data in LocalStorage, parse it safely
    if (data !== null) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeTransaction).filter(Boolean);
      }
    }
    // First-time visit: seed default transactions and save
    saveTransactions(DEFAULT_TRANSACTIONS);
    return DEFAULT_TRANSACTIONS;
  } catch (error) {
    console.error('Error loading transactions from LocalStorage:', error);
    return DEFAULT_TRANSACTIONS;
  }
};

/**
 * Retrieve monthly target budget from LocalStorage.
 *
 * @param {number} fallback - Default fallback budget (defaults to 30,000)
 * @returns {number} Saved target budget
 */
export const getBudget = (fallback = DEFAULT_BUDGET) => {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return fallback;
    }
    const data = localStorage.getItem(STORAGE_KEY_BUDGET);
    if (data !== null) {
      const parsed = JSON.parse(data);
      const num = Number(parsed);
      if (!isNaN(num) && num > 0) {
        return num;
      }
    }
    return fallback;
  } catch (error) {
    console.warn('Error reading budget from LocalStorage:', error);
    return fallback;
  }
};

/**
 * Save monthly target budget to LocalStorage.
 *
 * @param {number|string} amount - Budget amount in Rupees
 */
export const saveBudget = (amount) => {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }
    const num = Number(amount);
    if (!isNaN(num) && num > 0) {
      localStorage.setItem(STORAGE_KEY_BUDGET, JSON.stringify(num));
    }
  } catch (error) {
    console.error('Error saving budget to LocalStorage:', error);
  }
};

/**
 * Formats standard date strings into user-friendly presentation.
 * Example: '2026-10-06' -> '06 Oct 2026'
 * Respects relative strings like 'Today' and 'Yesterday'.
 *
 * @param {string} dateStr - Raw date string
 * @returns {string} Formatted display date
 */
export const formatDisplayDate = (dateStr) => {
  if (!dateStr) return 'Today';
  if (dateStr === 'Today' || dateStr === 'Yesterday') return dateStr;

  try {
    // If format is YYYY-MM-DD
    const parts = String(dateStr).split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
      }
    }

    const parsedDate = new Date(dateStr);
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    }
    return dateStr;
  } catch {
    return dateStr;
  }
};

/**
 * Generic LocalStorage helpers
 */
export const getItem = (key, fallback = null) => {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return fallback;
    }
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.warn(`Error reading key "${key}" from localStorage:`, error);
    return fallback;
  }
};

export const setItem = (key, value) => {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing key "${key}" to localStorage:`, error);
  }
};

export const removeItem = (key) => {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing key "${key}" from localStorage:`, error);
  }
};

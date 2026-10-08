// SmartSpend AI - LocalStorage Helper Utilities

import { DEFAULT_CATEGORIES } from '../data/categories';

const STORAGE_KEY_TRANSACTIONS = 'smartspend_transactions';
const STORAGE_KEY_BUDGET = 'smartspend_budget';
const STORAGE_KEY_CATEGORIES = 'smartspend_categories';
const STORAGE_KEY_USER = 'smartspend_user';

export const STORAGE_KEYS = {
  TRANSACTIONS: STORAGE_KEY_TRANSACTIONS,
  BUDGET: STORAGE_KEY_BUDGET,
  CATEGORIES: STORAGE_KEY_CATEGORIES,
  USER: STORAGE_KEY_USER,
  SETTINGS: 'smartspend_settings',
};

export const DEFAULT_USER = {
  name: 'Nihal',
  email: 'nihal@smartspend.ai',
  role: 'Personal Account',
  avatar: 'N',
};

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

export const DEFAULT_BUDGET = 30000;

export const normalizeTransaction = (item) => {
  if (!item || typeof item !== 'object') return null;

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
    description: item.description || item.title || 'Untitled Transaction',
    amount: Math.abs(numAmount),
    category: item.category || 'Other',
    date: item.date || 'Today',
    notes: item.notes || '',
  };
};

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

export const getTransactions = () => {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return DEFAULT_TRANSACTIONS;
    }
    const data = localStorage.getItem(STORAGE_KEY_TRANSACTIONS);
    if (data !== null) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeTransaction).filter(Boolean);
      }
    }
    saveTransactions(DEFAULT_TRANSACTIONS);
    return DEFAULT_TRANSACTIONS;
  } catch (error) {
    console.error('Error loading transactions from LocalStorage:', error);
    return DEFAULT_TRANSACTIONS;
  }
};

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

export const getCategories = () => {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return DEFAULT_CATEGORIES;
    }
    const data = localStorage.getItem(STORAGE_KEY_CATEGORIES);
    if (data !== null) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    saveCategories(DEFAULT_CATEGORIES);
    return DEFAULT_CATEGORIES;
  } catch (error) {
    console.warn('Error loading categories from LocalStorage:', error);
    return DEFAULT_CATEGORIES;
  }
};

export const saveCategories = (categories) => {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
  } catch (error) {
    console.error('Error saving categories to LocalStorage:', error);
  }
};

export const getUser = () => {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return DEFAULT_USER;
    }
    const data = localStorage.getItem(STORAGE_KEY_USER);
    if (data !== null) {
      const parsed = JSON.parse(data);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    }
    return DEFAULT_USER;
  } catch (error) {
    console.warn('Error loading user from LocalStorage:', error);
    return DEFAULT_USER;
  }
};

export const saveUser = (user) => {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  } catch (error) {
    console.error('Error saving user to LocalStorage:', error);
  }
};

export const removeUser = () => {
  try {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }
    localStorage.removeItem(STORAGE_KEY_USER);
  } catch (error) {
    console.error('Error removing user from LocalStorage:', error);
  }
};

export const formatDisplayDate = (dateStr) => {
  if (!dateStr) return 'Today';
  if (dateStr === 'Today' || dateStr === 'Yesterday') return dateStr;

  try {
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

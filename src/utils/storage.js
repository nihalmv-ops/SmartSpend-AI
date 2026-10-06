/**
 * SmartSpend AI - LocalStorage Helper Utilities
 * 
 * LocalStorage allows the browser to store key-value data permanently
 * across page refreshes and browser restarts.
 */

// Key name used in the browser's localStorage for transactions
const STORAGE_KEY = 'smartspend_transactions';

// Initial sample transactions loaded on first-time visit
export const DEFAULT_TRANSACTIONS = [
  {
    id: 1,
    type: 'income',
    description: 'Salary',
    amount: 40000,
    category: 'Salary',
    date: '2026-10-06',
    notes: 'Monthly corporate salary',
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

/**
 * Save transactions to LocalStorage.
 * 
 * LocalStorage stores strings,
 * so convert the transaction array into a JSON string before saving.
 * JSON.stringify() converts a JavaScript object/array into a string format.
 *
 * @param {Array} transactions - Array of transaction objects
 */
export const saveTransactions = (transactions) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error('Error saving transactions to LocalStorage:', error);
  }
};

/**
 * Retrieve transactions from LocalStorage.
 * 
 * Convert the stored JSON string back into a JavaScript array.
 * JSON.parse() parses a JSON string back into real JavaScript objects.
 * If no data is stored yet (first visit), return DEFAULT_TRANSACTIONS.
 *
 * @returns {Array} List of transaction objects
 */
export const getTransactions = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    // If the user already has data in LocalStorage, parse it.
    // Otherwise, return default starter transactions for new users.
    if (data !== null) {
      return JSON.parse(data);
    }
    // First-time visit: seed default transactions and save
    saveTransactions(DEFAULT_TRANSACTIONS);
    return DEFAULT_TRANSACTIONS;
  } catch (error) {
    console.error('Error loading transactions from LocalStorage:', error);
    return [];
  }
};

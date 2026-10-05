/**
 * SmartSpend AI - LocalStorage Helper Utilities
 * (Full persistence implementation scheduled for subsequent project days)
 */

const STORAGE_KEYS = {
  TRANSACTIONS: 'smartspend_transactions',
  BUDGET: 'smartspend_budget',
  SETTINGS: 'smartspend_settings',
};

/**
 * Retrieve stored item from LocalStorage with fallback
 * @param {string} key
 * @param {any} fallback
 * @returns {any}
 */
export const getItem = (key, fallback = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.warn(`Error reading key "${key}" from localStorage:`, error);
    return fallback;
  }
};

/**
 * Save item to LocalStorage
 * @param {string} key
 * @param {any} value
 */
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing key "${key}" to localStorage:`, error);
  }
};

/**
 * Remove item from LocalStorage
 * @param {string} key
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing key "${key}" from localStorage:`, error);
  }
};

export { STORAGE_KEYS };

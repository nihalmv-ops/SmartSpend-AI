/**
 * SmartSpend AI - Category Definitions
 * Used for transaction classification and budgeting.
 */

export const CATEGORIES = [
  { id: 'food', name: 'Food', icon: 'Utensils', type: 'expense', color: 'orange' },
  { id: 'transport', name: 'Transport', icon: 'Car', type: 'expense', color: 'blue' },
  { id: 'bills', name: 'Bills', icon: 'Receipt', type: 'expense', color: 'amber' },
  { id: 'entertainment', name: 'Entertainment', icon: 'Film', type: 'expense', color: 'purple' },
  { id: 'shopping', name: 'Shopping', icon: 'ShoppingBag', type: 'expense', color: 'pink' },
  { id: 'health', name: 'Health', icon: 'HeartPulse', type: 'expense', color: 'emerald' },
  { id: 'education', name: 'Education', icon: 'GraduationCap', type: 'expense', color: 'indigo' },
  { id: 'salary', name: 'Salary', icon: 'Briefcase', type: 'income', color: 'emerald' },
  { id: 'other', name: 'Other', icon: 'MoreHorizontal', type: 'expense', color: 'slate' },
];

export const CATEGORY_NAMES = [
  'Food',
  'Transport',
  'Bills',
  'Entertainment',
  'Shopping',
  'Health',
  'Education',
  'Salary',
  'Other',
];

export default CATEGORIES;

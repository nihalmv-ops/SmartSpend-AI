/**
 * SmartSpend AI - Category Definitions & Visual Tokens
 * Used for transaction classification, budgeting, and Recharts color mapping.
 */

export const CATEGORIES = [
  { id: 'food', name: 'Food', icon: 'Utensils', type: 'expense', color: 'orange', hex: '#f97316' },
  { id: 'transport', name: 'Transport', icon: 'Car', type: 'expense', color: 'blue', hex: '#3b82f6' },
  { id: 'bills', name: 'Bills', icon: 'Receipt', type: 'expense', color: 'amber', hex: '#f59e0b' },
  { id: 'entertainment', name: 'Entertainment', icon: 'Film', type: 'expense', color: 'purple', hex: '#a855f7' },
  { id: 'shopping', name: 'Shopping', icon: 'ShoppingBag', type: 'expense', color: 'pink', hex: '#ec4899' },
  { id: 'health', name: 'Health', icon: 'HeartPulse', type: 'expense', color: 'emerald', hex: '#10b981' },
  { id: 'education', name: 'Education', icon: 'GraduationCap', type: 'expense', color: 'indigo', hex: '#6366f1' },
  { id: 'salary', name: 'Salary', icon: 'Briefcase', type: 'income', color: 'emerald', hex: '#059669' },
  { id: 'other', name: 'Other', icon: 'MoreHorizontal', type: 'expense', color: 'slate', hex: '#64748b' },
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

// Hex color lookup table for Recharts PieChart cells and category bars
export const CATEGORY_COLORS = {
  Food: '#f97316',
  Transport: '#3b82f6',
  Bills: '#f59e0b',
  Entertainment: '#a855f7',
  Shopping: '#ec4899',
  Health: '#10b981',
  Education: '#6366f1',
  Salary: '#059669',
  Other: '#64748b',
};

// Fallback sequential color palette for Recharts
export const CHART_PALETTE = [
  '#6366f1', // Indigo
  '#f97316', // Orange
  '#3b82f6', // Blue
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#a855f7', // Purple
  '#06b6d4', // Cyan
  '#64748b', // Slate
];

export default CATEGORIES;

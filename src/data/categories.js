// SmartSpend AI - Category Definitions

export const DEFAULT_CATEGORIES = [
  { id: 'food',
     name: 'Food',
      icon: 'Utensils',
       type: 'expense',
        color: 'orange',
         hex: '#f97316' },

  { id: 'transport',
     name: 'Transport',
      icon: 'Car',
       type: 'expense',
        color: 'blue',
         hex: '#3b82f6' },

  { id: 'bills',
     name: 'Bills',
      icon: 'Receipt',
       type: 'expense', 
       color: 'amber', 
       hex: '#f59e0b' },

  { id: 'entertainment',
     name: 'Entertainment',
      icon: 'Film',
       type: 'expense',
        color: 'purple',
         hex: '#a855f7' },

  { id: 'shopping',
     name: 'Shopping',
      icon: 'ShoppingBag',
       type: 'expense',
        color: 'pink',
         hex: '#ec4899' },

  { id: 'health',
     name: 'Health',
      icon: 'HeartPulse',
       type: 'expense',
        color: 'emerald',
         hex: '#10b981' },

  { id: 'education',
     name: 'Education',
      icon: 'GraduationCap',
       type: 'expense', 
       color: 'indigo',
        hex: '#6366f1' },

  { id: 'salary',
     name: 'Salary',
      icon: 'Briefcase', 
      type: 'income',
       color: 'emerald',
        hex: '#059669' },

  { id: 'other',
     name: 'Other', 
     icon: 'MoreHorizontal',
      type: 'expense',
       color: 'slate',
        hex: '#64748b' },
];

export const CATEGORIES = DEFAULT_CATEGORIES;

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

export const CHART_PALETTE = [
  '#6366f1',
  '#f97316',
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ec4899',
  '#a855f7',
  '#06b6d4',
  '#64748b',
];

export default CATEGORIES;

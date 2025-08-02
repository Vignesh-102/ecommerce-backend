export const PRODUCT_CATEGORIES = [
  'electronics',
  'books',
  'clothing',
  'home',
  'beauty',
  'sports',
  'toys',
] as const;

export type ProductCategory = typeof PRODUCT_CATEGORIES[number];

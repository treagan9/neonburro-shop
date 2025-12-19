import { DIGITAL_PRODUCTS } from './products-digital';
import { WEARABLE_PRODUCTS } from './products-wearable';
import { CRAFT_PRODUCTS } from './products-craft';

// Combine all products into one object
export const ALL_PRODUCTS = {
  ...DIGITAL_PRODUCTS,
  ...WEARABLE_PRODUCTS,
  ...CRAFT_PRODUCTS
};

// Get all products as an array
export const getAllProducts = () => {
  return Object.values(ALL_PRODUCTS);
};

// Get a single product by ID
export const getProduct = (productId) => {
  return ALL_PRODUCTS[productId] || null;
};

// Get featured products
export const getFeaturedProducts = () => {
  return Object.values(ALL_PRODUCTS).filter(product => product.featured);
};

// Get mystery products
export const getMysteryProducts = () => {
  return Object.values(ALL_PRODUCTS).filter(product => product.mysteryType);
};

// Get products by category
export const getProductsByCategory = (category) => {
  return Object.values(ALL_PRODUCTS).filter(product => product.category === category);
};

export default ALL_PRODUCTS;
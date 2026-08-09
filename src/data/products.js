import { DIGITAL_PRODUCTS } from './products-digital';
import { WEARABLE_PRODUCTS } from './products-wearable';
import { CRAFT_PRODUCTS } from './products-craft';
import { withCover } from './covers';

// Combine all products into one object
// Every record gets its cover picked from its own folder here, once, so no page
// has to remember to do it and no line ever carries a hand chosen hero shot.
// See covers.js for why that is a rule rather than a convenience.
const RAW = {
  ...DIGITAL_PRODUCTS,
  ...WEARABLE_PRODUCTS,
  ...CRAFT_PRODUCTS
};

export const ALL_PRODUCTS = Object.fromEntries(
  Object.entries(RAW).map(([id, p]) => [id, withCover(p)])
);

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
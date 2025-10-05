import { DIGITAL_PRODUCTS } from './products-digital';
import { WEARABLE_PRODUCTS } from './products-wearable';
import { CRAFT_PRODUCTS } from './products-craft';

export const getProduct = (id) => {
  return { ...DIGITAL_PRODUCTS, ...WEARABLE_PRODUCTS, ...CRAFT_PRODUCTS }[id];
};

export const getAllProducts = () => {
  return [
    ...Object.values(DIGITAL_PRODUCTS),
    ...Object.values(WEARABLE_PRODUCTS),
    ...Object.values(CRAFT_PRODUCTS)
  ];
};

export const getFeaturedProducts = () => 
  getAllProducts().filter(p => p.featured);

export const getProductsByCategory = (category) => 
  getAllProducts().filter(p => p.category === category);

export const getDigitalProducts = () => Object.values(DIGITAL_PRODUCTS);
export const getWearableProducts = () => Object.values(WEARABLE_PRODUCTS);
export const getCraftProducts = () => Object.values(CRAFT_PRODUCTS);

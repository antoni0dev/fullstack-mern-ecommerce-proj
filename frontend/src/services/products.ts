import axios from 'axios';

export const getAllProducts = async () => {
  const { data: products } = await axios.get('/api/products');
  return products;
};

export const getProduct = async (productId: string) => {
  const { data: product } = await axios.get(`/api/products/${productId}`);
  return product;
};

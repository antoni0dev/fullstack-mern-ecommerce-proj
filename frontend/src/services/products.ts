import axios from "axios";
import { ProductType } from "../lib/@types";

export const getAllProducts = async (): Promise<ProductType[]> => {
  const { data: products } = await axios.get("/api/products");
  return products;
};

export const getProduct = async (productId: string): Promise<ProductType> => {
  const { data: product } = await axios.get(`/api/products/${productId}`);
  return product;
};

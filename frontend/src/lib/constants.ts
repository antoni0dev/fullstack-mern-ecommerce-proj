export const BASE_URL = process.env.NODE_ENV === "development" ? "/" : "";
export const PRODUCTS_URL = "/api/products";
export const USERS_URL = "/api/users";
export const ORDERS_URL = "/api/orders";
export const PAYPAL_URL = "/api/config/paypal";

export const PATHS = {
  home: "/",
  cart: "/cart",
  shipping: "/shipping",
  login: "/login",
  register: "/register",
  profile: "/profile",
  product: "/product/:productId",
  payment: "/payment",
  placeOrder: "/place-order",
  order: "/order/:orderId",
};

export const PUBLIC_PATHS = [PATHS.login, PATHS.register];

// used in clear field action of the cartSlice

export enum CartField {
  CartItems = "cartItems",
  ShippingAddress = "shippingAddress",
  PaymentMethod = "paymentMethod",
  All = "all",
}

export const SCRIPT_PROVIDER_OPTIONS = {
  clientId: import.meta.env.PAYPAL_CLIENT_ID || "",
};

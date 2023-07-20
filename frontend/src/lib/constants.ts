export const BASE_URL = process.env.NODE_ENV === "development" ? "/" : "";
export const PRODUCTS_URL = "/api/products";
export const USERS_URL = "/api/users";
export const ORDERS_URL = "/api/orders";
export const PAYPAL_URL = "/api/config/paypal";

export const PATHS = {
  home: "/",
  cart: "/cart",
  login: "/login",
  register: "/register",
  profile: "/profile",
  product: "/product/:productId",
};

export const PUBLIC_PATHS = [PATHS.login, PATHS.register];

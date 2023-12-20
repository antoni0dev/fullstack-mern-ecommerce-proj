export const BASE_URL =
  import.meta.env.VITE_NODE_ENV === 'development' ? '/' : '';
export const PRODUCTS_URL = '/api/products';
export const USERS_URL = '/api/users';
export const ORDERS_URL = '/api/orders';
export const PAYPAL_URL = '/api/config/paypal';
export const UPLOADS_URL = '/api/upload';

export const PATHS = {
  root: '/',
  products: '/page/:pageNumber',
  cart: '/cart',
  shipping: '/shipping',
  login: '/login',
  register: '/register',
  profile: '/profile',
  product: '/product/:productId',
  payment: '/payment',
  placeOrder: '/place-order',
  order: '/order/:orderId',
  orderList: '/order-list',
  userList: '/user-list',
  productList: '/product-list',
  editProduct: '/edit-product/:productId',
  editUser: '/edit-user/:userId',
  search: '/search/:keyword/page?/:pageNumber?',
};

export const PUBLIC_PATHS = [PATHS.login, PATHS.register];
export const ADMIN_ROUTES = [
  PATHS.orderList,
  PATHS.userList,
  PATHS.productList,
  PATHS.editProduct,
];

// used in clear field action of the cartSlice

export enum CartField {
  CartItems = 'cartItems',
  ShippingAddress = 'shippingAddress',
  PaymentMethod = 'paymentMethod',
  All = 'all',
}

export const SCRIPT_PROVIDER_OPTIONS = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || '',
};

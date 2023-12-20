export interface ProductsResponse {
  products: ProductType[];
  page: number;
  pages: number;
}

export interface ProductType {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  reviews?: Review[];
}

type Review = {
  _id: number | string;
  name: string;
  rating: number;
  createdAt: string;
  comment: string;
};

export interface OrderItemType {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: string;
}

export interface PaymentResult {
  id?: string;
  status?: string;
  update_time?: string;
  email_address?: string;
}

export interface OrderType {
  _id: string;
  createdAt: string;
  updatedAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  itemsPrice: number;
  orderItems: OrderItem[];
  paymentMethod: string;
  shippingAddress: ShippingAddress;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  deliveredAt: string;
  paidAt: string;
  user: UserInfo;
  __v: number; // This is the version key from mongoose
}

export interface CartItem extends ProductType {
  quantity: number;
}

export interface Cart {
  cartItems: CartItem[];
  shippingAddress: {
    country?: string;
    city?: string;
    streetAddress?: string;
    postalCode?: string;
  };
  paymentMethod: string;
  totalPrice: number;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
}

export interface UserInfo {
  _id: string;
  email: string;
  isAdmin: boolean;
  name: string;
}

// Paypal Types

export interface SetLoadingStatusAction {
  type: 'setLoadingStatus';
  value: {
    state: SCRIPT_LOADING_STATE;
    message: string;
  };
}

export interface ResetOptionsAction {
  type: 'resetOptions';
  value: ReactPayPalScriptOptions;
}

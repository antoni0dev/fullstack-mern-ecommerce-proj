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
}

export interface CartItem extends ProductType {
  qty: number;
}

export interface Cart {
  cartItems: CartItem[];
  totalPrice: number;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
}

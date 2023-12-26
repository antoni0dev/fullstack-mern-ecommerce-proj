import { Cart } from './@types';

export const getErrorMessage = (error: any): string => {
  // error object from RTK Query
  if (error.data && typeof error.data.message === 'string') {
    return error.data.message;
  }

  // error object from other sources
  if (error.message) {
    return error.message;
  }

  if (error.error) {
    return error.error;
  }

  return 'An unknown error occurred';
};

export const addDecimals = (num: number) =>
  +(Math.round(num * 100) / 100).toFixed(2);

export const updateStoredCart = (state: Cart) => {
  console.log(state);
  // calculate the price of all items in the cart
  const itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
  );

  // calculate shipping price
  const shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // calculate tax price
  const taxPrice = addDecimals(state.itemsPrice * 0.15);

  // calculate total price
  const totalPrice = +(
    state.itemsPrice +
    state.shippingPrice +
    state.taxPrice
  ).toFixed();

  localStorage.setItem('cart', JSON.stringify(state));

  return { ...state, itemsPrice, shippingPrice, taxPrice, totalPrice };
};

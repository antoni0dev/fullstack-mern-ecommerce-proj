import { Cart } from "./@types";

const isServerError = (error: any) => {
  return error && typeof error.message === "string";
};

export const getErrorMessage = (error: any): string => {
  if (isServerError(error)) {
    return error.message;
  }

  if (error.error) {
    return error.error;
  }

  return "An unknwon error occured";
};

export const addDecimals = (num: number) =>
  +(Math.round(num * 100) / 100).toFixed(2);

export const updateCart = (state: Cart) => {
  // calculate the price of all items in the cart
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // calculate shipping price
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // calculate tax price
  state.taxPrice = addDecimals(state.itemsPrice * 0.15);

  // calculate total price
  state.totalPrice = +(
    state.itemsPrice +
    state.shippingPrice +
    state.taxPrice
  ).toFixed();

  localStorage.setItem("cart", JSON.stringify(state));
};

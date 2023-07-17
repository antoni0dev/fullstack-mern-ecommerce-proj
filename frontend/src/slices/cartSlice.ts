import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../lib/@types";
import { addDecimals } from "../lib/utils";

const existingCart = localStorage.getItem("cart");

const initialState: Cart = existingCart
  ? JSON.parse(existingCart)
  : {
      cartItems: [],
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((x) => x._id === item._id);

      // add if new, substitute if existing
      if (existingItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === item._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

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
    },
  },
});

export const { addItemToCart } = cartSlice.actions;
export default cartSlice.reducer;

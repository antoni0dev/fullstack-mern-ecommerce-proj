import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../lib/@types";
import { updateCart } from "../lib/utils";

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

      return updateCart(state);
    },
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) =>
        item._id !== id ? item : null
      );

      return updateCart(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.taxPrice = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

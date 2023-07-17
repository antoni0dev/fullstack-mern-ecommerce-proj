import { createSlice } from "@reduxjs/toolkit";
import { Cart } from "../lib/@types";
import { addDecimals } from "../lib/utils";

const existingCart = localStorage.getItem("cart");

const initialState: Cart = existingCart
  ? JSON.parse(existingCart)
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // since it's a reducer function ,it'll take 2 things - state and action
    addItemToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((i) => i._id === item._id);

      if (existingItem) {
        state.cartItems = state.cartItems.map((i) =>
          i._id === item._id ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Calculate items price
      state.itemsPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      // Calculate shipping price (if order is over $100, shipping is free, else $10)
      state.shippingPrice = addDecimals(state.itemsPrice) > 100 ? 0 : 10;

      // Calculate tax price - 15% of items price

      state.taxPrice = addDecimals(state.itemsPrice * 0.15);

      // Calculate total price
      state.totalPrice = +(
        state.itemsPrice +
        state.shippingPrice +
        state.taxPrice
      ).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

// to use it in our components, we need to export it as an action. Even though we already exported the reducer to put this in the store.ts, any function we create here has to be imported as an action
export const { addItemToCart } = cartSlice.actions;
export default cartSlice.reducer;

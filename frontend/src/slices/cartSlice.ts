import { createSlice } from '@reduxjs/toolkit';
import { Cart, CartItem } from '../lib/@types';
import { updateCart } from '../lib/utils';
import { CartField } from '../lib/constants';

const existingCart = localStorage.getItem('cart');

const initialState: Cart = existingCart
  ? JSON.parse(existingCart)
  : {
      cartItems: [],
      shippingAddress: {},
      paymentMethod: '',
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
    };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const item: CartItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (x) => x._id === item._id
      );

      // substitute if exists, add if new
      if (existingItemIndex >= 0) {
        state.cartItems[existingItemIndex] = item;
      } else {
        state.cartItems.push(item);
      }

      updateCart(state);
    },
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      const index = state.cartItems.findIndex((x) => x._id === id);

      if (index >= 0) {
        state.cartItems.splice(index, 1);
      }

      updateCart(state);
    },
    clearField: (state, action) => {
      switch (action.payload) {
        case CartField.CartItems: {
          state.cartItems = [];
          break;
        }
        case CartField.ShippingAddress: {
          state.shippingAddress = {};
          break;
        }
        case CartField.PaymentMethod: {
          state.paymentMethod = '';
          break;
        }
        case CartField.All: {
          state.cartItems = [];
          state.shippingAddress = {};
          state.paymentMethod = '';
          state.itemsPrice = 0;
          state.shippingPrice = 0;
          state.taxPrice = 0;
          state.totalPrice = 0;
          break;
        }
        default:
          break;
      }
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      console.log(action.payload);
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearField,
} = cartSlice.actions;
export default cartSlice.reducer;

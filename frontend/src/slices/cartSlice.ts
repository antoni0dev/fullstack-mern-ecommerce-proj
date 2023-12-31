import { createSlice } from '@reduxjs/toolkit';
import { Cart, CartItem } from '../lib/@types';
import { updateStoredCart } from '../lib/utils';
import { CartField } from '../lib/constants';
import { RootState } from '../store';

// TODO: what's a better way to handle user session than saving it in local storage?
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
        (x) => x._id === item._id,
      );

      // substitute if exists, add if new
      if (existingItemIndex >= 0) {
        state.cartItems[existingItemIndex] = item;
      } else {
        state.cartItems.push(item);
      }

      updateStoredCart(state);
    },
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      const index = state.cartItems.findIndex((x) => x._id === id);

      if (index >= 0) {
        state.cartItems.splice(index, 1);
      }

      updateStoredCart(state);
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
          state = initialState;
          break;
        }
        default:
          break;
      }
      return updateStoredCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateStoredCart(state);
    },
    savePaymentMethod: (state, action) => {
      console.log(action.payload);
      state.paymentMethod = action.payload;
      return updateStoredCart(state);
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const {
  addItemToCart,
  removeItemFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearField,
} = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
export interface CartItem {
  id: number;
  count: number;
  name: string;
  price: number;
}

export interface Cart {
  isCartOpen: boolean;
  cart: CartItem[];
}
const initialState: Cart = {
  isCartOpen: false,
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    Add_to_Cart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    Remove_from_Cart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    Increase_Item: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id == action.payload.id) {
          item.count++;
        }
        return item;
      });
    },
    Decrease_Item: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id == action.payload.id) {
          item.count--;
        }
        return item;
      });
    },
    Set_IsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    CLEAR_Cart: () => {
      return { ...initialState };
    },
  },
});
export const {
  Add_to_Cart,
  Increase_Item,
  Decrease_Item,
  Set_IsCartOpen,
  Remove_from_Cart,
  CLEAR_Cart,
} = cartSlice.actions;
export default cartSlice.reducer;

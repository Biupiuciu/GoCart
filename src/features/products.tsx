import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [{ id: 0, price: 0 }],
};
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    Set_Product: (state, action) => {
      state.product = action.payload;
    },
    Remove_Products: (state) => {
      state.product = [{ id: 0, price: 0 }];
    },
  },
});

export const { Set_Product, Remove_Products } = productsSlice.actions;
export default productsSlice.reducer;

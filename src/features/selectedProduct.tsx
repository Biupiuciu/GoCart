import { createSlice } from "@reduxjs/toolkit";

const initialState = { product: [] };
export const selectedproductsSlice = createSlice({
  name: "selectedproduct",
  initialState,
  reducers: {
    Select_Product: (state, action) => {
      state.product = action.payload;
    },
    Remove_SelectedProduct: (state) => {
      state.product = [];
    },
  },
});
export const { Select_Product, Remove_SelectedProduct } =
  selectedproductsSlice.actions;
export default selectedproductsSlice.reducer;

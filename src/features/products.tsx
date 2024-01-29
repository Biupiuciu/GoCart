import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [{}],
};
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    Set_Product: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { Set_Product } = productsSlice.actions;
export default productsSlice.reducer;

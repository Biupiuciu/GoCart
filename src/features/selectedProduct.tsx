import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {
    id: -1,
    title: "",
    price: 0,
    image: "",
    category: "",
    description: "",
  },
};
export const selectedproductsSlice = createSlice({
  name: "selectedproduct",
  initialState,
  reducers: {
    Select_Product: (state, action) => {
      state.product = action.payload;
    },
    Remove_SelectedProduct: (state) => {
      state.product = {
        id: -1,
        title: "",
        price: 0,
        image: "",
        category: "",
        description: "",
      };
    },
  },
});
export const { Select_Product, Remove_SelectedProduct } =
  selectedproductsSlice.actions;
export default selectedproductsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export interface User {
  isLogin: boolean;
  user: { id?: number; username?: string; email?: string; phone?: string };
}
const initialState: User = {
  isLogin: false,
  user: { id: 0 },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOGIN: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
    },
    LOGOUT: () => {
      return { ...initialState };
    },
  },
});
export const { LOGIN, LOGOUT } = userSlice.actions;
export default userSlice.reducer;

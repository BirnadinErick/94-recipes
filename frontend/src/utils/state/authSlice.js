import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    user: {},
  },
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      // user information is dispatched as payload
      state.user = action.payload;
    },

    logout: (state) => {
      state.isAuth = false;
      state.user = {};
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

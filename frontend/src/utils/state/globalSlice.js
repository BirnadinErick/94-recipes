import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "global",
  initialState: {
    isAuth: false,
    user: {},
    recipes: [],
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
    // i got interested and decided to further develop this site
    // so, below are not for assignment purposes
    bulkAdd: (state, action) => {
      state.recipes = action.payload;
    },
    reset: (state) => {
      state.recipes = [];
    },
    deleteARecipe: (state, action) => {
      const temp = state.recipes;
      state.recipes = temp.filter((recipe) => {
        return recipe.slug !== action.payload;
      });
    },
  },
});

export const { login, logout, bulkAdd, reset, deleteARecipe } =
  authSlice.actions;
export default authSlice.reducer;

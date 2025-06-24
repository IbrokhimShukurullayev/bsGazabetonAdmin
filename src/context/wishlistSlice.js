import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value:
    typeof window !== "undefined" && localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleToWishes(state, { payload }) {
      const index = state.value.findIndex(
        (el) => el.productId === payload.productId
      );

      if (index < 0) {
        state.value = [...state.value, payload];
      } else {
        state.value = state.value.filter(
          (el) => el.productId !== payload.productId
        );
      }

      // localStorage ni yangilaymiz
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(state.value));
      }
    },
  },
});

export const { toggleToWishes } = wishlistSlice.actions;

export default wishlistSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const storedWishlist =
  localStorage.getItem("wishList") !== null
    ? JSON.parse(localStorage.getItem("wishList"))
    : [];

const initialState = {
  wishlist: storedWishlist,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.wishlist.find((item) => item.id === product.id);
      if (!exists) {
        state.wishlist.push(product);
        localStorage.setItem("wishList", JSON.stringify(state.wishlist));
      }
    },
    removeFromWishlist: (state, action) => {
      const product = action.payload;
      state.wishlist = state.wishlist.filter((item) => item.id !== product.id);
      localStorage.setItem("wishList", JSON.stringify(state.wishlist));
    },
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.wishlist.find((item) => item.id === product.id);
      if (exists) {
        state.wishlist = state.wishlist.filter((item) => item.id !== product.id);
      } else {
        state.wishlist.push(product);
      }
      localStorage.setItem("wishList", JSON.stringify(state.wishlist));
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
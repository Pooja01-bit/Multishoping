import { configureStore } from "@reduxjs/toolkit";
import cartSlice, { cartMiddleware } from "./features/cart/cartSlice";
import authSlice from "./features/auth/authSlice";
import orderSlice from "./features/order/orderSlice";
import wishlistSlice from "./features/wishlist/wishlistSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
    order: orderSlice,
    wishlist: wishlistSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware),
});
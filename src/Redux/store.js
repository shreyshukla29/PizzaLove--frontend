import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./Slices/AuthSlice";
import ProductReducer from "./Slices/ProductSlice";
import AdminReducer from "./Slices/AdminSlice";
import cartReducer from "./Slices/CartSlice";
import orderReducer from "./Slices/OrderSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSliceReducer,
    product: ProductReducer,
    admin: AdminReducer,
    cart: cartReducer,
    orders:orderReducer
  },
  devTools: true,
});

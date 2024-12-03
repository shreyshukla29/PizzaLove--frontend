import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosinstance from "./../../Helpers/axiosinstance";

const initialState = {
  cartData: {},
};

export const getCartDetails = createAsyncThunk(
  "/cart/",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.get("/carts");

      console.log("cart get",response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addProductToCart = createAsyncThunk(
  "/cart/addProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = axiosinstance.post(`/carts/add/${productId}`);

      toast.promise(response, {
        loading: "Adding Product to cart",
        error: "Something went wrong",
        success: "Product added successfully",
      });

      const cart = await response;

      console.log(cart);

      return cart.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeProductCart = createAsyncThunk(
  "/cart/addProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = axiosinstance.post(`/carts/delete/${productId}`);

      toast.promise(response, {
        loading: "Removing Product from cart",
        error: "Something went wrong",
        success: "Product removed successfully",
      });

      const cart = await response;

      console.log(cart);

      return cart.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeCart : (state)=>{
      state.cartData={}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCartDetails.fulfilled, (state, action) => {
      console.log(action.payload)
      console.log('fullfilled')
      state.cartData = action.payload?.data;
    });
   
  },
});

export const { removeCart} =CartSlice.actions
export default CartSlice.reducer;

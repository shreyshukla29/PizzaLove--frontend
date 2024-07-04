import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosinstance from "./../../Helpers/axiosinstance";
import { toast } from "react-hot-toast";


const initialState = {
  orders: [],
};
export const getOrderDetails = createAsyncThunk(
  "/orders/users",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosinstance.get("/orders/details");

      console.log("cart get", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const placeOrder = createAsyncThunk(
  "/orders/place",
  async (data, { rejectWithValue }) => {
    try {
      const response =  axiosinstance.post("/orders/process", data);

      toast.promise(response, {
        success: (resolvedPromise) => {
          return resolvedPromise.data.message;
        },
        loading: "Hold back tight , we are placing your order",
        error: "something went wrong"
      });
      const order = await response;
      console.log("order created", order);
      return order.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrder = createAsyncThunk(
  "/orders/get",
  async (orderId, { rejectWithValue }) => {
    try {
      const response =  axiosinstance.get(`/orders/details/${orderId}`);
      toast.promise(response, {
        success: (resolvedPromise) => {
          return resolvedPromise.data.message;
        },
        loading: "Hold back tight , we are fetching your order",
        error: "something went wrong"
      });
      const order = await response;
      console.log("order fetch", order);
      return order.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const CancelOrder = createAsyncThunk(
  "/orders/cancel",
  async (orderId, { rejectWithValue }) => {
    try {
      const response =  axiosinstance.put(`/orders/${orderId}/cancel`);
      toast.promise(response, {
        success: (resolvedPromise) => {
          return resolvedPromise.data.message;
        },
        loading: "Hold back tight , we are Cancelling your order",
        error: "something went wrong"
      });
      const order = await response;
      console.log("order fetch", order);
      return order.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const OrderSlice =createSlice({
  name:'product',
  initialState,
  reducer:{},
  extraReducers:(builder)=>{
      builder.addCase(getOrderDetails.fulfilled,(state,action)=>{
          state.orders=action.payload?.data;

      })
  }
})

export default OrderSlice.reducer;
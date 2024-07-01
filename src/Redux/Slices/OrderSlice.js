import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosinstance from "./../../Helpers/axiosinstance";
import { toast } from "react-hot-toast";

const initialState = {
  orders: [],
};


export const getOrderDetails = createAsyncThunk(
    "/orders",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosinstance.get("/orders/details");
  
        console.log("cart get",response.data);
  
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  
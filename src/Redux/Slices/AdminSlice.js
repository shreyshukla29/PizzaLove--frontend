import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosinstance from "./../../Helpers/axiosinstance";
import { toast } from "react-hot-toast";

const initialState = {
  products: [],
};

export const addProducts = createAsyncThunk(
  "/products/add",
  async (data, { rejectWithValue }) => {
    console.log("data in thunk", data);

    try {
      const product = await axiosinstance.post("/products/create", data);

      if (!product) toast("Loading...");
      toast.success("successfully add Product");

      console.log("resp", product);
      return product.data;
    } catch (error) {
      toast.error("something went wrong");
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProducts = createAsyncThunk(
  "/products/delete",
  async (id, { rejectWithValue }) => {
    try {
      const product = await axiosinstance.delete(`/products/delete/${id}`);

      if (!product) toast("Loading...");
      toast.success("successfully delete Product");

      console.log(product.data);
      return product.data;
    } catch (error) {
      toast.error("something went wrong");
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "/products/update",
  async (data, { rejectWithValue }) => {
    try {
      const product = await axiosinstance.post("/products//update/:id", data);

      if (!product) toast("Loading...");
      toast.success("successfully update Product");

      console.log(product.data);
      return product.data;
    } catch (error) {
      toast.error("something went wrong");
      return rejectWithValue(error.response.data);
    }
  }
);

const AdminSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
});

export default AdminSlice.reducer;

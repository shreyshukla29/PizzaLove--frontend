
import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosinstance from './../../Helpers/axiosinstance';
import { toast } from 'react-hot-toast';
const initialState={
    productData:[]
}

export const getproductDetails = createAsyncThunk('/products/getDetails', async (id) => {
    try {
        const product = axiosinstance.get(`/products/${id}`);
        toast.promise(product, {
            loading: 'Loading the product',
            error: 'Something went cannot load product',
            success: 'Product loaded successfully',
        });
        const apiResponse = await product;
        return apiResponse.data;
    } catch(error) {
        console.log(error);
        toast.error('Something went wrong');
        
    }
});

export const getallProducts = createAsyncThunk('/products/getAll',async ()=>{

    try {
      
        const products = await axiosinstance.get('/products/');
        if(!products) toast('Loading...')
        toast.success('success')

        console.log(products.data)    
        return products.data
        
    } catch (error) {

        toast.error('something went wrong')
        
    }
})

const ProductSlice =createSlice({
    name:'product',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getallProducts.fulfilled,(state,action)=>{
            state.productData=action.payload?.details;

        })
    }
})

export default ProductSlice.reducer;
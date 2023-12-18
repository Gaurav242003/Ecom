import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'



export const fetchAllProduct = createAsyncThunk(
    
    'product/fetchAllProduct',
    async (userId, thunkAPI) => {
        
        const response  = await axios.get(`http://localhost:8080/products`);
        
        return response.data;
    }
)

export const getFilterProduct = createAsyncThunk(
    
    'product/getFilterProduct',
    async (filter) => {
        
        const st=`http://localhost:8080/products?${filter.type}=${filter.value}`
        //console.log(st);
        const response  = await axios.get(st);
        //console.log(response.data)
        return response.data;
    }
)

export const getSortProduct = createAsyncThunk(
    
    'product/getSortProduct',
    async (option) => {
        
        const st=`http://localhost:8080/products?_sort=${option.type}&_order=${option.order}`
        //console.log(st);
        const response  = await axios.get(st);
        console.log(response.data)
        return response.data;
    }
)

const initialState = {
    allProduct: [],
    status: '',
}



export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(fetchAllProduct.fulfilled, (state, action) => {
                
                state.allProduct = action.payload;
                state.status = 'idle';
            })
            .addCase(fetchAllProduct.pending, (state, action) => {
           
            state.status = 'loading';
            })
            .addCase(getFilterProduct.fulfilled, (state, action) => {
                
                state.allProduct = action.payload;
                state.status = 'idle';
            })
            .addCase(getFilterProduct.pending, (state, action) => {
           
            state.status = 'loading';
            })
            .addCase(getSortProduct.fulfilled, (state, action) => {
                
                state.allProduct = action.payload;
                state.status = 'idle';
            })
            .addCase(getSortProduct.pending, (state, action) => {
           
            state.status = 'loading';
            });

    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount }  = productSlice.actions



export default productSlice.reducer




import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'






export const getFilterProduct = createAsyncThunk(

    'product/getFilterProduct',
    async (filter) => {

        const st = `http://localhost:8080/products?${filter.type}=${filter.value}`
        //console.log(st);
        const response = await axios.get(st);
        //console.log(response.data)
        return response.data;
    }
)

export const getSortProduct = createAsyncThunk(

    'product/getSortProduct',
    async (option) => {

        const st = `http://localhost:8080/products?_sort=${option.type}&_order=${option.order}`
        //console.log(st);
        const response = await axios.get(st);
        console.log(response.data)
        return response.data;
    }
)

export const setPageProduct = createAsyncThunk(

    'product/setPageProduct',
    async (page) => {

        const st = `http://localhost:8080/products?_page=${page}&_limit=9`
        //console.log(st);
        const response = await axios.get(st);
        const myHeader = response.headers;
        const totalCount = myHeader.get("x-total-count")
        
        return { data: response.data, totalCount: totalCount }
    }
)

export const getBrands = createAsyncThunk(

    'product/getBrands',
    async () => {

        const st = `http://localhost:8080/brands`
        //console.log(st);
        const response = await axios.get(st);
        //console.log(response.data)
        return response.data;
    }
)

export const getCategories = createAsyncThunk(

    'product/getCategories',
    async () => {

        const st = `http://localhost:8080/categories`
        //console.log(st);
        const response = await axios.get(st);
        //console.log(response.data)
        return response.data;
    }
)

export const getProductById = createAsyncThunk(

    'product/getProductById',
    async (id) => {

        const st = `http://localhost:8080/products/${id}`
        //console.log(st);
        const response = await axios.get(st);
        //console.log(response.data)
        return response.data;
    }
)

















const initialState = {
    allProduct: [],
    status: '',
    count: 0,
    allBrand:[],
    allCategory:[],
    currentProduct:null,
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
            })
            .addCase(setPageProduct.fulfilled, (state, action) => {

                state.allProduct = action.payload.data;
                //console.log(state.allProduct);
                state.count = action.payload.totalCount;
                
                state.status = 'idle';
            })
            .addCase(setPageProduct.pending, (state, action) => {

                state.status = 'loading';
            })
            .addCase(getCategories.fulfilled, (state, action) => {

                state.allCategory = action.payload;
                state.status = 'idle';
            })
            .addCase(getCategories.pending, (state, action) => {

                state.status = 'loading';
            })
            .addCase(getBrands.fulfilled, (state, action) => {

                state.allBrand = action.payload;
                state.status = 'idle';
            })
            .addCase(getBrands.pending, (state, action) => {

                state.status = 'loading';
            })
            .addCase(getProductById.fulfilled, (state, action) => {

                state.currentProduct = action.payload;
                state.status = 'idle';
            })
            .addCase(getProductById.pending, (state, action) => {

                state.status = 'loading';
            });
            

    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = productSlice.actions



export default productSlice.reducer




import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const addToCart = createAsyncThunk(

    'cart/addToCart',
    async (cartData) => {

        const st = `http://localhost:8080/cart`
        //console.log(st);
        const response = await axios.post(st,cartData,{
            headers:{
                'Content-Type': 'application/json'
            }
        });
        //console.log(response.data)
        return cartData;
    }
)


export const getCartById = createAsyncThunk(

    'cart/getCartById',
    async (id) => {

        const st = `http://localhost:8080/cart?user=${id}`
        //console.log(st);
        const response = await axios.get(st)
        //console.log(response.data)
        return response.data;
    }
)

export const updateCart = createAsyncThunk(

    'cart/updateCart',
    async (item) => {

        const st = `http://localhost:8080/cart/${item.id}`
        //console.log(st);
        const response = await axios.patch(st,item,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        //console.log(response.data)
        return response.data;
    }
)

export const deleteItem = createAsyncThunk(

    'cart/deleteItem',
    async (id) => {

        const st = `http://localhost:8080/cart/${id}`
        //console.log(st);
        const response = await axios.delete(st)
        //console.log(response.data)
        return id;
    }
)


const initialState = {
    items:[],
    status: 'idle',
}


export const cartSlice = createSlice({
    name: 'cart',
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
            .addCase(addToCart.fulfilled, (state, action) => {

                state.items.push(action.payload);
                state.status = 'idle';
            })
            .addCase(addToCart.pending, (state, action) => {

                state.status = 'loading';
            })
            .addCase(getCartById.fulfilled, (state, action) => {

                state.items=action.payload;
                state.status = 'idle';
            })
            .addCase(getCartById.pending, (state, action) => {

                state.status = 'loading';
            })
            .addCase(updateCart.fulfilled, (state, action) => {
                const index=state.items.findIndex((item)=> item.id===action.payload.id)
                //console.log(action.payload);
                state.items[index]=action.payload;
                state.status = 'idle';
            })
            .addCase(updateCart.pending, (state, action) => {

                state.status = 'loading';
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                const index=state.items.findIndex((item)=> item.id===action.payload)
                //console.log(action.payload);
                state.items.splice(index,1)
                state.status = 'idle';
            })
            .addCase(deleteItem.pending, (state, action) => {

                state.status = 'loading';
            });
            

    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = cartSlice.actions



export default cartSlice.reducer
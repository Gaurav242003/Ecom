import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const addToOrder = createAsyncThunk(

    'order/addToOrder',
    async ({myCart,totalPrice,totalItem,user,address,payment}) => {

        const st = `http://localhost:8080/orders`
        //console.log(st);
        const response = await axios.post(st, {
            cart: myCart,
            totalPrice:totalPrice,
            totalItem:totalItem,
            userID: user.id,
            deliveryAddress:address,
            paymentMehod:payment
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //console.log(response.data)
        return response.data;
    }
)







const initialState = {
    allOrders: [],
    status: 'idle',
}


export const orderSlice = createSlice({
    name: 'order',
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
            .addCase(addToOrder.fulfilled, (state, action) => {

                state.allOrders.push(action.payload);
                state.status = 'idle';
            })
            .addCase(addToOrder.pending, (state, action) => {

                state.status = 'loading';
            });



    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = orderSlice.actions



export default orderSlice.reducer


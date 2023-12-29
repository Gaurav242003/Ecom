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
            paymentMehod:payment,
            status:"pending"
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
    currentOrder:null,
    status: 'idle',
}


export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        resetcurrentOrder: (state) => {
          state.currentOrder=null
        },
      
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
            .addCase(addToOrder.fulfilled, (state, action) => {

                state.allOrders.push(action.payload);
                state.currentOrder=action.payload;
                state.status = 'idle';
            })
            .addCase(addToOrder.pending, (state, action) => {

                state.status = 'loading';
            });



    },
})

// Action creators are generated for each case reducer function
export const {resetcurrentOrder} = orderSlice.actions



export default orderSlice.reducer


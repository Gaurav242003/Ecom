import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getSignUpUser = createAsyncThunk(

    'user/getSignUpUser',
    async (userData) => {

        const st = `http://localhost:8080/users`
        //console.log(st);
        const response = await axios.post(st,{
           email:userData.email,
           password: userData.password
        },{
            headers:{
                'Content-Type': 'application/json'
            }
        });
        //console.log(response.data)
        return response.data;
    }
)


export const addUserAddress = createAsyncThunk(

    'user/addUserAddress',
    async (userDetail) => {
        //console.log(userDetail)
        const st = `http://localhost:8080/users/${userDetail.id}`
        //console.log(st);
        const response = await axios.patch(st,{address:userDetail.address},{
            headers:{
                'Content-Type': 'application/json'
            }
        });
        //console.log(response.data)
        return userDetail.address;
    }
)


const initialState = {
    currentUser:null,
    status: 'idle',
    address:[]
}


export const userSlice = createSlice({
    name: 'user',
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
            .addCase(getSignUpUser.fulfilled, (state, action) => {

                state.currentUser = action.payload;
                state.status = 'idle';
            })
            .addCase(getSignUpUser.pending, (state, action) => {

                state.status = 'loading';
            })
            .addCase(addUserAddress.fulfilled, (state, action) => {

                state.address=action.payload
                state.status = 'idle';
            })
            .addCase(addUserAddress.pending, (state, action) => {

                state.status = 'loading';
            });
            

    },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = userSlice.actions



export default userSlice.reducer
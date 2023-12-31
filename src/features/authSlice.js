import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getSignUpUser = createAsyncThunk(

    'user/getSignUpUser',
    async (userData) => {

        const st = `http://localhost:8080/users`
        //console.log(st);
        const response = await axios.post(st, {
            email: userData.email,
            password: userData.password,
            username: userData.username,
            phoneNo: userData.phoneNo,
        }, {
            headers: {
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
        const response = await axios.patch(st, { address: userDetail.address }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //console.log(response.data)
        return userDetail.address;
    }
)

export const getMyOrders = createAsyncThunk(
    'user/getMyOrders',
    async (id) => {
        const response = await axios.get(`http://localhost:8080/orders/?userID=${id}`)
        //console.log(response.data)
        return response.data;
    }
)

export const deleteUserAddress = createAsyncThunk(
    'user/deleteUserAddress',
    async (user) => {
        const response = await axios.put(`http://localhost:8080/users/${user.id}`, user, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        // console.log(response.data)
        return response.data
    }
)


const initialState = {
    currentUser: null,
    status: 'idle',
    address: [],
    MyOrder: [],
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loggedIn: (state) => {
            state.currentUser = {
                email: "royalgk2@gmail.com",
                password: "123456As",
                username: "Gaurav Kumar",
                phoneNo: "7023893793",
                "id": 1,
            }
            state.address=[
                {
                  fullName: "kajk",
                  mobileNo: "1234567890",
                  email: "kaj@gmail.com",
                  streetAddress: "kajka",
                  city: "kjakj",
                  state: "kjakl",
                  pinCode: "126"
                }
              ]
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

                state.address = action.payload
                state.status = 'idle';
            })
            .addCase(addUserAddress.pending, (state, action) => {

                state.status = 'loading';
            })
            .addCase(getMyOrders.fulfilled, (state, action) => {

                state.MyOrder = action.payload
                state.status = 'idle';
            })
            .addCase(getMyOrders.pending, (state, action) => {

                state.status = 'loading';
            })
            .addCase(deleteUserAddress.fulfilled, (state, action) => {

                state.address = action.payload.address
                state.status = 'idle';
            })
            .addCase(deleteUserAddress.pending, (state, action) => {

                state.status = 'loading';
            });



    },
})

// Action creators are generated for each case reducer function
export const { loggedIn } = userSlice.actions



export default userSlice.reducer
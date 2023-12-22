import { configureStore,combineReducers } from '@reduxjs/toolkit'
import productReducer from '../features/ProductSlice'
import userReducer from '../features/authSlice'
import cartReducer from '../features/cartSlice'

export const store = configureStore({
  reducer: {
    product : productReducer,
    user: userReducer,
    cart: cartReducer,
  },
})
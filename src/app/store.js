import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/ProductSlice'
import userReducer from '../features/authSlice'
import cartReducer from '../features/cartSlice'
import orderReducer from '../features/orderSlice'

export const store = configureStore({
  reducer: {
    product : productReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer,
  },
})
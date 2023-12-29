import Home from './Pages/Home';
import SignIn from './Pages/SignInPage';
import SignUp from './Pages/SignUpPage';
import { CartPage } from './Pages/CartPage';
import Checkout from './Pages/CheckOutPage';
import Protect from './components/Protect/Protect';
import ProductDetailPage from './Pages/ProductDetailPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getCartByUserId } from './features/cartSlice';
import OrderSuccess from './components/Order/OrderSuccess';

import MyOrderPage from './Pages/MyOrderPage';

import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const user=useSelector(state=> state.user.currentUser)
  const userid=user && user.id
  const dispatch=useDispatch()

  useEffect(()=>{
        dispatch(getCartByUserId(userid))
  },[dispatch,userid])
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/myorders' element={<MyOrderPage/>}/>
          <Route path='/order-success/:id' element={<OrderSuccess/>}/>
          <Route path='/product-detail/:id' element={<ProductDetailPage/>}/>

        </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App;

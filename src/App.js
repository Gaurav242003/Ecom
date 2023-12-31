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
import Page404 from './Pages/Page404';

import ProfilePage from './Pages/ProfilePage';
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
          <Route path='/' element={<Protect> <Home/> </Protect>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/cart' element={<Protect><CartPage/></Protect>}/>
          <Route path='/checkout' element={<Protect><Checkout/></Protect>}/>
          <Route path='/myorders' element={<Protect><MyOrderPage/></Protect>}/>
          <Route path='/myprofile' element={<Protect><ProfilePage/></Protect>}/>
          <Route path='/order-success/:id' element={<Protect><OrderSuccess/></Protect>}/>
          <Route path='/product-detail/:id' element={<Protect><ProductDetailPage/></Protect>}/>
          <Route path='*' element={<Page404/>}/>

        </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App;

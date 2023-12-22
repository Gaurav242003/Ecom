import Home from './Pages/Home';
import SignIn from './Pages/SignInPage';
import SignUp from './Pages/SignUpPage';
import { CartPage } from './Pages/CartPage';
import Checkout from './Pages/CheckOutPage';
import Protect from './components/Protect/Protect';
import ProductDetailPage from './Pages/ProductDetailPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getCartById } from './features/cartSlice';

import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function App() {
  var id=8
  const dispatch=useDispatch()

  useEffect(()=>{
        dispatch(getCartById(id))
  },[dispatch,id])
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/product-detail/:id' element={<ProductDetailPage/>}/>

        </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App;

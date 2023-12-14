import Home from './Pages/Home';
import SignIn from './Pages/SignInPage';
import SignUp from './Pages/SignUpPage';
import { CartPage } from './Pages/CartPage';
import Checkout from './Pages/CheckOutPage';
import ProductDetailPage from './Pages/ProductDetailPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/product-detail' element={<ProductDetailPage/>}/>

        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;

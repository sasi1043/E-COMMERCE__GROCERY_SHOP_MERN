import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ThemeContext from './context/ThemeContext';

import NavBar from './components/NavBar'
import Fruits from './pages/HomeProducts/Fruits';
import Grains from './pages/HomeProducts/Grains';
import Dairy from './pages/HomeProducts/Dairy';
import FrozenFood from './pages/HomeProducts/FrozenFood';
import Beverages from './pages/HomeProducts/Beverages';
import Healthcare from './pages/HomeProducts/Healthcare';
import Masala from './pages/HomeProducts/Masala'
import Chocolates from './pages/HomeProducts/Chocolates';
import Biscuit from './pages/HomeProducts/Biscuit'
import Stationary from './pages/HomeProducts/Stationary';
import CartProvider from './context/CartContext';
import CartView from './pages/CartView';
import LoginContext from './context/LoginContext';
import Confirm from './pages/Confirm';
import AllTimeBest from './pages/products/AllTimeBest'

function App() {
  
  return (
     <>
     <div>

      <ThemeContext>
          <CartProvider>
            <LoginContext>
      <Routes>
        <Route path='/login' element={<Login />} />     
        <Route path='/' element={<Home />} />
        <Route path='/navbar' element={<NavBar/>}></Route>
        <Route path='/fruits' element={<Fruits/>}></Route>
        <Route path='/grains' element={<Grains/>}></Route>
        <Route path='/Dairy' element={<Dairy/>}></Route>
        <Route path='/frozen' element={<FrozenFood/>}></Route>
        <Route path='/beverages' element={<Beverages/>}></Route>
        <Route path='/healthcare' element={<Healthcare/>}></Route>
        <Route path='/masala' element={<Masala/>}></Route>
        <Route path='/choco' element={<Chocolates/>}></Route>
        <Route path='/biscut' element={<Biscuit/>}></Route>
        <Route path='/stationary' element={<Stationary/>}></Route>
        <Route path='/AllTimeBest' element={<AllTimeBest/>}></Route>
        <Route path='/cartView' element={<CartView/>}></Route>
        <Route path='/paymentSuccess'  element={<Confirm/>}></Route>
      </Routes>
      </LoginContext>
      </CartProvider>
    </ThemeContext>
    </div>
     </>
  );
}



export default App;

import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import ContactUs from './components/pageSections/ContactUs';
import NavBar from './components/NavBar';
import ItemDetailContainer from './components/items/ItemDetailContainer';
import ItemListContainer from './components/items/ItemListContainer';
import ProductsContainer from './components/pageSections/ProductsContainer';
import CheckOut from './components/CheckOut';
import CartContextProvider from './context/CartContext';
import ThemeContextProvider from './context/ThemeContext';



function App() {

  /* scroll top of page on reload (manual) */
  useEffect(()=>{
    window.onunload = ()=> window.scrollTo(0, 0);
  }, [])

  return (
    <>
      
      <CartContextProvider>
        <ThemeContextProvider>
          <Router>
              <NavBar/>
              <Routes>
                <Route exact path="/ContactUs" element={<ContactUs />}></Route>
                <Route path="/CheckOut" element={<CheckOut />} />
                <Route exact path="/Categories/:productCategory" element={<ItemListContainer/>}></Route>
                <Route exact path="/Search/:productName" element={<ItemListContainer/>}></Route>
                <Route exact path="/Products/:productId" element={<ItemDetailContainer />}></Route>
                <Route exact path="/" element={<ProductsContainer />}></Route>
              </Routes>
          </Router>
        </ThemeContextProvider>
      </CartContextProvider>
      
    </>
  );
}

export default App;

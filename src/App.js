import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Contact from './components/pageSections/Contact';
import NavBar from './components/NavBar';
import ItemDetailContainer from './components/items/ItemDetailContainer';
import ItemListContainer from './components/items/ItemListContainer';
import Cart from './components/Cart';
import CartContextProvider from './context/CartContext';
import ThemeContextProvider from './context/ThemeContext';
import WrongPath from './components/WrongPath';
import Footer from './components/Footer';



function App() {

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
                <Route exact path="/Contact" element={<Contact />}></Route>
                <Route path="/Cart" element={<Cart />} />
                <Route exact path="/Categories/:productCategory" element={<ItemListContainer/>}></Route>
                <Route exact path="/Search/:productName" element={<ItemListContainer/>}></Route>
                <Route exact path="/Products/:productId" element={<ItemDetailContainer />}></Route>
                <Route exact path="/" element={<ItemListContainer />}></Route>
                <Route exact path="/*" element={<WrongPath />}></Route>
              </Routes>
              <Footer/>
          </Router>
        </ThemeContextProvider>
      </CartContextProvider>
      
    </>
  );
}

export default App;

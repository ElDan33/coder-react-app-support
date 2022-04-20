import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext';
import ItemListContainer from '../items/ItemListContainer'

const ProductsContainer = () => {

  const {darkMode} = useContext(ThemeContext);

  return (
    <div className={darkMode ? "App-header-dark": "App-header"}>
      <ItemListContainer/>
    </div>
  )
}

export default ProductsContainer
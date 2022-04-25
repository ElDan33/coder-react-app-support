import { ShoppingCartIcon } from '@heroicons/react/outline'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext';



const CartWidget = ({legend}) => {
  
  const {cartItems} = useContext(CartContext);

    return (
      <>
          <Link to="/Cart" onClick={()=>window.scrollTo(0,0)} 
          className={cartItems !== 0 ? "relative flex justify-center focus:border-2 focus:rounded-full text-gray-400 hover:text-white" : "invisible" } 
          role="button"
          >
            
            <div className="bg-gray-800 p-4 relative inline-flex items-center rounded-full hover:bg-gray-700 hover:text-green-400">
              <ShoppingCartIcon className=" h-8 w-8" aria-hidden="true"/>

              {
                legend
                ? <p className="ml-2">{legend}</p>
                : <span className={cartItems !== 0 ? "absolute bottom-10 left-12 h-4 w-4" : "invisible"}>
                    <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 "></span>
                    <span className="absolute right-0 left-0 top-0.5 bottom-0 text-center text-white text-xs">{cartItems}</span>
                  </span>
              }
              
            </div>
          </Link>
      </>
      
    )
}

export default CartWidget

import { ShoppingCartIcon } from '@heroicons/react/outline'
import React from 'react'
import { Link } from 'react-router-dom'
import CartQuantity from './CartQuantity'


const CartWidget = ({classNames, cartNumber}) => {

    return (
      <>
          <Link to="/CheckOut" onClick={()=>window.scrollTo(0,0)} 
          className="relative flex justify-center focus:outline-none focus:ring-2 p-1 focus:ring-offset-2 p-1 focus:ring-offset-gray-800 focus:ring-white text-gray-400 hover:text-white" 
          role="button"
          >
          <div className="bg-gray-800 p-4 flex items-center rounded-full hover:bg-gray-700 hover:text-green-400">
            <p className="">{cartNumber}</p>
            <ShoppingCartIcon className=" h-6 w-6" aria-hidden="true"/>
            
          </div>
        </Link>
        {/* <CartQuantity /> */}
      </>
      
    )
}

export default CartWidget

import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'


const CheckOut = () => {

    const history = useNavigate();

    return (
        <div className="bg-orange-100">
            <div className="">
                <h1 className="text-white text-shadow-h1 text-2xl font-bold text-center">CHECKOUT</h1>
                <button onClick={()=>{history(-1)}}  className="text-white text-shadow-h1 text-2xl font-bold">⇠ Go Back </button>
                <div className=''>
                
                </div>
            </div>
        </div>
    )
}

export default CheckOut

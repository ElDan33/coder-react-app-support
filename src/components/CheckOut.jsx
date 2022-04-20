import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';


const CheckOut = () => {

    const {darkMode} = useContext(ThemeContext);
    const history = useNavigate();
    const {cart, cartItems, cartClear, removeFromCart, total, itemPresentation, presentationMultiplier} = useContext(CartContext);


    return (
        <>
            <div className={darkMode ? "App-header-dark w-screen h-screen": "App-header w-screen h-screen"}>
                <h1 className="pt-6 text-white text-shadow-h1 text-2xl font-bold text-center animate__animated animate__zoomIn">
                    CHECKOUT
                </h1>
                <button onClick={()=>{history(-1)}}  className="animate-bounce pl-2 text-white text-shadow-h1 text-2xl font-bold">⇠ Go Back </button>
                <div className="flex pt-10 animate__animated animate__flipInX">
                    <ul className="flex-col w-full rounded md:flex md:flex-col md:w-2/3">
                        <h3 className="text-center font-bold pb-6">BUY LIST</h3>
                        <div className="">
                                {cart.length === 0 ? null : <li className="flex text-center font-bold bg-orange-200"><span className="basis-1/5">PRODUCT</span><span className="basis-1/5">CATEGORY</span><span className="basis-1/5">PRESENTATION</span><span className="basis-1/6">PRICE</span><span className="basis-1/6">QUANT.</span><span className="basis-1/6">SUBT.</span></li>}
                                {
                                    cart.map((item, index)=>{
                                        let subtotal = (item?.item?.price * presentationMultiplier) * item?.item?.count;
                                        return(
                                            <li 
                                                key={item?.item?.id} 
                                                className={index % 2 === 0 ? "flex text-center bg-orange-50" : "flex text-center bg-orange-100"}
                                            >
                                                <span className="basis-1/5 ">{item?.item?.product}</span> 
                                                <span className="basis-1/4 ">{item?.item?.category}</span>
                                                <span className="basis-1/5 ">{item?.item?.presentation.find(e => e === itemPresentation)}</span>
                                                <span className="basis-1/6 ">$ {item?.item?.price * presentationMultiplier}</span>
                                                <span className="basis-1/5 ">{item?.item?.count}</span>
                                                <span className="basis-1/6 ">$ {subtotal}</span>
                                                    {/* <button 
                                                        className='' 
                                                        aria-label='Delete product' 
                                                        title='Delete product' 
                                                        onClick={()=>removeFromCart(item?.item?.id)}
                                                    >
                                                        <i className="bi bi-trash-fill"></i>
                                                    </button> */}
                                            </li>
                                        )
                                    })
                                }
                        </div>
                        {cart.length === 0
                            ?<li className="text-center font-bold text-3xl bg-orange-200">THERE'S NO PRODUCTS IN THE CART</li>
                            :<li className="text-center font-bold text-3xl bg-orange-200">TOTAL: $ {total}</li>
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default CheckOut

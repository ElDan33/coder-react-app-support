import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../context/CartContext';
import { ThemeContext } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke, faArrowLeftLong,faCartPlus, faSquareXmark, faSquareCheck, faTrash} from '@fortawesome/free-solid-svg-icons'
import CustomModal from './CustomModal';
import FinishBuyForm from './FinishBuyForm';
import OrderTicket from './OrderTicket';


const Cart = () => {

    const {cart, cartItems, cartClear, removeFromCart, pricePerPresentation, subTotal, total} = useContext(CartContext);
    const {darkMode} = useContext(ThemeContext);
    const history = useNavigate();
    const [isFinish, setIsFinish] = useState(false);
    const [wannaRemove, setWannaRemove] = useState(false);
    const [wannaClear, setWannaClear] = useState(false);
    const [orderTicket, setOrderTicket] = useState(false);
    const [orderCode, setOrderCode] = useState();

    const finishBuyHandler = () => {
        setIsFinish(true);
    }

    const clearCartHandler = () => {
        setWannaClear(true);
    }

    return (
        <>
            <div className={darkMode ? "App-header-dark w-screen lg:w-screen h-full md:h-full lg:h-screen pb-4": "App-header w-screen lg:w-screen h-full md:h-full lg:h-screen pb-4"}>
                {isFinish 
                    ? <FinishBuyForm isFinish={isFinish} setIsFinish={setIsFinish} setOrderTicket={setOrderTicket} setOrderCode={setOrderCode} /> 
                    : (
                        wannaClear
                            ? <CustomModal  wannaClear={wannaClear} setWannaClear={setWannaClear} cartClear={cartClear}/>
                            : (
                                wannaRemove
                                ? <CustomModal wannaRemove={wannaRemove} setWannaRemove={setWannaRemove} removeFromCart={removeFromCart}/>
                                : null
                                )
                        )
                }
                {orderTicket
                    ? <OrderTicket orderTicket={orderTicket} setOrderTicket={setOrderTicket} orderCode={orderCode} />
                    : null
                }

                <h1 className="pt-6 text-white text-shadow-h1 text-2xl font-bold text-center animate__animated animate__zoomIn">
                    CHECKOUT
                </h1>
                <div className="flex-col justify-evenly pt-10 animate__animated animate__flipInX lg:flex lg:flex-row ">
                    <ul className="flex-col  w-full rounded lg:flex lg:flex-col lg:w-2/3 lg:pl-8">
                        <h3 className="text-center font-bold pb-6">BUY LIST</h3>
                        <div className="text-sm lg:text-xl">
                                {cart.length === 0 ? null : <li className={darkMode ? "flex text-center font-bold rounded-t-lg bg-white " : "flex text-center font-bold rounded-t-lg bg-orange-200"}><span className="basis-1/5">PRODUCT</span><span className="basis-1/5">CATEGORY</span><span className="basis-1/5">PRESENTATION</span><span className="basis-1/6">PRICE</span><span className="basis-1/6">QUANT.</span><span className="basis-1/6">SUBT.</span></li>}
                                {   
                                    cart.map((item, index)=>{
                                        let subtotal = (
                                            subTotal
                                        );

                                        return(
                                            <li 
                                                key={item?.item?.id} 
                                                className={darkMode ? (index % 2 === 0 ? "flex text-center bg-gray-800 " : "flex text-center bg-gray-600") : (index % 2 === 0 ? "flex text-center bg-orange-50" : "flex text-center bg-orange-100")}
                                            >   
                                                <div className="flex flex-col w-1/6 ml-2 py-4">
                                                    <img src={item?.item?.image[0]} alt={item?.item?.product} className="rounded-md w-full"/>
                                                    <span className="basis-1/5">{item?.item?.product}</span> 
                                                </div>
                                                <span className="basis-1/4 mt-12 ">{item?.item?.category}</span>
                                                <span className="basis-1/5 mt-12 ">{item?.item?.itemPresentation}</span>
                                                <span className="basis-1/6 mt-12 ">
                                                    $ {pricePerPresentation[index]}
                                                </span>
                                                <span className="basis-1/6 mt-12 ">{item?.item?.count}</span>
                                                <span className="basis-1/6 mt-12 ">$ {subtotal[index]}</span>
                                                <button 
                                                        className="mb-4 pr-2" 
                                                        aria-label="Delete product"
                                                        title="Delete product" 
                                                        onClick={()=>removeFromCart(item?.item?.id)}
                                                    >
                                                        <FontAwesomeIcon className="text-red-600" icon={faTrash} />
                                                </button>    
                                            </li>
                                        )
                                    })
                                }
                        </div>
                        {cart.length === 0
                            ? <div className="w-full flex flex-col"><li className={darkMode ? "text-center font-bold text-3xl rounded-xl bg-gray-300 shadow-md shadow-white" : "text-center font-bold text-3xl rounded-xl bg-orange-200 shadow-md shadow-gray-400"}>THERE'S NO PRODUCTS IN THE CART</li> <button onClick={()=>{history("/")}} className="animate-bounce w-full pt-36 text-4xl text-center text-white text-shadow-h1"><FontAwesomeIcon className={darkMode ? "text-gray-400" : "text-black"} icon={faArrowLeftLong}/> GO BACK</button></div>
                            : <li className={darkMode ? "text-center font-bold text-lg lg:text-3xl rounded-b-xl bg-white shadow-md shadow-gray-400" : "text-center font-bold text-lg lg:text-3xl rounded-b-xl bg-orange-200 shadow-md shadow-gray-400"}>TOTAL: $ {(total.toFixed(1))}</li>
                        }
                    </ul>
                    <div className={darkMode ? "flex flex-col shadow-md shadow-white items-center border-2 p-4 mt-4 rounded-xl w-full mx-auto h-full lg:w-1/4" : "flex flex-col bg-orange-200 shadow-md shadow-gray-400 items-center border-2 p-4 mt-4 rounded-xl mx-auto w-full h-full lg:w-1/4 "}>
                        <h3 className="font-bold ">THIS BUY</h3>
                        <div className={darkMode ? "bg-white shadow-md shadow-black h-2 w-full mb-4 " : "bg-white h-2 w-full mb-4"}></div>
                        <div className="">
                            <div className="mb-8">
                                <p><FontAwesomeIcon icon={faCircleHalfStroke} /> Items: {cartItems}</p>
                                <p><FontAwesomeIcon icon={faCircleHalfStroke} /> Total: ${(total.toFixed(1))}</p>
                            </div>
                            <div className="flex flex-col items-start">
                                <button onClick={cart.length !== 0 ? clearCartHandler : null} className={darkMode ? "hover:bg-gray-600 p-2 rounded-xl" : "hover:bg-orange-50  p-2 rounded-xl"}>CLEAR CART <FontAwesomeIcon className="text-red-600" icon={faSquareXmark} /></button>
                                <Link to="/" onClick={()=>window.scrollTo(0,0)} className={darkMode ? "hover:bg-gray-600  p-2 rounded-xl" : "hover:bg-orange-50 p-2 rounded-xl"}>CONTINUE SHOPPING <FontAwesomeIcon className="text-cyan-400" icon={faCartPlus} /></Link>
                                <button onClick={cart.length !== 0 ? finishBuyHandler : null} className={darkMode ? "hover:bg-gray-600  p-2 rounded-xl" : "hover:bg-orange-50  p-2 rounded-xl"}>FINISH BUY <FontAwesomeIcon className="text-green-600" icon={faSquareCheck} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart

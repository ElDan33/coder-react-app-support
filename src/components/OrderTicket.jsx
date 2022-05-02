import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCopy} from '@fortawesome/free-solid-svg-icons' 

const OrderTicket = ({showModalHandler, orderTicket, setOrderTicket, orderCode}) => {

    const {cartClear} = useContext(CartContext);
    const [copiedMessage, setCopiedMessage] = useState(false);

    const orderTicketHandler = () => {
        setOrderTicket(false);
        setTimeout(()=>{
            cartClear();
            window.scrollTo(0, 0);
        }, 1000);
    }

    const copyTextHandler = () => {
        navigator.clipboard.writeText(orderCode);
        setCopiedMessage(true);
        console.log(copiedMessage);
        setTimeout(()=>{
            setCopiedMessage(false);
        }, 1000)
        
    }

    return (
        (orderTicket
            ? (
                <div className="fixed top-0 right-0 left-0 bottom-0 z-50 bg-gray-800 opacity-90 overscroll-auto lg:w-screen lg:h-screen lg:overscroll-auto">
                    <div className="animate__animated animate__fadeInDown block relative my-12 ml-24 w-2/3 h-68 p-2 py-8 bg-green-300 opacity-90 rounded-2xl font-mono lg:mx-auto lg:my-36 lg:w-1/3 ">
                        <p className="px-6 text-md w-fit rounded-xl cursor-pointer text-gray-500 hover:text-white hover:bg-green-600 text-shadow" onClick={showModalHandler}>x</p>
                        <h3 className="text-center mb-4">🎉Congratz!!🎉</h3>
                        <hr />
                        <p className="text-center my-4">- ORDER GENERATED -</p>
                        <p className="text-center mb-4">
                            Your order code is: 
                            <button 
                                onClick={copyTextHandler} 
                            >
                                <span className="text-white text-shadow-h1 underline">{orderCode}</span>
                                <FontAwesomeIcon className="text-black p-2 ml-2 border-2 border-solid rounded-lg hover:text-white" icon={faCopy}/>
                            </button>
                            {copiedMessage
                                ? <p className="font-bold text-green-800">Code copied in the clipboard!!</p>
                                : null
                            }
                        </p>
                        <button 
                            className="ml-80 mt-4 w-1/4 bg-green-600 rounded-lg text-white text-shadow-h1 hover:bg-green-700" 
                            onClick={orderTicketHandler}
                        >
                            OK
                        </button>
                    </div>
                </div>
            ) : null)
            
    )
}

export default OrderTicket
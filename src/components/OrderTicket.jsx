import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCopy} from '@fortawesome/free-solid-svg-icons' 

const OrderTicket = ({showModalHandler, orderTicket, setOrderTicket, orderCode}) => {

    const {cart, pricePerPresentation, subTotal, total,cartClear} = useContext(CartContext);
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
                <div className="fixed top-0 right-0 left-0 bottom-0 z-50 bg-gray-800 opacity-90 overscroll-auto w-full h-full lg:w-screen lg:h-screen lg:overscroll-auto">
                    <div className="animate__animated animate__fadeInDown block relative w-full mx-auto mt-16 h-68 p-2 py-8 bg-green-300 opacity-90 rounded-2xl font-mono md:w-2/3 md:ml-36 md:mt-20 lg:mx-auto lg:my-12 lg:w-1/2 ">
                        <p className="px-6 text-md w-fit rounded-xl cursor-pointer text-gray-500 hover:text-white hover:bg-green-600 text-shadow" onClick={showModalHandler}>x</p>
                        <h3 className="text-center mb-4">🎉Congratz!!🎉</h3>
                        <hr />
                        <p className="text-center my-4">- ORDER GENERATED -</p>
                        <p className="text-center mb-4">
                            Your order code is:  
                            <button 
                                onClick={copyTextHandler} 
                            >
                                <span className="text-white text-shadow-h1 underline"> {orderCode}</span>
                                <FontAwesomeIcon className="text-black p-2 ml-2 border-2 border-solid rounded-lg hover:text-white" icon={faCopy}/>
                            </button>
                            {copiedMessage
                                ? <p className="font-bold text-green-800">Code copied in the clipboard!!</p>
                                : null
                            }
                        </p>
                        <div className="flex flex-col justify-center w-full">
                            <table class="table-fixed border-2 border-solid border-white w-full">
                                <thead class="border-2 border-solid border-white">
                                    <tr>
                                        <th class="border-2 border-solid border-white lg:px-4 w-2/5 text-center">Prod.</th>
                                        <th class="border-2 border-solid border-white lg:px-4 w-1/5 text-center">Pres.</th>
                                        <th class="border-2 border-solid border-white lg:px-4 w-1/5 text-center">Quant.</th>
                                        <th class="border-2 border-solid border-white lg:px-4 w-1/5 text-center">Price</th>
                                        <th class="border-2 border-solid border-white lg:px-4 w-1/5 text-center">Subt.</th>
                                    </tr>
                                </thead>
                                <tbody class="border-2 border-solid border-white">
                                    {
                                        cart.map((item, index) => (
                                            <tr>
                                                <td class="border-2 border-solid border-white lg:px-4 ">{item?.item?.product}</td>
                                                <td class="border-2 border-solid border-white lg:px-4 text-center">{item?.item?.itemPresentation}</td>
                                                <td class="border-2 border-solid border-white lg:px-4 text-center">{item?.item?.count}</td>
                                                <td class="border-2 border-solid border-white lg:px-4 text-center">{Number(pricePerPresentation[index])}</td>
                                                <td class="border-2 border-solid border-white lg:px-4 text-center">{Number(subTotal[index])}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className="border-2 border-solid border-white text-center">
                                <p className="lg:text-center text-start font-bold">Total: {total}</p>
                            </div>
                        </div>                        
                        <button 
                            className="ml-2 mt-4 w-1/4 bg-green-600 rounded-lg text-white text-shadow-h1 hover:bg-green-700" 
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
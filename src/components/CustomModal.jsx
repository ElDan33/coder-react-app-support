import React, { useState } from 'react'

const CustomModal = ({
    item,
    itemId,
    isFinish, 
    wannaClear, 
    setWannaClear, 
    wannaRemove, 
    setWannaRemove, 
    removeFromCart, 
    cartClear
}) => {

    const [showModal, setShowModal] = useState(true);

    const showModalHandler = () => {
        setShowModal(true ? false : true);
    }

    const setWannaClearHandler = () => {
        setWannaClear(false);
    }

    const setWannaRemoveHandler = () => {
        setWannaRemove(false);
    }

    const removeFromCartAndSetWannaRemoveHandler = () => {
        removeFromCart(itemId);
        setWannaRemoveHandler()
    }

    const cartClearAndSetWannaClearHandler = () => {
        cartClear();
        setWannaClearHandler()
    }

    const finishBuyAndShowModalHandler = () => {
        showModalHandler();
        window.location.reload();
    }

    return (
        showModal 
        ? (
            <div className="fixed top-0 right-0 left-0 bottom-0 z-50 bg-gray-800 opacity-90 lg:absolute lg:w-screen lg:h-screen lg:overscroll-auto">
                <div className="animate__animated animate__fadeInDown block relative my-12 ml-24 w-2/3 h-68 p-2 bg-green-300 opacity-90 rounded-2xl font-mono lg:mx-auto lg:my-36 lg:w-1/3 ">
                    <p className="px-6 py-2 text-md w-fit rounded-xl cursor-pointer text-gray-500 hover:text-white hover:bg-green-600 text-shadow" onClick={showModalHandler}>x</p>
                    {wannaClear || wannaRemove
                        ? <h3 className="text-2xl mb-2 text-center text-white text-shadow-h1 ">🛑<span className=""> Confirm the action!! </span>🛑</h3>  
                        : <h3 className="text-3xl mb-2 text-center text-white text-shadow-h1 ">🎉<span className=""> Congratz!! </span>🎉</h3>}
                    <hr />
                    {/* {isFinish 
                        ? <p className="mt-12 px-4 text-2xl text-center text-gray-300 text-shadow-h1"> Your buying is in procces. Please wait...</p> 
                        : (wannaRemove 
                                ? <p className="mt-12 px-4 text-2xl text-center text-gray-300 text-shadow-h1">Are you sure about remove the product from the cart?</p>
                                : (wannaClear 
                                        ? <p className="mt-12 px-4 text-2xl text-center text-gray-300 text-shadow-h1">Are you sure about clear the cart?</p> 
                                        : <p className="mt-12 px-4 text-2xl text-center text-gray-300 text-shadow-h1">You just added <span className="font-bold">{item.product}</span> <br/> to the cart 🛒!!</p>
                                        )
                        )
                    } */}
                    {
                        (isFinish && <p className="mt-12 px-4 text-2xl text-center text-gray-300 text-shadow-h1"> Your buying is in procces. Please wait...</p>)
                        ||
                        (wannaRemove && <p className="mt-12 px-4 text-2xl text-center text-gray-300 text-shadow-h1">Are you sure about remove the product from the cart?</p>)
                        ||
                        (wannaClear && <p className="mt-12 px-4 text-2xl text-center text-gray-300 text-shadow-h1">Are you sure about clear the cart?</p> )
                        ||
                        <p className="mt-12 px-4 text-2xl text-center text-gray-300 text-shadow-h1">You just added <span className="font-bold">{item.product}</span> <br/> to the cart 🛒!!</p>
                    }
                    
                    {
                        // wannaClear 
                        //     ? <div className="flex justify-around pb-4 pt-8">
                        //         <button onClick={cartClearAndSetWannaClearHandler} className="bg-green-600 w-20 opacity-80 rounded-xl text-gray-300 text-shadow-h1 hover:bg-green-800">YES</button>
                        //         <button onClick={setWannaClearHandler} className="bg-red-600 w-20 opacity-80 rounded-xl text-gray-300 text-shadow-h1 hover:bg-red-800">NO</button>
                        //     </div>
                        //     : (isFinish 
                        //             ? <div className="flex justify-end">
                        //                 <button className=" mx-4 mt-12 mb-4 w-20 py-2 text-gray-500 text-xl  border-2 border-solid hover:bg-green-600 hover:text-white rounded-xl" onClick={finishBuyAndShowModalHandler}>OK</button>                        
                        //             </div>
                        //             : <div className="flex justify-end">
                        //                 <button className=" mx-4 mt-12 mb-4 w-20 py-2 text-gray-500 text-xl  border-2 border-solid hover:bg-green-600 hover:text-white rounded-xl" onClick={showModalHandler}>OK</button>                        
                        //             </div>
                        //         )
                        // isFinish
                        //     ? <div className="flex justify-end">
                        //         <button className=" mx-4 mt-12 mb-4 w-20 py-2 text-gray-500 text-xl  border-2 border-solid hover:bg-green-600 hover:text-white rounded-xl" onClick={finishBuyAndShowModalHandler}>OK</button>                        
                        //     </div>
                        //     : (
                        //         wannaRemove
                        //             ? <div className="flex justify-around pb-4 pt-8">
                        //                 <button onClick={removeFromCartAndSetWannaRemoveHandler} className="bg-green-600 w-20 opacity-80 rounded-xl text-gray-300 text-shadow-h1 hover:bg-green-800">YES</button>
                        //                 <button onClick={setWannaRemoveHandler} className="bg-red-600 w-20 opacity-80 rounded-xl text-gray-300 text-shadow-h1 hover:bg-red-800">NO</button>
                        //             </div>
                        //             : (
                        //                 wannaClear
                        //                     ? <div className="flex justify-around pb-4 pt-8">
                        //                         <button onClick={cartClearAndSetWannaClearHandler} className="bg-green-600 w-20 opacity-80 rounded-xl text-gray-300 text-shadow-h1 hover:bg-green-800">YES</button>
                        //                         <button onClick={setWannaClearHandler} className="bg-red-600 w-20 opacity-80 rounded-xl text-gray-300 text-shadow-h1 hover:bg-red-800">NO</button>
                        //                     </div>
                        //                     : <div className="flex justify-end">
                        //                         <button className=" mx-4 mt-12 mb-4 w-20 py-2 text-gray-500 text-xl  border-2 border-solid hover:bg-green-600 hover:text-white rounded-xl" onClick={showModalHandler}>OK</button>                        
                        //                     </div>
                        //             )
                        //     )
                        (isFinish && 
                            <div className="flex justify-end">
                                <button className=" mx-4 mt-12 mb-4 w-20 py-2 text-gray-500 text-xl  border-2 border-solid hover:bg-green-600 hover:text-white rounded-xl" onClick={finishBuyAndShowModalHandler}>OK</button>                        
                        </div>)
                        ||
                        (wannaRemove &&
                            <div className="flex justify-around pb-4 pt-8">
                                <button onClick={removeFromCartAndSetWannaRemoveHandler} className="bg-green-600 w-20 opacity-80 rounded-xl text-gray-300 text-shadow-h1 hover:bg-green-800">YES</button>
                                <button onClick={setWannaRemoveHandler} className="bg-red-600 w-20 opacity-80 rounded-xl text-gray-300 text-shadow-h1 hover:bg-red-800">NO</button>
                            </div>)
                        ||(wannaClear &&
                            <div className="flex justify-around pb-4 pt-8">
                                <button onClick={cartClearAndSetWannaClearHandler} className="bg-green-600 w-20 opacity-80 rounded-xl text-gray-300 text-shadow-h1 hover:bg-green-800">YES</button>
                                <button onClick={setWannaClearHandler} className="bg-red-600 w-20 opacity-80 rounded-xl text-gray-300 text-shadow-h1 hover:bg-red-800">NO</button>
                            </div>)
                        ||
                        <div className="flex justify-end">
                            <button className=" mx-4 mt-12 mb-4 w-20 py-2 text-gray-500 text-xl  border-2 border-solid hover:bg-green-600 hover:text-white rounded-xl" onClick={showModalHandler}>OK</button>                        
                        </div>
                    }
                    
                </div>
                
            </div>
        )
        :null
        
    )
}

export default CustomModal

import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext';
import {collection, getFirestore, addDoc} from 'firebase/firestore';
import { ThemeContext } from '../context/ThemeContext';

const FinishBuyForm = ({isFinish, setIsFinish, setOrderTicket, setOrderCode}) => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [adress, setAdress] = useState("");
    const [phone, setPhone] = useState();
    const [orderLoading, setOrderLoading] = useState(false);
    const {cart, pricePerPresentation,subTotal,total} = useContext(CartContext);
    const {darkMode} = useContext(ThemeContext);

    /**
     * If isFinish is true, set it to false, otherwise set it to true.
     */
    const showModalHandler = () => {
        setIsFinish(true ? false : true);
    }

    /**
     * It returns a string that is the current date and time in the format of YYYY-MM-DD HH:MM:SS.
     * @returns A string with the date and time.
     */
    const getDate = ()=>{
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

        return(date+' '+time);
    }

    const finishBuy = (e) => {
        e.preventDefault();
        let userOrder = {
            buyer: {fullName, email, adress, phone},
            items: {...cart.map((item, index) => (
                {
                    id: item?.item?.id, 
                    product: item?.item?.product, 
                    price: Number(pricePerPresentation[index]),
                    quantity: item?.item?.count, 
                    presentation: item?.item?.itemPresentation,
                    itemTotal: Number(subTotal[index])
                }
            ))},
            date: getDate(),
            total: {total}
        }
        console.log(userOrder);
        const db = getFirestore();
        const ordersCollection = collection(db, "userOrder");

        setOrderLoading(true);

        addDoc(ordersCollection, userOrder).then(({id})=>{
            console.log(id);
            setOrderCode(id);

        }).finally(()=>{
            setOrderLoading(false);
            setIsFinish(false);
            setOrderTicket(true);
        });
        
    }

    return (
        <>  
            {isFinish
                ? (
                    (<div className="fixed top-0 right-0 left-0 bottom-0 z-50 bg-gray-800 opacity-90 overscroll-auto lg:w-screen lg:h-screen lg:overscroll-auto">
                        <div className="animate__animated animate__fadeInDown block relative my-12 ml-24 w-2/3 h-68 p-2 bg-green-300 opacity-90 rounded-2xl font-mono lg:mx-auto  lg:w-1/3">
                            <p className="px-6 py-2 text-md w-fit rounded-xl cursor-pointer text-gray-500 hover:text-white hover:bg-green-600 text-shadow" onClick={showModalHandler}>x</p>
                            <p className="text-center mb-4">We're almost done...</p>
                            <hr />
                            <div className="flex flex-col p-4 h-screen lg:h-full">
                                {orderLoading 
                                    ? (
                                        <div className="flex flex-col items-center justify-center w-full h-full py-16">
                                            <h1 className="mb-12  text-white text-shadow-h1">
                                                Proccesing the order...
                                            </h1>
                                            {/*** Spinner ***/}
                                            <svg role="status" className="mr-2 w-36 h-36 text-gray-200 animate-spin dark:text-gray-200 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                        </div> 
                                    ) 
                                    : (
                                        <div className="flex flex-col p-4 h-screen lg:h-full">
                                            <label htmlFor="firstName"/>Full Name
                                            <input className= {darkMode ? "text-black px-2 mb-4 rounded-lg" : "px-2 mb-4 rounded-lg"} type="text" name="fullName" id="" value={fullName} onChange={(e) => setFullName(e.currentTarget.value)} placeholder="Full Name..." />
                                            <label htmlFor="email"/>E-mail
                                            <input className= {darkMode ? "text-black px-2 mb-4 rounded-lg" : "px-2 mb-4 rounded-lg"} type="text" name="email" id="" value={email} onChange={(e) => setEmail(e.currentTarget.value)} placeholder="E-mail..." />
                                            <label htmlFor="firstName"/>Adress
                                            <input className= {darkMode ? "text-black px-2 mb-4 rounded-lg" : "px-2 mb-4 rounded-lg"} type="text" name="adress" id="" value={adress} onChange={(e) => setAdress(e.currentTarget.value)} placeholder="Adress..." />
                                            <label htmlFor="phone"/>Phone
                                            <input className= {darkMode ? "text-black px-2 mb-8 rounded-lg" : "px-2 mb-4 rounded-lg"} type="number" name="phone" id="" value={phone} onChange={(e) => setPhone(e.currentTarget.value)} placeholder="Phone..." />
                                            <button className="bg-green-600 rounded-lg text-white text-shadow-h1 hover:bg-green-700" onClick={finishBuy}>Send Order</button>
                                        </div>
                                    )
                                } 
                                
                            </div>
                        </div>
                    </div>) 
                )
                : null
            }
            
        </>
    )
}

export default FinishBuyForm
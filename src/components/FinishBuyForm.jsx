import React, { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext';
import {collection, getFirestore, serverTimestamp, addDoc} from 'firebase/firestore';
import { ThemeContext } from '../context/ThemeContext';
import {useForm} from 'react-hook-form'
import Loader from './Loader';

const FinishBuyForm = ({isFinish, setIsFinish, setOrderTicket, setOrderCode}) => {

    const {cart, pricePerPresentation,subTotal,total} = useContext(CartContext);
    const {darkMode} = useContext(ThemeContext);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [adress, setAdress] = useState("");
    const [phone, setPhone] = useState("");
    const [orderLoading, setOrderLoading] = useState(false);
    const {register, handleSubmit, formState: { errors }} = useForm();

    /**
     * If isFinish is true, set it to false, otherwise set it to true.
     */
    const showModalHandler = () => {
        setIsFinish(true ? false : true);
    }

    const finishBuy = (data) => {
                
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
            date: serverTimestamp(),
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
                        <div className="animate__animated animate__fadeInDown block relative my-12 ml-24 h-68 p-2 bg-green-300 opacity-90 rounded-2xl font-mono lg:mx-auto lg:w-1/3">
                            <p className="px-6 py-2 text-md w-fit rounded-xl cursor-pointer text-gray-500 hover:text-white hover:bg-green-600 text-shadow" onClick={showModalHandler}>x</p>
                            <p className="text-center mb-4">We're almost done...</p>
                            <hr />
                            <div className="flex flex-col p-4 h-screen lg:w-full lg:h-full">
                                {orderLoading 
                                    ? (
                                        <Loader text={"Proccessing your order..."} orderLoading={orderLoading}/>) 
                                    : (
                                        <form onSubmit={handleSubmit(finishBuy)} className="flex flex-col p-4 h-screen lg:h-full">
                                            <label htmlFor="fullName"/>Full Name
                                            <input type="text" {...register("fullName", {required:true, pattern: /^[A-Za-z]+\s[A-Za-z]+$/i})} className= {darkMode ? "text-black px-2 mb-4 rounded-lg" : "px-2 mb-4 rounded-lg"} placeholder="Peter Parker" onChange={(e)=> setFullName(e.target.value)}/>
                                                {errors?.fullName?.type === "required" && <p className="text-red-500 text-md">This field is required.</p>}
                                                {errors?.fullName?.type === "pattern" && <p className="text-red-500 text-md">Incorrect format. E.g: Peter Parker.</p>}
                                            
                                            <label htmlFor="email"/>E-mail
                                            <input type="text" {...register("email", {required:true, pattern: /^\S+@\S+\.[a-z]{2,3}$/})} className= {darkMode ? "text-black px-2 mb-4 rounded-lg" : "px-2 mb-4 rounded-lg"} placeholder="mymail@mail.com" onChange={(e)=> setEmail(e.target.value)}/>
                                                {errors?.email?.type === "required" && <p className="text-red-500 text-md">This field is required.</p>}
                                                {errors?.email?.type === "pattern" && <p className="text-red-500 text-md">Incorrect e-mail format. E.g.: mymail@mail.com.</p>}
                                            
                                            <label htmlFor="adress"/>Adress
                                            <input type="text" {...register("adress", {required:true, pattern: /^\d+\s[A-z]+\s[A-z]+/g})} className= {darkMode ? "text-black px-2 mb-4 rounded-lg" : "px-2 mb-4 rounded-lg"} placeholder="789 My Street" onChange={(e)=> setAdress(e.target.value)}/>
                                                {errors?.adress?.type === "required" && <p className="text-red-500 text-md">This field is required.</p>}
                                                {errors?.adress?.type === "pattern" && <p className="text-red-500 text-md">Incorrect adress format. E.g.: 1234 My Street.</p>}
                                            
                                            <label htmlFor="phone"/>Phone
                                            <input type="text" {...register("phone", {required:true, pattern: /^[+]*[(]{0,1}[0-9]{1,4}\s[)]{0,1}[\s/0-9]{0,12}$/g})} className= {darkMode ? "text-black px-2 mb-4 rounded-lg" : "px-2 mb-4 rounded-lg"} placeholder="+xx xxx-xxxxxxx" onChange={(e)=> setPhone(e.target.value)}/>
                                                {errors?.phone?.type === "required" && <p className="text-red-500 text-md">This field is required.</p>}
                                                {errors?.phone?.type === "pattern" && <p className="text-red-500 text-md">Incorrect phone format. E.g.: +xx xxx-xxxxxxx</p>}
                                            
                                            <input type="submit" value="Send" className="bg-green-600 rounded-lg text-white text-shadow-h1 hover:bg-green-700"/> 
                                        </form>
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
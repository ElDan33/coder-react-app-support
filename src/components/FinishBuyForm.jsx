import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartContext';
import {collection, getFirestore, serverTimestamp, addDoc, doc, getDoc, writeBatch} from 'firebase/firestore';
import { ThemeContext } from '../context/ThemeContext';
import {useForm} from 'react-hook-form'
import Loader from './Loader';

const FinishBuyForm = ({isFinish, setIsFinish, setOrderTicket, setOrderCode}) => {

    const {cart, presentationQuantity,pricePerPresentation,subTotal,total} = useContext(CartContext);
    const {darkMode} = useContext(ThemeContext);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [adress, setAdress] = useState("");
    const [phone, setPhone] = useState("");
    const [itemList, setItemList] = useState([]);
    const [orderLoading, setOrderLoading] = useState(false);
    const {register, handleSubmit, formState: { errors }} = useForm();

    /**
     * If isFinish is true, set it to false, otherwise set it to true.
     */
    const showModalHandler = () => {
        setIsFinish(true ? false : true);
    }

    let userOrder = {
        buyer: {fullName, email, adress, phone},
        itemList: itemList,
        date: serverTimestamp(),
        total: {total}
    }

    const finishBuy = (data) => {

        console.log(userOrder);
        const db = getFirestore();
        const ordersCollection = collection(db, "userOrder");
        const orderBatch = writeBatch(db);
        setOrderLoading(true);

        itemList.forEach((item, index) => {
            let orderDoc = doc(db, "productsList", String(item.id));
            let prevStock = 0;

            getDoc(orderDoc).then(snapshot =>{
                if(snapshot.exists()){
                    if(snapshot.data().stock){
                        prevStock = snapshot.data().stock;
                    }
                }
                let stockToNumber = Number(prevStock.substring(0,2));
                let stockToString;
                if(prevStock.includes("units")){
                    stockToString = ((stockToNumber - item.quantity).toString());
                    stockToString += " units";
                } else if(prevStock.includes("kg")){
                    stockToString = ((stockToNumber - ((presentationQuantity * item.quantity))/1000).toString());
                    stockToString += " kg";
                }
                let newStock = stockToString;

                orderBatch.update(orderDoc, { stock: newStock });

            }).then(()=>{
                if (itemList[index] === itemList[itemList.length - 1]) {
                    orderBatch.commit();

                    addDoc(ordersCollection, userOrder)
                    .then(({ id }) => {
                        setOrderCode(id);
                        window.scrollTo(0, 0);
                    })
                    .catch(err => console.log("Error sending order: " + err))
                    .finally(()=>{
                        setOrderLoading(false);
                        setIsFinish(false);
                        setOrderTicket(true);
                    })
                }
            })
        })
    }

    useEffect(() => {
        const cartList = cart.map((item, index) => {
            return {
                id: item?.item?.id, 
                product: item?.item?.product, 
                price: Number(pricePerPresentation[index]),
                quantity: item?.item?.count, 
                presentation: item?.item?.itemPresentation,
                itemTotal: Number(subTotal[index])
            }
        })
    
        setItemList(cartList);
    }, [cart]);

    return (
        <>  
            {isFinish
                ? (
                    (<div className="fixed top-0 right-0 left-0 bottom-0 z-50 bg-gray-800 opacity-90 overscroll-auto w-full h-full lg:w-screen lg:h-screen lg:overscroll-auto">
                        <div className="animate__animated animate__fadeInDown block relative w-3/4 mx-auto mt-16 sm:ml-42 md:ml-36 md:mt-20 h-68 p-2 bg-green-300 opacity-90 rounded-2xl font-mono lg:mx-auto lg:mt-12 lg:w-1/3">
                            <p className="px-6 py-2 text-md w-fit rounded-xl cursor-pointer text-gray-500 hover:text-white hover:bg-green-600 text-shadow" onClick={showModalHandler}>x</p>
                            <p className="text-center mb-4">We're almost done...</p>
                            <hr />
                            <div className="flex flex-col sm:align-start p-4 sm:h-full sm:w-full lg:w-full lg:h-full">
                                {orderLoading 
                                    ? (
                                        <Loader text={"Proccessing your order..."} orderLoading={orderLoading}/>) 
                                    : (
                                        <form onSubmit={handleSubmit(finishBuy)} className={"flex flex-col lg:p-4 lg:h-full"}>
                                            <label htmlFor="fullName"/>Full Name
                                            <input type="text" {...register("fullName", {required:true, pattern: /^[A-Za-z]+\s[A-Za-z]+$/i})} className= {darkMode ? (errors?.fullName ? "text-black px-2 mb-2 rounded-lg border-2 border-solid border-red-600" :"text-black px-2 mb-2 rounded-lg") : "px-2 mb-2 rounded-lg"} placeholder="Peter Parker" onChange={(e)=> setFullName(e.target.value)}/>
                                                {errors?.fullName?.type === "required" && <p className="text-red-500 text-sm">This field is required.</p>}
                                                {errors?.fullName?.type === "pattern" && <p className="text-red-500 text-sm">Incorrect format.</p>}
                                            
                                            <label htmlFor="email"/>E-mail
                                            <input type="text" {...register("email", {required:true, pattern: /^\S+@\S+\.[a-z]{2,3}$/})} className= {darkMode ? (errors?.email ? "text-black px-2 mb-2 rounded-lg border-2 border-solid border-red-600" :"text-black px-2 mb-2 rounded-lg") : "px-2 mb-2 rounded-lg"} placeholder="mymail@mail.com" onChange={(e)=> setEmail(e.target.value)}/>
                                                {errors?.email?.type === "required" && <p className="text-red-500 text-sm">This field is required.</p>}
                                                {errors?.email?.type === "pattern" && <p className="text-red-500 text-sm">Incorrect e-mail format.</p>}
                                            
                                            <label htmlFor="adress"/>Adress
                                            <input type="text" {...register("adress", {required:true, pattern: /^\d+\s[A-z]+\s[A-z]+/g})} className= {darkMode ? (errors?.adress ? "text-black px-2 mb-2 rounded-lg border-2 border-solid border-red-600" :"text-black px-2 mb-2 rounded-lg") : "px-2 mb-2 rounded-lg"} placeholder="789 My Street" onChange={(e)=> setAdress(e.target.value)}/>
                                                {errors?.adress?.type === "required" && <p className="text-red-500 text-sm">This field is required.</p>}
                                                {errors?.adress?.type === "pattern" && <p className="text-red-500 text-sm">Incorrect adress format.</p>}
                                            
                                            <label htmlFor="phone"/>Phone
                                            <input type="text" {...register("phone", {required:true, pattern: /^[+]*[(]{0,1}[0-9]{1,4}\s[)]{0,1}[\s/0-9]{0,12}$/g})} className= {darkMode ? (errors?.phone ? "text-black px-2 mb-2 rounded-lg border-2 border-solid border-red-600" : "text-black px-2 mb-2 rounded-lg") : "px-2 mb-2 rounded-lg"} placeholder="+xx xxx-xxxxxxx" onChange={(e)=> setPhone(e.target.value)}/>
                                                {errors?.phone?.type === "required" && <p className="text-red-500 text-sm">This field is required.</p>}
                                                {errors?.phone?.type === "pattern" && <p className="text-red-500 text-sm">Incorrect phone format.</p>}
                                            
                                            <input type="submit" value="Send" className="bg-green-600 mt-4 rounded-lg text-white text-shadow-h1 hover:bg-green-700"/> 
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
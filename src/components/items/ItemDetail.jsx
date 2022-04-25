import { EmojiHappyIcon } from '@heroicons/react/outline';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../context/CartContext';
import { ThemeContext } from '../../context/ThemeContext';
import CartWidget from '../CartWidget';
import CustomModal from '../CustomModal';
import ItemCount from './ItemCount'

const ItemDetail = ({item}) => {

    const {darkMode} = useContext(ThemeContext);

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [count, setCount] = useState(0);
    const [countStock, setCountStock] = useState(item.stock);
    const [isAdd, setIsAdd] = useState(false);
    const [continueCheckout, setContinueCheckout] = useState(false);

    let stockToNumber = Number(countStock.substring(0,2));
    let stockToString;

    const history = useNavigate();
    const {addToCart, onItemPresentationChange, itemPresentation} = useContext(CartContext);
    
    const countIncrease = () => {
        if(count < (stockToNumber*1000) && item.product !== "Caramel Cookies"){
            setCount(count+1);
        }else if(item.product === "Caramel Cookies" && count < stockToNumber){
            setCount(count+1);
        }
    }

    const countDecrease = () => {
        if(count > 0){
            setCount(count-1);
        }
    }

    const addCartHandler = () => {
        setIsAdd(true);
        window.scrollTo(0,0)
        if(stockToNumber > 0){
            if(item.stock.includes("units")){
                stockToString = ((stockToNumber - count).toString());
                stockToString += " units";
            } else if(item.stock.includes("kg")){
                stockToString = ((stockToNumber - ((totalQuantity * count))/1000).toString());
                stockToString += " kg";
            }
            setCountStock(stockToString);
            setCount(0);
        }
        addToCart({...item, count, itemPresentation});
        setContinueCheckout(true);
    }

    const totalPriceHandler = (e) =>{
        onItemPresentationChange(e)
        if(e.target.value === "Options"){
            setTotalPrice(0);
            setTotalQuantity(0);
        }else if(e.target.value === "100g"){
            setTotalPrice(item.price);
            setTotalQuantity(100);
        }else if(e.target.value === "250g" && item.presentation.length === 1){
            setTotalPrice(item.price);
            setTotalQuantity(250);
        }else if(e.target.value === "250g" && item.presentation.length >1){
            setTotalPrice(item.price * 2.5);
            setTotalQuantity(250);
        }else if(e.target.value === "500g" && item.presentation.length === 1){
            setTotalPrice(item.price);
            setTotalQuantity(500);
        }else if(e.target.value === "500g" && item.presentation.length > 1){
            setTotalPrice(item.price * 5);
            setTotalQuantity(500);
        }else{
            setTotalPrice(item.price);
            setTotalQuantity(12);
        }
    }

    return (
        <div className="pt-6 pb-12">
            {isAdd ? <CustomModal totalQuantity={totalQuantity} count={count} item={item}/> : null}
            <button 
                onClick={()=>{history(-1); window.scrollTo(0,0)}}  
                className="animate-bounce mb-4 text-white text-shadow-h1 text-2xl font-bold ml-4"
            >
                ⇠ Go Back 
            </button>
            <div className="flex flex-col items-center w-screen lg:flex lg:flex-row lg:items-start lg:justify-evenly lg:w-screen">
                <div 
                    className={
                        darkMode 
                        ?  "animate__animated animate__slideInLeft bg-transparent w-5/6 lg:w-1/2 lg:h-2/3 border border-2-solid rounded-3xl" 
                        : "animate__animated animate__slideInLeft bg-orange-200  w-5/6 lg:w-1/2 lg:h-2/3 border border-2-solid rounded-3xl"}
                >
                    <img src={item.image} alt={item.product} className="w-full h-96 border border-2-solid rounded-t-3xl"></img>
                    
                    <h3 className="mt-6 p-2 mb-6 underline text-center text-white text-shadow-h1 text-lg">Description</h3>
                    <p className="mb-12 p-2 text-center text-white text-shadow-h1 text-lg">{item.description}</p>

                </div>
                <div 
                    className={
                        darkMode 
                        ? "animate__animated animate__slideInRight bg-transparent text-center flex flex-col justify-between w-5/6 mt-4 mb-4 lg:w-1/3 lg:mt-0 lg:mb-0 lg:h-full border border-2-solid rounded-3xl " 
                        : "animate__animated animate__slideInRight bg-orange-200 text-center flex flex-col justify-between w-5/6 mt-4 mb-4 lg:w-1/3 lg:mt-0 lg:mb-0 lg:h-full border border-2-solid rounded-3xl "}
                >
                    <div className="flex flex-col text-2xl p-2 mt-12">
                        <h2 className="pb-2 text-2xl text-white text-shadow-h1"><span className="font-bold">Product: </span>{item.product}</h2>
                        <h3 className="pb-6 text-2xl text-white text-shadow-h1"><span className="font-bold">Category: </span>{item.category}</h3>
                        <div className="pb-6 text-2xl text-white text-shadow-h1">
                            <span className="font-bold">Presentation: </span>
                            <select 
                                onChange={totalPriceHandler} 
                                className="pr-2 text-2xl text-green-400 text-shadow-h1 bg-cyan-100 border-2 border-solid border-cyan-400 rounded" 
                                name="Presentation"
                            >
                                <option id="default" className="text-green-400" value="Options">Options</option>
                                {item.presentation.map((e,i)=><option key={i}  className="text-green-400" value={e}>{e}</option>)}
                            </select>
                        </div>
                        <div className="text-3xl mt-20 mb-12">  
                            <span className="font-bold text-white text-shadow-h1">Price: </span> <span className="text-green-400 text-shadow-h1">$ {totalPrice}</span>
                        </div>
                    </div>
                    <div className="text-2xl">
                        {
                            continueCheckout
                            ?null
                            :<div className="animate__animated animate__bounceIn">
                                <ItemCount
                                    count = {count}
                                    stockToNumber = {stockToNumber}
                                    countIncrease = {countIncrease}
                                    countDecrease = {countDecrease}
                                    addCartHandler = {addCartHandler}
                                    countStock = {countStock}            
                                />
                            </div>
                        }
                        
                        {
                            continueCheckout
                            ?<div className="animate__animated animate__bounceIn flex-col  text-center w-full border border-2 rounded-b-3xl bg-amber-50 p-4">
                                            <h3 className="text-green-400 mb-4">Products added to the Cart!</h3>
                                            <div className="">
                                                <div className="relative flex justify-center text-gray-400 hover:text-green-400">
                                                    <CartWidget legend={"Go to the Check-Out"} />
                                                </div>
                                                <div className="relative flex justify-center">
                                                    <button 
                                                        onClick={()=>{setContinueCheckout(false); setIsAdd(false)}} 
                                                        className="bg-gray-800 p-4 mt-2 flex items-center rounded-full hover:bg-gray-700 text-gray-400 hover:text-green-400"
                                                    >
                                                        <EmojiHappyIcon className="mr-2 w-8 h-8"/>
                                                        Continue shopping
                                                    </button>
                                                </div>
                                            </div>
                            </div>
                            :null
                        }
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ItemDetail
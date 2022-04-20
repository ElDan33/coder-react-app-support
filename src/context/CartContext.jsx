import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext();

const CartContextProvider = ({children}) => {

    const [cart, setCart] = useState([]);
    const [cartItems, setCartItems] = useState(0);
    const [total, setTotal] = useState(0);
    const [itemPresentation, setItemPresentation] = useState("");


    const onItemPresentationChange = (e) => {
        setItemPresentation(e.target.value);
        console.log(itemPresentation);
    }

    const presentationMultiplier = (itemPresentation === "100g" ? 1 : (itemPresentation === "250g") ? 2.5 : 5);
    

    const addToCart = (item)=>{

        const itemIndex = cart.findIndex(product=>product.item.id === item.id);
        if(itemIndex !== -1){
            const newCart = [...cart];
            newCart[itemIndex].item.count += item.count;
            setCart(newCart);
        } else{
            setCart([...cart, {item}])
        }
    }

    const removeFromCart = (id)=>{
        setCart(cart.filter(item=> item.item.id !== id));
    }

    const cartClear = ()=>{
        setCart([]);
    }

    useEffect(()=>{
        setCartItems(cart.reduce((total, item)=>total+=item.item.count, 0));
        
        setTotal(cart.reduce((total, item)=>total+=(
            item?.item?.price * item?.item?.count * presentationMultiplier), 0));
    }, [cart, itemPresentation, presentationMultiplier])

    return (
        <>
            <CartContext.Provider value={{cart, cartItems, total, cartClear, addToCart, removeFromCart, itemPresentation, onItemPresentationChange, presentationMultiplier}}>
                {children}
            </CartContext.Provider>
        </>
    )
}

export default CartContextProvider

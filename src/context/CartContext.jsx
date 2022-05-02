import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext();

const CartContextProvider = ({children}) => {

    const [cart, setCart] = useState([]);
    const [cartItems, setCartItems] = useState(0);
    const [itemPresentation, setItemPresentation] = useState("");
    const [pricePerPresentation, setPricePerPresentation] = useState();
    const [subTotal, setSubTotal] = useState();
    const [total, setTotal] = useState(0);

    
    const onItemPresentationChange = (e) => {
        setItemPresentation(e.target.value);

    }

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

        setPricePerPresentation(cart.map(item => (
            item?.item?.itemPresentation === "250g" && item?.item?.presentation.length === 1
                ? item?.item?.price * 1 
                : (item?.item?.itemPresentation === "250g" && item?.item?.presentation.length > 1 
                    ? item?.item?.price * 2.5  
                    : (item?.item?.itemPresentation === "500g" && item?.item?.presentation.length === 1 
                        ? item?.item?.price * 1  
                        : ( item?.item?.itemPresentation === "500g" && item?.item?.presentation.length > 1 
                            ? item?.item?.price * 5  
                            : item?.item?.price * 1 
                        )
                    )
                )
        ).toFixed(1)))

        setSubTotal(cart.map(item =>(
            item?.item?.itemPresentation === "250g" && item?.item?.presentation.length === 1
                ? item?.item?.price * 1 * item?.item?.count
                : (item?.item?.itemPresentation === "250g" && item?.item?.presentation.length > 1 
                    ? item?.item?.price * 2.5 * item?.item?.count 
                    : (item?.item?.itemPresentation === "500g" && item?.item?.presentation.length === 1 
                        ? item?.item?.price * 1 * item?.item?.count 
                        : ( item?.item?.itemPresentation === "500g" && item?.item?.presentation.length > 1 
                            ? item?.item?.price * 5 * item?.item?.count 
                            : item?.item?.price * 1 * item?.item?.count
                        )
                    )
                )
        ).toFixed(1)))

        setTotal(cart.reduce((total, item)=>total+=(
            item?.item?.itemPresentation === "250g" && item?.item?.presentation.length === 1 
                ? item?.item?.price * 1 * item?.item?.count 
                : (item?.item?.itemPresentation === "250g" && item?.item?.presentation.length > 1 
                    ? item?.item?.price * 2.5 * item?.item?.count 
                    : (item?.item?.itemPresentation === "500g" && item?.item?.presentation.length === 1 
                        ? item?.item?.price * 1 * item?.item?.count 
                        : ( item?.item?.itemPresentation === "500g" && item?.item?.presentation.length > 1 
                            ? item?.item?.price * 5 * item?.item?.count 
                            : item?.item?.price * 1 * item?.item?.count
                        )
                    )
                )
            ), 0));

    }, [cart])

    return (
        <>
            <CartContext.Provider 
                value={{
                    cart, 
                    cartItems, 
                    itemPresentation,  
                    onItemPresentationChange, 
                    pricePerPresentation, 
                    subTotal, 
                    total, 
                    cartClear, 
                    addToCart, 
                    removeFromCart
                }}
            >
                {children}
            </CartContext.Provider>
        </>
    )
}

export default CartContextProvider

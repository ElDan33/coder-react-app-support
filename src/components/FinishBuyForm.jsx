import React, { useState } from 'react'

const FinishBuyForm = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState();

    // const finishBuy = () => {
    //     let userBuy = {
    //         buyer: {name, email, phone},
    //         items: [{id, title, price}], *** Aquí va el carro desde el Context : cont [cart, total] = useContext(CartContext)***
    //         total: 100
    //     }
    // }

    return (
        <>
            <form action="">
                <label htmlFor=""/>
                <input type="text" name="name" id="" value={name} onChange={(e) => setName(e.currentTarget.value)}/>
                <label htmlFor=""/>
                <input type="text" name="email" id="" value={email} onChange={(e) => setEmail(e.currentTarget.value)}/>
                <label htmlFor=""/>
                <input type="number" name="phone" id="" value={phone} onChange={(e) => setPhone(e.currentTarget.value)}/>
                <button onClick={()=>alert(`${name} Su compra se ha confirmado.`)}>BUY</button>
            </form>
        </>
    )
}

export default FinishBuyForm
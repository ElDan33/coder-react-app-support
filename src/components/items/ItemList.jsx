import React from 'react'
import Item from './Item'


const ItemList = ({items, productName, productFiltered, error}) => {

    return (
        <>  
            {productName ? <h3 className="text-white text-shadow-h1 text-center">Your search: {(productName)}</h3>: null}
            <div className={"flex justify-around flex-wrap"}>    
                {
                    error
                        ? (<p className="text-red-600 font-bold mt-12">Product not found!! Try again.</p>)
                        : (
                            productName
                                ? productFiltered.map(p => (
                                    <Item 
                                        key={p.id}
                                        id={p.id}
                                        category={p.category}
                                        product={p.product}
                                        price={p.price}
                                        presentation={p.presentation}
                                        stock={p.stock}
                                        image={p.image}
                                    />
                                ))
                                : (
                                    items.map((p) => (
                                        <Item
                                            key={p.id}
                                            id={p.id}
                                            category = {p.category}
                                            product={p.product}
                                            price={p.price}
                                            presentation={p.presentation}
                                            stock={p.stock}
                                            image={p.image}
                                        />
                                        ))
                                )
                        )
                }
            </div>
        </>        
    )
}

export default ItemList

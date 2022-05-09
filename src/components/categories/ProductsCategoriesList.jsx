import React from 'react'
import Item from '../items/Item'


const ProductsCategoriesList = ({items}) => {

    return (
        items.map(p => (
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
}

export default ProductsCategoriesList
import React from 'react'
import { Link } from 'react-router-dom';


const Item = ({id, category, product, image}) => {

    return (
        <div className="animate__animated animate__flipInX opacity-90 hover:opacity-100 hover:border-green-300 hover:border-6 flex flex-col justify-center items-center mt-8  w-96 bg-transparent border-solid border-4 border-gray-200 rounded">
            <h4 className="bg-orange-200 w-full text-center text-white text-shadow-h1">{product}</h4>
            <div className="w-full h-80">
                <img className="box-border w-full h-80" src={image} alt={product} />
            </div>
            <div className="flex flex-col w-full justify-center items-center">
                <h4 className="bg-orange-200 w-full text-center text-white text-shadow-h1">Category: <span className="text-green-400 text-shadow-h1">{category}</span></h4>
                
                <Link to={`/Products/${id}`} onClick={()=>window.scrollTo(0,0)} className="w-full text-white text-shadow-h1 text-center">Details</Link>
            </div>
        </div>
    )
}

export default Item

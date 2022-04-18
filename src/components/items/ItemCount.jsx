import React from 'react'


const ItemCount = ({count, stockToNumber, countIncrease, countDecrease, addCartHandler, countStock}) => {


    return (
            <div className="flex-col text-center w-full border border-2 rounded-b-3xl bg-amber-50 p-4">
                <div className="flex justify-between mb-2 border-2 border-solid border-gray-300 rounded border-b-gray-400 border-r-gray-400 bg-white">
                    <button onClick={countDecrease} className="font-bold text-3xl p-4 text-white text-shadow-h1 w-20 bg-green-300 hover:bg-green-400 active:bg-orange-200 active:border-orange-400 border rounded">-</button>
                    <div className="text-white text-shadow-h1 text-3xl p-4">
                        {count}
                    </div>
                    <button onClick={countIncrease} className="font-bold text-3xl p-4 text-white text-shadow-h1 w-20 bg-green-300 hover:bg-green-400 active:bg-orange-200 active:border-orange-400 border rounded">+</button>
                </div>
                {(stockToNumber > 0 
                    ? <span className="text-green-400 text-shadow-h1">Stock: {countStock}</span>
                    :<span className="text-red-400 text-shadow-h1">Stock: {countStock}</span>
                )}                
                <button 
                    onClick={addCartHandler}
                    disabled={count === 0 || stockToNumber === 0}
                    className={count === 0 || stockToNumber === 0 ? "w-full h-24 text-white text-shadow-h1 bg-gray-500 border-2 border-solid border-gray-400 rounded":"w-full h-24 text-white text-shadow-h1 bg-green-200 hover:bg-green-300 active:bg-orange-200 border-2 border-solid border-green-400 rounded border-b-green-400 border-r-green-400 active:border-orange-400"}
                >
                    Add to Cart
                </button>
            </div>
            
    )
}

export default ItemCount
import React, { useState } from 'react'
import { SearchIcon } from '@heroicons/react/outline'
import { Link, useNavigate } from 'react-router-dom'


const ProductSearch = () => {

    const [search, setSearch] = useState();
    const navigate = useNavigate();

    const searchHandler = (e)=>{
        setSearch(e.target.value);

        if(e.keyCode === 13){
            if(search){
                console.log(search);
                window.scrollTo(0, 0);
                e.target.value = "";
                navigate(`/Search/${search.toLowerCase()}`)
            }else{
                return;
            }
        }

        
    }

    return (
        <div className="flex flex-row items-center">
            <div className="flex">
                <input 
                    type="text" 
                    onKeyUp={searchHandler}
                    className="px-2 border border-2-solid rounded mr-1 focus:bg-orange-100 " 
                    placeholder="Search a product..."
                />
                <Link
                    to={`Search/${search}`}
                    onClick={e=>search?window.scrollTo(0,0):e.preventDefault()}
                    className="flex flex-row justify-center w-12 hover:bg-orange-200 active:bg-orange-100 border border-2-solid border-gray-300 rounded">
                    <SearchIcon className="w-8 text-gray-500 text-center"/>
                </Link>
            </div>
        </div>
    )
}

export default ProductSearch
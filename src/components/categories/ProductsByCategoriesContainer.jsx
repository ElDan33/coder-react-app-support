import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
// import customFetch from '../../utils/customFetch';
// import productsList from '../../utils/productsList';
import ProductsCategoriesList from './ProductsCategoriesList';
import {collection, getDocs, query, where,getFirestore} from 'firebase/firestore';
import Loader from '../Loader';


const ProductsByCategoriesContainer = () => {
    const {darkMode} = useContext(ThemeContext);
    const [productsByCategory, setProductsByCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const {productCategory} = useParams();
    console.log(productCategory)

    useEffect(()=>{
        const db = getFirestore();
        let productsListRef;
        if(productCategory){
            productsListRef = query(collection(db, "productsList"), where("category", "==", productCategory));
        }
        getDocs(productsListRef).then((res)=>{
            setProductsByCategory(res.docs.map(item => ({id:item.id, ...item.data()})));
            setLoading(false);
        })
    },[productCategory]);
    
    return (
        <div className={darkMode ? "App-header-dark w-full h-full items-center justify-center": "App-header w-full h-full items-center justify-center"}>
            {
                loading 
                ? (<Loader text={"Loading..."}/>)
                :(
                    <div className="flex items-center justify-around flex-wrap w-screen">
                        <div className="flex flex-wrap items-center justify-around mt-12">
                            <ProductsCategoriesList productsByCategory={productsByCategory}/>                        
                        </div>                    
                    </div>
                )
            }
            
        </div>
        
    )
}

export default ProductsByCategoriesContainer

import React, { useContext, useEffect, useState } from 'react'
import ItemList from './ItemList';
import productsList from '../../utils/productsList'
import { useParams } from 'react-router-dom';
import ProductsByCategoriesContainer from '../categories/ProductsByCategoriesContainer';
import { ThemeContext } from '../../context/ThemeContext';
import {collection, getDocs, query, where,getFirestore} from 'firebase/firestore';
import Loader from '../Loader';



const ItemListContainer = () => {

    const {darkMode} = useContext(ThemeContext);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const {productCategory} = useParams();
    const {productName} = useParams();
    
    const productFiltered = productsList.filter(p => p.product.toLowerCase().includes(productName));

    useEffect(()=>{
        const db = getFirestore();
        let productsListRef;
        if(!productCategory){
            productsListRef = collection(db, "productsList");
        }else if(productName){
            productsListRef = query(collection(db, "productsList"), where("product", "==", productName))
        }else{
            productsListRef = query(collection(db, "productsList"), where("category", "==", productCategory));
            setLoading(true);
        }
        getDocs(productsListRef).then((res)=>{
            setItems(res.docs.map(item => ({id:item.id, ...item.data()})));
            setLoading(false);
        })
    },[productCategory, productName]);


    return (
        <div className={darkMode ? "App-header-dark w-full h-full items-center justify-center lg:w-full lg:h-full": "App-header w-full h-full items-center justify-center lg:w-full lg:h-full"}>
            {
                loading
                ? (<Loader text={"Loading..."}/>)
                :(
                    <div className="flex justify-around flex-wrap w-screen">
                        <h1 className={darkMode ? "mt-6 font-bold text-3xl text-center absolute text-white" :"mt-6 font-bold text-3xl text-center absolute text-gray-600"}>{productCategory || "Products"}</h1>
                        <div className="mt-20 mb-12">
                            {(productCategory && <ProductsByCategoriesContainer />)||(<ItemList items={items} productName={productName} productFiltered={productFiltered}/>)}
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ItemListContainer
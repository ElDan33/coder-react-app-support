import React, { useContext, useEffect, useState } from 'react'
import ItemList from './ItemList';
import { useParams } from 'react-router-dom';
import ProductsByCategoriesContainer from '../categories/ProductsByCategoriesContainer';
import { ThemeContext } from '../../context/ThemeContext';
import {collection, getDocs, query, where,getFirestore} from 'firebase/firestore';
import Loader from '../Loader';
import CartWidget from '../CartWidget';
import { CartContext } from '../../context/CartContext';


const ItemListContainer = () => {

    const {darkMode} = useContext(ThemeContext);
    const {cartItems} = useContext(CartContext);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productFiltered, setProductFiltered] = useState([]);
    const [error, setError] = useState(false);
    const {productCategory} = useParams();
    const {productName} = useParams();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(()=>{
        const db = getFirestore();
        let productsListRef;
        if(productCategory){
            productsListRef = query(collection(db, "productsList"), where("category", "==", productCategory));
            setLoading(true);
            getDocs(productsListRef).then((res)=>{
                setItems(res.docs.map(item => ({id:item.id, ...item.data()})));
            }).finally(()=>{setLoading(false);});

        }else if(productName){
            const capitalProduct = productName.charAt(0).toUpperCase() + productName.slice(1) ;
            productsListRef = query(collection(db, "productsList"), where("product", "==", capitalProduct));
            setLoading(true);
            getDocs(productsListRef).then((res)=>{
                if(res.size !== 0){
                    setProductFiltered(res.docs.map(item => ({id: item.id, ...item.data()})));
                    setError(false);
                }
                else{
                    setError(true);
                }
            }).catch(err => console.log(err)).finally(()=>{setLoading(false);});

        }else{
            productsListRef = collection(db, "productsList");
            setLoading(true);
            getDocs(productsListRef).then((res)=>{
                setItems(res.docs.map(item => ({id:item.id, ...item.data()})));
                setLoading(false);
            }).finally(()=>{setLoading(false);});
        }

    },[productCategory, productName]);


    return (
        <div className={darkMode ? (productName ? ("App-header-dark w-full h-screen items-center justify-center lg:w-full lg:h-screen") : ("App-header-dark w-full h-full items-center justify-center lg:w-full lg:h-full")) : (productName ? ("App-header w-full h-screen items-center justify-center lg:w-full lg:h-screen") : ("App-header w-full h-full items-center justify-center lg:w-full lg:h-full"))}>
            {
                loading
                ? (<Loader text={"Loading..."}/>)
                :(
                    <div className="flex justify-around flex-wrap w-screen relative">
                        <h1 className={darkMode ? "mt-6 font-bold text-3xl text-center absolute text-white" :"mt-6 font-bold text-3xl text-center absolute text-gray-600"}>{productCategory || "Products"}</h1>
                        <div className={cartItems !== 0 ? "fixed z-50 mt-56 ml-72 visible lg:invisible" : "fixed z-50 mt-56 ml-72 invisible lg:invisible"}>
                            <div className={"font-bold"} onClick={(e)=>e.target.className="hidden"}>x
                                <CartWidget />
                            </div>
                        </div>
                        <div className="mt-20 mb-12">
                            {(productCategory && <ProductsByCategoriesContainer items={items}/>)||(<ItemList items={items} productName={productName} productFiltered={productFiltered} error={error}/>)}
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ItemListContainer
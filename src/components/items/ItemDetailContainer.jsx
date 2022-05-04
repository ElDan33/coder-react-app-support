import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import ItemDetail from './ItemDetail';
import {doc, getDoc, getFirestore} from 'firebase/firestore';
import Loader from '../Loader';

const ItemDetailContainer = () => {

    const {darkMode} = useContext(ThemeContext);
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(true);
    const {productId} = useParams();


    useEffect(()=>{
        const db = getFirestore();
        const productRef = doc(db, "productsList", productId);
        getDoc(productRef).then((res)=>{
            setItem({id:res.id, ...res.data()});
            setLoading(false);
        })
    },[productId])

    return (
        <div className={darkMode ? "App-header-dark w-full h-full items-center justify-center" : "App-header w-full h-full items-center justify-center"}>
            {
                loading 
                ? (<Loader text={"Loading product..."}/>)
                :(<ItemDetail item={item}/>)
            }
            
        </div>
    )
}

export default ItemDetailContainer
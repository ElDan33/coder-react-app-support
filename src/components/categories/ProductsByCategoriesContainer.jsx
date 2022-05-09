import React, { useContext} from 'react'
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import ProductsCategoriesList from './ProductsCategoriesList';


const ProductsByCategoriesContainer = ({items}) => {
    const {darkMode} = useContext(ThemeContext);
    const {productCategory} = useParams();
    console.log(productCategory)

    return (
        <div className={darkMode ? "App-header-dark w-full h-full items-center justify-center": "App-header w-full h-full items-center justify-center"}>            
            <div className="flex items-center justify-around flex-wrap w-screen">
                <div className="flex flex-wrap items-center justify-around mt-12">
                    <ProductsCategoriesList items={items}/>                        
                </div>                    
            </div>     
        </div>
        
    )
}

export default ProductsByCategoriesContainer

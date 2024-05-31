import React from 'react'
// import { productData as data} from '../../static/data';
import ProductCard from './ProductCard/ProductCard';
import { useSelector } from 'react-redux';

const FeatureProduct = () => {

    const { allProducts } = useSelector((state)=>state.products);

    console.log(allProducts);
    return (
        <div>
        
    
        <div className='text-3xl py-7 text-center font-medium'>Featured Products</div>
        <div className='flex flex-wrap justify-center items-center'>
            {
                allProducts && allProducts.length !== 0 && allProducts.map((i , index)=>{
                  return  <ProductCard data={i} key={index}/>
                })
            }
        </div>
    
        
        
          
        </div>)
}

export default FeatureProduct

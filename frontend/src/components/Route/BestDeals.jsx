import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
// import { productData } from '../../static/data';
import ProductCardBestDeals from './ProductCard/ProductCardBestDeals.jsx'
import { useSelector } from 'react-redux';


const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);
  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
    const firstFive = sortedData && sortedData.slice(0, 10);
    setData(firstFive);
  }, [allProducts]);
  return (
    <div>
    

    <div className='text-3xl py-7 text-center font-medium'>Best Deals</div>
    <div className='  w-full  scroll-smooth snap-x snap-mandatory flex justify-center items-center '>
        {
          data && data.length !== 0 && data.map((i , index)=>{
              return  (
                <div className='translate-x-full  animate-[spin_10s_linear_infinite] snap-start snap-always'>
                <ProductCardBestDeals data={i} key={index}/>
                </div>

                )
            })
        }
    </div>

    
    
      
    </div>
  )
}

export default BestDeals

import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import ProductDetails from '../components/Products/ProductDetails.jsx'
import { Link, useParams } from 'react-router-dom'
// import { productData } from '../static/data.js'
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import SuggestedProduct from "../components/Products/SuggestedProduct";

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  // useEffect(() => {
  //   if (eventData !== null) {
  //     const data = allEvents && allEvents.find((i) => i._id === id);
  //     setData(data);
  //   } else {
  //     const data = allProducts && allProducts.find((i) => i._id === id);
  //     setData(data);
  //   }
  // }, [allProducts, allEvents]);

    useEffect(()=>{
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);
    },[allProducts])
  

  console.log(data)
  return (
    <div>
      <Header/>
      <ProductDetails data={data}/>
      {
          !eventData && (
            <>
            {data && <SuggestedProduct data={data} />}
            </>
          )
        }
        <Link to={'/'}>
        <div class="more-products mb-12" id="more-products-wrap">
          <span id="more-products" data-rows_per_page="1">More products</span>
        </div>
        </Link>
        
      <Footer/>
    </div>
  )
}

export default ProductDetailsPage

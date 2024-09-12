import React from "react";
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero.jsx";
import Categories from "../components/Route/Categories.jsx"
import Navbar from '../components/Route/Navbar.jsx'
import BestDeals from '../components/Route/BestDeals.jsx'
import FeatureProduct from '../components/Route/FeatureProduct.jsx'
import Events from "../components/Events/Events.jsx";
import Sponsored from "../components/Route/Sponsored.jsx";
import Footer from "../components/Layout/Footer.jsx";
import { useDispatch, useSelector } from "react-redux";

import SliderSection from "../components/SliderSection/SliderSection.jsx";
import Loader from "../components/Layout/Loader.jsx";


const Home = () => {

  const {isLoading } = useSelector((state) => state.products);
  return (
    <div className=" bg-slate-100 overflow-x-hidden">
      {
        isLoading ? <Loader/> :( <><div className="h-[30px] bg-black text-white text-xs flex items-center justify-center">#DontHoldBack! FLAT 10% OFF* On NEW-IN Styles</div>
          <Header activeHeading={1}/>
          <Navbar/>
          <Hero />
          {/* <Categories/> */}
          <BestDeals/>
          <FeatureProduct/>
          {/* <Events/> */}
          {/* <Sponsored/> */}
          <SliderSection/>
          <Footer/>
          </>)
      }
     

    </div>
  );
};

export default Home;

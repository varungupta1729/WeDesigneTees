import React from "react";
import { Carousel } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
const Hero = () => {
  return (
    <>
    <div className=" h-[70vh]  hidden lg:block">
      <Carousel>


      <div className="flex h-full items-center justify-center bg-no-repeat bg-cover"  style={{
        backgroundImage:
          "url(https://res.cloudinary.com/decvwqui4/image/upload/v1717189833/gpfgndrtrcrofr8iju2y.png)",
      }}>
      
      </div>



        <div className="flex h-full items-center justify-center bg-gradient-to-r bg-black text-black bg-no-repeat bg-cover relative  " 
         style={{
        backgroundImage:
          "url(https://res.cloudinary.com/decvwqui4/image/upload/v1717466405/rnbsjlkvma8sssvozmzt.jpg)",}}
         >

     
      </div>

        <div className="flex h-full items-center justify-cente  dark:bg-gray-700 dark:text-white bg-no-repeat bg-cover"  style={{
        backgroundImage:
          "url(https://res.cloudinary.com/decvwqui4/image/upload/v1717466194/fxvn7wag5jtqspdzwpoa.png)",
      }}>
      
      </div>

      
     
      </Carousel>
    </div>


    <div className=" h-[30vh]   lg:hidden">
      <Carousel>


      <div className="flex h-full items-center justify-center  dark:text-white bg-no-repeat bg-cover"  style={{
        backgroundImage:
          "url(https://res.cloudinary.com/decvwqui4/image/upload/v1717189833/gpfgndrtrcrofr8iju2y.png)",
      }}>
      
      </div>


      <div className="flex h-full items-center justify-center bg-gradient-to-r bg-black text-black bg-no-repeat bg-cover relative  " 
         style={{
        backgroundImage:
          "url(https://res.cloudinary.com/decvwqui4/image/upload/v1717466405/rnbsjlkvma8sssvozmzt.jpg)",}}
         >

     
      </div>

        
      <div className="flex h-full items-center justify-center  bg-no-repeat bg-cover"  style={{
        backgroundImage:
          "url(https://res.cloudinary.com/decvwqui4/image/upload/v1717466194/fxvn7wag5jtqspdzwpoa.png)",
      }}>
      
      </div>
      </Carousel>
    </div>
    </>
  );
};

export default Hero;

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


      <div className="flex h-full items-center justify-center bg-red-400 dark:bg-gray-700 dark:text-white bg-no-repeat bg-cover"  style={{
        backgroundImage:
          "url(https://res.cloudinary.com/decvwqui4/image/upload/v1717189833/gpfgndrtrcrofr8iju2y.png)",
      }}>
      
      </div>



        <div className="flex h-full items-center justify-center bg-gradient-to-r bg-black text-black bg-no-repeat bg-cover relative  " 
         style={{
        backgroundImage:
          "url(https://res.cloudinary.com/decvwqui4/image/upload/v1717188668/kjwsrmuxitvcsk0fz0kd.jpg)",}}
         >

      <span className="text-center gap-7  flex flex-col mx-10 absolute w-full  h-full  backdrop-blur-[2px] justify-center items-center ">
      <div className='text-5xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.purple.400),theme(colors.purple.100),theme(colors.pink.300),theme(colors.orange.400),theme(colors.pink.300),theme(colors.purple.100),theme(colors.purple.400))] bg-[length:200%_auto] animate-gradient'>YOUR FAVORITES ARE BACK!</div>
       <div className='text-2xl font-semibold'>Shop these Original Tees Whiz bestsellers!</div>
       <div ><Link><button className='bg-black text-white px-5 py-2 rounded-full '>Shop Now</button></Link></div>
      </span>
     
      </div>

        <div
          className="w-full h-full bg-white flex justify-evenly items-center"
          style={{}}
        >
          <div className="w-[40%] h-full flex flex-col justify-center items-center ">
            <span className="text-left gap-7 flex flex-col mx-10">
              <div className="text-5xl font-bold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.purple.400),theme(colors.purple.100),theme(colors.pink.300),theme(colors.orange.400),theme(colors.pink.300),theme(colors.purple.100),theme(colors.purple.400))] bg-[length:200%_auto] animate-gradient">
                GET YOUR CUSTOM TSHIRT NOW!
              </div>
              <div className="text-2xl capitalize">
                Contact for the custom tshirt
              </div>
              <div className="text-lg capitalize">
                Now available in all colors with 20% discount
              </div>
              <div>
                <Link>
                  <button className="bg-black text-white px-5 py-2 rounded-full ">
                    Order Now
                  </button>
                </Link>
              </div>
            </span>
          </div>

          <div   className="w-[50%] h-full flex flex-col justify-center items-center">
            <ReactCompareSlider
            className="h-[70%]  rounded-lg bg-slate-100 "
              itemOne={
                <ReactCompareSliderImage
                  src="https://res.cloudinary.com/decvwqui4/image/upload/v1717183954/jryml1qnb8xm4zfkpmyp.png"
                  srcSet="https://res.cloudinary.com/decvwqui4/image/upload/v1717187623/js9jhbh0lctbbcgwmiff.png"
                  alt="Image one"
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src="https://res.cloudinary.com/decvwqui4/image/upload/v1717185400/azoyu8vknqf5jxlwhbst.png"
                  srcSet="https://res.cloudinary.com/decvwqui4/image/upload/v1717187620/rhgl36vinkhhia7erevy.png"
                  alt="Image two"
                />
              }
            />
          </div>
        </div>

      
     
      </Carousel>
    </div>


    <div className=" h-[30vh]   lg:hidden">
      <Carousel>


      <div className="flex h-full items-center justify-center bg-red-400 dark:bg-gray-700 dark:text-white bg-no-repeat bg-cover"  style={{
        backgroundImage:
          "url(https://res.cloudinary.com/decvwqui4/image/upload/v1717189833/gpfgndrtrcrofr8iju2y.png)",
      }}>
      
      </div>



        <div className="flex h-full items-center justify-center bg-gradient-to-r bg-black text-white bg-no-repeat bg-cover relative  " 
     
         >

      <span className="text-center gap-5  flex flex-col mx-10 absolute w-full  h-full  backdrop-blur-[2px] justify-center items-center ">
      <div className='text-xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.purple.400),theme(colors.purple.100),theme(colors.pink.300),theme(colors.orange.400),theme(colors.pink.300),theme(colors.purple.100),theme(colors.purple.400))] bg-[length:200%_auto] animate-gradient'>YOUR FAVORITES ARE BACK!</div>
       <div className='text-sm font-semibold'>Shop these Original Tees Whiz bestsellers!</div>
       <div ><Link><button className='bg-white text-black px-5 py-2 rounded-full '>Shop Now</button></Link></div>
      </span>
     
      </div>

        <div
          className="w-full h-full bg-white flex justify-evenly items-center"
          style={{}}
        >
          <div className="w-[50%] h-full flex flex-col justify-center items-center ">
            <span className="text-left gap-2 flex flex-col mx-10">
              <div className="text-lg font-bold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.purple.400),theme(colors.purple.100),theme(colors.pink.300),theme(colors.orange.400),theme(colors.pink.300),theme(colors.purple.100),theme(colors.purple.400))] bg-[length:200%_auto] animate-gradient">
                GET YOUR CUSTOM TSHIRT NOW!
              </div>
              <div className="text-sm capitalize">
                Contact for the custom tshirt
              </div>
              <div className="text-xs capitalize">
                Now available in all colors with 20% discount
              </div>
             
            </span>
          </div>

          <div   className="w-[50%] h-full flex flex-col justify-center items-center">
            <ReactCompareSlider
            className="h-[70%]  rounded-lg bg-slate-100 "
              itemOne={
                <ReactCompareSliderImage
                  src="https://res.cloudinary.com/decvwqui4/image/upload/v1717183954/jryml1qnb8xm4zfkpmyp.png"
                  srcSet="https://res.cloudinary.com/decvwqui4/image/upload/v1717187623/js9jhbh0lctbbcgwmiff.png"
                  alt="Image one"
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src="https://res.cloudinary.com/decvwqui4/image/upload/v1717185400/azoyu8vknqf5jxlwhbst.png"
                  srcSet="https://res.cloudinary.com/decvwqui4/image/upload/v1717187620/rhgl36vinkhhia7erevy.png"
                  alt="Image two"
                />
              }
            />
          </div>
        </div>

      
     
      </Carousel>
    </div>
    </>
  );
};

export default Hero;

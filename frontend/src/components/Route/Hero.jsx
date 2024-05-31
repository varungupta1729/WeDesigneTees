import React from 'react'
import { Carousel } from "flowbite-react";
const Hero = () => {
  return (
    <div className=" h-[80vh]  ">
    <Carousel>
      <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white bg-no-repeat bg-cover"  style={{
        backgroundImage:
          "url(https://www.wedesignetees.com/images/hero1.png)",
      }}>
        Slide 1
      </div>
      <div className="flex h-full items-center justify-center bg-red-400 dark:bg-gray-700 dark:text-white bg-no-repeat bg-cover"  style={{
        backgroundImage:
          "url(https://www.wedesignetees.com/images/hero3.jpg)",
      }}>
        Slide 2
      </div>
      <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white bg-no-repeat bg-cover"  style={{
        backgroundImage:
          "url(https://www.wedesignetees.com/images/hero2.png)",
      }}>
        Slide 3
      </div>
    </Carousel>
  </div>
  )
}

export default Hero
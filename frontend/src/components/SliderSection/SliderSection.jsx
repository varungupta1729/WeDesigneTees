import React from 'react'
import {
    ReactCompareSlider,
    ReactCompareSliderImage,
  } from "react-compare-slider";
  import './SliderSection.css'
  import {Link} from 'react-router-dom'
const SliderSection = () => {
  return (
    <div className='w-full p-4 lg:p-24'>
      <div className='bg-white rounded-[40px] p-2 lg:px-24 lg:py-10 text-black flex gap-10 flex-col lg:flex-row text-center lg:text-left justify-center items-center' >
        <div className='w-[100%] lg:w-[50%]  flex flex-col gap-10 p-5 lg:p-10'>
      <h2 className='customise'>Customize Now</h2>
        
          <p className='text-[3rem] lg:text-[4rem]  font-extrabold'>Customize</p>
          <p className='text-[2rem] lg:text-[3rem]   leading-10 font-extrabold text-gray-600 '>
          Your  Tshirt Now
          </p>
          <p className=' text-[1.3rem] leading-8 capitalize'>Now you can order your customized tshirt at WeDesigneTees with 20% Off</p>
          <Link to={'https://wedesigneteescustome.vercel.app/'}><button className='bg-black text-white px-5 py-3 text-sm font-semibold '>Order Now</button></Link>
        </div>
        <div className="w-full lg:w-[50%] h-full flex flex-col justify-center items-center">
            <ReactCompareSlider
            className="w-[80%]  rounded-lg bg-black "
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
    </div>
  )
}

export default SliderSection

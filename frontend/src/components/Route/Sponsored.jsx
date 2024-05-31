import React from "react";
import Carousel from "react-material-ui-carousel";

const Sponsored = () => {
  return (
    <div className="flex justify-center items-center mx-[10%] border-red-700 border-2 h-full border-solid">
      <Carousel className="w-[1000px] border-red-700 border-2 border-solid h-full">
        <div className="w-full h-full">
          <h1>Heloo</h1>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr00hf35zfnciGcwpwMtFlAmXRPwsVHr6HHw&usqp=CAU" className="w-full" alt="" />
        </div>
        <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDhuETqUuOnVU0yad-w1iFCBRFU6_dQ0__GA&usqp=CAU" className="w-full" alt="" />
        </div>
      </Carousel>
    </div>
    
    
  );
};

export default Sponsored;

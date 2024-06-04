import React, { useEffect, useState } from "react";
// import { productData as data} from '../../static/data';
import ProductCard from "./ProductCard/ProductCard";
import { useSelector } from "react-redux";
import "./Feature.css";
import { categoriesData } from "../../static/data";
import { FaFilter } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const FeatureProduct = () => {
  const [active, setActive] = useState(false);
  const { allProducts } = useSelector((state) => state.products);
  const [activeProducts, setActiveProducts] = useState(allProducts);
 
  

  useEffect(()=>{
    setActiveProducts(allProducts);
  },[allProducts])
  

  const transferData = (elements) => {
    
   

    setActiveProducts(elements);
   
  };

  const priceFilter = (e) => {
    
    if (e.target.checked) {
      var num = e.target.parentElement.textContent.replace(/[^0-9]/g, "");
      if (num.length > 3) {
        let index = num.length - 4;
        let part1 = num.substring(0, index);
        let part2 = num.substring(index);
        
        transferData(
          allProducts.filter(
            (item) => item?.discountPrice < part2 && item?.discountPrice > part1
          )
        );
      } else {
      
        transferData(
          allProducts.filter((item) => item?.discountPrice < num)
        );
      }
    } else {
     console.log("jbeud");
      transferData(allProducts);
    }
  };

  let checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach(function(checkbox) {
   
      checkbox.addEventListener('change', function() {
          if (this.checked) {
              // Uncheck all other checkboxes
             
              checkboxes.forEach(function(otherCheckbox) {
                  if (otherCheckbox !== checkbox) {
                      otherCheckbox.checked = false;
                  }
              });
          }
      });
  });

  
  const categoryFilter = (e) => {
    
    if (e.target.checked) {
      var categoryClicked = e.target.parentElement.textContent;
       if(categoryClicked === 'All'){
        transferData(allProducts);
       }else{
        transferData(
          allProducts.filter(
            (item) => item.category === categoryClicked
          )
        );
       }
      
       
    
    } else {
     
      transferData(allProducts);
    }
  };


console.log(activeProducts)

  return (
    <div className="w-full  ">
      <div className="text-3xl py-7 text-center font-medium">
        Featured Products
      </div>
      <div className="w-full relative  flex justify-center  ">
        {active && (
          <div className="w-[25%] h-[100%] height-div rounded-[20px] mx-10 side-div flex flex-col gap-7 z-10 py-10 px-14 bg-white">
            <div className="w-full ">
              <div className="w-full flex flex-col gap-3">
                <div
                  className="cross justify-end hidden"
                  onClick={() => setActive(!active)}
                >
                  <RxCross2 size={22} />
                </div>
                <h2 className="font-semibold text-lg">Categories</h2>

                {categoriesData &&
                  categoriesData.map((category, index) => {
                    return (
                      <div className="w-full">
                        <label class="custom-checkbox w-full">
                          <input
                            className="checkbox"
                            type="checkbox"
                            name="checkbox"
                            onChange={(e)=>categoryFilter(e)}
                          />
                          <span class="checkmark"></span>
                          {category.title}
                        </label>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div className="w-full ">
              <div className="w-full flex flex-col gap-3">
                <h2 className="font-semibold text-lg">Price(INR)</h2>

                <div className="w-full">
                  <label class="custom-checkbox w-full">
                    <input
                      className="checkbox"
                      name="check"
                      type="checkbox"
                      onChange={(e) => priceFilter(e)}
                    />
                    <span class="checkmark"></span>
                    Under INR 999
                  </label>
                </div>

                <div className="w-full">
                  <label class="custom-checkbox w-full">
                    <input
                      className="checkbox"
                      name="check"
                      type="checkbox"
                      onChange={(e) => priceFilter(e)}
                    />
                    <span class="checkmark"></span>
                    INR 999 - INR 1,499
                  </label>
                </div>
                <div className="w-full">
                  <label class="custom-checkbox w-full">
                    <input
                      className="checkbox"
                      type="checkbox"
                      onChange={(e) => priceFilter(e)}
                    />
                    <span class="checkmark"></span>
                    INR 1,499 - INR 1,999
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          className={`${
            active ? "w-[70%]" : " w-[100%] "
          } flex flex-col justify-center mt-10 right-div relative items-center`}
        >
          <div className={` absolute flex justify-end top-[-3.5rem] right-10`}>
            <button
              onClick={() => setActive(!active)}
              className="bg-black rounded-full text-white flex justify-center items-center gap-2  py-2 px-5"
            >
              Filter <FaFilter />
            </button>
          </div>
          <div className="  flex flex-wrap justify-center items-center">

            {activeProducts &&
              activeProducts.length !== 0 &&
              activeProducts.map((i, index) => {
                return <ProductCard data={i} key={index} />;
              })}
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureProduct;

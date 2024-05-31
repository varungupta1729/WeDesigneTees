import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import React, { useEffect, useState } from "react";
import "./ProductDetailsstyle.css";
import { Carousel } from "flowbite-react";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { FiMessageSquare } from "react-icons/fi";
import Ratings from "../../Products/Ratings";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../../server";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import toast from "react-hot-toast";
import axios from "axios";
import { addTocart } from "../../../redux/actions/cart";

const ProductDetailsCard = ({ data, setOpen }) => {
console.log(data)
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  //   const [select, setSelect] = useState(false);
  const navigate = useNavigate();

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };
  return (
    <div className="fixed flex  justify-center bg-black/60 items-center top-0 left-0  h-screen w-full z-40 ">

          <div className="proCard_content  p-4 w-[90%] 800px:w-[60%] h-[90vh] overflow-y-auto 800px:h-[75vh] bg-white rounded-md shadow-sm relative flex justify-center items-center">
          <div className="go-back" onClick={() => setOpen(false)}>
          {" "}
          <IoIosArrowRoundBack
            size={30}
            className="text-white arrow"

          />
        </div>
            <div className="proCard_info  ">
              <div className="proCard_text p-4 ">
                <div className="brand-name group ">
                  <h3 className="font-bold text-xl">{data.name}</h3>
                </div>
                <div className="proCard_description text-[1rem]">
                  <h4>{data.description}</h4>
                  <span className="proCard_price">Rs.{data.discountPrice}</span>
                </div>

                <div className="size-quantity group">
                  <div className="proCard_quantity">
                    <div>
                      <button
                        className="text-white font-bold px-4 py-2 bg-black rounded-s-md"
                        onClick={decrementCount}
                      >
                        -
                      </button>
                      <span className="bg-gray-100 text-gray-800  font-medium px-4 py-[11px]">
                        {count}
                      </span>
                      <button
                        className="text-white font-bold px-4 py-2 bg-black rounded-e-md"
                        onClick={incrementCount}
                      >
                        +
                      </button>
                    </div>
                  </div>

                </div>
                <div className="flex justify-between my-10 items-center ">
                <button className="bg-black text-white px-7 py-3 rounded-full flex flex-row gap-2 justify-center items-center"  onClick={() => addToCartHandler(data._id)}>
                  Add To Cart <AiOutlineShoppingCart />
                </button>
                <div>
                  {click ? (
                    <AiFillHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => removeFromWishlistHandler(data)}
                      color={click ? "red" : "#333"}
                      title="Remove from wishlist"
                    />
                  ) : (
                    <AiOutlineHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => addToWishlistHandler(data)}
                      title="Add to wishlist"
                    />
                  )}
                </div>
              </div>

              </div>

            </div>

            <div className="proCard_images-section flex items-center flex-col  gap-7 mt-4">
              <Carousel className="h-[45vh] w-[40vh]"
>
                {
                  data.images.map((image)=>{
                    return (
                      <div
                  className="flex h-full items-center justify-center  bg-white bg-no-repeat bg-cover"
                  style={{
                    backgroundImage: `url(${backend_url}${image})`,
                  }}
                ><img src={image.url}  alt={data?.name}/></div>   
                    )
                  })
                }
               
              </Carousel>

              <div className="flex ">
                <Link to={`/shop/preview/${data.shop._id}`} className="flex">
                  <img
                    src={data?.shop.avatar.url} 
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className="text-blue-400">{data.shop.name}</h3>
                    <Ratings rating ={data.ratings}/>
                    <h5 className="pb-3 text-[15px]">
                      ({data?.reviews.length}) Ratings
                    </h5>
                  </div>
                </Link>
              </div>

              <button className="flex justify-center items-center gap-2 bg-black text-white px-6  py-2 rounded-lg" onClick={handleMessageSubmit}>
                Message <FiMessageSquare className="text-lg" />
              </button>
            </div>
          </div>
        </div>

    // <div className="fixed flex  justify-center bg-black/60 items-center top-0 left-0  h-screen w-full z-40 ">
    //   <div className="bg-white w-[60%] h-[70vh] flex justify-center items-center overflow-y-auto">
    //     <div className="w-[95%] h-[91%]  bg-slate-300 flex flex-row">


    //       <div className="left w-[60%] bg-slate-700 p-2">


    //         <div className="brand-name group ">
    //           <h3 className="font-bold text-lg ">{data.name}</h3>
    //         </div>

    //         <div className="proCard_description bg-red-300">
    //           <h4>{data.description}</h4>
    //           <span className="proCard_price">Rs.{data.price}</span>
    //         </div>

    //         <div className="">
    //           <div>
    //             <button
    //               className="text-white font-bold px-4 py-2 bg-black rounded-s-md"
    //               onClick={decrementCount}
    //             >
    //               -
    //             </button>
    //             <span className="bg-gray-100 text-gray-800  font-medium px-4 py-[11px]">
    //               {count}
    //             </span>
    //             <button
    //               className="text-white font-bold px-4 py-2 bg-black rounded-e-md"
    //               onClick={incrementCount}
    //             >
    //               +
    //             </button>
    //           </div>
    //         </div>


    //         <div className="flex justify-between mt-7 items-center bg-red">
    //           <button className="bg-black text-white  text-sm px-7 py-3 rounded-full flex flex-row gap-2 justify-center items-center">
    //             Add To Cart <AiOutlineShoppingCart />
    //           </button>

    //           <div>
    //                {click ? (
    //                 <AiFillHeart
    //                   size={30}
    //                   className="cursor-pointer"
    //                   onClick={() => removeFromWishlistHandler(data)}
    //                   color={click ? "red" : "#333"}
    //                   title="Remove from wishlist"
    //                 />
    //               ) : (
    //                 <AiOutlineHeart
    //                   size={30}
    //                   className="cursor-pointer"
    //                   onClick={() => addToWishlistHandler(data)}
    //                   title="Add to wishlist"
    //                 />
    //               )}
    //             </div>


    //           </div>



    //           </div>



    //           <div className="right"></div>



    //         </div>
    //       </div>
    //     </div>

        );
};

        export default ProductDetailsCard;

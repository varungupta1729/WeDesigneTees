import React, { useEffect } from "react";

import { useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { FiEye } from "react-icons/fi";
import { FaCartShopping } from "react-icons/fa6";
import Ratings from "../../Products/Ratings.jsx";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { backend_url } from "../../../server.js";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import toast from "react-hot-toast";
import { addTocart } from "../../../redux/actions/cart";


const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

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

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <>
      <div class="relative w-60 m-5 bg-white shadow-md  duration-500 hover:scale-105 hover:shadow-xl group">
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
        >
          <img
            src={`${data.images && data.images[0]?.url}`}
            alt="Product"
            class="h-64 w-60 object-cover "
          />
        </Link>
        <div className=" w-4 items-center justify-center  flex-col gap-3  absolute top-5 right-5 hidden group-hover:flex">
       
            <IoEyeOutline size={20} className=" text-black cursor-pointer hidden lg:block"   onClick={() => setOpen(true)} />
          
         

          {click ? (
           
              <AiFillHeart
                size={27}
                className="cursor-pointer   transition transform"
                color={click ? "red" : "#333"}
                title="Remove from wishlist"
                onClick={() => removeFromWishlistHandler(data)}
              />
            
          ) : (
           
              <CiHeart
                size={27}
                className="cursor-pointer  transition "
                color={click ? "red" : "#333"}
                title="Add to wishlist"
                onClick={() => addToWishlistHandler(data)}
              />
             
          )}
        </div>
        <div className="px-4 py-3 w-60 ">
        
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <span class="text-gray-400 mr-3  uppercase text-xs">{data.shop.name}</span>
          </Link>
          <p class="text-sm font-bold mt-3 text-black truncate block capitalize">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </p>
          <div className="flex mt-3">
            <Ratings rating={data.ratings} />
          </div>
          <div class="flex items-center">
            <p class="text-lg font-semibold text-black cursor-auto my-3">
              Rs.{data.discountPrice}
            </p>
            <del>
              <p class="text-sm text-gray-600 cursor-auto ml-2">
                Rs.{data.originalPrice}
              </p>
            </del>
            <div class="ml-auto" onClick={addToCartHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-bag-plus"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {open && <ProductDetailsCard data={data} setOpen={setOpen} />}
    </>
  );
};

export default ProductCard;

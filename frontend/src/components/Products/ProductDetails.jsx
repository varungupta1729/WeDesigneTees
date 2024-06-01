// import React, { useEffect, useState } from "react";
// import {
//   AiFillHeart,
//   AiOutlineHeart,
//   AiOutlineMessage,
//   AiOutlineShoppingCart,
// } from "react-icons/ai";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { getAllProductsShop } from "../../redux/actions/product";
// import { backend_url, server } from "../../server";
// import styles from "../../styles/styles";
// import {
//   addToWishlist,
//   removeFromWishlist,
// } from "../../redux/actions/wishlist";
// import { addTocart } from "../../redux/actions/cart";
// import { toast } from "react-hot-toast";
// import Ratings from "./Ratings";
// import axios from "axios";
// // import AddtoCartButton from "./AddtoCartButton";

// const ProductDetails = ({ data }) => {
//   const { wishlist } = useSelector((state) => state.wishlist);
//   const { cart } = useSelector((state) => state.cart);
//   const { user, isAuthenticated } = useSelector((state) => state.user);
//   const { products } = useSelector((state) => state.products);
//   const [count, setCount] = useState(1);
//   const [click, setClick] = useState(false);
//   const [select, setSelect] = useState(0);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getAllProductsShop(data && data?.shop._id));
//     if (wishlist && wishlist.find((i) => i._id === data?._id)) {
//       setClick(true);
//     } else {
//       setClick(false);
//     }
//   }, [data, wishlist]);

//   const incrementCount = () => {
//     setCount(count + 1);
//   };

//   const decrementCount = () => {
//     if (count > 1) {
//       setCount(count - 1);
//     }
//   };

//   const removeFromWishlistHandler = (data) => {
//     setClick(!click);
//     dispatch(removeFromWishlist(data));
//   };

//   const addToWishlistHandler = (data) => {
//     setClick(!click);
//     dispatch(addToWishlist(data));
//   };

//   const addToCartHandler = (id) => {
//     const isItemExists = cart && cart.find((i) => i._id === id);
//     if (isItemExists) {
//       toast.error("Item already in cart!");
//     } else {
//       if (data.stock < 1) {
//         toast.error("Product stock limited!");
//       } else {
//         const cartData = { ...data, qty: count };
//         dispatch(addTocart(cartData));
//         toast.success("Item added to cart successfully!");
//       }
//     }
//   };

//   const totalReviewsLength =
//     products &&
//     products.reduce((acc, product) => acc + product.reviews.length, 0);

//   const totalRatings =
//     products &&
//     products.reduce(
//       (acc, product) =>
//         acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
//       0
//     );

//   const avg =  totalRatings / totalReviewsLength || 0;

//   const averageRating = avg.toFixed(2);

//   const handleMessageSubmit = async () => {
//     if (isAuthenticated) {
//       const groupTitle = data._id + user._id;
//       const userId = user._id;
//       const sellerId = data.shop._id;
//       await axios
//         .post(`${server}/conversation/create-new-conversation`, {
//           groupTitle,
//           userId,
//           sellerId,
//         })
//         .then((res) => {
//           navigate(`/inbox?${res.data.conversation._id}`);
//         })
//         .catch((error) => {
//           toast.error(error.response.data.message);
//         });
//     } else {
//       toast.error("Please login to create a conversation");
//     }
//   };
// //  console.log(data , " yaha h data")
//   return (
//     <div className="bg-white">
//       {data ? (
//         <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
//           <div className="w-full py-5 ">
//             <div className="block w-full 800px:flex ">
//               <div className="w-full 800px:w-[40%] mr-10">
//                 <img
//                   src={`${backend_url}${data && data.images[select]}`}
//                   alt=""
//                   className="w-[100%] rounded-xl"
//                 />
//                 <div className="w-full flex ">
//                   {data &&
//                     data.images.map((i, index) => (
//                       <div
//                         className={`${
//                           select === 0 ? "border" : "null"
//                         } cursor-pointer rounded-xl border-2`}
//                       >
//                         <img
//                           src={`${backend_url}${i}`}
//                           alt=""
//                           className="h-[200px] overflow-hidden mr-3 mt-3"
//                           onClick={() => setSelect(index)}
//                         />
//                       </div>
//                     ))}
//                   <div
//                     className={`${
//                       select === 1 ? "border" : "null"
//                     } cursor-pointer`}
//                   ></div>
//                 </div>
//               </div>
//               <div className="w-full 800px:w-[60%] pt-5 " >
//                 <h1 className={`${styles.productTitle}`}>{data.name}</h1>
//                 <p>{data.description}</p>
//                 <div className="flex pt-3">
//                   <h4 className={`${styles.productDiscountCartPrice}`}>
//                     Rs.{data.discountPrice}
//                   </h4>
//                   <h3 className={`${styles.price}`}>
//                     {data.originalPrice ?  "Rs." + data.originalPrice : null}
//                   </h3>
//                 </div>

//                 <div className="flex items-center mt-4 justify-between pr-3">
//                   <div>
//                     <button
//                       className="bg-gradient-to-r from-teal-400 to-teal-500 text-white hover:from-pink-500 hover:to-yellow-500 font-bold rounded-full px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
//                       onClick={decrementCount}
//                     >
//                       -
//                     </button>
//                     <span className="bg-gray-100 text-gray-800   rounded-md font-medium px-4 py-[11px]">
//                       {count}
//                     </span>
//                     <button
//                       className="bg-gradient-to-r from-teal-400 to-teal-500 text-white hover:from-pink-500 hover:to-yellow-500  font-bold rounded-full px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
//                       onClick={incrementCount}
//                     >
//                       +
//                     </button>
//                   </div>
//                   <div>
//                     {click ? (
//                       <AiFillHeart
//                         size={30}
//                         className="cursor-pointer"
//                         onClick={() => removeFromWishlistHandler(data)}
//                         color={click ? "red" : "#333"}
//                         title="Remove from wishlist"
//                       />
//                     ) : (
//                       <AiOutlineHeart
//                         size={30}
//                         className="cursor-pointer"
//                         onClick={() => addToWishlistHandler(data)}
//                         color={click ? "red" : "#333"}
//                         title="Add to wishlist"
//                       />
//                     )}
//                   </div>
//                 </div>

//                 <div
//                   className={`${styles.button} !mt-20  !h-11 flex items-center`}
//                   onClick={() => addToCartHandler(data._id)}
//                 >
//                   <span className="text-white flex itmes-center">
//                     Add to Cart <AiOutlineShoppingCart className="ml-1"/>
//                   </span>
//                  {/* <AddtoCartButton/> */}

//                 </div>

//                 <div className="flex items-center pt-8">
//                   <Link to={`/shop/preview/${data?.shop._id}`}>
//                     <img
//                       src={`${backend_url}${data?.shop?.avatar}`}
//                       alt=""
//                       className="w-[50px] h-[50px] rounded-full mr-2"
//                     />
//                   </Link>
//                   <div className="pr-8">
//                     <Link to={`/shop/preview/${data?.shop._id}`}>
//                       <h3 className={`${styles.shop_name} pb-1 pt-1`}>
//                         {data.shop.name}
//                       </h3>
//                     </Link>
//                     <h5 className="pb-3 text-[15px]">
//                       ({averageRating}/5) Ratings
//                     </h5>
//                   </div>
// <div
//   className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
//   onClick={handleMessageSubmit}
// >
//   <span className="text-white flex items-center">
//     Send Message <AiOutlineMessage className="ml-1" />
//   </span>
// </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <ProductDetailsInfo
//             data={data}
//             products={products}
//             totalReviewsLength={totalReviewsLength}
//             averageRating={averageRating}
//           />
//           <br />
//           <br />
//         </div>
//       ) : null}
//     </div>
//   );
// };

// const ProductDetailsInfo = ({
//   data,
//   products,
//   totalReviewsLength,
//   averageRating,
// }) => {
//   const [active, setActive] = useState(1);

//   return (
//     <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded-2xl">
//       <div className="w-full flex justify-between border-b pt-10 pb-2">
//         <div className="relative">
//           <h5
//             className={
//               "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
//             }
//             onClick={() => setActive(1)}
//           >
//             Product Details
//           </h5>
//           {active === 1 ? (
//             <div className={`${styles.active_indicator}`} />
//           ) : null}
//         </div>
//         <div className="relative">
//           <h5
//             className={
//               "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
//             }
//             onClick={() => setActive(2)}
//           >
//             Product Reviews
//           </h5>
//           {active === 2 ? (
//             <div className={`${styles.active_indicator}`} />
//           ) : null}
//         </div>
//         <div className="relative">
//           <h5
//             className={
//               "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
//             }
//             onClick={() => setActive(3)}
//           >
//             Seller Information
//           </h5>
//           {active === 3 ? (
//             <div className={`${styles.active_indicator}`} />
//           ) : null}
//         </div>
//       </div>
//       {active === 1 ? (
//         <>
//           <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
//             {data.description}
//           </p>
//         </>
//       ) : null}

// {active === 2 ? (
//   <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
//     {data &&
//       data.reviews.map((item, index) => (
//         <div className="w-full flex my-2">
//           <img
//             src={`${backend_url}/${item.user.avatar}`}
//             alt=""
//             className="w-[50px] h-[50px] rounded-full"
//           />
//           <div className="pl-2 ">
//             <div className="w-full flex items-center">
//               <h1 className="font-[500] mr-3">{item.user.name}</h1>
//               <Ratings rating={data?.ratings} />
//             </div>
//             <p>{item.comment}</p>
//           </div>
//         </div>
//       ))}

//     <div className="w-full flex justify-center">
//       {data && data.reviews.length === 0 && (
//         <h5>No Reviews have for this product!</h5>
//       )}
//     </div>
//   </div>
// ) : null}

// {active === 3 && (
//   <div className="w-full block 800px:flex p-5">
//     <div className="w-full 800px:w-[50%]">
//       <Link to={`/shop/preview/${data.shop._id}`}>
//         <div className="flex items-center">
//           <img
//             src={`${backend_url}${data?.shop?.avatar}`}
//             className="w-[50px] h-[50px] rounded-full"
//             alt=""
//           />
//           <div className="pl-3">
//             <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
//             <h5 className="pb-2 text-[15px]">
//               ({averageRating}/5) Ratings
//             </h5>
//           </div>
//         </div>
//       </Link>
//       <p className="pt-2">{data.shop.description}</p>
//     </div>
//     <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
//       <div className="text-left">
//         <h5 className="font-[600]">
//           Joined on:{" "}
//           <span className="font-[500]">
//             {data.shop?.createdAt?.slice(0, 10)}
//           </span>
//         </h5>
//         <h5 className="font-[600] pt-3">
//           Total Products:{" "}
//           <span className="font-[500]">
//             {products && products.length}
//           </span>
//         </h5>
//         <h5 className="font-[600] pt-3">
//           Total Reviews:{" "}
//           <span className="font-[500]">{totalReviewsLength}</span>
//         </h5>
//         <Link to="/">
//           <div
//             className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
//           >
//             <h4 className="text-white">Visit Shop</h4>
//           </div>
//         </Link>
//       </div>
//     </div>
//   </div>
// )}
//     </div>
//   );
// };

// export default ProductDetails;

import React from "react";
import "./ProductsDetails.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-hot-toast";
import Ratings from "./Ratings";
import axios from "axios";

const ProductDetails = ({ data }) => {
  const [active, setActive] = useState(1);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishlist && wishlist.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishlist]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

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
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(2);

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
  console.log(data);
  return (
    <div>
      <>
        <header role="banner" aria-label="Heading">
          <div
            className="breadcrumb"
            role="navigation"
            aria-label="Breadcrumbs"
          >
            <div className="_cont">
              <ol>
                <li>
                  <Link title="Go To HomePage" to={"/"}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={`/shop/preview/${data?.shop._id}`} title="Shop">
                    {data?.shop.name}
                  </Link>
                </li>
                <li>{data?.name}</li>
              </ol>
            </div>
          </div>
        </header>
        <section
          aria-label="Main content"
          role="main"
          className="product-detail"
        >
          <div itemScope="" itemType="http://schema.org/Product">
            <meta
              itemProp="url"
              content="http://html-koder-test.myshopify.com/products/tommy-hilfiger-t-shirt-new-york"
            />
            <meta
              itemProp="image"
              content="//cdn.shopify.com/s/files/1/1047/6452/products/product_grande.png?v=1446769025"
            />
            <div className="shadow">
              <div className="_cont detail-top">
                <div className="cols">
                  <div className="left-col">
                    <div className="thumbs">
                      {data?.images.map((i, index) => {
                        return (
                          <Link>
                            <span>
                              <img
                                src={`${i?.url}`}
                                alt="Tommy Hilfiger T-Shirt New York"
                                onClick={() => setSelect(index)}
                              />
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="big">
                      <span
                        id="big-image"
                        className="img"
                        quickbeam="image"
                        style={{
                          backgroundImage: `url("${data?.images[select]?.url}")`,
                        }}
                      />

                      {/* Mobile */}
                      <div id="banner-gallery" className="swipe">
                        <div className="swipe-wrap">
                          <div
                            className=""
                            style={{
                              backgroundImage: ` url("${data?.images[select]?.url}")`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="right-col">
                    <h1 itemProp="name">{data?.name}</h1>
                    <div itemProp="offers" itemScope="">
                      <div className="price-shipping">
                        <div
                          className="price"
                          id="price-preview"
                          quickbeam="price"
                          quickbeam-price={800}
                        >
                          Rs.{data?.discountPrice}{" "}
                          <span className="text-red-600 font-serif text-lg line-through">
                            Rs.{data?.originalPrice}
                          </span>
                        </div>
                      </div>

                      <div className="py-5 text-center sm:text-left">
                        {data?.description}
                      </div>
                      <div className="swatches ">
                        <div className="swatch clearfix" data-option-index={0}>
                          <div className="header">Size</div>
                          <div
                            data-value="M"
                            className="swatch-element plain m available"
                          >
                            <input
                              id="swatch-0-m"
                              type="radio"
                              name="option-0"
                              defaultValue="M"
                              defaultChecked=""
                            />
                            <label htmlFor="swatch-0-m">
                              M
                              <img
                                className="crossed-out"
                                alt=""
                                src="//cdn.shopify.com/s/files/1/1047/6452/t/1/assets/soldout.png?10994296540668815886"
                              />
                            </label>
                          </div>
                          <div
                            data-value="L"
                            className="swatch-element plain l available"
                          >
                            <input
                              id="swatch-0-l"
                              type="radio"
                              name="option-0"
                              defaultValue="L"
                            />
                            <label htmlFor="swatch-0-l">
                              L
                              <img
                                className="crossed-out"
                                alt=""
                                src="//cdn.shopify.com/s/files/1/1047/6452/t/1/assets/soldout.png?10994296540668815886"
                              />
                            </label>
                          </div>
                          <div
                            data-value="XL"
                            className="swatch-element plain xl available"
                          >
                            <input
                              id="swatch-0-xl"
                              type="radio"
                              name="option-0"
                              defaultValue="XL"
                            />
                            <label htmlFor="swatch-0-xl">
                              XL
                              <img
                                className="crossed-out"
                                alt=""
                                src="//cdn.shopify.com/s/files/1/1047/6452/t/1/assets/soldout.png?10994296540668815886"
                              />
                            </label>
                          </div>
                          <div
                            data-value="XXL"
                            className="swatch-element plain xxl available"
                          >
                            <input
                              id="swatch-0-xxl"
                              type="radio"
                              name="option-0"
                              defaultValue="XXL"
                            />
                            <label htmlFor="swatch-0-xxl">
                              XXL
                              <img
                                className="crossed-out"
                                alt=""
                                src="//cdn.shopify.com/s/files/1/1047/6452/t/1/assets/soldout.png?10994296540668815886"
                              />
                            </label>
                          </div>
                        </div>
                      </div>

                      {/* <form method="post" enctype="multipart/form-data" id="AddToCartForm"> */}
                      <form id="AddToCartForm">
                        <div className=" ">
                          <div className=" flex  justify-center sm:justify-start  gap-7 mb-20">
                            <div className=" ">
                              <span>
                                {click ? (
                                  <AiFillHeart
                                    size={30}
                                    className="cursor-pointer"
                                    onClick={() =>
                                      removeFromWishlistHandler(data)
                                    }
                                    color={click ? "red" : "#333"}
                                    title="Remove from wishlist"
                                  />
                                ) : (
                                  <AiOutlineHeart
                                    size={30}
                                    className="cursor-pointer"
                                    onClick={() => addToWishlistHandler(data)}
                                    color={click ? "red" : "#333"}
                                    title="Add to wishlist"
                                  />
                                )}
                              </span>
                            </div>

                            <div className=" bg-blue-100  text-lg rounded w-[135px] flex justify-evenly  items-center ">
                              <span className="px-2">Qty.</span>
                              <span
                                className=" text-2xl  h-full px-2  flex justify-center items-center cursor-pointer"
                                onClick={incrementCount}
                              >
                                +
                              </span>
                              <span className="text-xl px-2 flex justify-center items-center ">{count}</span>
                              <span
                                className=" text-2xl  flex justify-center items-center  px-2 h-full cursor-pointer "
                                onClick={decrementCount}
                              >
                                -
                              </span>
                            </div>
                            <div
                              // id="AddToCart"
                              quickbeam="add-to-cart"
                              className="cursor-pointer bg-black flex justify-center items-center text-white py-2 px-5 w-[135px]"
                              onClick={() => addToCartHandler(data._id)}
                            >
                              <span>Add to Cart</span>
                            </div>
                          </div>
                        </div>
                      </form>
                      <div className="tabs border w-full h-full">
                        <div className="tab-labels w-full h-full flex justify-center items-center">
                          <span
                            onClick={() => setActive(1)}
                            className={active === 1 ? "active" : ""}
                          >
                            Info
                          </span>
                          <span
                            onClick={() => setActive(2)}
                            className={active === 2 ? "active" : ""}
                          >
                            Brand
                          </span>
                          <span
                            onClick={() => setActive(3)}
                            className={active === 3 ? "active" : ""}
                          >
                            Reviews
                          </span>
                        </div>
                        <div className="tab-slides">
                          <div
                            id="tab-slide-1"
                            itemProp="description"
                            className="slide active"
                          >
                            {active === 1 && `${data?.description}`}
                            {active === 3 ? (
                              <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
                                {data &&
                                  data.reviews.map((item, index) => (
                                    <div className="w-full flex my-2">
                                      <img
                                        src={`${item.user.avatar}`}
                                        alt=""
                                        className="w-[40px] h-[40px] rounded-full"
                                      />
                                      <div className="pl-2 ">
                                        <div className="w-full flex items-center">
                                          <p className="font-[500] text-lg mr-3">
                                            {item.user.name}
                                          </p>
                                          <Ratings rating={data?.ratings} />
                                        </div>
                                        <p>{item.comment}</p>
                                      </div>
                                    </div>
                                  ))}

                                <div className="w-full flex justify-center">
                                  {data && data.reviews.length === 0 && (
                                    <h5>No Reviews have for this product!</h5>
                                  )}
                                </div>
                              </div>
                            ) : null}

                            {active === 2 && (
                              <div className="w-full block 800px:flex p-5">
                                <div className="w-full 800px:w-[50%]">
                                  <Link to={`/shop/preview/${data.shop._id}`}>
                                    <div className="flex items-center">
                                      <img
                                        src={`${data?.shop?.avatar?.url}`}
                                        className="w-[50px] h-[50px] rounded-full"
                                        alt=""
                                      />
                                      <div className="pl-3">
                                        <h3 className={`${styles.shop_name}`}>
                                          {data.shop.name}
                                        </h3>
                                        <h5 className="pb-2 text-[15px]">
                                          ({averageRating}/5) Ratings
                                        </h5>
                                      </div>
                                    </div>
                                  </Link>
                                  <p className="pt-2">
                                    {data.shop.description}
                                  </p>
                                </div>
                                <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
                                  <div className="text-left">
                                    <h5 className="font-[600]">
                                      Joined on:{" "}
                                      <span className="font-[500]">
                                        {data.shop?.createdAt?.slice(0, 10)}
                                      </span>
                                    </h5>
                                    <h5 className="font-[600] pt-3">
                                      Total Products:{" "}
                                      <span className="font-[500]">
                                        {products && products.length}
                                      </span>
                                    </h5>
                                    <h5 className="font-[600] pt-3">
                                      Total Reviews:{" "}
                                      <span className="font-[500]">
                                        {totalReviewsLength}
                                      </span>
                                    </h5>

                                    <div
                                      className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                                      onClick={handleMessageSubmit}
                                    >
                                      <span className="text-white flex items-center">
                                        Send Message{" "}
                                        <AiOutlineMessage className="ml-1" />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div id="tab-slide-2" className="slide">
                            Tony Hunfinger
                          </div>
                        </div>
                      </div>
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quickbeam cart*/}

        {/* Quickbeam cart end */}
      </>
    </div>
  );
};

export default ProductDetails;

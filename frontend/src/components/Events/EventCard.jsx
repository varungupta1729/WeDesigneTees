import React from "react";
import { backend_url } from "../../server";
import styles from "../../styles/styles.js";
import CountDown from "./CountDown.jsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-hot-toast";


const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
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
  }
  return (
    <div
      className={`w-full block bg-[var(--box-color)] text-[var(--text-dark)] rounded-3xl ${
        active ? "unset" : "mb-12"
      } lg:flex p-2`}
    >
    <div className="w-full lg:-w[40%] m-auto rounded-xxl mr-10">
        <img className="rounded-xl"  src={`${backend_url}${data?.images[0]} `} alt="" />
      </div>
      <div className="w-full lg:[w-60%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle} text-[var(--text-dark)]`}>{data?.name}</h2>
        <p>{data?.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              Rs.{data?.originalPrice}
            </h5>
            <h5 className="font-bold text-[20px] text-[var(--text-dark) font-Roboto">
              Rs.{data?.discountPrice}
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            {data?.sold_out} sold
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          <Link to={`/product/${data?._id}?isEvent=true`}>
            <div className={`${styles.button} rounded-full text-[#fff]`}>See Details</div>
          </Link>
          <div className={` ml-5`} onClick={() => addToCartHandler(data)}>
            {/* <AddtoCartButton /> */}
            </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

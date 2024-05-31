import { useGoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { RxEyeClosed } from "react-icons/rx";
import { TfiEye } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { IoIosArrowRoundBack } from "react-icons/io";
import toast from "react-hot-toast";
import { RxAvatar } from "react-icons/rx";


const ShopCreate = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visilble1, setVisible1] = useState(false);
  const [visilble2, setVisible2] = useState(false);
  const [avatar, setAvatar] = useState();
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(`${server}/shop/create-shop`, {
        name,
        email,
        password,
        confirmPassword,
        avatar,
        zipCode,
        address,
        phoneNumber,
      })
      .then((res) => {
       
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAvatar();
        setZipCode();
        setAddress("");
        setPhoneNumber();
      })
      .catch((error) => {
        // console.log(error)
        toast.error(error.response.data.message);
      });
  };

const handleFileInputChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };


 
  return (
    <div className="min-h-screen w-screen flex flex-col sm:flex-row bg-[#222222]">
      <img
        className="sm:h-[50vh] sm:block sm:h-1/2 sm:w-1/2 sm:min-h-screen hidden object-none "
        src="https://st3.depositphotos.com/1765561/19342/i/450/depositphotos_193428778-stock-photo-black-t-shirt-on-black.jpg"
        alt="img"
      />
      <div className="gap-3  pt-10 h-[50vh] sm:h-1/2 sm:w-1/2 min-h-screen flex justify-center items-center flex-col rounded-t-3xl bg-white relative">
      <div className="absolute  top-7 left-9  ">
      <Link className=" flex flex-row gap-1"  to={'/'}>
      <IoIosArrowRoundBack className="text-2xl"/>
        Go back
      </Link>
     
      </div>
            <div className="text-3xl">Register As A Seller</div>
        <p>Welcome to the Wedesignetees</p>
        <form
          className="flex flex-col gap-3 justify-center items-center w-full mt-5"
          onSubmit={handleSubmit}
        >
          <div>
            <input
              className="outline p-2 w-[260px]  rounded-full"
              placeholder="Shop Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
            type="email"
              className="outline p-2 w-[260px]  rounded-full "
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
             type="number"
              className="outline p-2 w-[260px]  rounded-full "
              placeholder="Mobile Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div>
            <input
            type="address"
              className="outline p-2 w-[260px]  rounded-full "
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div>
            <input
              className="outline p-2 w-[260px]  rounded-full "
              placeholder="ZipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>

          <div className="relative">
            <input
              type={visilble1 ? "text" : "password"}
              className="outline p-2 w-[260px]  rounded-full"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {visilble1 ? (
              <TfiEye
                onClick={() => setVisible1(false)}
                className="absolute right-2 top-3 cursor-pointer"
              />
            ) : (
              <RxEyeClosed
                onClick={() => setVisible1(true)}
                className="absolute right-2 top-3 cursor-pointer"
              />
            )}
          </div>

          <div className="relative">
            <input
              type={visilble2 ? "text" : "password"}
              className="outline p-2 w-[260px]  rounded-full"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {visilble2 ? (
              <TfiEye
                onClick={() => setVisible2(false)}
                className="absolute right-2 top-3 cursor-pointer"
              />
            ) : (
              <RxEyeClosed
                onClick={() => setVisible2(true)}
                className="absolute right-2 top-3 cursor-pointer"
              />
            )}
          </div>

          <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700"
            ></label>
            <div className="mt-2 flex items-center">
              <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                
                {avatar ? (
                  <img
                    src={avatar}
                    alt="avatar"
                    className="h-full w-full object-cover rounded-full"
                  />
                ) : (
                  <RxAvatar className="h-8 w-8" />
                )}
              </span>
              <label
                htmlFor="file-input"
                className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <span>Upload Logo</span>
                <input
                  type="file"
                  name="avatar"
                  id="file-input"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileInputChange}
                  className="sr-only"
                />
              </label>
            </div>

          <button className="bg-black text-white  w-[260px] h-10 rounded-full ">
            Sign Up
          </button>
          <p>
            Already Have a Account ?{" "}
            <Link to={"/shop-login"}>
              <span className="text-blue-500">Login</span>
            </Link>{" "}
          </p>
        </form>

     
       
      </div>
    </div>
  );
};

export default ShopCreate;

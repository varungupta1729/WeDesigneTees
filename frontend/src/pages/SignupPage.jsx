import { useGoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { RxEyeClosed } from "react-icons/rx";
import { TfiEye } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../server.js";
import { IoIosArrowRoundBack } from "react-icons/io";
import toast from "react-hot-toast";

const SignupPage = () => {
  const [authInfo, setauthInfo] = useState(null);
  const [errorInfo, seterrorInfo] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visilble, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newForm = {
      name: name,
      email: email,
      password: password,
    };

    axios
      .post(`${server}/user/create-user`, newForm)
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        
      })
      .catch((err) =>{ 
        toast.error(err.response?.data?.message)});
  };

  async function fetchProfileInfo() {
    
    const apiResponse = await fetch(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${authInfo?.access_token}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authInfo?.access_token}`,
          Accept: "applicarion/json",
        },
      }
    );

    const result = apiResponse.json();

    // console.log(result);
  }

  useEffect(() => {

    if (authInfo) fetchProfileInfo();
  }, [authInfo]);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (response) => setauthInfo(response),
    onError: (error) => seterrorInfo(error),
  });
 useEffect(()=>{
  console.log(authInfo);
  console.log(errorInfo);
 })
 
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
        <div className="text-3xl">Sign Up</div>
        <p>Welcome to the Wedesignetees</p>
        <form
          className="flex flex-col gap-3 justify-center items-center w-full mt-5"
          onSubmit={handleSubmit}
        >
          <div>
            <input
              className="outline p-2 w-[260px]  rounded-full"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              className="outline p-2 w-[260px]  rounded-full "
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <input
              type={visilble ? "text" : "password"}
              className="outline p-2 w-[260px]  rounded-full"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {visilble ? (
              <TfiEye
                onClick={() => setVisible(false)}
                className="absolute right-2 top-3 cursor-pointer"
              />
            ) : (
              <RxEyeClosed
                onClick={() => setVisible(true)}
                className="absolute right-2 top-3 cursor-pointer"
              />
            )}
          </div>

          <button className="bg-black text-white  w-[260px] h-10 rounded-full ">
            Sign Up
          </button>
          <p>
            Already Have a Account ?{" "}
            <Link to={"/login"}>
              <span className="text-blue-500">Login</span>
            </Link>{" "}
          </p>
        </form>

        <div className="flex items-center gap-2 ">
          <hr className="w-16 h-[1px] my-8 bg-black border-0 rounded " />
          <p>Or</p>
          <hr className="w-16 h-[1px] my-8 bg-black border-0 rounded " />
        </div>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 border-black border-2  w-[260px] h-10 rounded-full "
        >
          <FcGoogle />
          Signup with Google
        </button>
      </div>
    </div>
  );
};

export default SignupPage;

import React from "react";
import { CiUser } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import black from "../../Assets/images/black.png";
import blacklogo from "../../Assets/images/black logo.png";
// import { productData } from "../../static/data";
import { useState } from "react";
import { useSelector } from "react-redux";
import Store from "../../redux/store";
import { userLogout } from "../../redux/actions/user";
import toast, { Toaster } from "react-hot-toast";
import WishList from "../WhishList/WhisList.jsx";
import Wishlist from "../WhishList/WhisList.jsx";
import axios from "axios";
import { backend_url, server } from "../../server.js";
import { RxCross1 } from "react-icons/rx";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import Navbar from "../Route/Navbar.jsx";
import { navItems } from "../../static/data.js";
import Cart from '../Cart/Cart.jsx'

const Header = ({ activeHeading }) => {

  const {cart} =useSelector((state)=>state.cart);
  const navigate = useNavigate();
  const [openWhishList, setOpenWishlist] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const { allProducts } = useSelector((state) => state.products);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const [open, setOpen] = useState(false);
  const { wishlist } = useSelector((state) => state.wishlist);
  
  const searchHandle = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  const handlelogout = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        window.location.reload(true);
        navigate("/login");
        toast.success("Logut Successfully");
      })
      .catch((err) => {
        toast.error(err.respnse.data.message);
      });
  };

  return (
    <div className=" flex flex-row justify-between py-3 lg:px-20  bg-[#fff]  ">
      <div className="w-72 hidden 800px:block">
        <Link to={"/"}>
          <img src={black} alt="logo" />
        </Link>
      </div>

      <div className="800px:flex flex-row text-2xl gap-2 justify-center items-center hidden  ">
        <div className="relative hidden sm:block ">
          <CiSearch className="absolute top-3 left-2" />
          <input
            className=" bg-slate-200 h-12 rounded-xl pl-10 text-sm  mr-4 outline-none "
            placeholder="Search..."
            value={searchTerm}
            onChange={searchHandle}
          />

          {searchData && searchData.length !== 0 && searchTerm.length !== 0 ? (
            <div className="absolute top-14 right-2 w-full z-10 bg-white ">
              {searchData &&
                searchData.map((i, index) => {
                 
                  return (
                    <Link to={`/product/${i._id}`}>
                      <div className="flex flex-row w-full  p-2">
                        <img
                         src={`${i.images[0]?.url}`}
                          className="w-[40px] h-[40px] mr-2"
                          alt=""
                        />
                        <p className="text-sm">{i.name}</p>
                      </div>
                    </Link>
                  );
                })}
            </div>
          ) : null}
        </div>

        <div className="flex flex-row justify-center items-center gap-3 px-4 border-s-2 border-black text-3xl">
          <div className="relative cursor-pointer" onClick={() => setOpenWishlist(true)}>
            {" "}
            <CiHeart  />{" "}
            <span className=" absolute right-0 top-0 w-4 h-4 bg-black text-white rounded-full text-[10px] p-0 m-0 flex justify-center items-center ">
            {wishlist && wishlist.length}
            </span>
          </div>
          <div className="relative cursor-pointer"   onClick={() => setOpenCart(true)}>
        
              <CiShoppingCart />
          
            <span className=" absolute right-0 top-0 w-4 h-4 bg-black text-white rounded-full text-[10px] p-0 m-0 flex justify-center items-center">
            {cart && cart.length}
            </span>
          </div>

          {isAuthenticated ? (
            <div className="relative group  w-[30px] h-[30px]  ">
              <img
                id="avatarButton"
                type="button"
                // data-dropdown-toggle="userDropdown"
                // data-dropdown-placement="bottom-start"
                className=" w-[30px] h-[30px] rounded-full cursor-pointer border-solid border-2  border-black"
                src={`${user?.avatar}`}
                alt="User dropdown"
              />
              {/* Dropdown menu */}
              <div className="absolute invisible group-hover:visible bg-white top-8 left-[5px] rotate-45 w-[20px] h-[20px] shadow z-20"></div>
              <div className=" absolute  invisible group-hover:visible  top-10 right-[-70px]   z-[1000]  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div>{user.name}</div>
                  <div className="font-medium truncate">{user.email}</div>
                </div>
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="avatarButton"
                >
                  <li>
                    <Link
                      to={"/profile"}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Account
                    </Link>
                  </li>
                  <li>
                    <Link to={'/inbox'} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      Inbox
                    </Link>
                  </li>
                  <li>
                  <Link
                    onClick={handlelogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </Link>
                  </li>
                </ul>
               
              </div>
            </div>
          ) : (
            <Link to={"/login"}>
              <CiUser />
            </Link>
          )}

               {/* cart popup */}
               {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {openWhishList ? (
            <Wishlist setOpenWishlist={setOpenWishlist} />
          ) : null}
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          active === true ? "mx-10 shadow-sm fixed top-0 left-0 z-10 " : null
        }
           w-full h-[70px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden px-3`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className=""
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src={blacklogo}
                alt=""
                className="mt-3 cursor-pointer w-[50px]"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <CiShoppingCart  size={30} />
              <span class="absolute right-0 top-0 rounded-full bg-[#000000] w-4 h-4 top right p-0 m-0 text-white  text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWhishList ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#00000088] z-20 h-full top-0 left-0 overflow-y-auto`}
          >
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll pb-10 ">
              <div className="w-full justify-between flex pr-3 ">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => setOpenWishlist(true) || setOpen(false)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span class="absolute right-0 top-0 rounded-full bg-[#000000] w-4 h-4 top right p-0 m-0 text-white  text-[12px]  leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-4 border-[#000000]   rounded-full outline-none "
                  value={searchTerm}
                  onChange={searchHandle}
                />
                {searchData && searchData.length !== 0 && searchTerm.length !== 0 ? (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i , index) => {
                      
                      return (
                        <Link to={`/product/${i._id}`}>
                          <div className="flex items-center">
                            <img
                              src={i.images[0]?.url}
                              alt=""
                              className="w-[50px] mr-2"
                            />
                            <h5>{i?.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              {/* <Navbar active={activeHeading} /> */}

              <div
                className={` flex flex-col justify-center items-center mt-[70px] styleNavHead gap-5`}
              >
                {navItems &&
                  navItems.map((i, index) => (
                    <div className="flex ">
                      <Link
                        to={i.url}
                        className={`${
                          active === index + 1
                            ? "text-[#000000]"
                            : "text-[#000000]"
                        } py-2 800px:pb-0 font-[500] px-8 cursor-pointer o-underline hover:bg-black hover:text-white rounded-full }`}
                      >
                        {i.title}
                      </Link>
                    </div>
                  ))}
              </div>

              <br />
              <br />
              

              <div className="flex w-full justify-center items-center ">
                {isAuthenticated ? (
                  <div className="bg-slate-200 px-5 py-3 rounded-2xl flex flex-col justify-center items-center">
                  <div>
                    <Link to="/profile" className="flex  justify-between items-center gap-6">
                      <img
                     src={`${user?.avatar}`}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[2px] border-[#000000]"
                      />
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p>{user.email}</p>
                      </div>

                     
                    </Link>
                    </div>
                    <div className="flex flex-col gap-2 w-full mt-5 justify-center items-center">
                      <Link to="/profile">
                        <button className="bg-black px-3 py-2 text-white rounded-xl"> Edit Profile</button>
                      </Link>
                    </div>
                  
                  </div>
                ) : (
                  <div className="flex flex-col gap-5">
                    <Link
                      to="/login"
                      className="text-[18px] px-16 rounded-full py-2 flex items-center justify-center text-white bg-black"
                    >
                      Login 
                    </Link>
                    <Link
                      to="/signup"
                      className="text-[18px] px-16 rounded-full py-2  flex items-center justify-center text-white bg-black"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

import React, { useState } from "react";
import "./dashboard.css";
import "https://kit.fontawesome.com/075922b03a.js";
import { Link, NavLink } from "react-router-dom";
import DasboardContent from "./DasboardContent.jsx";
import { backend_url, server } from "../../server.js";
import { useSelector } from "react-redux";
import AddProduct from "../../components/Dashboard/AddProduct";
import axios from "axios";
import toast from "react-hot-toast";
import { FaChartBar, FaChartLine, FaChartPie } from "react-icons/fa";

const ShopDashboardPage = () => {
  const { seller } = useSelector((state) => state.seller);
  console.log(seller);
  const [menuActive, setMenuActive] = useState(false);
  const [active, setActive] = useState(1);
  const handleMenuClick = () => {
    setMenuActive(!menuActive);
  };

  const logoutHandler = async () => {
    axios.get(`${server}/shop/logout`, {
      withCredentials: true,
    });
    window.location.reload();
  };

  return (
    <>
      <div className="admin-dashboard">
        <div className={`ds-left-menu ${menuActive ? "menu-active" : ""}`}>
          <button className="btn-menu" onClick={handleMenuClick}>
            <i className="fa-solid fa-circle-chevron-left" />
          </button>
          <Link to={`/shop/${seller?._id}`}>
            <div className="ds-perfil ">
              <div className="foto">
                <img  src={`${seller.avatar?.url}`} alt="" />
              </div>
              <div className="info-perfil">
                <span>Shop</span>
                <h3>{seller?.name}</h3>
              </div>
            </div>
          </Link>

          <div className="ds-menu">
            <ul>
              <li>
                <Link
                  onClick={() => setActive(1)}
                  style={
                    active === 1
                      ? { backgroundColor: "white", color: "black" }
                      : null
                  }
                >
                  <i className="fa-solid fa-home" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <NavLink
                  onClick={() => setActive(2)}
                  style={
                    active === 2
                      ? { backgroundColor: "white", color: "black" }
                      : null
                  }
                >
                  <i className="fa-solid fa-book" />
                  <span>All Orders</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setActive(3)}
                  style={
                    active === 3
                      ? { backgroundColor: "white", color: "black" }
                      : null
                  }
                >
                  <i class="fa-solid fa-cube"></i>
                  <span>All Products</span>
                </NavLink>
              </li>
              <li>
                <Link
                  onClick={() => setActive(4)}
                  style={
                    active === 4
                      ? { backgroundColor: "white", color: "black" }
                      : null
                  }
                >
                  <i className="fa-solid fa-pen-to-square" />
                  <span>Create Product</span>
                </Link>
              </li>
              <li>
                <NavLink
                  onClick={() => setActive(5)}
                  style={
                    active === 5
                      ? { backgroundColor: "white", color: "black" }
                      : null
                  }
                >
                  <i className="fa-solid fa-clipboard-list" />
                  <span>All Events</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setActive(6)}
                  style={
                    active === 6
                      ? { backgroundColor: "white", color: "black" }
                      : null
                  }
                >
                  <i class="fa-solid fa-file-pen"></i>
                  <span>Create Event</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setActive(7)}
                  style={
                    active === 7
                      ? { backgroundColor: "white", color: "black" }
                      : null
                  }
                >
                  <i class="fa-solid fa-indian-rupee-sign"></i>
                  <span>Withdraw Money</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setActive(8)}
                  style={
                    active === 8
                      ? { backgroundColor: "white", color: "black" }
                      : null
                  }
                >
                  <i class="fa-solid fa-envelope"></i>
                  <span>Shop Inbox</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setActive(9)}
                  style={
                    active === 9
                      ? { backgroundColor: "white", color: "black" }
                      : null
                  }
                >
                  <i class="fa-solid fa-gift"></i>
                  <span>Discount Codes</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setActive(10)}
                  style={
                    active === 10
                      ? { backgroundColor: "white", color: "black" }
                      : null
                  }
                >
                  <i class="fa-solid fa-arrow-right-arrow-left"></i>
                  <span>Refunds</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={() => setActive(11)}
                  style={
                    active === 11
                      ? { backgroundColor: "white", color: "black" }
                      : null
                  }
                >
                  <i class="fa-solid fa-gear"></i>
                  <span>Settings</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="sign-off" onClick={logoutHandler}>
            <Link className="btn-sign-off text-center">
              <i className="fa-solid fa-arrow-right-to-bracket" />
              <span>Sign Out</span>
            </Link>
          </div>
        </div>
        <div className={`ds-panel ${menuActive ? "tab-menu" : ""}`}>
          <div className="panel-header flex justify-between px-5 py-4">
            <h2>Welcome! {seller?.name}</h2>
            <div className="flex gap-7 text-xl">
              
              <FaChartBar className="cursor-pointer" onClick={()=>setActive(12)}/>
              <FaChartPie className="cursor-pointer" onClick={()=>setActive(13)}  />
              <FaChartLine className="cursor-pointer" onClick={()=>setActive(14)} />
            </div>
          </div>
          <div
            className={
              active === 4
                ? " flex justify-evenly items-center bg-white p-[10px] rounded-2xl "
                : "bg-white p-[10px] rounded-2xl"
            }
          >
            <DasboardContent active={active} setActive={setActive} />
            {active === 4 && <AddProduct />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopDashboardPage;

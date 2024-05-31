import React from "react";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom/dist";
import Black from "../../Assets/images/black.png";

const Navbar = ({ active }) => {
  return (
    <div className=" hidden lg:block lg:h-[40px] bg-[#fff]">
      <ul className="flex flex-row justify-center items-center gap-7 py-2 border">
        {navItems.map((item) => {
          return (
            <Link to={item.url}>
              <li className="">{item.title}</li>
            </Link>
          );
        })}
      </ul>
   
    </div>
  );
};

export default Navbar;

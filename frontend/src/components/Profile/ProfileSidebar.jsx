import React, { useEffect } from 'react'
import clsx from 'clsx';
import { useSpring, animated, config} from '@react-spring/web';
import { useState } from 'react';
import './ProfileSidebarstyle.css'
import { useSelector } from 'react-redux';
import { RiUserLine } from "react-icons/ri"
import { MdOutlinePayment } from "react-icons/md"; 
import { LiaShoppingBagSolid } from "react-icons/lia";
import { TbReceiptRefund } from "react-icons/tb";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { HiOutlineTruck } from "react-icons/hi2";
import { FaRegAddressCard } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineLogout } from "react-icons/ai";
import { RiKey2Line } from "react-icons/ri";

const ProfileSidebar = ({active , setActive , sidebar , setSidebar}) => {

  
  
    const {isAuthenticated , user} = useSelector((state)=>state.user);

    return (
      <div className="flex bg-white">
          <div
      className={clsx(
        ' inset-y-0 transition w-[60%] z-[10000000]  xl:z-0 bg-white sm:w-20 xl:w-72 px-7 border-gray-200 border-r-2  sm:flex flex-col ',
        sidebar ? 'flex fixed sm:relative' : 'hidden',
      )}
    >
      <div className="flex-shrink-0 overflow-hidden p-2">
        <div className="flex items-center h-full sm:justify-center xl:justify-start p-2 ">
        
          <div className="flex-grow sm:hidden xl:block" />
           <RxCross1 
             size={22}
            className="block cursor-pointer sm:hidden "
            onClick={()=>setSidebar(!sidebar)}
          /> 
        </div>
      </div>


      <div className="flex-grow overflow-x-hidden overflow-y-auto flex flex-col">
      
        {sidebarItems[0].map((i) => (
          <MenuItem
            key={i.id}
            item={i}
            setActive={setActive}
            active={active}
          />
        ))}
       
        {sidebarItems[1].map((i) => (
          <MenuItem
            key={i.id}
            item={i}
            setActive={setActive}
            active={active}
          />
        ))}
        <div className="flex-grow" />
       
      </div>

      <div className="flex-shrink-0 overflow-hidden p-2">
        <div className="flex items-center h-full sm:justify-center xl:justify-start p-2 sidebar-separator-bottom">
          <img  src={`${user?.avatar}`} className="w-10 h-10 rounded-full" alt='' />
          <div className="block sm:hidden xl:block ml-2 font-bold ">
            {user?.name}
          </div>
          <div className="flex-grow block sm:hidden xl:block" />
          {/* <Icon
            path="res-react-dash-options"
            className="block sm:hidden xl:block w-3 h-3"
          /> */}
        </div>
      </div>
    </div>
       
      </div>
    );
}

export default ProfileSidebar







const sidebarItems = [
  [
    { id: 0, title: 'Profile', notifications: false },
    { id: 1, title: 'Orders', notifications: false },
    { id: 2, title: 'Inbox', notifications: false },
   
  ],
  [ { id: 3, title: 'Refunds', notifications: false },
    { id: 4, title: 'Track Order', notifications: false },
    { id: 5, title: 'Change Password', notifications: false },
    { id: 6, title: 'Payment Methods', notifications: false },
    { id: 7, title: 'Address', notifications: false },
    { id: 8, title: 'Logout', notifications: false },
  ],
];







function MenuItem({ item: { id, title, notifications }, active , setActive }) {
  
  return (
    <div
      className={clsx(
        'w-full mt-6 flex  items-center py-3  px-3 sm:px-0 xl:px-5 justify-start sm:justify-center xl:justify-start sm:mt-6 xl:mt-3 cursor-pointer',
        active === id ? 'sidebar-item-selected' : 'sidebar-item',
      )}
      onClick={() => setActive(id)}
    >
      <SidebarIcons id={id} />
      <div className="block sm:hidden xl:block ml-2">{title}</div>
      <div className="block sm:hidden xl:block flex-grow" />
      {notifications && (
        <div className="flex sm:hidden xl:flex bg-pink-600  w-5 h-5  items-center justify-center rounded-full mr-2">
          <div className="text-white text-sm">{notifications}</div>
        </div>
      )}
    </div>
  );
}

function SidebarIcons({ id }) {
  const icons = {
    0: (
      
      <RiUserLine size={22} />
      
    ),
    1: (
        <LiaShoppingBagSolid size={22}/>
    ),
    2: (
        <HiOutlineChatBubbleLeftRight size={22}/>
    ),
    3: (
        <TbReceiptRefund size={22}/>
    ),
    4: (
        <HiOutlineTruck size={23}/>
    ),
    5: (
      <RiKey2Line  size={22} />
  ),
  6: (
    <MdOutlinePayment size={22} />
),
    7: (
        <FaRegAddressCard size={23}/>
    ),
    8: (
      <AiOutlineLogout size={23}/>
  ),
  };
  return (
    <svg
      className="w-7 h-7 xl:w-5 xl:h-5"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {icons[id]}
    </svg>
  );
}




function Image({ path = '1', className = 'w-4 h-4' }) {
  return (
    <img
      src={`https://assets.codepen.io/3685267/${path}.jpg`}
      alt=""
      className={clsx(className, 'rounded-full')}
    />
  );
}

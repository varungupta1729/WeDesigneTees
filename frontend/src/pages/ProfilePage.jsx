import React, { useState } from "react";
import Header from "../components/Layout/Header";
import ProfileSidebar from "../components/Profile/ProfileSidebar.jsx";
import ProfileContent from "../components/Profile/ProfileContent.jsx";

const ProfilePage = () => {
  const [active, setActive] = useState(0);
  const [sidebar, setSidebar] = useState(false);
  // const [showSidebar, onSetShowSidebar] = useState(false);
  console.log(active);
  return (
    <div className="relative">
      <Header />
      <div className={`w-full h-full flex bg-[#eeeeee] `}>
        <ProfileSidebar
          active={active}
          setActive={setActive}
          sidebar={sidebar}
          setSidebar={setSidebar}
          // onSidebarHide={() => {
          // onSetShowSidebar(false);
          // }}
          // showSidebar={showSidebar}
        />
        <ProfileContent active={active} sidebar={sidebar}
          setSidebar={setSidebar} />
      </div>
    </div>
  );
};

export default ProfilePage;

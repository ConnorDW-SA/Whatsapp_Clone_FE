import React from "react";
import SideHeader from "./SideHeader";

import Chats from "./Chats";
import MyProfile from "./MyProfile";
import { useSelector } from "react-redux";

function SideView() {
  const myProfile = useSelector((state) => state.home.myProfile);

  return (
    <div className="side-view">
      {myProfile ? (
        <MyProfile />
      ) : (
        <div>
          <SideHeader />
          <Chats />
        </div>
      )}
    </div>
  );
}

export default SideView;

import React from "react";
import SideHeader from "./SideHeader";
import Search from "./Search";
import Chats from "./Chats";
import MyProfile from "./MyProfile";
import { useSelector } from "react-redux";

function SideView() {
  const myProfile = useSelector((state) => state.home.myProfile);
  console.log(myProfile);

  return (
    <div className="side-view">
      {myProfile ? (
        <MyProfile />
      ) : (
        <div>
          <SideHeader />
          <Search />
          <Chats />
        </div>
      )}
    </div>
  );
}

export default SideView;

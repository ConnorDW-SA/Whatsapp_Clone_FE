import React from "react";
import SideHeader from "./SideHeader";
import Search from "./Search";
import Chats from "./Chats";

function SideView() {
  return (
    <div className="side-view">
      <SideHeader />
      <Search />
      <Chats />
    </div>
  );
}

export default SideView;

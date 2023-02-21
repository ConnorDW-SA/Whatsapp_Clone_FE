import React from "react";
import SideView from "./SideView";
import MainView from "./SingleChat/MainViewLogin";

function Home() {
  return (
    <div className="home d-flex">
      <SideView />
      <MainView />
    </div>
  );
}

export default Home;

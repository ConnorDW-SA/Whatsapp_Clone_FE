import React from "react";
import SideView from "./SideView";
import MainView from "./MainView";

function Home() {
  return (
    <div className="home d-flex">
      <img src="./stolen/phone.svg" alt="phone" className="phone" />
      <SideView />
      <MainView />
    </div>
  );
}

export default Home;

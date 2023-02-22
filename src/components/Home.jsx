import React, { useEffect } from "react";
import SideView from "./SideView";

import { useDispatch } from "react-redux";
import { ADD_MY_CHATS } from "../redux/actions";
import MainView from "./SingleChat/MainView/MainView";

function Home() {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");

  const fetchMyChats = async () => {
    try {
      const response = await fetch("http://localhost:3001/chats", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response) {
        const data = await response.json();
        console.log(data);
        dispatch({
          type: ADD_MY_CHATS,
          payload: data,
        });
      } else {
        console.log("Error while fetching chats");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyChats();
  }, []);
  return (
    <div className="home d-flex">
      <SideView />
      <MainView />
    </div>
  );
}

export default Home;

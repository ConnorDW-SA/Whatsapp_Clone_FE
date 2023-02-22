import React from "react";
import { useSelector } from "react-redux";

import ChatCard from "./ChatCard";

function Chats() {
  const chats = useSelector((state) => state.home.chats.list);

  return (
    <div className="chats-container">
      {/* {chats && chats.map((chat) => <ChatCard key={chat._id} chat={chat} />)} */}
    </div>
  );
}

export default Chats;

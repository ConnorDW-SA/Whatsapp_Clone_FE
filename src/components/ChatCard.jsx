import React from "react";
import { ReactComponent as Profile } from "./icons/profile.svg";

function ChatCard(props) {
  const chat = props.chat;

  return (
    <div className="chat-card d-flex">
      <div>
        <Profile className="chats-profile" />
      </div>
      <div className="flex-grow-1 pl-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="profile-name">Name</div>
          <div className="chat-date">14/02/2023</div>
        </div>
        <div className="chat-preview">
          This is a somewhat longer chat preview for testing purposes
        </div>
      </div>
    </div>
  );
}

export default ChatCard;

import React from "react";
import { ReactComponent as Profile } from "./icons/profile.svg";
import { SET_CURRENT_CHAT } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function ChatCard(props) {
  const chat = props.chat;
  const activeChat = useSelector((state) => state.home.chats.active);

  const dispatch = useDispatch();

  const handleChatClick = async (chat) => {
    try {
      const response = await fetch(`http://localhost:3001/chats/${chat._id}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Y1ZjA3NWIzYmFiODJmZDI3Y2I2NDMiLCJpYXQiOjE2NzcwODEwODQsImV4cCI6MTY3NzY4NTg4NH0.aOuypBL6P6QhzcDirkOGDoI_0GBPX0ujrksjcWEuAAE",
        },
      });
      if (response) {
        const data = await response.json();

        dispatch({ type: SET_CURRENT_CHAT, payload: data });
      } else {
        console.log("Error while fetching the messages");
      }
    } catch (error) {}
  };

  return (
    <div
      onClick={async () => await handleChatClick(chat)}
      className={
        activeChat._id === chat._id
          ? "chat-card-active d-flex"
          : "chat-card d-flex"
      }
    >
      <div>
        <Profile className="chats-profile" />
      </div>
      <div className="chat-prev-border flex-grow-1 pl-3">
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

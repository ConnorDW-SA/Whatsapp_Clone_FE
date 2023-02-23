import React from "react";
import { ReactComponent as Profile } from "./icons/profile.svg";
import { SET_CURRENT_CHAT } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function ChatCard(props) {
  const chat = props.chat;
  const lastMessage = chat.messages && chat.messages[chat.messages.length - 1];
  const currentUser = useSelector((state) => state.home.userInfo);
  const accessToken = localStorage.getItem("accessToken");
  const targetUser =
    chat.length !== 0 &&
    chat.users.find((user) => user.username !== currentUser.username);
  const activeChat = useSelector((state) => state.home.chats.active);

  const dispatch = useDispatch();

  const handleChatClick = async (chat) => {
    try {
      const response = await fetch(`http://localhost:3001/chats/${chat._id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
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
        activeChat && activeChat._id === chat._id
          ? "chat-card-active d-flex"
          : "chat-card d-flex"
      }
    >
      <div>
        <Profile className="chats-profile" />
      </div>
      <div className="chat-prev-border flex-grow-1 pl-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="profile-name">
            {targetUser && targetUser.username}
          </div>
          <div className="chat-date">
            {lastMessage && lastMessage.createdAt}
          </div>
        </div>
        <div className="chat-preview">{lastMessage && lastMessage.text}</div>
      </div>
    </div>
  );
}

export default ChatCard;

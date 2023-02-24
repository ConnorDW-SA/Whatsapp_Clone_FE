import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as SearchIcon } from "./icons/search.svg";
import { ReactComponent as Dots } from "./icons/threeDots.svg";
import ChatCard from "./ChatCard";
import { ReactComponent as ThreeLines } from "./icons/ThreeLines.svg";
import { ReactComponent as Profile } from "./icons/profile.svg";
import { UPDATE_CHATS } from "../redux/actions";

function Chats() {
  const [searchTerm, setSearchTerm] = useState("");
  const chats = useSelector((state) => state.home.chats.list);
  const users = useSelector((state) => state.home.users.users);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");

  const fetchCreatedChat = async (chatId) => {
    try {
      const response = await fetch(`http://localhost:3001/chats/${chatId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (response) {
        const data = await response.json();
        dispatch({ type: "SET_CURRENT_CHAT", payload: data });
        dispatch({ type: "UPDATE_CHATS", payload: data });
      } else {
        console.log("Error while fetching the created chat");
      }
    } catch (error) {}
  };

  const createChat = async (user) => {
    try {
      const users = [user];
      const messages = [];
      const newChat = { users, messages };
      const response = await fetch(`http://localhost:3001/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(newChat)
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        fetchCreatedChat(data);
      } else {
        console.log("Error while trying to create a new chat");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredChats = chats.filter((chat) => {
    const targetUser = chat.users.find(
      (user) => user.username !== users.username
    );
    const targetUserName = targetUser && targetUser.username;
    return (
      targetUserName &&
      targetUserName.toLowerCase() === searchTerm.toLowerCase()
    );
  });
  const filteredUsers =
    users.length !== 0 &&
    users.filter(
      (user) => user.username.toLowerCase() === searchTerm.toLowerCase()
    );

  return (
    <div className="chats-container">
      <div className="search-bar bg-white py-2 d-flex">
        <span className="mt-1 ml-2 mr-4">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Search chats and users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-75 rounded-lg p-1"
        />
        <span className="mt-1 ml-3">
          <ThreeLines />
        </span>
      </div>
      {chats.length !== 0 &&
        filteredChats.map((chat) => <ChatCard key={chat._id} chat={chat} />)}
      {chats.length === 0 &&
        filteredUsers.map((user) => (
          <div
            key={user._id}
            className="user d-flex chat-card"
            onClick={() => createChat(user._id)}
          >
            <div>
              <Profile className="chats-profile" />
            </div>
            <div className="chat-prev-border flex-grow-1 pl-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="profile-name">{user.username}</div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Chats;

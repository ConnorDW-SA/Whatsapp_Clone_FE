import React, { useEffect, useState } from "react";
import { ReactComponent as SmileyOne } from "../icons/SmileyOne.svg";
import { ReactComponent as Paperclip } from "../icons/Paperclip.svg";
import { ReactComponent as Mic } from "../icons/Mic.svg";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { SET_CHATS_HISTORY } from "../../../redux/actions";
import { SET_CHAT_HISTORY } from "../../../redux/actions";

// 1. When we send a message we should trigger a "sendMessage" event
// 2. Server listens for that event and then will send the message to the targetUser

const socket = io("http://localhost:3001", { transports: ["websocket"] });

function MessageInput() {
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const currentUser = useSelector((state) => state.home.userInfo);
  const currentChat = useSelector((state) => state.home.chats.active);

  const sendMessage = async () => {
    try {
      // 1. Create the newMessage
      const newMessage = {
        text: text,
        user: currentUser._id,
        chat: currentChat._id,
        createdAt: new Date(),
      };
      // 2. Update the chat history (Redux)
      const payload = newMessage;

      // dispatch({
      //   type: SET_CHAT_HISTORY,
      //   payload: payload,
      // });

      // 3. Send the http req to BE (POST method)
      const response = await fetch("http://localhost:3001/messages", {
        method: "POST",
        body: JSON.stringify(newMessage),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      if (response) {
        const data = await response.json();
        console.log(data);
      } else {
        console.log("Error while trying to post a new message");
      }
      // 4. Emit to the targetUser the newMessage
      socket.emit("sendMessage", { message: newMessage });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bottom-0 convo-footer d-flex align-items-center">
      <span className="m-3 text-muted">
        <SmileyOne />
      </span>
      <span className="m-3 text-muted">
        <Paperclip />
      </span>

      <input
        type="text"
        className="form-control h-75 message-input rounded-lg message-input"
        placeholder="Type a message"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      />
      <span className="m-3 text-muted">
        <Mic
          onClick={() => {
            sendMessage();
          }}
        />
      </span>
    </div>
  );
}

export default MessageInput;

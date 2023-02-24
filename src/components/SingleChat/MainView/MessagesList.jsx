import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { SET_CHATS_HISTORY, SET_CHAT_HISTORY } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

const socket = io("http://localhost:3001", { transports: ["websocket"] });

function MessagesList() {
  // let currentSender = "";

  // const messages = [...MessagePersonOne, ...MessagePersonTwo].sort((a, b) =>
  //   a.createdAt.localeCompare(b.createdAt)
  // );
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.home.userInfo);
  const currentChat = useSelector((state) => state.home.chats.active);

  useEffect(() => {
    socket.on("welcome", (welcomeMessage) => {
      console.log(welcomeMessage);

      socket.on("newMessage", (newMessage) => {
        console.log(newMessage);
        const payload = [currentChat._id, newMessage.message];
        dispatch({
          type: SET_CHATS_HISTORY,
          payload: payload
        });
        // dispatch({
        //   type: SET_CHAT_HISTORY,
        //   payload: payload,
        // });
      });
    });
  });

  return (
    <div className="d-flex flex-column convo-div">
      {/* {messages.map((message, index) => {
        const sender = MessagePersonOne.includes(message)
          ? "person-one-messages"
          : "person-two-messages";
        const isNewSender = currentSender !== sender;
        currentSender = sender;

        const messageClasses = `message-container p-2 m-1 text-wrap rounded-lg ${sender} ${
          sender === "person-one-messages" ? "bg-message-whatsapp" : "bg-white"
        }`;

        return (
          <div
            key={index}
            className={`wrapper-${sender} w-50 ${
              sender === "person-one-messages"
                ? "pl-5  ml-auto mr-5"
                : "pr-5 ml-5"
            }`}
          >
            {isNewSender && <div className="sender-indicator"></div>}
            <span key={message.createdAt}>
              <p className={messageClasses}>
                {message.text}
                <span className="timestamp-messages">
                  {formatTime(message.createdAt)}
                </span>
              </p>
            </span>
          </div>
        );
      })} */}

      <ul className="messages">
        {currentChat.messages.map((message) => (
          <li
            key={message !== null && message._id}
            className={
              message !== null && message.user === currentUser._id
                ? "sender-msg"
                : "receiver-msg"
            }
          >
            {message.user === currentUser._id ? (
              <div>{currentUser.username}</div>
            ) : (
              <div>{message.user}</div>
            )}
            {message !== null && message.text}
            <div className="message-time">
              {message !== null && format(new Date(message.createdAt), "HH:mm")}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MessagesList;

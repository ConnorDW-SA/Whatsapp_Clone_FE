import React from "react";
import MessagePersonOne from "../Chats/PersonOne.json";
import MessagePersonTwo from "../Chats/PersonTwo.json";

function formatTime(timeString) {
  const date = new Date(timeString);
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");
  return `${hour}:${minute}`;
}

function MessagesList() {
  let currentSender = "";

  const messages = [...MessagePersonOne, ...MessagePersonTwo].sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt)
  );

  return (
    <div className="d-flex flex-column convo-div">
      {messages.map((message, index) => {
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
      })}
    </div>
  );
}

export default MessagesList;

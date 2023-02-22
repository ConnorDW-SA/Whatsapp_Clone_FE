import React from "react";

import MessagePersonOne from "../Chats/PersonOne.json";
import MessagePersonTwo from "../Chats/PersonTwo.json";

function MessagesList() {
  let currentSender = "";

  const messages = [...MessagePersonOne, ...MessagePersonTwo].sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt)
  );

  return (
    <div className="d-flex flex-column convo-div">
      {messages.map((message, index) => {
        const sender = MessagePersonOne.includes(message)
          ? "person-one"
          : "person-two";
        const isNewSender = currentSender !== sender;
        currentSender = sender;

        const messageClasses = `message-container p-2 m-1 text-wrap rounded-lg ${sender} ${
          sender === "person-one" ? "bg-message-whatsapp" : "bg-white"
        }`;

        return (
          <div
            key={index}
            className={`wrapper-${sender} w-50 ${
              sender === "person-one" ? "pl-5" : "pr-5"
            }`}
          >
            {isNewSender && <div className="sender-indicator"></div>}
            <span key={message.createdAt}>
              <p className={messageClasses}>{message.text}</p>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default MessagesList;

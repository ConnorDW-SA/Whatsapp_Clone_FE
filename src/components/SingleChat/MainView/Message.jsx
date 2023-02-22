import React from "react";
import moment from "moment";

function MessageBubble({ message, sender }) {
  const align = sender === "PersonOne" ? "text-right" : "text-left";
  return (
    <div className={`d-block mb-2 ${align}`}>
      <span className="d-block mb-1 font-weight-bold">{message.text}</span>
      <small className="d-block text-muted">
        {moment(message.createdAt).fromNow()}
      </small>
    </div>
  );
}

export default MessageBubble;

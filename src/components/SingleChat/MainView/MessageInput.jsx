import React from "react";
import { ReactComponent as SmileyOne } from "../icons/SmileyOne.svg";
import { ReactComponent as Paperclip } from "../icons/Paperclip.svg";
import { ReactComponent as Mic } from "../icons/Mic.svg";

function MessageInput() {
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
      />
      <span className="m-3 text-muted">
        <Mic />
      </span>
    </div>
  );
}

export default MessageInput;

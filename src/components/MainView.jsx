import React from "react";
import ChatHeader from "./ChatHeader";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";

function ChatView() {
  return (
    <div className="chat-view d-flex flex-column justify-content-between">
      <ChatHeader />
      <MessagesList />
      <MessageInput />
    </div>
  );
}

export default ChatView;

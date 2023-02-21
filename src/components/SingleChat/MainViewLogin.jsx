import React, { useState } from "react";

import { ReactComponent as LoadIcon } from "./icons/LoadIcon.svg";

function ChatView() {
  return (
    <div className="chat-view d-flex flex-column justify-content-center align-items-center">
      <LoadIcon />
      <h3 className="mt-5">WhatsApp Web</h3>
      <p>
        Send and receive messages without keeping your phone online. <br />
        Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
      </p>
    </div>
  );
}

export default ChatView;

import React, { useState } from "react";
import { ReactComponent as LoadIcon } from "../icons/LoadIcon.svg";
import { ReactComponent as LockIcon } from "../icons/Lock.svg";

function MainLogin() {
  return (
    <div className="chat-view">
      <div className="wrapper d-flex flex-column h-100  align-items-center">
        <div className=" d-flex flex-column justify-content-center h-100  align-items-center">
          <LoadIcon />
          <h2 className="mt-5 font-weight-lighter">WhatsApp Web</h2>
          <p className="font-weight-lighter text-muted small">
            Send and receive messages without keeping your phone online. <br />
            Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
          </p>
        </div>
        <div className="font-weight-lighter text-muted small pb-3">
          <p>
            <LockIcon /> End-to-end encrypted
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainLogin;

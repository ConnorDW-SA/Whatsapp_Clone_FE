import React from "react";
import { ReactComponent as Profile } from "./icons/profile.svg";
import { ReactComponent as Group } from "./icons/group.svg";
import { ReactComponent as Circle } from "./icons/circle.svg";
import { ReactComponent as Chat } from "./icons/chat.svg";
import { ReactComponent as ThreeDots } from "./icons/threeDots.svg";

function SideHeader() {
  return (
    <div className="side-header d-flex justify-content-between">
      <Profile className="my-icon" />

      <div className="d-flex align-items-center">
        <div className="header-icon">
          <Group />
        </div>

        <div className="header-icon">
          <Circle />
        </div>

        <div className="header-icon">
          <Chat />
        </div>

        <div className="header-icon">
          <ThreeDots />
        </div>
      </div>
    </div>
  );
}

export default SideHeader;

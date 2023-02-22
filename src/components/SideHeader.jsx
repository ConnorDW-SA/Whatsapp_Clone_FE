import React, { useState } from "react";
import { ReactComponent as Profile } from "./icons/profile.svg";
import { ReactComponent as Group } from "./icons/group.svg";
import { ReactComponent as Circle } from "./icons/circle.svg";
import { ReactComponent as Chat } from "./icons/chat.svg";
import { ReactComponent as ThreeDots } from "./icons/threeDots.svg";
import Dropdown from "./Dropdown";

function SideHeader() {
  const textContent = [
    "New Group",
    "New Community",
    "Starred messages",
    "Settings",
    "Log out",
  ];

  const [optionsClicked, setOptionsClicked] = useState(false);
  const [groupClicked, setGroupClicked] = useState(false);
  const [circleClicked, setCircleClicked] = useState(false);
  const [chatClicked, setChatClicked] = useState(false);

  return (
    <div className="side-header d-flex justify-content-between">
      <div
        className={
          optionsClicked
            ? "d-block absolute-options"
            : "d-none absolute-options"
        }
      >
        <Dropdown textContent={textContent} />
      </div>
      <div>
        <Profile className="my-icon" />
      </div>

      <div className="d-flex align-items-center">
        <div
          onClick={() => {
            setGroupClicked(!groupClicked);
          }}
          className={groupClicked ? "header-icon-clicked" : "header-icon"}
        >
          <Group />
        </div>

        <div
          onClick={() => {
            setCircleClicked(!circleClicked);
          }}
          className={circleClicked ? "header-icon-clicked" : "header-icon"}
        >
          <Circle />
        </div>

        <div
          onClick={() => {
            setChatClicked(!chatClicked);
          }}
          className={chatClicked ? "header-icon-clicked" : "header-icon"}
        >
          <Chat />
        </div>

        <div
          onClick={() => {
            setOptionsClicked(!optionsClicked);
          }}
          className={optionsClicked ? "header-icon-clicked" : "header-icon"}
        >
          <ThreeDots
            onClick={() => {
              setOptionsClicked(!optionsClicked);
            }}
          />{" "}
        </div>
      </div>
    </div>
  );
}

export default SideHeader;

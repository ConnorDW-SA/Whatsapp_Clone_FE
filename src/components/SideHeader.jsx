import React, { useState } from "react";
import { ReactComponent as Profile } from "./icons/profile.svg";
import { ReactComponent as Group } from "./icons/group.svg";
import { ReactComponent as Circle } from "./icons/circle.svg";
import { ReactComponent as Chat } from "./icons/chat.svg";
import { ReactComponent as ThreeDots } from "./icons/threeDots.svg";
import Dropdown from "./Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { SET_MY_PROFILE } from "../redux/actions";

function SideHeader() {
  const dispatch = useDispatch();

  const textContent = [
    "New Group",
    "New Community",
    "Starred messages",
    "Settings",
    "Log out"
  ];

  const [optionsClicked, setOptionsClicked] = useState(false);

  const myProfile = useSelector((state) => state.home.myProfile);

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
      <div
        onClick={() => {
          dispatch({ type: SET_MY_PROFILE, payload: !myProfile });
        }}
      >
        <Profile className="my-icon" />
      </div>

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

        <div
          onClick={() => {
            setOptionsClicked(!optionsClicked);
          }}
          className={optionsClicked ? "header-icon-clicked" : "header-icon"}
        >
          <ThreeDots />{" "}
        </div>
      </div>
    </div>
  );
}

export default SideHeader;

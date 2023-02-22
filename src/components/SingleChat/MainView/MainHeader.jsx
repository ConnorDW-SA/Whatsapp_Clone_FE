import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../icons/Search.svg";
import { ReactComponent as DotIcon } from "../icons/Dots.svg";
import Dropdown from "../../Dropdown";

function ChatHeader() {
  const [optionsClicked, setOptionsClicked] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);

  const textContent = [
    "Contact Info",
    "Select messages",
    "Close chat",
    "Mute notifications",
    "Disappearing messages",
    "Clear messages",
    "Delete chat",
    "Report",
    "Block",
  ];
  return (
    <div className="d-flex w-100 justify-content-between align-items-center main-header-convo relative">
      <div
        className={
          optionsClicked
            ? "d-block absolute-options"
            : "d-none absolute-options"
        }
      >
        <Dropdown textContent={textContent} />
      </div>
      <div className="d-flex p-2 ml-2 align-items-center pointer">
        <img
          src="https://picsum.photos/100"
          alt="profile"
          className="rounded-circle thumbnail-header mr-3"
        />
        <div className="d-flex flex-column py-2">
          <div className="target-user">Andy</div>
          <div className="last-seen">Last seen at: 20:51</div>
        </div>
      </div>
      <div className="d-flex pr-4">
        <div className={searchClicked ? "header-icon-clicked" : "header-icon"}>
          <SearchIcon
            onClick={() => {
              setSearchClicked(!searchClicked);
            }}
          />
        </div>
        <div className={optionsClicked ? "header-icon-clicked" : "header-icon"}>
          <DotIcon
            onClick={() => {
              setOptionsClicked(!optionsClicked);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;

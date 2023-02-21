import React from "react";
import { ReactComponent as SearchIcon } from "../icons/Search.svg";
import { ReactComponent as DotIcon } from "../icons/Dots.svg";

function ChatHeader() {
  return (
    <div className="d-flex w-100 justify-content-between main-header-convo">
      <div className="d-flex p-2 ml-2 align-items-center">
        <img
          src="https://picsum.photos/100"
          alt="profile"
          className="rounded-circle thumbnail-header mr-3"
        />
        <h5 className="font-weight-lighter mt-2">Andy</h5>
      </div>
      <div className="p-3 text-muted">
        <span className="mr-4">
          <SearchIcon />
        </span>
        <span className="mr-2">
          <DotIcon />
        </span>
      </div>
    </div>
  );
}

export default ChatHeader;

import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "./icons/search.svg";
import { ReactComponent as Filter } from "./icons/filter.svg";

function Search({ setSearchQuery }) {
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="search-container d-flex justify-content-between align-items-center">
      <div className="search-bar flex-grow-1">
        <form className="d-flex align-items-center">
          <div className="px-2">
            <SearchIcon />
          </div>

          <input
            className="input"
            type="text"
            onChange={handleSearchChange}
            placeholder="Search or start a new chat"
          />
        </form>
      </div>
      <div className="pl-2">
        <Filter className="filter-chats" />
      </div>
    </div>
  );
}

export default Search;

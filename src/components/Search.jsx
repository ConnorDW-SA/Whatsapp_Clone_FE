import React from "react";
import { ReactComponent as SearchIcon } from "./icons/search.svg";
import { ReactComponent as Filter } from "./icons/filter.svg";

function Search() {
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
            placeholder="Search or start a new chat"
          />
        </form>
      </div>
      <div className="px-2">
        <Filter />
      </div>
    </div>
  );
}

export default Search;

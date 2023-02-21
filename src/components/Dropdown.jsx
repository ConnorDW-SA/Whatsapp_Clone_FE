import React from "react";

function Dropdown(props) {
  const textContent = props.textContent;

  return (
    <div>
      <ul className="dropdown-ul">
        {textContent.map((text) => (
          <li className="dropdown-li">{text}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;

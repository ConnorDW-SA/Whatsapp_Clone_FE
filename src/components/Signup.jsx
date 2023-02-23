import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/actions/index.js";
import Logo from "./icons/whatsapp-logo-outline.png";

function Signup() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleRegisterLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          username,
        }),
      });

      if (response.ok) {
        dispatch(
          registerUser({
            email: email.toLowerCase(),
            password: password,
            username: username,
          })
        );
        navigate("/login");
      } else {
        console.log("Please fill all required field");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="login-container">
      <div className="login-form w-50 d-flex bg-white justify-content-center align-items-center ">
        <div className="login-image">
          <img src={Logo} alt="logo" className="logo-login"></img>
        </div>
        <div className="d-flex flex-column login-text">
          <h1 className="text-center mb-3">Register</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-field rounded-pill"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-field  rounded-pill"
          />
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-field  rounded-pill"
            />
            <input
              type="file"
              placeholder="Avatar"
              className="login-field  rounded-pill"
            />
          </div>

          <button
            onClick={handleRegisterLogin}
            className="login-button rounded-pill mt-3 py-2 text-white"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;

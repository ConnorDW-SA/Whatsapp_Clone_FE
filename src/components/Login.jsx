import React, { useState } from "react";
import { FcGoogle, FcAdvance } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../redux/actions/index.js";
import Logo from "./icons/whatsapp-logo-outline.png";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const user =
    path === "/"
      ? {
          email: email.toLowerCase(),
          password: password
        }
      : {
          username: username,
          email: email.toLowerCase(),
          password: password
        };
  const handleSubmitLogin = (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        navigate("/");
      } else {
        const data =  response.json();
        alert(data.message);
      }
    } catch (error) {
      alert(error.message);
    }
    dispatch(loginUser({ email: email.toLowerCase(), password: password }));
  };

  const handleRegisterLogin = (event) => {
    event.preventDefault();
    dispatch(
      registerUser({
        email: email.toLowerCase(),
        password: password,
        username: username,
      })
    );
  };
  return (
    <div className="login-container">
      <div className="login-form w-50 d-flex bg-white justify-content-center align-items-center ">
        <div className="login-image">
          <img src={Logo} alt="logo" className="logo-login"></img>
        </div>
        <div className="d-flex flex-column login-text">
          <h1 className="text-center mb-5">Login</h1>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="login-field rounded-pill"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="login-field  rounded-pill"
          />

          <button
            onClick={handleSubmitLogin}
            className="login-button rounded-pill mt-3 py-2 text-white"
          >
            Login
          </button>
          <button className="no-style-button">
            <div className="login-google d-flex mt-5 pl-4">
              <span className="mr-3 google-icon-login">
                <FcGoogle />
              </span>
              <p>Continue with Google</p>
            </div>
          </button>
          <button className="no-style-button">
            <div className="d-flex mt-3 pl-4">
              <span className="mr-3 google-icon-login">
                <FcAdvance />
              </span>
              <p className="">Create an account</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

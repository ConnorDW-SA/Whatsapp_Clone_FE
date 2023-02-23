import React, { useState } from "react";
import { FcGoogle, FcAdvance } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/actions/index.js";
import Logo from "./icons/whatsapp-logo-outline.png";
import { USER_LOGIN } from "../redux/actions/index.js";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const user = {
    email: email,
    password: password,
  };
  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      // Send a POST request to your authentication API
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
        dispatch(loginUser(user));

        navigate("/");
      } else {
        const data = await response.json();
        alert(data.message);
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
          <h1 className="text-center mb-3">Login</h1>
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

          <button
            onClick={handleSubmitLogin}
            className="login-button rounded-pill mt-3 py-2 text-white"
          >
            Login
          </button>
          <Link
            to={
              "https://accounts.google.com/v3/signin/identifier?dsh=S-183850306%3A1677165200727690&authuser=0&continue=https%3A%2F%2Fmail.google.com&ec=GAlAFw&hl=en&service=mail&flowName=GlifWebSignIn&flowEntry=AddSession"
            }
          >
            <button className="creat-account-btn mt-2 ">
              <span className=" creat-account-icon mb-2">
                <FcGoogle className="mr-3" />
              </span>
              <p>Continue with Google</p>
            </button>
          </Link>
          <Link to={"/register"}>
            <button className="creat-account-btn mt-2">
              <span className=" creat-account-icon mb-2">
                <FcAdvance className="mr-3" />
              </span>
              <p className="mb-2">Create an account</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

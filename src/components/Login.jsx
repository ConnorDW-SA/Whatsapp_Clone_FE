import React, { useState } from "react";
import { FcGoogle, FcAdvance } from "react-icons/fc";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login, register } from "../redux/actions";
import { useDispatch } from "react-redux";
import Logo from "./icons/whatsapp-logo-outline.png";

function Login({ login }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  function handleShowRegistrationForm() {
    setShowRegistrationForm(true);
  }

  const handleRegistration = () => {
    dispatch(register(username, email, password, avatar));
  };

  const handleLogin = () => {
    dispatch(login(email, password));
  };

  const handleBack = () => {
    setShowRegistrationForm(false);
  };

  if (showRegistrationForm) {
    return (
      <div className="login-container">
        <div className="login-form w-50 d-flex bg-white justify-content-center align-items-center ">
          <div className="login-image">
            <img src={Logo} alt="logo" className="logo-login"></img>
          </div>
          <div className="d-flex flex-column login-text">
            <h1 className="text-center mb-3">Register</h1>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-field rounded-pill"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-field rounded-pill"
            />
            <input
              type="text"
              placeholder="Avatar URL"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="login-field rounded-pill"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-field rounded-pill"
            />
            <button
              onClick={handleRegistration}
              className="login-button rounded-pill mt-3 py-2 text-white"
            >
              Register
            </button>
            <button
              onClick={handleBack}
              className="login-button rounded-pill mt-3 py-2 text-white"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  } else {
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
              onClick={handleLogin}
              className="login-button rounded-pill mt-3 py-2 text-white"
            >
              Login
            </button>
            <Link className="link-no-style mt-4 ml-5 pl-5" to={"/"}>
              <button className="no-style-button mt-2 d-flex">
                <span className=" creat-account-icon mb-2">
                  <FcGoogle className="mr-3" />
                </span>
                <p>Continue with Google</p>
              </button>
            </Link>
            <Link className="link-no-style mt-1 ml-5 pl-5" to={"/register"}>
              <button
                onClick={handleShowRegistrationForm}
                className=" mt-2 no-style-button d-flex"
              >
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
}

export default connect(null, { login })(Login);

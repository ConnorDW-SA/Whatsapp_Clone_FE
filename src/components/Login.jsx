import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../redux/actions/index.js";

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const path = window.location.pathname;
  const navigate = useNavigate();

  const user =
    path === "/"
      ? {
          email: email.toLowerCase(),
          password: password,
        }
      : {
          username: username,
          email: email.toLowerCase(),
          password: password,
        };
  const handleSubmitLogin = (event) => {
    event.preventDefault();
    dispatch(loginUser(user));
    navigate("/");
  };
  const handleRegisterLogin = (event) => {
    event.preventDefault();
    dispatch(registerUser(user));
    navigate("/");
  };
  return (
    <div className="login-page">
      <div className="login">
        <div className="login__left">
          <div className="login__leftHeader">
            <img src="whatapp.svg" />
            <h2>WhatsApp</h2>
          </div>

          <div className="login__leftContainer">
            <div className="login__signToggle">
              <div>
                <h2>LOGIN</h2>
              </div>

              <div>
                <h2 onClick={handleRegisterLogin}>SIGN UP</h2>
              </div>
            </div>

            <form>
              <div className="login__inputContainer">
                <input
                  placeholder="Email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="login__inputContainer">
                <input
                  placeholder="Password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="login__inputContainer">
                <input
                  placeholder="Username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <button
                className="login__loginButton "
                onClick={handleSubmitLogin}
              >
                Sign In
              </button>
              <div className="login__separator">or</div>

              <div className="login__googleLogin">
                <span>
                  <FcGoogle className="google-icon" />
                </span>

                <button>Login with google</button>
              </div>
            </form>
          </div>
        </div>

        <div className="login__right">
          <img
            className="login__rightImage"
            src="https://techloverhd.com/wp-content/uploads/2016/04/How-to-use-WhatsApp-Web-and-keep-your-phone-connected.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;

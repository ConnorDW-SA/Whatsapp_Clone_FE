import React, { useState } from "react";

import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

function Login() {
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
                <h2>SIGN UP</h2>
              </div>
            </div>

            <form>
              <div className="login__inputContainer">
                <input placeholder="Email" type="email" />
              </div>

              <div className="login__inputContainer">
                <input placeholder="Password" type="password" />
              </div>

              <button className="login__loginButton ">Sign In</button>
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

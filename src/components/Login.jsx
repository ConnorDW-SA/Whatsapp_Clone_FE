import React, { useEffect, useState } from "react";
import { FcGoogle, FcAdvance } from "react-icons/fc";
import { useDispatch } from "react-redux";
import {
  loginUser,
  registerUser,
  SET_ONLINE_USERS,
} from "../redux/actions/index.js";
import Logo from "./icons/whatsapp-logo-outline.png";
import { io } from "socket.io-client";

//1. When we go to this page, the user will establish a connection to socket server
//2. If the connection happens succesfully the server willl emit an event called "Welcome to WhatsApp" (configurable on BE)
//3. If we want to do sth when the above happens we should listen to that event using socket.on("Welcome to WhatsApp")
//4. Once we login, we want to submit the username to the server: socket.emit()
//5.The server is listening for the event setUsername, and then will broadcast that username to whoever is listening for an event call "loggedIn" (configured on BE)
//6. If a client wants to display the list of online users it should listen for the "loggedIn" event
//7. If we are logged in we need to also listen if a new user joins.
//8. THe server will be configured so that if a new user joins, it emits an event called "updateOnlineUsersList". update connected users when someone joins/leaves

const socket = io("http://localhost:3001", { transports: ["websocket"] });

// specifying the transport "websocket", socket.io will try to connect to the server using the old technique, Polling

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const path = window.location.pathname;

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
    //here we will be emitting a "setUsername" event(the server from BE will be configured to listen for that)
    socket.emit("setUsername", { username });
  };
  const handleRegisterLogin = (event) => {
    event.preventDefault();
    dispatch(registerUser(user));
    //here we will be emitting a "setUsername" event(the server from BE will be configured to listen for that)
    socket.emit("setUsername", { username });
  };

  useEffect(() => {
    socket.on("welcome", (welcomeMessage) => {
      console.log(welcomeMessage);

      socket.on("loggedIn", (onlineUsers) => {
        console.log("logged in event:", onlineUsers); // onlineUsers here will give back an array with connected users (username and socketID as data)
        //we could store this in Redux and re use later
        dispatch({ type: SET_ONLINE_USERS, payload: onlineUsers });
      });

      socket.on("updateOnlineUsersList", (onlineUsers) => {
        console.log(`New User has joined!`, onlineUsers);
        //we could update the Redux State and re use later
        dispatch({ type: SET_ONLINE_USERS, payload: onlineUsers });
      });
    });
  });
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

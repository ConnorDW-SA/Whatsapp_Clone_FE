import React, { useEffect, useState } from "react";
import { FcGoogle, FcAdvance } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { LOGIN_REQUEST } from "../redux/actions";
import { useDispatch } from "react-redux";

import { SET_ONLINE_USERS } from "../redux/actions/index.js";

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

function Login({ login }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const currentUsername = useSelector((state) => state.home.userInfo.username);

  // const user =
  //   path === "/"
  //     ? {
  //         email: email.toLowerCase(),
  //         password: password,
  //       }
  //     : {
  //         username: username,
  //         email: email.toLowerCase(),
  //         password: password,
  //       };

  const userLogin = { email, password };
  const userRegister = { email, password, username, avatar };

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

  function handleShowRegistrationForm() {
    setShowRegistrationForm(true);
  }

  // const handleRegistration = () => {
  //   dispatch(register(username, email, password, avatar));

  //   socket.emit("setUsername", { username }); //here we will be emitting a "setUsername" event(the server from BE will be configured to listen for that)

  //   navigate("/");
  // };

  const fetchMyData = async (data) => {
    try {
      const response = await fetch("http://localhost:3001/users/me", {
        headers: { Authorization: `Bearer ${data.accessToken}` },
        "Content-Type": "application/json",
      });
      if (response.ok) {
        const data = await response.json();

        dispatch({ type: LOGIN_REQUEST, payload: data });
      } else {
        console.log("Error while fetching my profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegistration = async () => {
    try {
      const response = await fetch("http://localhost:3001/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userRegister),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        await fetchMyData(data);

        socket.emit("setUsername", { username }); //here we will be emitting a "setUsername" event(the server from BE will be configured to listen for that)
        navigate("/");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("accessToken", data.accessToken);
        await fetchMyData(data);
        socket.emit("setUsername", { currentUsername }); //here we will be emitting a "setUsername" event(the server from BE will be configured to listen for that)
        navigate("/");
      } else {
        console.log("Error while login");
      }
    } catch (error) {
      console.log(error);
    }
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
            <Link className="link-no-style mt-4 ml-5 pl-5">
              <button className="no-style-button mt-2 d-flex">
                <span className=" creat-account-icon mb-2">
                  <FcGoogle className="mr-3" />
                </span>
                <p>Continue with Google</p>
              </button>
            </Link>
            <Link className="link-no-style mt-1 ml-5 pl-5">
              <button
                onClick={handleShowRegistrationForm}
                className=" mt-2 no-style-button d-flex"
              >
                <span className=" creat-account-icon mb-2 ml-2">
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

export default Login;

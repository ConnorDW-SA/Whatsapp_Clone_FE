export const ADD_MY_CHATS = "ADD_MY_CHATS";
export const SET_CURRENT_CHAT = "SET_CURRENT_CHAT";
export const SET_MY_PROFILE = "SET_MY_PROFILE";

export const LOGIN_REQUEST = "LOGIN_REQUEST";

export const getCurrentUser = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        dispatch({ type: LOGIN_REQUEST, payload: data.user });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        dispatch({ type: LOGIN_REQUEST, payload: data.user });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const register = (email, password, username, avatar) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password, username, avatar })
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        dispatch({ type: LOGIN_REQUEST, payload: data.user });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

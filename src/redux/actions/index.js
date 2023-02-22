export const ADD_MY_CHATS = "ADD_MY_CHATS";
export const USER_LOGIN = "USER_LOGIN";

export const loginUser = (user) => {
  return async (dispatch) => {
    const option = {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      let response = await fetch(`http://localhost:3001/users/login`, option);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
          dispatch({
            type: USER_LOGIN,
            payload: user,
          });
          dispatch(getallUser(data.accessToken));
        }
      }
    } catch (error) {}
  };
};

export const getallUser = () => {
  return async (dispatch) => {
    const optionUser = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    try {
      let response = await fetch(`http://localhost:3001/users/me`, optionUser);
      if (response.ok) {
        const data = await response.json();
        console.log("User Details", data);
        dispatch({
          type: USER_LOGIN,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

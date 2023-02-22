import { ADD_MY_CHATS, USER_LOGIN } from "../actions";

const initialState = {
  userInfo: {
    _id: "",
    name: "",
    email: "",
    avatar: "",
  },
  chats: {
    active: "",
    list: [],
  },
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MY_CHATS: {
      return {
        ...state,
        chats: action.payload,
      };
    }
    case USER_LOGIN: {
      return {
        ...state,
        userInfo: action.payload,
      };
    }
    default:
      return state;
  }
};

export default mainReducer;

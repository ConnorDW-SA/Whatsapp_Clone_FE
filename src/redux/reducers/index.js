import { ADD_MY_CHATS } from "../actions";

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
    default:
      return state;
  }
};

export default mainReducer;

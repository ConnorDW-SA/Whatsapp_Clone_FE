import {
  ADD_MY_CHATS,
  SET_CURRENT_CHAT,
  SET_MY_PROFILE,
  USER_LOGIN,
} from "../actions";

const initialState = {
  userInfo: {
    _id: "",
    name: "",
    email: "",
    avatar: "",
    about: "",
    username: "",
  },
  chats: {
    active: {},
    list: [],
  },
  myProfile: false,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_CHAT: {
      return {
        ...state,
        chats: { ...state.chats, active: action.payload },
      };
    }

    case ADD_MY_CHATS: {
      return {
        ...state,
        chats: {
          ...state.chats,
          list: action.payload,
        },
      };
    }
    case USER_LOGIN: {
      return {
        ...state,
        userInfo: action.payload,
      };
    }
    case SET_MY_PROFILE: {
      return {
        ...state,
        myProfile: action.payload,
      };
    }
    default:
      return state;
  }
};

export default mainReducer;

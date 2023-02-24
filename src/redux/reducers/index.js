import {
  ADD_MY_CHATS,
  SET_CHATS_HISTORY,
  SET_CHAT_HISTORY,
  SET_CURRENT_CHAT,
  SET_MY_PROFILE,
  SET_ONLINE_USERS,
  USER_LOGIN,
  LOGIN_REQUEST,
} from "../actions";

const initialState = {
  userInfo: {
    _id: "",
    username: "",
    email: "",
    avatar: "",
    about: "",
  },
  chats: {
    active: {
      _id: "",
      users: [],
      messages: [],
      avatar: "",
      __v: 0,
      updatedAt: "",
    },
    list: [],
  },

  myProfile: false,
  onlineUsers: [],
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

    case SET_CHAT_HISTORY: {
      return {
        ...state,
        chats: {
          ...state.chats,
          active: {
            ...state.chats.active,
            messages: [...state.chats.active.messages, action.payload],
          },
        },
      };
    }
    case SET_CHATS_HISTORY: {
      const [chatId, newMessage] = action.payload;
      console.log(chatId);
      console.log(newMessage);
      const chatIndex = state.chats.list.findIndex(
        (chat) => chat._id === chatId
      );
      console.log(chatIndex);
      if (chatIndex === -1) {
        // Chat not found, return current state
        return state;
      }

      const updatedList = state.chats.list[chatIndex].push(newMessage);

      return {
        ...state,
        chats: {
          ...state.chats,
          list: updatedList,
        },
      };
    }

    case LOGIN_REQUEST: {
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
    case SET_ONLINE_USERS: {
      return {
        ...state,
        onlineUsers: action.payload,
      };
    }
    default:
      return state;
  }
};

export default mainReducer;

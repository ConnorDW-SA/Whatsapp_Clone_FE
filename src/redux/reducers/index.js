import {
  ADD_MY_CHATS,
  SET_CHATS_HISTORY,
  SET_CHAT_HISTORY,
  SET_CURRENT_CHAT,
  SET_MY_PROFILE,
  SET_ONLINE_USERS,
  USER_LOGIN,
} from "../actions";

const initialState = {
  userInfo: {
    _id: "",
    name: "",
    email: "",
    avatar: "",
  },
  chats: {
    active: {},
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
      const { chatId, newMessage } = action.payload;
      return {
        ...state,
        chats: {
          ...state.chats,
          active: { messages: [...state.chats.active.messages, newMessage] },
        },
      };
    }
    case SET_CHATS_HISTORY: {
      const { chatId, newMessage } = action.payload;
      const chatIndex = state.chats.list.findIndex(
        (chat) => chat._id === chatId
      );
      if (chatIndex === -1) {
        // Chat not found, return current state
        return state;
      }
      const updatedChat = {
        ...state.chats.list[chatIndex],
        messages: [...state.chats.list[chatIndex].messages, newMessage],
      };
      const updatedChats = [
        ...state.chats.list.slice(0, chatIndex),
        updatedChat,
        ...state.chats.list.slice(chatIndex + 1),
      ];
      return {
        ...state,
        chats: updatedChats,
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

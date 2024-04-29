import ACTIONS from "./actions";

export const ChatReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CHAT_USER:
      return {
        ...state,
        selectedUser: action.payload.user,
        messages: action.payload.messages,
        isReady: action.payload.isReady,
      };
    case ACTIONS.SET_APPEND_MESSAGE:
      console.log(state.messages);
      return {
        ...state,
        messages: [...state.messages, action.payload],
        newMessage: ""
      };
    case ACTIONS.SET_NEW_MESSAGE:
      return {
        ...state,
        newMessage: action.payload,
      };
    case ACTIONS.SET_TYPING:
      return {
        ...state,
        typing: action.payload,
      };
    default:
      return state;
  }
};

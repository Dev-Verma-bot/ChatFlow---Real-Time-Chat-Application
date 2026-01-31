import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    // Retrieve from localStorage on initialization so it survives reload
    selectedChat: localStorage.getItem("selectedChat") 
      ? JSON.parse(localStorage.getItem("selectedChat")) 
      : null,
    messages: [],
    notification: [],
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
      // Save to localStorage whenever a chat is selected
      if (action.payload) {
        localStorage.setItem("selectedChat", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("selectedChat");
      }
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    // Useful for a 'Clear Chat' or 'Logout' action
    resetChatState: (state) => {
        state.selectedChat = null;
        state.messages = [];
        localStorage.removeItem("selectedChat");
    }
  },
});

export const { setChats, setSelectedChat, setMessages, addMessage, resetChatState } = chatSlice.actions;
export default chatSlice.reducer;
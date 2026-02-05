import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
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
      if (action.payload) {
        localStorage.setItem("selectedChat", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("selectedChat");
      }
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    
    // UPDATED FUNCTIONALITY
    addMessage: (state, action) => {
      const new_message = action.payload;
      
      // 1. Only add to messages array if the message belongs to the currently open chat
      // This prevents messages from "Chat B" appearing while you are looking at "Chat A"
      if (state.selectedChat && 
         (new_message.sender_id === state.selectedChat._id || 
          new_message.receiver_id === state.selectedChat._id)) {
        
        state.messages.push(new_message);
      } else {
        // 2. If the message is for a different chat, add it to notifications
        state.notification.push(new_message);
      }
    },

    resetChatState: (state) => {
        state.selectedChat = null;
        state.messages = [];
        state.notification = [];
        localStorage.removeItem("selectedChat");
    }
  },
});

export const { setChats, setSelectedChat, setMessages, addMessage, resetChatState } = chatSlice.actions;
export default chatSlice.reducer;
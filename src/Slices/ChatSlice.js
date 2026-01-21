import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],           // List of all conversations/friends
    selectedChat: null,  // The chat currently open on screen
    messages: [],        // Messages in the selected chat
    notification: [],    // Unread messages
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    // Used when a new message arrives via Socket.io
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setChats, setSelectedChat, setMessages, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
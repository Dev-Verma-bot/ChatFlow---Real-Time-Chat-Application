import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    selectedChat: localStorage.getItem("selectedChat") 
      ? JSON.parse(localStorage.getItem("selectedChat")) 
      : null,
    messages: [],
    // Load notifications from localStorage on startup
    notification: localStorage.getItem("notifications")
      ? JSON.parse(localStorage.getItem("notifications"))
      : [],
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
      
      if (action.payload) {
        localStorage.setItem("selectedChat", JSON.stringify(action.payload));
        
        // Remove notifications for the user being selected
        state.notification = state.notification.filter(
            (notif) => notif.sender_id !== action.payload._id
        );
        // Sync filtered list to localStorage
        localStorage.setItem("notifications", JSON.stringify(state.notification));
      } else {
        localStorage.removeItem("selectedChat");
      }
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    
    setNotification: (state, action) => {
      state.notification = action.payload;
      // Sync manual updates to localStorage
      localStorage.setItem("notifications", JSON.stringify(action.payload));
    },
    
    addMessage: (state, action) => {
      const new_message = action.payload;
      
      if (state.selectedChat && 
         (new_message.sender_id === state.selectedChat._id || 
          new_message.receiver_id === state.selectedChat._id)) {
        
        state.messages.push(new_message);
      } else {
        state.notification.push(new_message);
        // Sync new notification to localStorage
        localStorage.setItem("notifications", JSON.stringify(state.notification));
      }
    },

    resetChatState: (state) => {
        state.selectedChat = null;
        state.messages = [];
        state.notification = [];
        localStorage.removeItem("selectedChat");
        localStorage.removeItem("notifications"); // Clear notifications on reset
    }
  },
});

export const { 
    setChats, 
    setSelectedChat, 
    setMessages, 
    setNotification, 
    addMessage, 
    resetChatState 
} = chatSlice.actions;

export default chatSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    isConnected: false,
    onlineUsers: [], 
  },
  reducers: {
    setConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setConnected, setOnlineUsers } = socketSlice.actions;
export default socketSlice.reducer;
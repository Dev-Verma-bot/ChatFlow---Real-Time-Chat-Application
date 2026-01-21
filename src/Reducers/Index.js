import { configureStore } from "@reduxjs/toolkit";

// Importing all reducers
import authReducer from "../Slices/AuthSlice";
import profileReducer from "../Slices/ProfileSlice";
import chatReducer from "../Slices/ChatSlice";
import socketReducer from "../Slices/SocketSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    chat: chatReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Prevents errors with non-serializable data from Socket.io/Dates
    }),
});

export default store;
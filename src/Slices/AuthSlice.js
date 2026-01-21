import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    signupData: null,
    loading: false,
    // Initialize token from localStorage to stay logged in on refresh
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
  },
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    logout(state) {
      state.token = null;
      state.signupData = null;
      state.loading = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user"); 
    },
  },
});

export const { setSignupData, setLoading, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
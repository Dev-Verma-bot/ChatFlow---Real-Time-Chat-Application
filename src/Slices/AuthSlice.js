import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile_image: "",
  signupData: null,
  reset_pass_token: null,
  loading: false,
  reset_pass_form: null,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {    
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload));
    },

    clearToken(state) {
      state.token = null;
      localStorage.removeItem("token");
    },

    // --- ADDED LOGOUT REDUCER ---
    logout(state) {
      state.token = null;
      state.profile_image = "";
      state.signupData = null;
      state.reset_pass_token = null;
      state.reset_pass_form = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // If you store user data elsewhere
      // This ensures the state is clean for the next login
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setReset_pass_token(state, action) {
      state.reset_pass_token = action.payload;
    },

    setReset_pass_form(state, action) {
      state.reset_pass_form = action.payload;
    },

    setSign_up_data(state, action) {
      state.signupData = {
        ...state.signupData,
        ...action.payload,
      };
    },
    setProfile_image(state, value){
        state.profile_image = value.payload;
    }
  },
});

// ADD 'logout' and 'setSignupData' to this export list
export const {
  setSignupData,
  setProfile_image,
  setToken,
  clearToken,
  logout, // <--- Exported here
  setLoading,
  setReset_pass_token,
  setReset_pass_form,
  setSign_up_data,
} = authSlice.actions;

export default authSlice.reducer;
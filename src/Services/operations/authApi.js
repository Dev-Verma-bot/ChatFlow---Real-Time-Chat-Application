import react from "react";
import { setLoading, setReset_pass_token, setToken } from "../../Slices/AuthSlice";
import { ApiConnect } from "../ApiConnect";
import toast from "react-hot-toast";
import { auth } from "../Apis";
import {setUser} from "../../Slices/ProfileSlice"
import { setConnected, setOnlineUsers } from "../../Slices/SocketSlice";
import { useSelector } from "react-redux";
// import logo

export function getPasswordResetToken(email , setEmailSent) {
    const RESETPASSTOKEN_API= auth.RESETPASSTOKEN_API;
    return async(dispatch) => {
    dispatch(setLoading(true));
    try{
      const response = await ApiConnect("POST", RESETPASSTOKEN_API, {email})
      
      dispatch(setReset_pass_token(response.data.token));
      
      if(!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
    }
    catch(error) {
            toast.error("Failed to send email for resetting password i.e. Email not registered !");
      setEmailSent(false);
    }
    dispatch(setLoading(false));
  }
}
const BASE_URL= process.env.REACT_APP_BASE_URL;
// 

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      const response = await ApiConnect("POST", auth.otp_api, {
        email,
        checkUserPresent: true,
      });

      console.log("SENDOTP API RESPONSE............", response);

      // If backend sends success: false but with a 200 status
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/otp-verify");
    } catch (error) {
      console.log("SENDOTP API ERROR............", error);

      // 1. Try to get the message from the server's error response (e.g., 400 Bad Request)
      // 2. If that fails, check if we threw an Error manually above
      // 3. Fallback to a generic message
      const errorMessage = 
        error.response?.data?.message || 
        error.message || 
        "Could Not Send OTP";

      toast.error(errorMessage); // This will now show "User already exists"
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(signupData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Verifying...");
    dispatch(setLoading(true));
    
    try {
      // MAPPING DATA INTERNALLY
      const {
        firstName,
        lastName,
        email,
        user_name,
        password,
        gender,
        role,
        otp
      } = signupData;

      const backendData = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        user_name: user_name, 
        password: password,
        gender: gender,
        role: role,
        otp: otp, // Passed separately from the OTP component state
      };

      const response = await ApiConnect("POST", auth.sign_up_api, backendData);

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      const errorMessage = error.response?.data?.message || "Signup Failed";
      toast.error(errorMessage);
    }
    
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function Login(loginData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Verifying...");
    dispatch(setLoading(true));
    
    try {
      const response = await ApiConnect("POST", auth.login_api, loginData);

      console.log("Login response............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      toast.success("login Successful");
      navigate("/dashboard");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      const errorMessage = error.response?.data?.message || "Login Failed";
      toast.error(errorMessage);
    }
    
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
export function logout(navigate) {
  return async (dispatch) => {
    try {
     

      dispatch(setOnlineUsers([])); 
      dispatch(setConnected(false));
      dispatch(setUser(null));
      dispatch(setToken(null));
      localStorage.clear();
      toast.success("Logged Out");
      navigate("/");
    } catch (error) {
      console.log("Logout Error", error);
    }
  };
}

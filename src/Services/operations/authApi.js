import react from "react";
import { setLoading, setReset_pass_token, setSign_up_data, setToken } from "../../Slices/AuthSlice";
import { ApiConnect } from "../ApiConnect";
import toast from "react-hot-toast";
import { auth } from "../Apis";
import {setUser} from "../../Slices/ProfileSlice"
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

export function signUp(
  account_type,
  First_name,
  Last_name,
  Email_add,
  Password,
  cnfrm_password,
  Otp,
  navigate

  
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await ApiConnect("POST", auth.sign_up_api, {
        account_type,
        First_name,
        Last_name,
        Email_add,
        Password,
        cnfrm_password,
        Otp,
      })

      console.log("SIGNUP API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Signup Successful")
      navigate("/login")
    } catch (error) {
      console.log("SIGNUP API ERROR............", error)
      toast.error("Signup Failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    // dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }
}

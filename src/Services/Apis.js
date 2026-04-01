const BASE_URL= process.env.REACT_APP_BASE_URL;
// 


// AUTH ENDPOINTS
export const auth = {
  otp_api: BASE_URL + "/Convoo/auth/send_otp",
  sign_up_api: BASE_URL + "/Convoo/auth/signup",
  login_api: BASE_URL + "/Convoo/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/user/reset-password-token",
}

// Conversatation endpoints
export const ConversatationEndpoints={
  Send_message_api:BASE_URL+"/Convoo/message/send_message/:id",
  Recieve_message_api:BASE_URL+ "/Convoo/message/recieve_messages/:id"
}

export const search_User_endpoints= {
  GET_SEARCH_USERS_DETAILS_API:BASE_URL+ "/Convoo/search_user/search",
  GET_CHATTERS_DETAILS_API:BASE_URL+ "/Convoo/search_user/get_chatters"
}

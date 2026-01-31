import { setMessages, addMessage } from "../../Slices/ChatSlice";
import { setLoading } from "../../Slices/AuthSlice";
import { ApiConnect } from "../ApiConnect";
import toast from "react-hot-toast";
import { ConversatationEndpoints } from "../Apis";

const {Send_message_api,Recieve_message_api} = ConversatationEndpoints
export function sendMessage(recipientId, messageContent, token) {
  return async (dispatch) => {
    try {
      const url = Send_message_api.replace(":id", recipientId);
      
      const response = await ApiConnect(
        "POST", 
        url, 
        { message: messageContent },
        { Authorization: `Bearer ${token}` }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(addMessage(response.data.newMessage));
      
    } catch (error) {
      console.log("SEND_MESSAGE_API_ERROR............", error);
      toast.error("Failed to send message");
    }
  };
}

export function getMessages(chatId, token) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const url = Recieve_message_api.replace(":id", chatId);
      
      const response = await ApiConnect(
        "GET", 
        url, 
        null, 
        { Authorization: `Bearer ${token}` }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setMessages(response.data.messages));

    } catch (error) {
      console.log("GET_MESSAGES_API_ERROR............", error);
    }
    dispatch(setLoading(false));
  };
}
import { toast } from "react-hot-toast";
import { ApiConnect } from "../ApiConnect";
import { search_User_endpoints } from "../Apis";

const { GET_SEARCH_USERS_DETAILS_API,GET_CHATTERS_DETAILS_API } = search_User_endpoints;

console.log("get_search_user api- >",GET_SEARCH_USERS_DETAILS_API);
export const SearchUser = async (searchQuery, token) => {
  const toastID = toast.loading("Searching user...");
    console.log(searchQuery);
  try {
    const response = await ApiConnect(
      "GET",
      GET_SEARCH_USERS_DETAILS_API,
      null, 
      {
        Authorization: `Bearer ${token}`,
      },
      { search: searchQuery } 
    );
    toast.dismiss(toastID);
    console.log("SEARCH_USER_API RESPONSE -->",response);
    return response?.data?.data || []; 
  } catch (error) {
    console.log("Error while searching user -> ",error);
    toast.dismiss(toastID);
    toast.error("User not found");
    return [];
  }
};
export const GetChatters = async ( token) => {
  const toastID = toast.loading("Fetching chatters...");
  try {
    const response = await ApiConnect(
      "GET",
      GET_CHATTERS_DETAILS_API,
      null, 
      {
        Authorization: `Bearer ${token}`,
      }, 
    );
    toast.dismiss(toastID);
    console.log("GET_CHATTERS_API RESPONSE -->",response);
    return response?.data?.data || []; 
  } catch (error) {
        console.log("Error while fetching chatters -> ",error);
    toast.dismiss(toastID);
    toast.error("Chatters not found");
    return [];
  }
};


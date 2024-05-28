import { userInstance } from "../../api/userInstance";
let tokens = localStorage.getItem("userAccessToken");

const newToken = JSON.parse(tokens);
const token = newToken?.userAccessToken;

export const userChats = async (userId) => {
  try {
    console.log("Welcome to user Chats", userId);

    const response = await userInstance.get(`/chat/${userId}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user chats", error);
    return error;
  }
};

export const getrecipientChatData = async (recId) => {
  try {
    console.log("Welcome to user recepient chat data", recId);

    const response = await userInstance.get(`/getrecepientdata/${recId}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in user recepient chat data", error);
    return error;
  }
};


export const getChatMessages = async (chatId) => {
  try {
    console.log("Welcome to get all messages", chatId);

    const response = await userInstance.get(`/message/${chatId}`, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in getting all messages", error);
    return error;
  }
};


export const sendMessage = async (data) => {
  try {
    console.log("Welcome to get all messages", data);

    const response = await userInstance.post(`/message`,data, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("response", response);

    return response;
  } catch (error) {
    console.log("Error in getting all messages", error);
    return error;
  }
};
import { useState, useEffect, useRef } from "react";
import { providerInstance } from "../../../api/providerAxiosInstance";
import TopBar from "../../Provider/layout/Topbar";

import {
  ProviderChats,
  userChats,
} from "../../../service/ChatService/ChatService";
import ProviderConversation from "./ProviderConversation";
import ProviderChatBox from "./ProviderChatBox";

import { io } from "socket.io-client";

const ProviderChat = () => {
  const socket = useRef(null);

  const [chats, setChats] = useState([]);
  const [providerData, setProviderData] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [sendMessage, setSentMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const [provider, setProvider] = useState(false);

  useEffect(() => {
    const providerToken = localStorage.getItem("providerAccessToken");
    const newProviderToken = providerToken ? JSON.parse(providerToken) : null;
    const extractedToken = newProviderToken?.providerAccessToken;

    const fetchUserData = async () => {
      if (extractedToken) {
        try {
          const response = await providerInstance.get(`/getprovider`, {
            headers: {
              Authorization: `Bearer ${extractedToken}`,
            },
          });
          console.log("response in chat", response);
          if (response.status === 200) {
            setProviderData(response.data.providerData);
          }
        } catch (error) {
          console.error("Error fetching user data:", error.response?.status);
        }
      }
    };

    fetchUserData();

    return () => {
      if (socket.current) {
        socket.current.off("user-added");
        socket.current.off("receive-message");
        socket.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (providerData) {
      console.log("ProviderData", providerData);
      socket.current = io("https://chat.findmyhomestay.online");
      // socket.current = io("http://localhost:8800");
      socket.current.emit("new-user-add", providerData._id);

      socket.current.on("get-users", (user) => {
        console.log("user", user);
        setOnlineUsers(user);
      });

      socket.current.on("receive-message", (data) => {
        setReceiveMessage(data);
      });

      const getChats = async () => {
        try {
          const response = await ProviderChats(providerData._id);
          console.log("Response in fetching chat data", response.data);
          setChats(response.data);
          console.log("Total Chats", response.data);
        } catch (error) {
          console.error("Error fetching chat data:", error);
        }
      };

      getChats();
    }
  }, [providerData]);

  if (receiveMessage !== null) {
    console.log("Tofind the length of receive message is", receiveMessage);
  }

  useEffect(() => {
    if (chats.length > 0) {
      setCurrentChat(chats[0]);
    }
  }, [chats]);

  useEffect(() => {
    if (providerData && socket.current) {
      socket.current.emit("new-user-add", providerData._id);
    }
  }, [providerData]);

  useEffect(() => {
    if (sendMessage !== null && socket.current) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  const checkOnlineStatus = (chat) => {
    console.log("Chat===>", chat);
    const chatMember = chat?.members?.find(
      (member) => member !== providerData._id
    );
    console.log("chatmember", chatMember);
    console.log("onlineusers", onlineUsers);

    const online = onlineUsers?.find(
      (user) => user.userId === chatMember && user.socketId
    );
    return online ? true : false;
  };

  const selectMessage = (chat) => {
    setProvider(true);
    setCurrentChat(chat);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-1/3 bg-gray-100 p-4">
        <h2 className="text-xl font-semibold mb-4">Chat</h2>
        {chats?.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => selectMessage(chat)}
              className="mb-2 cursor-pointer"
            >
              <ProviderConversation
                data={chat}
                currentUser={providerData?._id}
                online={checkOnlineStatus(chat)}
                receiveMessage={receiveMessage}
              />
            </div>
          ))
        ) : (
          <div className="bg-gray-100 border border-gray-300 rounded-md p-6 my-8">
            <p className="text-gray-600 font-semibold text-center">
              No chat available
            </p>
          </div>
        )}
      </div>
      <div className="w-full md:w-2/3 bg-gray-200 p-4">
        {provider ? (
          <ProviderChatBox
            chat={currentChat}
            currentUser={providerData?._id}
            userData={providerData}
            setSentMessage={setSentMessage}
            receiveMessage={receiveMessage}
            socket={socket}
           
          />
        ) : (
          <div className="bg-gray-100 border border-gray-300 rounded-md p-6 my-8">
            <p className="text-gray-600 font-semibold text-center">
              Select a chat to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderChat;

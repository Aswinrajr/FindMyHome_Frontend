import { useState, useEffect, useRef } from "react";
import { providerInstance } from "../../../api/providerAxiosInstance";
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
  const [userData, setUserData] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [sendMessage, setSentMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const [provider, setProvider] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("providerAccessToken");
    const newUserToken = userToken ? JSON.parse(userToken) : null;
    const extractedToken = newUserToken?.providerAccessToken;

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
            setUserData(response.data.providerData);
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
    if (chats.length > 0) {
      setCurrentChat(chats[0]);
    }
  }, [chats]);

  useEffect(() => {
    if (userData) {
      console.log("ProviderData", userData);
      socket.current = io("http://localhost:8800");
      socket.current.emit("new-user-add", userData._id);

      socket.current.on("get-users", (user) => {
        console.log("user", user);
        setOnlineUsers((prevUsers) => [...(prevUsers || []), user]);
      });

      socket.current.on("receive-message", (data) => {
        setReceiveMessage(data);
      });

      const getChats = async () => {
        try {
          const response = await ProviderChats(userData._id);
          console.log("Response in fetching chat data", response.data);
          setChats(response.data);
          console.log("Total Chats", response.data);
        } catch (error) {
          console.error("Error fetching chat data:", error);
        }
      };

      getChats();
    }
  }, [userData]);

  useEffect(() => {
    if (userData && socket.current) {
      socket.current.emit("new-user-add", userData._id);
    }
  }, [userData]);

  useEffect(() => {
    if (sendMessage !== null && socket.current) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  const checkOnlineStatus = (chat) => {
    console.log("Chat===>", chat);
    const chatMember = chat?.members?.find((member) => member !== userData._id);
    console.log("chatmember", chatMember);
    console.log("onlineusers", onlineUsers);

    const online = onlineUsers?.some(
      (user) => user.userId === chatMember && user.socketId
    );
    return online;
  };

  const selectMessage = (chat) => {
    setProvider(true);
    setCurrentChat(chat);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-100 p-4">
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
                currentUser={userData?._id}
                online={checkOnlineStatus(chat)}
              />
            </div>
          ))
        ) : (
          <p>No chats available</p>
        )}
      </div>
      <div className="w-2/3 bg-gray-200 p-4">
        {provider ? (
          <ProviderChatBox
            chat={currentChat}
            currentUser={userData?._id}
            userData={userData}
            setSentMessage={setSentMessage}
            receiveMessage={receiveMessage}
            socket={socket}
          />
        ) : (
          <p>Select a chat to start messaging</p>
        )}
      </div>
    </div>
  );
};

export default ProviderChat;

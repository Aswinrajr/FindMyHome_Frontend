import { useState, useEffect, useRef } from "react";
import { userInstance } from "../../api/userInstance";
import { userChats } from "../../service/ChatService/ChatService";
import Conversation from "./Conversation";
import ChatBox from "./ChatBox";
import { io } from "socket.io-client";

const Chat = () => {
  const socket = useRef(null);

  const [chats, setChats] = useState([]);
  const [userData, setUserData] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [sendMessage, setSentMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("userAccessToken");
    const newUserToken = userToken ? JSON.parse(userToken) : null;
    const extractedToken = newUserToken?.userAccessToken;

    const fetchUserData = async () => {
      if (extractedToken) {
        try {
          const response = await userInstance.get(`/validateuser`, {
            headers: {
              Authorization: `Bearer ${extractedToken}`,
            },
          });
          console.log("response in chat", response.data.userData);
          if (response.status === 200) {
            setUserData(response.data.userData);
            console.log("UserData ===>", response.data.userData);

            socket.current = io("http://localhost:8800");
            socket.current.emit("new-user-add", response.data.userData._id);

            // socket.current.on("user-added", (user) => {
            //   console.log("user", user);
            //   setOnlineUsers(user);
            // });

            socket.current.on("user-added", (user) => {
              console.log("user", user);
              setOnlineUsers((prevUsers) => [...(prevUsers || []), user]);
            });
            socket.current.on("receive-message", (data) => {
              setReceiveMessage(data);
            });
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

  useEffect(() => {
    const getChats = async () => {
      if (userData) {
        try {
          const response = await userChats(userData._id);
          console.log("Response in fetching chat data", response.data);
          setChats(response.data);
          console.log("Total Chats", response.data);
        } catch (error) {
          console.error("Error fetching chat data:", error);
        }
      }
    };

    getChats();
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

  return (
    <div className="flex h-screen">
      {/* <div className="w-1/3 bg-gray-100 p-4">
        <h2 className="text-xl font-semibold mb-4">Chat</h2>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => setCurrentChat(chat)}
              className="mb-2 cursor-pointer"
            >
              <Conversation
                data={chat}
                currentUser={userData?._id}
                online={checkOnlineStatus(chat)}
              />
            </div>
          ))
        ) : (
          <p>No chats available</p>
        )}
      </div> */}
      <div className="w-2/3 bg-gray-200 p-4">
        <h2 className="text-xl font-semibold mb-4">
          <ChatBox
            chat={currentChat}
            currentUser={userData?._id}
            setSentMessage={setSentMessage}
            receiveMessage={receiveMessage}
            socket={socket}
          />
        </h2>
      </div>
    </div>
  );
};

export default Chat;




import { useEffect, useState } from "react";
import { getrecipientChatData } from "../../service/ChatService/ChatService";
import imagePic from "../../assets/profile_demo.avif";

const Conversation = ({ data, currentUser,online }) => {
  console.log("Online",online)
  console.log("current user",currentUser)
  const recipientChatId = data?.members?.find((id) => id !== currentUser);
  console.log("Reciepient",recipientChatId)
  const [providerData, setProviderData] = useState(null);

  useEffect(() => {
    const fetchProviderData = async () => {
      console.log("Reciepient",recipientChatId)
      if (recipientChatId) {
        try {
          const response = await getrecipientChatData(recipientChatId);
          setProviderData(response.data);
        } catch (error) {
          console.error("Error fetching provider data in chat:", error);
        }
      }
    };

    fetchProviderData();
  }, [recipientChatId]);

  return (
    <div className="flex items-center p-2 bg-white rounded-lg shadow-md">
      <div className="relative">
        <div className="w-3 h-3 bg-green-500 rounded-full absolute top-0 right-0" />
        <img
          className="w-12 h-12 rounded-full"
          src={providerData?.profilePicture || imagePic}
          alt="Profile"
        />
      </div>
      <div className="ml-4">
        <div className="font-semibold">{providerData?.providerName || "Unknown"}</div>
        <div className="text-sm text-gray-500">{online ? "Online" : "Offline"}</div>
      </div>
    </div>
  );
};

export default Conversation;

import { useEffect, useRef, useState } from "react";
import {
  getChatMessages,
  getrecipientChatData,
  sendMessage,
} from "../../service/ChatService/ChatService";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import imagePic from "../../assets/profile_demo.avif";

const ChatBox = ({
  chat,
  currentUser,
  setSentMessage,
  receiveMessage,
  socket,
}) => {
  const [providerData, setProviderData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);

    const fetchProviderData = async () => {
      if (userId) {
        try {
          const response = await getrecipientChatData(userId);
          setProviderData(response.data);
        } catch (error) {
          console.error("Error fetching provider data in chat:", error);
        }
      }
    };

    if (chat) fetchProviderData();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (chat) {
        try {
          const response = await getChatMessages(chat._id);
          setMessages(response.data);
        } catch (err) {
          console.error("Error in fetching messages", err);
        }
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();

    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    try {
      const response = await sendMessage(message);
      console.log("Sending message", response);
      const { data } = response;
      setMessages([...messages, data]);
      setNewMessage("");

      socket.current.emit("send-message", {
        ...data,
        receiverId: chat.members.find((id) => id !== currentUser),
      });
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat?._id) {
      setMessages((prevMessages) => [...prevMessages, receiveMessage]);
    }
  }, [receiveMessage, chat?._id]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const scroll = useRef();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* <div className="w-1/4 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Chats</h2>
          {chat?.length > 0 ? (
            chat?.map((chat) => (
              <div
                key={chat._id}
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer mb-2"
              >
                <img
                  src={chat.profilePicture || imagePic}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-4">
                  <div className="font-semibold text-gray-800">
                    {chat.providerName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {chat.latestMessage?.text}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No chats available</p>
          )}
        </div>
      </div> */}
      <div className="w-3/4 bg-white p-4 rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-4 px-4 py-2 bg-gray-100 rounded-t-lg">
            <div className="flex items-center">
              <img
                src={providerData?.profilePicture || imagePic}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <h2 className="text-xl font-semibold ml-4 text-gray-800">
                {providerData?.providerName || "Unknown"}
              </h2>
            </div>
            <div className="text-gray-500">
              {providerData ? "Online" : "Offline"}
            </div>
          </div>
          <div className="flex-grow bg-gray-50 p-4 rounded-b-lg overflow-y-auto">
            {messages?.length > 0 ? (
              messages.map((message, index) => (
                <div
                  key={index}
                  ref={scroll}
                  className={`flex mb-2 ${
                    message.senderId === currentUser
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      message.senderId === currentUser
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <span>{message.text}</span>
                    <span className="text-xs ml-2 text-gray-500">
                      {format(message.createdAt)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No messages available</p>
            )}
          </div>
          <div className="flex items-center mt-4 px-4 py-2 bg-gray-100 rounded-b-lg">
            <InputEmoji
              value={newMessage}
              onChange={handleChange}
              className="flex-grow mr-2 py-2 px-4 rounded-lg bg-white shadow-sm"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

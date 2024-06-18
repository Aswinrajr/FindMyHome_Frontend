import { useState, useEffect, useRef } from "react";
import { userInstance } from "../../../api/userInstance";
import { userChats } from "../../../service/ChatService/ChatService";
import TopBar from "../../../components/Sample/TopBar";
import Conversation from "./Conversation";
import ChatBox from "./ChatBox";
import { io } from "socket.io-client";
import { useLocation } from "react-router";

const Chat = () => {
  const socket = useRef(null);
  const location = useLocation();
  const data = location.state;
  console.log("Data", data);

  const [chats, setChats] = useState([]);
  const [userData, setUserData] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
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

            socket.current = io("https://chat.findmyhomestay.online:8800");
            socket.current.emit("new-user-add", response.data.userData._id);

            socket.current.on("user-added", (user) => {
              console.log("user", user);
              setOnlineUsers((prevUsers) => [...prevUsers, user]);
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

    if (onlineUsers.length > 0) {
      const online = onlineUsers?.some(
        (user) => user.userId === chatMember && user.socketId
      );
      return online;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const getChats = async () => {
      if (userData) {
        try {
          const response = await userChats(data.bookingId);
          console.log("Response in fetching chat data", response.data);
          setChats(response.data);
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
    <>
      <TopBar />
      <div className="flex h-screen bg-gray-100 ">
        <div className="w-full max-w-4xl mx-auto flex flex-col">
          <div className="flex-grow bg-white shadow-lg overflow-hidden rounded-lg ">
            <ChatBox
              chat={chats}
              currentUser={userData?._id}
              setSentMessage={setSentMessage}
              receiveMessage={receiveMessage}
              socket={socket}
              checkOnlineStatus={checkOnlineStatus}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;

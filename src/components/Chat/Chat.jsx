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
            socket.current.on("user-added", (user) => {
              console.log("user", user);
              setOnlineUsers(user);
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
      <div className="w-1/3 bg-gray-100 p-4">
        <h2 className="text-xl font-semibold mb-4">Chat</h2>
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => setCurrentChat(chat)}
              className="mb-2 cursor-pointer"
            >
              <Conversation data={chat} currentUser={userData?._id} />
            </div>
          ))
        ) : (
          <p>No chats available</p>
        )}
      </div>
      <div className="w-2/3 bg-gray-200 p-4">
        <h2 className="text-xl font-semibold mb-4">
          {currentChat ? (
            <ChatBox
              chat={currentChat}
              currentUser={userData?._id}
              setSentMessage={setSentMessage}
              receiveMessage={receiveMessage}
              socket={socket}
            />
          ) : (
            "Select a chat to start messaging"
          )}
        </h2>
      </div>
    </div>
  );
};

export default Chat;
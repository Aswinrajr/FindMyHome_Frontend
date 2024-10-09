import { useEffect, useRef, useState } from "react";
import {
  getChatMessages,
  getrecipientChatData,
  sendMessage,
} from "../../../service/ChatService/ChatService";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import imagePic from "../../../assets/profile_demo.avif";

const ChatBox = ({
  chat,
  currentUser,
  setSentMessage,
  receiveMessage,
  socket,
  checkOnlineStatus,
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
          console.log("Fetched users==>", providerData);
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

    if (newMessage.trim() === "") {
      return;
    }

    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    try {
      const response = await sendMessage(message);
      console.log("Sending message", response);
      const { data } = response;
      console.log("Data in user chat box", data);
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
  <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
 
    <div className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
      <div className="flex items-center space-x-4">
        <img
          src={providerData?.profilePicture || imagePic}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover border-2 border-white"
        />
        <div>
          <h2 className="text-xl font-semibold">
            {providerData?.providerName || "Unknown"}
          </h2>
          <p className="text-sm text-gray-300">
            {checkOnlineStatus ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>

    
    <div className="flex-grow p-6 overflow-y-auto bg-gray-50">
      {messages?.length > 0 ? (
        messages?.map((message, index) => (
          <div
            key={index}
            ref={scroll}
            className={`flex mb-4 ${
              message.senderId === currentUser
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                message.senderId === currentUser
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <div className="flex items-center justify-end mt-1">
                <span className="text-xs opacity-75">
                  {format(message.createdAt)}
                </span>
                {message.senderId === currentUser && (
                  <span className="ml-2 text-xs opacity-75">Sent</span>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No messages available</p>
      )}
    </div>

  
    <div className="px-6 py-4 bg-white border-t border-gray-200">
      <div className="flex items-center space-x-2">
        <InputEmoji
          value={newMessage}
          onChange={handleChange}
          className="flex-grow bg-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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

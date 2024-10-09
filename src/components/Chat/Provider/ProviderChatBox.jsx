import { useEffect, useRef, useState } from "react";
import {
  getChatMessages,
  getrecipientChatData,
  sendMessage,
} from "../../../service/ChatService/ChatService";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import imagePic from "../../../assets/profile_demo.avif";

const ProviderChatBox = ({
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
    console.log("User as recepient from provider".userId);
    setSentMessage({ ...messages, userId });

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
      console.log("data in provider chat box", data);
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
  }, [receiveMessage]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const scroll = useRef();

  return (
    <div className="flex h-screen justify-center items-center bg-gradient-to-r from-gray-100 to-gray-200">
  <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
    <div className="flex flex-col h-full">
     
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white">
        <div className="flex items-center space-x-4">
          <img
            src={providerData?.profilePicture || imagePic}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
          />
          <div>
            <h2 className="text-xl font-bold truncate max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] xl:max-w-none">
              {providerData?.providerName || providerData?.userName || "Unknown"}
            </h2>
          
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
                className={`max-w-[70%] px-4 py-2 rounded-lg shadow ${
                  message.senderId === currentUser
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                <p className="text-sm leading-snug">{message.text}</p>
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
          <p className="text-gray-500 text-center italic">No messages available</p>
        )}
      </div>

      
      <div className="px-6 py-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <InputEmoji
            value={newMessage}
            onChange={handleChange}
            className="flex-grow py-2 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default ProviderChatBox;

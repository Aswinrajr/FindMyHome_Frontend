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
      <div className="w-1/4 bg-white shadow-lg rounded-lg overflow-hidden">
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
      </div>
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

import { useEffect, useState } from "react";
import {
  getLastMessage,
  getrecipientChatData,
} from "../../../service/ChatService/ChatService";
import imagePic from "../../../assets/profile_demo.avif";
import { format } from "timeago.js";

const ProviderConversation = ({
  data,
  currentUser,
  online,
  receiveMessage,
}) => {
  console.log("Online", online);
  console.log("current user", currentUser);

  const recipientChatId = data?.members?.find((id) => id !== currentUser);
  console.log("Recipient", recipientChatId);
  const [providerData, setProviderData] = useState(null);
  console.log("Last message:", receiveMessage);

  useEffect(() => {
    const fetchProviderData = async () => {
      console.log("Recipient", recipientChatId);
      if (recipientChatId) {
        try {
          const response = await getrecipientChatData(recipientChatId);
          console.log("===>", response);
          setProviderData(response.data);
        } catch (error) {
          console.error("Error fetching provider data in chat:", error);
        }
      }
    };

    fetchProviderData();
  }, [recipientChatId]);

  useEffect(() => {
    const fetchMessage = async () => {
      const message = await getLastMessage(recipientChatId);
      console.log("Last message response", message);
    };
    fetchMessage();
  }, []);

  return (
    <div className="flex items-center p-4 bg-gray-800 rounded-lg shadow-md sm:flex-col sm:items-start">
    <div className="relative sm:mb-2">
      {online && (
        <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
      )}
      <img
        className="h-16 w-16 rounded-full object-cover"
        src={providerData?.profilePicture || imagePic}
        alt="Profile"
      />
    </div>
    <div className="ml-4 flex-1 sm:ml-0">
      <div className="font-semibold text-white">
        {providerData?.providerName || providerData?.userName || "Unknown"}
      </div>
      {receiveMessage &&
      recipientChatId === receiveMessage?.senderId &&
      data._id === receiveMessage?.chatId ? (
        <div className="flex justify-between items-center mt-2 mb-2 sm:flex-col sm:items-start">
          <p className="text-white text-sm sm:mb-1">{receiveMessage?.text || ""}</p>
          <p className="text-gray-400 text-xs">
            {format(receiveMessage?.createdAt)}
          </p>
        </div>
      ) : (
        ""
      )}
      <div className="text-sm text-gray-400">
        {online ? "Online" : "Offline"}
      </div>
    </div>
  </div>
  );
};

export default ProviderConversation;

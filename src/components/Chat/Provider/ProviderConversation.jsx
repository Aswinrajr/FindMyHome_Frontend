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
    <div className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col sm:flex-row items-start sm:items-center">
      <div className="relative mb-4 sm:mb-0 sm:mr-4">
        <img
          className="h-16 w-16 rounded-full object-cover"
          src={providerData?.profilePicture || imagePic}
          alt={`${
            providerData?.providerName || providerData?.userName || "Unknown"
          }'s profile`}
        />
        {online && (
          <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
        )}
      </div>

      <div className="flex-1">
        <h2 className="text-xl font-semibold text-white mb-1">
          {providerData?.providerName || providerData?.userName || "Unknown"}
        </h2>
        <p className="text-sm text-gray-400 mb-2">
          {online ? "Online" : "Offline"}
        </p>

        {receiveMessage &&
          recipientChatId === receiveMessage?.senderId &&
          data._id === receiveMessage?.chatId && (
            <div className="bg-gray-700 rounded p-3 mt-2">
              <p className="text-white text-sm mb-1">
                {receiveMessage?.text || ""}
              </p>
              <p className="text-gray-400 text-xs">
                {format(receiveMessage?.createdAt, "PPpp")}
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default ProviderConversation;

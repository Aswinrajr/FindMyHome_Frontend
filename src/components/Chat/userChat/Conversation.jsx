import { useEffect, useState } from "react";
import { getrecipientChatData } from "../../../service/ChatService/ChatService";
import imagePic from "../../../assets/profile_demo.avif";

const Conversation = ({ data, currentUser, online }) => {
  console.log("Online", online);
  console.log("current user", currentUser);
  const recipientChatId = data?.members?.find((id) => id !== currentUser);
  console.log("Reciepient", recipientChatId);
  const [providerData, setProviderData] = useState(null);

  useEffect(() => {
    const fetchProviderData = async () => {
      console.log("Reciepient", recipientChatId);
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
        <div className="font-semibold">
          {providerData?.providerName || "Unknown"}
        </div>
        <div className="text-sm text-gray-500">
          {online ? "Online" : "Offline"}
        </div>
      </div>
    </div>
  );
};

export default Conversation;

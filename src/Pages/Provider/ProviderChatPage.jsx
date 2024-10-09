import Topbar from "../../components/Provider/layout/Topbar";
import Sidebar from "../../components/Provider/layout/Sidebar";
import ProviderChat from "../../components/Chat/Provider/ProviderChat"

function ProviderChatPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <div className="flex flex-1 flex-col sm:flex-row">
        <div className="w-full sm:w-64 bg-gray-900">
          <Sidebar />
        </div>

        <div className="flex-1 p-4 bg-gray-100">
          <div className="bg-white rounded-lg shadow-md p-4">
            <ProviderChat />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProviderChatPage;

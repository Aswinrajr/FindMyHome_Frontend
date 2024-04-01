import Topbar from "../../components/Provider/layout/Topbar";
import Sidebar from "../../components/Provider/layout/Sidebar";
import ProviderCard from "../../components/Provider/ProviderCard";

function ProviderCardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <div className="flex flex-1 flex-col sm:flex-row">
        <div className="w-full sm:w-64 bg-fuchsia-700">
          <Sidebar />
        </div>
        <ProviderCard />
      </div>
    </div>
  );
}

export default ProviderCardPage;

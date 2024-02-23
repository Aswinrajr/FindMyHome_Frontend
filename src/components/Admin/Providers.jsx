import { useEffect, useState } from "react";
import axios from "axios";

const Providers = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get("http://localhost:1997/admin/providers");
        setProviders(response.data);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchProviders();
  }, []);

  const providerAction = async (providerId) => {
    try {
      const response = await axios.post("http://localhost:1997/admin/providers/action", { providerId });
      console.log(response);

      const updatedProviders = providers.map(provider => {
        if (provider.id === providerId) {
          provider.status = provider.status === "Active" ? "Blocked" : "Active";
        }
        return provider;
      });
      setProviders(updatedProviders);
    } catch (error) {
      console.error("Error updating provider status:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full whitespace-nowrap bg-white divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Image
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Address
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Rooms
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {providers.map((provider) => (
            <tr key={provider.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="h-10 w-10 rounded-full"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{provider.providerName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{provider.type}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {provider.address}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{provider.rooms}</td>
              <td className="px-6 py-4 whitespace-nowrap">{provider.status}</td>
              <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                <button className={`py-2 px-4 rounded ${provider.status === "Blocked" ? "bg-green-500 hover:bg-green-700" : "bg-red-500 hover:bg-red-700"} text-white font-bold`} onClick={() => providerAction(provider.id)}>
                  {provider.status === "Active" ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Providers;

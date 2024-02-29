import { useEffect, useState } from "react";
import axios from "axios";

const Providers = () => {
  const [providers, setProviders] = useState([]);

  const adminRoute = import.meta.env.VITE_ADMIN_ROUTE;

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get(`${adminRoute}/providers`);
        setProviders(response.data);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchProviders();
  }, []);
  console.log("Providers", providers);

  const providerAction = async (providerId) => {
    try {
      const response = await axios.post(
        `${adminRoute}/providers/action/${providerId}`
      );
      console.log("response", response);

      const updatedProviders = providers.map((provider) => {
        if (provider._id === providerId) {
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
              Profile
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
                  src={`http://localhost:1997/${provider.providerImage[0]}`}
                  alt={provider.name}
                  className="h-10 w-10 rounded-full"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {provider.providerName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {provider.Profile}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {provider.ProviderCity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {provider.providerRooms}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{provider.status}</td>
              <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                <button
                  className={`py-2 px-4 rounded ${
                    provider.status === "Blocked"
                      ? "bg-green-500 hover:bg-green-700"
                      : "bg-red-500 hover:bg-red-700"
                  } text-white font-bold`}
                  onClick={() => providerAction(provider._id)}
                >
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

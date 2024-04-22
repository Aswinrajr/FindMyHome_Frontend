import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import { Navigate } from "react-router";

import {
  getProviderData,
  providerActions,
} from "../../../service/Admin/ManagementService";

const Providers = () => {
  let token = localStorage.getItem("accessToken");

  const newToken = JSON.parse(token);
  token = newToken?.accessToken;

  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await getProviderData();

        setProviders(response.data);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchProviders();
  }, []);

  if (!token) return <Navigate to="/admin" />;

  console.log("Providers", providers);

  const providerAction = async (providerId) => {
    const confirmation = await Swal.fire({
      title: "Confirm Action",
      text: `Are you sure you want to ${
        providers.find((provider) => provider._id === providerId).status ===
        "Active"
          ? "block"
          : "unblock"
      } this provider?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed",
    });

    if (confirmation.isConfirmed) {
      try {
        const response = await providerActions(providerId);

        console.log("response", response);

        const updatedProviders = providers.map((provider) => {
          if (provider._id === providerId) {
            provider.status =
              provider.status === "Active" ? "Blocked" : "Active";
          }
          return provider;
        });
        setProviders(updatedProviders);
      } catch (error) {
        console.error("Error updating provider status:", error);
      }
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
          {providers?.map((provider) => (
            <tr key={provider._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={`${provider.providerImage[0]}`}
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

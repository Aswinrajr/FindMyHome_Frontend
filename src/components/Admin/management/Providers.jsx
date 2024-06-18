import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Navigate } from "react-router";
import {
  getProviderData,
  providerActions,
} from "../../../service/Admin/ManagementService";
import profilePic from "../../../assets/profile_demo.avif";

const Providers = () => {
  let token = localStorage.getItem("accessToken");

  const newToken = JSON.parse(token);
  token = newToken?.accessToken;

  const [providers, setProviders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 3;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProviders, setFilteredProviders] = useState([]);

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

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = providers.filter((provider) =>
      provider.providerName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProviders(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(
      (searchTerm ? filteredProviders.length : providers.length) / perPage
    );
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 rounded-md transition duration-300 ${
            currentPage === i
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

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
        console.log(response);
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

  const indexOfLastProvider = currentPage * perPage;
  const indexOfFirstProvider = indexOfLastProvider - perPage;
  const currentProviders = searchTerm
    ? filteredProviders.slice(indexOfFirstProvider, indexOfLastProvider)
    : providers.slice(indexOfFirstProvider, indexOfLastProvider);

  return (
    <div className="overflow-x-auto md:overflow-x-visible">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search providers..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto md:overflow-x-visible">
          {renderPaginationButtons()}
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full whitespace-nowrap bg-white divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                Profile
              </th>
              <th
                scope="col"
                className="hidden md:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                Address
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                Rooms
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentProviders.map((provider) => (
              <tr
                key={provider._id}
                className="hover:bg-gray-100 transition duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={
                      provider.image
                        ? `${provider.providerImage[0]}`
                        : profilePic
                    }
                    alt={provider.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {provider.providerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {provider.Profile}
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                  {provider.ProviderCity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {provider.providerRooms}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      provider.status === "Active"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {provider.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                  <button
                    className={`py-2 px-4 rounded ${
                      provider.status === "Blocked"
                        ? "bg-green-500 hover:bg-green-700"
                        : "bg-red-500 hover:bg-red-700"
                    } text-white font-semibold`}
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
    </div>
  );
};

export default Providers;

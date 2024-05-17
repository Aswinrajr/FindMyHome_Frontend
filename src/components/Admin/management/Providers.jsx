import  { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Navigate } from "react-router";
import { getProviderData, providerActions } from "../../../service/Admin/ManagementService";
import profilePic from "../../../assets/profile_demo.avif"

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
    const totalPages = Math.ceil((searchTerm ? filteredProviders.length : providers.length) / perPage);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 ${
            currentPage === i ? "bg-gray-500 text-white" : "bg-white text-gray-700"
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
        console.log(response)
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
  const currentProviders = searchTerm ? filteredProviders.slice(indexOfFirstProvider, indexOfLastProvider) : providers.slice(indexOfFirstProvider, indexOfLastProvider);

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search providers..."
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded-md px-3 py-2 w-72 focus:outline-none focus:border-blue-500"
        />
        <div className="flex space-x-2">{renderPaginationButtons()}</div>
      </div>
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
          {currentProviders.map((provider) => (
            <tr key={provider._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={provider.image?`${provider.providerImage[0]}`:profilePic}
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

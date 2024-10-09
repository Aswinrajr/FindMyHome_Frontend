import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import profilePic from "../../../assets/profile_demo.avif";
import { Navigate } from "react-router";
import {
  getUserData,
  userActions,
} from "../../../service/Admin/ManagementService";

const Users = () => {
  let token = localStorage.getItem("accessToken");
  const baseUrl = import.meta.env.VITE_BASE_URL_ROUTE;

  const newToken = JSON.parse(token);
  token = newToken?.accessToken;

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const perPage = 3;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUserData();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  if (!token) return <Navigate to="/admin" />;

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = users.filter((user) =>
      user.userName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(
      (searchTerm ? filteredUsers.length : users.length) / perPage
    );
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 ${
            currentPage === i
              ? "bg-gray-500 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const userAction = async (userId) => {
    const confirmation = await Swal.fire({
      title: "Confirm Action",
      text: `Are you sure you want to ${
        users.status === "Active" ? "block" : "unblock"
      } this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed",
    });

    if (confirmation.isConfirmed) {
      try {
        const response = await userActions(userId);
      

        const updatedUsers = users.map((user) => {
          if (user._id === userId) {
            user.status = user.status === "Active" ? "Blocked" : "Active";
          }
          return user;
        });
        setUsers(updatedUsers);
      } catch (error) {
        console.error("Error updating user status:", error);
      }
    }
  };

  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const currentUsers = searchTerm
    ? filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
    : users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="w-72">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          {renderPaginationButtons()}
        </div>
      </div>

      <div className="rounded-lg shadow-md">
        <table className="w-full bg-white divide-y divide-gray-200">
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
                Mobile
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Role
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
            {currentUsers.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={
                      user?.image|| profilePic
                    }
                    alt={user.name}
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  {user.userName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.userMobile}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.role === "Admin"
                        ? "bg-green-100 text-green-800"
                        : user.role === "Provider"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap ">
                  <button
                    className={`py-1 px-3 text-xs font-medium rounded mt-2 ${
                      user.status === "Blocked"
                        ? "bg-green-500 hover:bg-green-700  text-white"
                        : "bg-red-500 hover:bg-red-700 text-white"
                    }`}
                    onClick={() => userAction(user._id)}
                  >
                    {user.status === "Active" ? "Block" : "Unblock"}
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

export default Users;

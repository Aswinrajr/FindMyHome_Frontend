import { useEffect, useState } from "react";

import Swal from 'sweetalert2';
import profilePic from "../../assets/profile_demo.avif";
import { axiosInstance } from "../../api/axios";
import { Navigate } from "react-router";

const Users = () => {
  let token = localStorage.getItem("accessToken")
  console.log("In users list",token)
  const newToken =JSON.parse(token)
  token = newToken?.accessToken
  console.log("New Token",token)
  
  const [users, setUsers] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL_ROUTE;


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(`admin/users`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data);
        console.log(users)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);
  if(!token) return <Navigate to="/admin"/>

  const userAction = async (userId) => {
    const confirmation = await Swal.fire({
      title: 'Confirm Action',
      text: `Are you sure you want to ${users.status === 'Active' ? 'block' : 'unblock'} this user?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, proceed'
    });

    if (confirmation.isConfirmed) {
      try {
        const response = await axiosInstance.post(`/admin/users/action`, { userId });
        console.log(response);
       
        const updatedUsers = users.map(user => {
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
          {users.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  src={user.image ? `${baseUrl}/${user.image}` : `${profilePic}`}
                  alt={user.name}
                  className="h-10 w-10 rounded-full"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{user.userName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.userMobile}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.status}</td>
              <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                <button
                  className={`py-2 px-4 rounded ${user.status === "Blocked" ? "bg-green-500 hover:bg-green-700" : "bg-red-500 hover:bg-red-700"} text-white font-bold`}
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
  );
};

export default Users;

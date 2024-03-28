import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();
  const changePage = (page) => {
    navigate(`/${page}`);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <div
          onClick={() => changePage("admin")}
          className="admin bg-blue-500 text-white p-4 rounded-md"
        >
          <span>Admin</span>
        </div>
        <span className="mt-2 text-sm text-gray-500">Admin</span>
      </div>
      <div className="flex flex-col items-center mx-4">
        <div
          onClick={() => changePage("provider")}
          className="provider bg-green-500 text-white p-4 rounded-md"
        >
          <span>Provider</span>
        </div>
        <span className="mt-2 text-sm text-gray-500">Provider</span>
      </div>
      <div className="flex flex-col items-center">
        <div
          onClick={() => changePage("login")}
          className="user bg-yellow-500 text-white p-4 rounded-md"
        >
          <span>User</span>
        </div>
        <span className="mt-2 text-sm text-gray-500">User</span>
      </div>
    </div>
  );
};

export default HomePage;

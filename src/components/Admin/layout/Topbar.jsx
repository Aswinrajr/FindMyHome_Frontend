import logoImage from "../../../assets/logo.png";
import profilePic from "../../../assets/3.webp";

const Topbar = () => {
  return (
    <div className="bg-fuchsia-700 text-white px-4 py-2 flex items-center justify-between sm:px-6 lg:px-8">
      <div className="flex items-center">
        <img src={logoImage} alt="Logo" className="h-8 mr-4" />
      </div>

      <div className="flex items-center justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="bg-white text-white rounded-md pl-8 pr-3 py-2 focus:outline-none sm:text-sm"
          style={{ minWidth: "200px" }}
        />
        <button className="rounded-md bg-green-600 px-4 py-2 focus:outline-none ml-3">
          Search
        </button>
      </div>

      <div className="hidden sm:flex items-center">
        <img src={profilePic} alt="Profile" className="h-8 rounded-full" />
      </div>
    </div>
  );
};

export default Topbar;

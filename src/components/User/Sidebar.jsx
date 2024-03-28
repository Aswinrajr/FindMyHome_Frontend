const Sidebar = () => {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-md rounded-lg p-4 h-full flex flex-col gap-4">
      <div className="font-bold text-white">
        <h3>Filters</h3>
      </div>
      <div className="flex flex-col gap-2">
        <label className="flex items-center text-white">
          <input type="checkbox" className="form-checkbox mr-2" />
          <span>Room Type</span>
        </label>
        <div className="ml-4 flex flex-col gap-1">
          <label className="flex items-center text-white">
            <input type="checkbox" className="form-checkbox mr-2" />
            <span>Single</span>
          </label>
          <label className="flex items-center text-white">
            <input type="checkbox" className="form-checkbox mr-2" />
            <span>Double</span>
          </label>
          <label className="flex items-center text-white">
            <input type="checkbox" className="form-checkbox mr-2" />
            <span>Suite</span>
          </label>
        </div>
      </div>
      <label className="flex items-center mb-1 text-white">
        <span className="text-sm">Price Range:</span>
        <input
          type="range"
          className="flex-grow mt-1 ml-2"
          min="0"
          max="1000"
        />
      </label>
      <div className="flex flex-col gap-2">
        <label className="flex items-center mb-1 text-white">
          <span className="text-sm">Sort By:</span>
          <select className="flex-grow mt-1 ml-2 border rounded bg-white text-gray-700">
            <option value="low_to_high">Low to High</option>
            <option value="high_to_low">High to Low</option>
          </select>
        </label>
        <label className="flex items-center mb-1 text-white">
          <span className="text-sm">Amenities:</span>
          <div className="ml-4 flex flex-col gap-1">
            <label className="flex items-center text-white">
              <input type="checkbox" className="form-checkbox mr-2" />
              <span>Wi-Fi</span>
            </label>
            <label className="flex items-center text-white">
              <input type="checkbox" className="form-checkbox mr-2" />
              <span>Parking</span>
            </label>
            <label className="flex items-center text-white">
              <input type="checkbox" className="form-checkbox mr-2" />
              <span>Pool</span>
            </label>
          </div>
        </label>
        <label className="flex items-center mb-1 text-white">
          <span className="text-sm">Rating:</span>
          <select className="flex-grow mt-1 ml-2 border rounded bg-white text-gray-700">
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select>
        </label>
      </div>
      <button className="bg-white hover:bg-gray-200 text-purple-500 font-bold py-2 px-4 rounded">
        Apply Filters
      </button>
    </div>
  );
};

export default Sidebar;

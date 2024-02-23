const SearchRooms = () => {
  return (
    <section className="py-16 px-8 bg-gray-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Search Rooms</h2>
        <form className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row md:space-x-4">
            <input
              type="text"
              placeholder="Location"
              className="flex-1 p-2 border"
            />
            <input
              type="date"
              placeholder="Check-in"
              className="flex-1 p-2 border"
            />
            <input
              type="date"
              placeholder="Check-out"
              className="flex-1 p-2 border"
            />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <input
              type="number"
              placeholder="Adults"
              className="flex-1 p-2 border"
            />
            <input
              type="number"
              placeholder="Children"
              className="flex-1 p-2 border"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchRooms;

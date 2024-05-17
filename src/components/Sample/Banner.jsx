import { useNavigate } from "react-router";
import imageUrl from "../../assets/istockphoto-1050564510-2048x2048.jpg";
import { Toaster } from "react-hot-toast";

const Banner = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("userAccessToken");

  return (
    <section className="relative h-96 md:h-128">
       <Toaster position="top-center" reverseOrder={false} />
      <img src={imageUrl} alt="Banner" className="w-full h-full object-cover" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center w-full">
        <div className="bg-black bg-opacity-50 py-8 px-4 rounded-lg">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome</h1>
          <p className="text-lg md:text-xl mb-8">
            Find your perfect room with ease
          </p>
          {user ? 
           
          "" : (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Book Now
            </button>
          )}
        </div>
        
      </div>
    </section>
  );
};

export default Banner;

import image1 from "../../assets/1.webp";
import image2 from "../../assets/2.jpeg";
import image3 from "../../assets/3.webp";
import image4 from "../../assets/4.webp";

const Services = () => {
  return (
<div className=" bg-blue-50 rounded-lg shadow-md p-8">
  <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
    Our Services
  </h2>
  <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-12">
    <div className="flex flex-col space-y-8 lg:w-1/2">
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <img
          src={image1}
          alt="Service Image 1"
          className="w-full sm:w-1/2 h-32 object-cover rounded-lg shadow-lg"
        />
        <img
          src={image2}
          alt="Service Image 2"
          className="w-full sm:w-1/2 h-32 object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <img
          src={image3}
          alt="Service Image 3"
          className="w-full sm:w-1/2 h-32 object-cover rounded-lg shadow-lg"
        />
        <img
          src={image4}
          alt="Service Image 4"
          className="w-full sm:w-1/2 h-32 object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
    <div className="lg:w-1/2">
      <div className="text-lg text-gray-800">
        <p className="mb-8">
          Discover our wide range of room booking services designed to make
          your experience seamless and enjoyable. Whether you're looking for a
          cozy retreat or a luxurious getaway, we have something for everyone.
        </p>
        <p className="mb-8">
          Explore our collection of accommodations, browse through our
          curated listings, and book your perfect room with confidence. Our
          user-friendly interface and helpful tools make it easy to find
          exactly what you're looking for.
        </p>
        <p>
          Experience hassle-free booking, exceptional customer service, and
          unforgettable stays with us. Your dream room is just a click away!
        </p>
      </div>
    </div>
  </div>
</div>
  
  );
};

export default Services;

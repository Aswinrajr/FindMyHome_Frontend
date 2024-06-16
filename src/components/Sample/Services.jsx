import image1 from "../../assets/1.webp";
import image2 from "../../assets/2.jpeg";
import image3 from "../../assets/3.webp";
import image4 from "../../assets/4.webp";

const Services = () => {
  return (
    <section className="py-16 px-4 bg-gray-200">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Our Services
      </h2>
      <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-12">
        <div className="flex flex-col space-y-8 lg:w-1/2">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <img
              src={image1}
              alt="Service Image 1"
              className="w-full sm:w-1/2 h-32 object-cover rounded"
            />
            <img
              src={image2}
              alt="Service Image 2"
              className="w-full sm:w-1/2 h-32 object-cover rounded"
            />
          </div>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <img
              src={image3}
              alt="Service Image 3"
              className="w-full sm:w-1/2 h-32 object-cover rounded"
            />
            <img
              src={image4}
              alt="Service Image 4"
              className="w-full sm:w-1/2 h-32 object-cover rounded"
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
  </section>
  
  );
};

export default Services;

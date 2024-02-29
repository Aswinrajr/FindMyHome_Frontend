
import pics from "../../assets/2.jpeg";

const ExploreByType = () => {
  return (
    <div className="explore-with-type mt-8 px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Explore with Choice</h2>
      <div className="grid grid-cols-3 gap-8 mb-12">
     
        <div className="image-container mx-auto">
          <img src={pics} alt="Image 1" className="w-80 h-48 object-cover rounded-lg" />
        </div>
        <div className="image-container mx-auto">
          <img src={pics} alt="Image 2" className="w-80 h-48 object-cover rounded-lg" />
        </div>
        <div className="image-container mx-auto">
          <img src={pics} alt="Image 3" className="w-80 h-48 object-cover rounded-lg" />
        </div>
     
        <div className="image-container mx-auto">
          <img src={pics} alt="Image 4" className="w-80 h-48 object-cover rounded-lg" />
        </div>
        <div className="image-container mx-auto">
          <img src={pics} alt="Image 5" className="w-80 h-48 object-cover rounded-lg" />
        </div>
        <div className="image-container mx-auto">
          <img src={pics} alt="Image 6" className="w-80 h-48 object-cover rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ExploreByType;

import { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { getAllReviews, submitReview } from "../../service/User/UserService";
import { Toaster, toast } from "react-hot-toast";


const StarRating = ({ rating }) => {

  const stars = [];

  const ratingValue = rating;

  for (let i = 1; i <= 5; i++) {
    const starClass =
      i <= ratingValue
        ? "fas fa-star text-yellow-500"
        : "fas fa-star text-gray-300";
    stars.push(<i key={i} className={starClass} />);
  }
  return <div className="flex items-center">{stars}</div>;
};

const UserReview = ({ roomId }) => {
  const [roomRating, setRoomRating] = useState(0);
  console.log("Welcome to user review page")

  const [description, setDescription] = useState("");
  const [reviews, setReviews] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllReviews(roomId);
  
      if (response.status === 200) {
        setReviews(response.data.reviews.reviews);
       
      }
    };
    fetchData();
  }, [roomId]);

  const handleRatingChange = (e) => {
    setRoomRating(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      description,
      rating: roomRating,
    };
    console.log(data);

    const response = await submitReview(data, roomId);
    
    if (response.status === 200) {
     
      toast.success(response.data.message);
    }

    const newReview = {
      id: reviews.length + 1,
      rating: roomRating,
      description,
      author: "You",
    };
    setReviews([...reviews, newReview]);
    setRoomRating("");
    setDescription("");
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">User Reviews</h2>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="description" className="block font-bold mb-2">
              Your Review
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="roomRating" className="block font-bold mb-2">
              Room Rating
            </label>
            <select
              id="roomRating"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={roomRating}
              onChange={handleRatingChange}
              required
            >
              <option value="">Select Rating</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Submit Review
          </button>
        </form>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Review List</h3>
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white shadow-md rounded-md p-4 mb-4"
          >
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-bold">
                {review?.userName ? review.userName : "You"}
              </h5>
              <StarRating rating={review.rating} />
            </div>
            <p className="text-gray-700">{review.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReview;

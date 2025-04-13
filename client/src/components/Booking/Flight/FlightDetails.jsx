import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Hooks/ContextApi";

const FlightDetails = () => {
  const [flight, setFlight] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const [reviewData, setReviewData] = useState({
    comment: "",
    rating: "",
  });
  const { token: tokenFromContext, userReviewData } = useAuth();
  const location = useLocation();
  const {
    userId,
    modelType,
    product_Id,
    token: tokenFromNav,
  } = location.state || {};
  const [submitting, setSubmitting] = useState(false);
  const token = tokenFromNav || tokenFromContext;

  const flightReview = userReviewData?.allReviews?.filter(
    ({ source, product_Id }) => source === "Flight" && product_Id === product_Id
  );

  const navigate = useNavigate();
  const handleCheck = () => {
    navigate("/payment", {
      state: {
        price: flight.minPrice,
        title: flight.airline,
        product_Id: flight._id,
        bookingType: "Flight",
        token: token,
      },
    });
  };

  const fetchFlight = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/flight/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setFlight(data.flight);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // review
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/create-review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating: reviewData.rating,
            comment: reviewData.comment,
            modelType: modelType,
            product_Id: product_Id,
            user_id: userId,
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setReviewData(result);
        alert("Review submitted successfully!");
      } else {
        alert(result.message || "Failed to add review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData({ ...reviewData, [name]: value });
  };

  useEffect(() => {
    fetchFlight();
  }, []);

  useEffect(() => {
    if (!product_Id || !modelType || !userId) {
      // console.warn("Missing review data from location.state");
      return;
    }
  }, [product_Id, modelType, userId]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!flight)
    return <p className="text-center text-gray-500">No flight found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Image Section */}
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md">
        <span className="text-gray-500">Image (Full width, Half Height)</span>
      </div>
      <div className="mt-4 space-y-2">
        <p className="text-lg">{flight.travellerType || "N/A"}</p>
        <h2 className="text-lg font-semibold">{flight.airline}</h2>

        <p className="font-bold">
          Flight Number: {flight.flightNumber || "N/A"}
        </p>
        <p className="font-bold">Duration: {flight.duration || "N/A"}</p>
        <div className="flex gap-10 bg-gray-100 p-2 rounded-md">
          <p className="text-gray-700">Departure: {flight.from}</p>
          <h1>used to logo </h1>
          <p className="text-gray-700">Arrival: {flight.to}</p>
        </div>
        <div className="flex gap-10 bg-gray-100 p-2 rounded-md text-center">
          <p className="font-bold">
            Departure Time: {flight.departureTime || "N/A"}
          </p>
          <p className="font-bold">
            Arrival Time: {flight.arrivalTime || "N/A"}
          </p>
        </div>

        <div className="bg-gray-200 text-gray-700 py-1 rounded-md">
          {flight.status || "N/A"}
        </div>

        <p>Price: ${flight.minPrice}</p>
        <p>Seats Available: {flight.seatsAvailable || "N/A"}</p>
      </div>
      <div className="div">
        {" "}
        <bottom
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition mt-5"
          onClick={handleCheck}
        >
          Book now
        </bottom>
      </div>

      {/* /User all review display  */}
      <div className="div">
        {flightReview?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {flightReview.map((review, index) => (
              <div key={index} className="p-4 shadow-md rounded bg-white">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <p className="text-gray-800 font-semibold">
                    {review.userName}
                  </p>
                </div>
                <p className="text-yellow-500">⭐ {review.rating}</p>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Leave a Review
        </h3>
        <form
          onSubmit={handleSubmitReview}
          className="space-y-4 bg-gray-100 p-4 rounded-lg shadow"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Rating (1 to 5):
            </label>
            <input
              type="number"
              min="1"
              max="5"
              name="rating"
              value={reviewData.rating}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Your Review:
            </label>
            <textarea
              name="comment"
              value={reviewData.comment}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FlightDetails;

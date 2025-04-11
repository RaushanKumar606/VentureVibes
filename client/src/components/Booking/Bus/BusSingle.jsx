import { useParams, useNavigate ,useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../Hooks/ContextApi";
const BusSingle = () => {
  const { id } = useParams();
  const [busData, setBusData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState({
    comment: "",
    rating: "",
    product_Id:"",
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
  const busReview = userReviewData?.allReviews?.filter(
    ({ source, product_Id }) => source === "Bus" && product_Id === product_Id
  );

  const navigate = useNavigate();
  const handleCheckIn = () => {
    if (busData.length === 0) return;
    const bus = busData[0];
    navigate("/payment", {
      state: {
        price: bus.price,
        title: bus.name,
        product_Id: bus._id,
        bookingType: "Bus",
        token: token,
      },
    });
  };

  const getById = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/bus/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      if (response.ok) {
        setBusData(Array.isArray(data) ? data : [data]);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

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
      console.log(result)
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
    getById();
  }, [id]);

    useEffect(() => {
      if (!product_Id || !modelType || !userId) {
        console.warn("Missing review data from location.state");
        return;
      }
    }, [product_Id, modelType, userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {busData.map((bus) => (
        <div key={bus._id}>
          <div className="w-full h-60 bg-gray-200 flex items-center justify-center rounded-md overflow-hidden">
            <img
              src={bus.image}
              alt={bus.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold">{bus.name}</h2>

            <p className="text-sm normal">From: {bus.departureLocation}</p>
            <p className="text-sm normal">To: {bus.arrivalLocation}</p>

            <p className="font-bold mt-2">
              Departure Time:{" "}
              <span className="font-normal">{bus.departureTime}</span>
            </p>
            <p className="font-bold">
              Arrival Time:{" "}
              <span className="font-normal">{bus.arrivalTime}</span>
            </p>
            <p className="mt-2">
              <span className="font-bold">Price:</span> ${bus.price}
            </p>
            <p>
              <span className="font-bold">Bus Type:</span> {bus.busType}
            </p>
            <p>
              <span className="font-bold">Seats Available:</span>{" "}
              {bus.seatsAvailable}
            </p>
            <p>
              <span className="font-bold">Status:</span> {bus.status}
            </p>
          </div>
          <bottom
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
            onClick={handleCheckIn}
          >
            Book now
          </bottom>
        </div>
      ))}


  {/* /User all review display  */}
  <div className="div">
  {busReview?.length > 0 && (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {busReview.map((review, index) => (
        <div key={index} className="p-4 shadow-md rounded bg-white">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={review.userImage}
              alt={review.userName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <p className="text-gray-800 font-semibold">{review.userName}</p>
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

export default BusSingle;

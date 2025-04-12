import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/ContextApi";
function SingleTour() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedDays, setExpandedDays] = useState({});
  const [reviewData, setReviewData] = useState({
    comment: "",
    rating: "",
  });
  const location = useLocation();
  const {
    userId,
    modelType,
    product_Id,
    token: tokenFromNav,
  } = location.state || {};
  const { token: tokenFromContext, userReviewData } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const token = tokenFromNav || tokenFromContext;

  

  const tourReview = userReviewData?.allReviews?.filter(
    ({ source, product_Id }) => source === "Tour" && product_Id === product_Id
  );

  
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
    setReviewData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const apiUrl = `${import.meta.env.VITE_BASE_URL}/api/tours/${id}`;

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, product_Id, modelType, userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Function to toggle the collapse state
  const toggleDay = (day) => {
    setExpandedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col md:flex-row mt-10">
        <div className="md:w-1/2">
          <img
            src={
              data.images && data.images.length > 0
                ? data.images[0]
                : "default-image.jpg"
            }
            alt={data?.title || "Tour Image"}
            className="w-full h-auto rounded-lg mt-10"
          />
        </div>

        <div className="md:w-1/2 p-6">
          <h2 className="text-3xl font-bold text-gray-800">{data?.title}</h2>
          <p className="text-red-500 font-semibold my-2">
            {data.duration?.nights} Nights - {data.duration?.days} Days
          </p>
          <p className="text-sm text-gray-600 mb-5">
            Price:{" "}
            <span className="font-medium text-black">
              ${data?.price?.toLocaleString()}
            </span>
          </p>

          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow">
            Book Now
          </button>

          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-700">Inclusions</h3>
            <div className="flex items-center gap-4 mt-2">
              <div className="text-center">
                <span className="text-gray-700 text-2xl">🏨</span>
                <p className="text-sm text-gray-600">3 Stars</p>
              </div>
              <div className="text-center">
                <span className="text-gray-700 text-2xl">🚗</span>
                <p className="text-sm text-gray-600">Transfer</p>
              </div>
              <div className="text-center">
                <span className="text-gray-700 text-2xl">🍽️</span>
                <p className="text-sm text-gray-600">Meals</p>
              </div>
              <div className="text-center">
                <span className="text-gray-700 text-2xl">👣</span>
                <p className="text-sm text-gray-600">Sightseeing</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-700">
              Highlights of The Trip
            </h3>
            <ul className="list-disc pl-5 text-gray-600 mt-2">
              <li>Visit to Naini lake</li>
              <li>Visit to Naina Devi Temple</li>
              <li>Visit to Gurudwara</li>
              <li>Enjoy boat ride at Naini Lake</li>
              <li>Stroll around the Mall</li>
              <li>Visit to Bhimtal, Sattal, Naukuchiatal</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Destination name  */}
      <div className="flex flex-wrap gap-2  p-10">
        {data.destinations.map((place, idx) => (
          <span
            key={idx}
            className="px-3 py-1 border rounded-full text-blue-600 text-sm bg-blue-50"
          >
            📍 {place}
          </span>
        ))}
      </div>

      {/* Itinerary Section */}
      <div className="mt-5 p-10 space-y-6">
        {data.dayWisePlan.map((day, index) => {
          const dayKey = `day${index + 1}`;
          return (
            <div
              key={day._id || index}
              className="border-l-4 border-orange-500 pl-6"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleDay(dayKey)}
              >
                <h3 className="text-orange-600 font-bold">Day {day.day}</h3>
                <span className="text-orange-600">
                  {expandedDays[dayKey] ? "▲" : "▼"}
                </span>
              </div>
              {expandedDays[dayKey] && (
                <>
                  <p className="font-semibold text-gray-700">
                    {" "}
                    <span className="px-3 py-1 border rounded-full text-gray-600 text-sm">
                      Activity
                    </span>
                    {day.activity}
                  </p>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* /User all review display  */}

      <div className="div p-10 mt-5">
        {tourReview?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tourReview.map((review, index) => (
              <div key={index} className="p-4 shadow-md rounded bg-white">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <p className="text-gray-800 font-semibold">
                    @{review.userName}
                  </p>
                </div>
                <p className="text-yellow-500">
                  {"⭐".repeat(Number(review.rating))}
                </p>
                <p className="text-gray-600">{review.comment}</p>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* user post review */}
      <div className="mt-5 p-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Leave a Review
        </h3>

        <form
          onSubmit={handleSubmitReview}
          className="space-y-4 bg-gray-100 p-4 rounded-lg shadow"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Rating:
            </label>

            {/* Starability slot rating system */}
            <fieldset className="starability-slot">
              <input
                type="radio"
                id="rate1"
                name="rating"
                value="1"
                checked={reviewData.rating === "1"}
                onChange={handleChange}
              />
              <label htmlFor="rate1" title="Terrible">
                1 star
              </label>

              <input
                type="radio"
                id="rate2"
                name="rating"
                value="2"
                checked={reviewData.rating === "2"}
                onChange={handleChange}
              />
              <label htmlFor="rate2" title="Not good">
                2 stars
              </label>

              <input
                type="radio"
                id="rate3"
                name="rating"
                value="3"
                checked={reviewData.rating === "3"}
                onChange={handleChange}
              />
              <label htmlFor="rate3" title="Average">
                3 stars
              </label>

              <input
                type="radio"
                id="rate4"
                name="rating"
                value="4"
                checked={reviewData.rating === "4"}
                onChange={handleChange}
              />
              <label htmlFor="rate4" title="Very good">
                4 stars
              </label>

              <input
                type="radio"
                id="rate5"
                name="rating"
                value="5"
                checked={reviewData.rating === "5"}
                onChange={handleChange}
              />
              <label htmlFor="rate5" title="Amazing">
                5 stars
              </label>
            </fieldset>
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
  {/* Tour Location  */}
      <div className=" p-10">
      <h1>Where you&apos;ll be</h1>
      {/* <div id="map" style=" width: 80vh; height: 600px"></div> */}
      </div>
    </>
  );
}

export default SingleTour;

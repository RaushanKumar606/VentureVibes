import { useEffect, useState } from "react";
import { useAuth } from "../../Hooks/ContextApi";
import { useNavigate, useParams, } from "react-router-dom";

function SingleHotel() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState("");
const [newRating, setNewRating] = useState();
const [submitting, setSubmitting] = useState(false);

  const{token}= useAuth();
  const navigate = useNavigate();

  const handleCheckIn = () => {
    navigate("/payment", {
      state: {
        price: data?.pricePerNight,
        title: data?.name,
        product_Id: data?._id,
        token:token,
        bookingType: "Hotel",
      },
    });
  };

  useEffect(() => {
    if (!id) {
      setError("Invalid ID provided");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/hotel/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]);



  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview || !newRating) return alert("Please fill all fields");
  
    setSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/create-review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          reviews: newReview,
          rating: newRating,
          modelType: "hotel",
          produce_Id: data._Id
        })
      });
  
      const result = await response.json();
      if (response.ok) {
        setData(prev => ({
          ...prev,
          reviews: [...prev.reviews, result.review]
        }));
        setNewReview("");
        setNewRating(0);
      } else {
        alert(result.message || "Failed to add review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setSubmitting(false);
    }
  };
  


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col md:flex-row mt-10">
        <div className="md:w-1/2">
          <img
           src={data.images && data.images.length > 0 ? data.images[0] : "default-image.jpg"}
           alt={data.name}
            className="w-full h-auto rounded-lg mt-10"
          />
        </div>

        <div className="md:w-1/2 p-6">
          <h2 className="text-3xl font-bold text-gray-800">{data?.name}</h2>
          <p className="text-red-500 font-semibold my-2">PerNights/${data?.pricePerNight} </p>
          <p className="text-black-200 my-2">{data?.location}</p>
          <bottom  className="bg-green-500 hover:bg-gerrn-600 text-white px-4 py-2 rounded transition "
            onClick={handleCheckIn}>
          Booking Now </bottom>
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

      <div className="mt-10">
  <h3 className="text-xl font-semibold text-gray-700 mb-4">User Reviews</h3>
  {data.reviews && data.reviews.length > 0 ? (
    <div className="space-y-4">
      {data.reviews.map((review, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
          <p className="text-gray-800 font-medium">⭐ {review.rating}5</p>
          <p className="text-gray-700">{review.reviews}</p>
          <p className="text-sm text-gray-500 mt-1">
            — {review.author?.name || "Anonymous"}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">No reviews yet.</p>
  )}
</div>


<div className="mt-10">
  <h3 className="text-xl font-semibold text-gray-700 mb-2">Leave a Review</h3>
  <form onSubmit={handleSubmitReview} className="space-y-4 bg-gray-100 p-4 rounded-lg shadow">
    <div>
      <label className="block text-gray-700 font-medium mb-1">Rating (1 to 5):</label>
      <input
        type="number"
        min="1"
        max="5"
        value={newRating}
        onChange={(e) => setNewRating(Number(e.target.value))}
        className="w-full border p-2 rounded"
      />
    </div>
    <div>
      <label className="block text-gray-700 font-medium mb-1">Your Review:</label>
      <textarea
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
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


    
     
    </>
  );
}

export default SingleHotel;

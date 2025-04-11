import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleTour() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedDays, setExpandedDays] = useState({}); // State for collapsible sections

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
  }, [id]);

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
      <div className="flex flex-wrap gap-2 mt-4">
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
      <div className="mt-4 space-y-6">
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
                  <p className="font-semibold text-gray-700">   <span className="px-3 py-1 border rounded-full text-gray-600 text-sm">
                      Activity
                    </span>{day.activity}</p>
                 
                
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SingleTour;

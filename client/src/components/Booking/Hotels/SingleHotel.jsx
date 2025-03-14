import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleHotel() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedDays, setExpandedDays] = useState({}); // State for collapsible sections
  useEffect(() => {
    if (!id) {
      setError("Invalid ID provided");
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        console.log("Fetching data for ID:", id); // Debugging
        const response = await fetch(`http://localhost:8080/api/hotel/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]);
  
  console.log("hotel data",data)

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
            src={data?.image?.url || "https://via.placeholder.com/150"}
            alt={data?.title || "Hotel Image"}
            className="w-full h-auto rounded-lg mt-10"
          />
        </div>

        <div className="md:w-1/2 p-6">
          <h2 className="text-3xl font-bold text-gray-800">{data?.name}</h2>
          <p className="text-red-500 font-semibold my-2">PerNights     /${data?.pricePerNight} </p>
          <p className="text-black-200 my-2">{data?.location}</p>
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

      {/* Itinerary Section */}
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col md:flex-row gap-8 mt-10">
        <div className="md:w-2/3">
          <div className="mt-4 space-y-6">
            {/* Day 1 */}
            <div className="border-l-4 border-orange-500 pl-6">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleDay("day1")}
              >
                <h3 className="text-orange-600 font-bold">Day 1</h3>
                <span className="text-orange-600">
                  {expandedDays["day1"] ? "▲" : "▼"}
                </span>
              </div>
              {expandedDays["day1"] && (
                <>
                  <p className="font-semibold text-gray-700">
                    Delhi - Haridwar - Rajaji National Park
                  </p>
                 
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 border rounded-full text-gray-600 text-sm">
                      Arrival Transfer
                    </span>
                    <span className="px-3 py-1 border rounded-full text-gray-600 text-sm">
                      Hotel Stay
                    </span>
                    <span className="px-3 py-1 border rounded-full text-gray-600 text-sm">
                      Lunch
                    </span>
                    <span className="px-3 py-1 border rounded-full text-gray-600 text-sm">
                      Dinner
                    </span>
                  </div>
                  <p className="">
                    Morning drive to haridwar, and check into wildlife resort
                    near Rajaji National Park. "Rajaji National park" is spread
                    over an area of 820.42 sq. km. in three Districts -
                    Dehradun, Haridwar & Pauri Garhwal of Uttarakhand. it has
                    got the largest area representing Shivalik Ecosystem. Imp
                    animals one can locate in Rajaji National Park are Tiger,
                    Leopard, Himalayan Bear, Chital, hog deer, barking deer,
                    Sambar deer, wild boar, antelopes such as the Nilgai, Goral,
                    Jackal, Hyena, Jungle Cat, Leopard Cat, Civets, Himalayan
                    Yellow-Throated Marten, Sloth Bears, Pythons, King Cobra,
                    Common Krait, Indian Cobra and the Monitor Lizard. After
                    lunch we will take you for a safari into the national park.
                    Overnight stay at wildlife resort
                  </p>
                </>
              )}
            </div>

            {/* Day 2 */}
            <div className="border-l-4 border-orange-500 pl-6">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleDay("day2")}
              >
                <h3 className="text-orange-600 font-bold">Day 2</h3>
                <span className="text-orange-600">
                  {expandedDays["day2"] ? "▲" : "▼"}
                </span>
              </div>
              {expandedDays["day2"] && (
                <>
                  <p className="font-semibold text-gray-700">
                    Rajaji National Park
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 border rounded-full text-gray-600 text-sm">
                      Breakfast
                    </span>
                    <span className="px-3 py-1 border rounded-full text-gray-600 text-sm">
                      Sightseeing Tour
                    </span>
                    <span className="px-3 py-1 border rounded-full text-gray-600 text-sm">
                      Hotel Stay
                    </span>
                    <span className="px-3 py-1 border rounded-full text-gray-600 text-sm">
                      Dinner
                    </span>
                  </div>
                  <p className="">
                    Morning drive to haridwar, and check into wildlife resort
                    near Rajaji National Park. "Rajaji National park" is spread
                    over an area of 820.42 sq. km. in three Districts -
                    Dehradun, Haridwar & Pauri Garhwal of Uttarakhand. it has
                    got the largest area representing Shivalik Ecosystem. Imp
                    animals one can locate in Rajaji National Park are Tiger,
                    Leopard, Himalayan Bear, Chital, hog deer, barking deer,
                    Sambar deer, wild boar, antelopes such as the Nilgai, Goral,
                    Jackal, Hyena, Jungle Cat, Leopard Cat, Civets, Himalayan
                    Yellow-Throated Marten, Sloth Bears, Pythons, King Cobra,
                    Common Krait, Indian Cobra and the Monitor Lizard. After
                    lunch we will take you for a safari into the national park.
                    Overnight stay at wildlife resort
                  </p>
                </>
              )}
            </div>

            {/* Day 3 */}
            <div className="border-l-4 border-orange-500 pl-6">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleDay("day3")}
              >
                <h3 className="text-orange-600 font-bold">Day 3</h3>
                <span className="text-orange-600">
                  {expandedDays["day3"] ? "▲" : "▼"}
                </span>
              </div>
              {expandedDays["day3"] && (
                <>
                  <p className="font-semibold text-gray-700">
                    Rajaji National Park - Delhi
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 border rounded-full text-gray-600 text-sm">
                      Breakfast
                    </span>
                    <span className="px-3 py-1 border rounded-full text-gray-600 text-sm">
                      Departure Transfer
                    </span>
                  </div>
                  <p className="">
                    Morning drive to haridwar, and check into wildlife resort
                    near Rajaji National Park. "Rajaji National park" is spread
                    over an area of 820.42 sq. km. in three Districts -
                    Dehradun, Haridwar & Pauri Garhwal of Uttarakhand. it has
                    got the largest area representing Shivalik Ecosystem. Imp
                    animals one can locate in Rajaji National Park are Tiger,
                    Leopard, Himalayan Bear, Chital, hog deer, barking deer,
                    Sambar deer, wild boar, antelopes such as the Nilgai, Goral,
                    Jackal, Hyena, Jungle Cat, Leopard Cat, Civets, Himalayan
                    Yellow-Throated Marten, Sloth Bears, Pythons, King Cobra,
                    Common Krait, Indian Cobra and the Monitor Lizard. After
                    lunch we will take you for a safari into the national park.
                    Overnight stay at wildlife resort
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="md:w-1/3 bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800">
            📍 Fill Enquiry Form Below
          </h2>
          <input
            type="text"
            placeholder="Your Full Name"
            className="w-full px-4 py-2 border rounded-md mt-4"
          />
        </div>
      </div>
    </>
  );
}

export default SingleHotel;

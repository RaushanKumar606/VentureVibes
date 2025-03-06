import { useEffect, useState } from "react";
import { fetchData } from "../../../../utils/rapid.api";

const TrainSearch = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [tatkal, setTatkal] = useState("Today");

  useEffect(() => {
    const fetchDataAPI = async () => {
      try {
        const response = await fetch(fetchData + source);
        const data1 = await response.json();
        setSource(data1);
        console.log(data1);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataAPI();
  }, [source]);

  const SearchButton = async (event) => {
    event.preventDefault();
    console.log("🔍 Searching Trains...");
    let newInfo = await fetchData();
    console.log(newInfo);
  };

  return (
    <>
      <div className="flex justify-between items-center p-6 bg-green-500 text-white">
        <h2 className="text-xl font-bold">Train Ticket Booking</h2>
        <h2 className="text-xl font-bold">IRCTC Authorized Partner</h2>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-7xl mx-auto mt-10">
        <div className="flex flex-wrap gap-6 mb-6">
          {[
            "Book Train",
            "Check PNR Status",
            "Live Trains Status"
          ].map((option, index) => (
            <label key={index} className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                value={option}
                checked={tatkal === option}
                onChange={(e) => setTatkal(e.target.value)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <input
            type="text"
            placeholder="Enter Source Name"
            className="p-4 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Destination Name"
            className="p-4 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <input
            type="date"
            className="p-4 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          {["Today", "Tomorrow", "Day After Tomorrow"].map((day, index) => (
            <label key={index} className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                value={day}
                checked={tatkal === day}
                onChange={(e) => setTatkal(e.target.value)}
                className="mr-2"
              />
              <span className="font-bold text-green-500">TATKAL OPEN</span> {day}
            </label>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-500 transition-all w-1/2"
            onClick={SearchButton}
          >
            SEARCH TRAINS
          </button>
        </div>
      </div>
    </>
  );
};

export default TrainSearch;
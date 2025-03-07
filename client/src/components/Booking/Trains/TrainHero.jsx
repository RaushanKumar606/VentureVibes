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
      <div className="bg-[url('/assets/countery/Train.jpg')] bg-cover bg-center bg-no-repeat w-full h-screen">
        <div className="flex justify-between p-6 bg-green-500 text-white">
          <h2 className="text-xl font-bold">Train Ticket Booking</h2>
          <h2 className="text-xl font-bold">IRCTC Authorized Partner</h2>
        </div>

        <div className="flex flex-wrap  max-w-6xl mx-auto gap-4 mb-6 mt-10">
          {["Book Bus", "Check Bus Status", "Live Bus Status"].map(
            (option, index) => (
              <label key={index} className="inline-flex items-center">
                <input
                  type="radio"
                  value={option}
                  checked={tatkal === option}
                  onChange={(e) => setTatkal(e.target.value)}
                  className="mr-2"
                />
                {option}
              </label>
            )
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-6  max-w-6xl mx-auto bg-transparent mt-10">
          <input
            type="text"
            placeholder="Enter Source Name"
            className="p-4 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Destination Name"
            className="p-4 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <input
            type="date"
            className="p-4 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="relative w-full mt-10 ">
          <button className="bg-blue-500 text-white text-center font-semibold py-3 px-6 rounded-md hover:bg-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          onClick={SearchButton}>
            SEARCH
          </button>
        </div>
      </div>
    </>
  );
};

export default TrainSearch;

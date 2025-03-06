import { useState } from "react";

const HeroBus = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [tatkal, setTatkal] = useState("Today");

  return (
    <>
      <div className="text-center my-6">
        <h2 className="text-3xl font-bold">Bus Ticket Booking</h2>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {['Book Bus', 'Check Bus Status', 'Live Bus Status'].map((option, index) => (
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

        <button className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-all w-full">
          SEARCH BUSES
        </button>
      </div>
    </>
  );
};

export default HeroBus;

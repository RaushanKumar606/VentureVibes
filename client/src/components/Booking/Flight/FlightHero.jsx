import { useState } from "react";

const FlightHero = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [cheak, setCheak] = useState("");
  const [flightClass, setFlightClass] = useState("Economy");
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);

  const handleAdultChange = (value) => {
    if (adult + value >= 1) {
      setAdult(adult + value);
    }
  };

  const handleChildrenChange = (value) => {
    if (children + value >= 0) {
      setChildren(children + value);
    }
  };

  const SearchButton = async (event) => {
      event.preventDefault();
      console.log("🔍 Searching Trains...");
      // let newInfo = await fetchData();
      // console.log(newInfo);
    };

  return (
    <>
      <div
        className="bg-[url('C:/Users/ASUS/Desktop/travler/client/public/assets/countery/Air-India.jpg')] bg-cover bg-center bg-no-repeat w-full h-screen py-10"
      >
        <div className="text-center my-6 mt-20">
          <h2 className="text-3xl font-bold text-white">Flight Ticket Booking ✈️</h2>
        </div>

        <div className="bg-transparent p-4 rounded-lg shadow-lg max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {["OneWay", "Return"].map((option, index) => (
              <label key={index} className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  value={option}
                  checked={cheak === option}
                  onChange={(e) => setCheak(e.target.value)}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-6">
            <input
              type="text"
              placeholder="Enter Source Name"
              className="p-4 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent "
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

            <select
              className="p-4 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent"
              value={flightClass}
              onChange={(e) => setFlightClass(e.target.value)}
            >
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First Class">First Class</option>
            </select>

            <div>
              <h3 className="text-lg font-semibold mb-2">Adults</h3>
              <div className="flex items-center gap-4">
                <button
                  className="bg-green-300 text-white py-2 px-4 rounded-lg"
                  onClick={() => handleAdultChange(-1)}
                >
                  -
                </button>
                <span>{adult}</span>
                <button
                  className="bg-green-300 text-white py-2 px-4 rounded-lg"
                  onClick={() => handleAdultChange(1)}
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Children</h3>
              <div className="flex items-center gap-4">
                <button
                  className="bg-green-300 text-white py-2 px-4 rounded-lg"
                  onClick={() => handleChildrenChange(-1)}
                >
                  -
                </button>
                <span>{children}</span>
                <button
                  className="bg-green-300 text-white py-2 px-4 rounded-lg"
                  onClick={() => handleChildrenChange(1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="relative w-full mt-20 ">
          <button className="bg-blue-500 text-white text-center font-semibold py-3 px-6 rounded-md hover:bg-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          onClick={SearchButton}>
            SEARCH
          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlightHero;

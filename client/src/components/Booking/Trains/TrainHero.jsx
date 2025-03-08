
import { useState } from "react";

const TrainSearch = () => {
  const [formData, setFormData] = useState({
    fromStationCode: "",
    toStationCode: "",
    dateOfJourney: "",
  });
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (attempts = 3) => {
    // e.preventDefault();
    setLoading(true);
    setError(null);

    const apiUrl = `https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations`;
    const params = new URLSearchParams({
      fromStationCode: formData.fromStationCode,
      toStationCode: formData.toStationCode,
      dateOfJourney: formData.dateOfJourney,
    });
  
    for (let i = 0; i < attempts; i++) {
      try {
        const response = await fetch(`${apiUrl}?${params}`, {
          method: "GET",
          headers: {
            "x-rapidapi-key": "44ba591c20msh00f3b3d3cb71c73p1f8861jsn3cda8d86a314",
            "x-rapidapi-host": "irctc1.p.rapidapi.com",
          },
        });
  
        if (response.status === 429) {
          console.warn("🚨 Too Many Requests. Retrying in 5 seconds...");
          await new Promise((resolve) => setTimeout(resolve, 5000));
          continue;
        }
  
        if (!response.ok) throw new Error("Failed to fetch trains");
  
        const data = await response.json();
        console.log("Train data: ", data);
        setTrains(data.trains || []);
        return; 
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    }
  };
  return (
    <div className="bg-[url('/assets/countery/Train.jpg')] bg-cover bg-center bg-no-repeat w-full h-screen">
      <div className="flex justify-between p-6 bg-green-500 text-white">
        <h2 className="text-xl font-bold">Train Ticket Booking</h2>
        <h2 className="text-xl font-bold">IRCTC Authorized Partner</h2>
      </div>

      <div className="max-w-6xl mx-auto bg-transparent mt-10 p-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="fromStationCode"
            placeholder="Enter Source Code (e.g., BVI)"
            className="p-4 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent"
            value={formData.fromStationCode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="toStationCode"
            placeholder="Enter Destination Code (e.g., NDLS)"
            className="p-4 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent"
            value={formData.toStationCode}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="dateOfJourney"
            className="p-4 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-500 bg-transparent"
            value={formData.dateOfJourney}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white text-center font-semibold py-3 px-6 rounded-md hover:bg-green-600"
          >
            SEARCH
          </button>
        </form>
        {loading && <p className="text-white mt-4">Loading...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default TrainSearch;

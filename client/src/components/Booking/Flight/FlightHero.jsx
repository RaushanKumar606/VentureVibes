


import { useState } from "react";

const FlightSearch = () => {
  const [formData, setFormData] = useState({
    fromId: "",
    toId: "",
    departDate: "",
    returnDate: "",
    adults: 1,
    children: "",
    sort: "BEST",
    cabinClass: "ECONOMY",
    currency_code: "AED",
  });

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.fromId || !formData.toId) {
      setError("Please enter both departure and arrival locations.");
      setLoading(false);
      return;
    }

    const apiUrl = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights`;
    const params = new URLSearchParams({
      fromId: formData.fromId,
      toId: formData.toId,
      departDate: formData.departDate,
      returnDate: formData.returnDate || "",
      pageNo: 1,
      adults: formData.adults,
      children: formData.children,
      sort: formData.sort,
      cabinClass: formData.cabinClass,
      currency_code: formData.currency_code,
    });

    try {
      const response = await fetch(`${apiUrl}?${params}`, {
        method: "GET",
        headers: {
          "x-rapidapi-key": "44ba591c20msh00f3b3d3cb71c73p1f8861jsn3cda8d86a314",
          "x-rapidapi-host": "booking-com15.p.rapidapi.com",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch flights");
      }

      const data = await response.json();
      console.log("filght data",data)
      setFlights(data.flights || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[url('/assets/countery/Air-India.jpg')] bg-cover bg-center w-full h-screen flex flex-col items-center py-10">
      <h2 className="text-3xl font-bold text-white mb-6">Flight Ticket Booking ✈️</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="fromId"
            placeholder="Enter Departure Airport ID"
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.fromId}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="toId"
            placeholder="Enter Arrival Airport ID"
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.toId}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="departDate"
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
          <input
            type="date"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.value === "" ? (e.target.type = "text") : null)}
            placeholder="Return Date"
            name="returnDate"
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          <input
            type="number"
            name="adults"
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Adults"
            min="1"
            onChange={handleChange}
          />
          <input
            type="text"
            name="children"
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Children Ages (comma-separated)"
            onChange={handleChange}
          />
          <select
            name="sort"
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          >
            <option value="BEST">Best</option>
            <option value="CHEAPEST">Cheapest</option>
            <option value="FASTEST">Fastest</option>
          </select>
          <select
            name="cabinClass"
            className="p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          >
            <option value="ECONOMY">Economy</option>
            <option value="PREMIUM_ECONOMY">Premium Economy</option>
            <option value="BUSINESS">Business</option>
            <option value="FIRST">First</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-6 rounded-lg w-full md:col-span-2 hover:bg-blue-700"
          >
            Search Flights
          </button>
        </form>
      </div>
      {loading && <p className="text-white mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      <ul>
        {flights.map((flight, index) => (
          <li key={index}>
            <p>{flight.airline} - {flight.price} {formData.currency_code}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightSearch;

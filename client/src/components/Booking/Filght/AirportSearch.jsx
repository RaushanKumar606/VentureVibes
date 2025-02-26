import { useState, useEffect } from "react";

const AirportSearch = () => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAirports = async (retryCount = 3, delay = 5000) => {
    try {
      const response = await fetch(
        'https://api.flightapi.io/trackbyroute/api_key?date=20230724&airport1=AMS&airport2=LIS',
        {
          method: "GET",
          headers: {
            "x-rapidapi-key": "44ba591c20msh00f3b3d3cb71c73p1f8861jsn3cda8d86a314",
            "x-rapidapi-host": "google-flights2.p.rapidapi.com",
          },
        }
      );

      // Handle rate-limiting (status code 429)
      if (response.status === 429 && retryCount > 0) {
        console.warn(`Rate limit exceeded. Retrying in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay)); // Wait for the delay
        return fetchAirports(retryCount - 1, delay * 2); // Retry with increased delay
      }

      // Handle other errors
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Process the response
      const data = await response.json();
      console.log("API Response:====", data);

      // Cache the data in localStorage
      localStorage.setItem("airportData", JSON.stringify(data.airports || []));
      setAirports(data?.airports || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedData = localStorage.getItem("airportData");

    if (cachedData) {
      setAirports(JSON.parse(cachedData)); // Use cached data
      setLoading(false);
    } else {
      // Add a debounce mechanism to avoid rapid API calls
      const debounceTimer = setTimeout(() => {
        fetchAirports();
      }, 1000); // Wait 1 second before making the API call

      return () => clearTimeout(debounceTimer); // Cleanup
    }
  }, []);

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Airport Search Results</h2>

      {loading && <p>Loading...</p>}
      {error && (
        <p className="text-red-500">
          {error.includes("429") ? "Too many requests. Please try again later." : error}
        </p>
      )}

      <ul className="list-disc pl-5">
        {airports.length > 0 ? (
          airports.map((airport, index) => (
            <li key={index} className="mb-2">
              {airport.name}
            </li>
          ))
        ) : (
          !loading && <p>No airports found.</p>
        )}
      </ul>
    </div>
  );
};

export default AirportSearch;
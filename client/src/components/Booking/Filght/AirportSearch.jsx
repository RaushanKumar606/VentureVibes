import { useState, useEffect } from "react";

const AirportSearch = () => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAirports = async (retryCount = 3, delay = 5000) => {
    try {
      const response = await fetch(
        "https://google-flights2.p.rapidapi.com/api/v1/searchAirport?query=del&language_code=en-US&country_code=US",
        {
          method: "GET",
          headers: {
           'x-rapidapi-key': '44ba591c20msh00f3b3d3cb71c73p1f8861jsn3cda8d86a314',
		'x-rapidapi-host': 'google-flights2.p.rapidapi.com'
          },
        }
      );

      if (response.status === 429 && retryCount > 0) {
        console.warn(`Rate limit exceeded. Retrying in ${delay / 1000} seconds...`);
        await new Promise((res) => setTimeout(res, delay));
        return fetchAirports(retryCount - 1, delay * 2);
      }

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      console.log("API Response:====", data);

      localStorage.setItem("airportData", JSON.stringify(data.airports || [])); // Cache data
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
      setAirports(JSON.parse(cachedData));
      setLoading(false);
    } else {
      fetchAirports();
    }
  }, []);

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">Airport Search Results</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

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

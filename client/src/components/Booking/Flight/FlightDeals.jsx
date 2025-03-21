import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FlightDeals = () => {
  const [flightData, setFlightDeals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getFlight = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/flight`, {
        method: "GET",
      });
      const data = await response.json();
    
      if (response.ok) {
        if (data.flights && Array.isArray(data.flights)) {
          setFlightDeals(data.flights); 
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFlight();
  }, []);

  return (
    <div className="container mx-auto mt-8">
       <h2 className="text-3xl font-semibold mb-6">Flight Deals from the World</h2>
      <p className="text-gray-700 text-base mb-4">
        Here are the flight deals with the lowest prices. Act fast – they all depart within the next three months.
      </p>

      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && flightData.length === 0 && (
        <p className="text-center text-gray-500">No flight deals available at the moment.</p>
      )}

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {flightData.map((bus) => {
          const { _id, airline, image } = bus;
          return (
            <Link to={`/air/${_id}`} key={_id} className="block">
              <div className="max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300">
                <img src={image} alt={airline} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2"> {airline}</h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FlightDeals;

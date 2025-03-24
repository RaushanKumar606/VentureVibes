import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/ContextApi";

const FlightDetails = () => {
  const [flight, setFlight] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const {token} = useAuth()
  const navigate = useNavigate();
  const handleCheck=()=>{
    navigate('/payment',{
      state:{
        price: flight.minPrice,
        title: flight.airline,
        product_Id: flight._id,
        bookingType: "Flight",
        token:token
      }
    })
  }

  const fetchFlight = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/flight/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setFlight(data.flight); 
      console.log(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlight();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!flight)
    return <p className="text-center text-gray-500">No flight found.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">    {/* Image Section */}
      <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md">
        <span className="text-gray-500">Image (Full width, Half Height)</span>
      </div>
      <div className="mt-4 space-y-2">
      <p className="text-lg">{flight.travellerType || "N/A"}</p>
        <h2 className="text-lg font-semibold">{flight.airline}</h2>
      
        <p className="font-bold">
          Flight Number: {flight.flightNumber || "N/A"}
        </p>
        <p className="font-bold">Duration: {flight.duration || "N/A"}</p>
        <div className="flex gap-10 bg-gray-100 p-2 rounded-md">
          <p className="text-gray-700">Departure: {flight.from}</p>
          <h1>used to logo </h1>
          <p className="text-gray-700">Arrival: {flight.to}</p>
        </div>
        <div className="flex gap-10 bg-gray-100 p-2 rounded-md text-center">
          <p className="font-bold">
            Departure Time: {flight.departureTime || "N/A"}
          </p>
          <p className="font-bold">
            Arrival Time: {flight.arrivalTime || "N/A"}
          </p>
        </div>

        <div className="bg-gray-200 text-gray-700 py-1 rounded-md">
          {flight.status || "N/A"}
        </div>

        <p>Price: ${flight.minPrice}</p>
        <p>Seats Available: {flight.seatsAvailable || "N/A"}</p>
      </div>
     <div className="div"> <bottom
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition mt-5"
        onClick={handleCheck}
      >
        Book now
      </bottom></div>
    </div>
  );
};

export default FlightDetails;

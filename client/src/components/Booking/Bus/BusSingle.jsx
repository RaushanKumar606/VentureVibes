import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../Hooks/ContextApi";
const BusSingle = () => {
  const { id } = useParams();
  const [busData, setBusData] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const{token}= useAuth();
  const handleCheckIn = () => {
    if (busData.length === 0) return; 
    const bus = busData[0];
    navigate("/payment", {
      state: {
        price: bus.price,
        title: bus.name,
        product_Id: bus._id,
        bookingType: "Bus",
        token:token
      },
    });
  };
  console.log("single bus data ", busData);

  const getById = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/bus/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      if (response.ok) {
        setBusData(Array.isArray(data) ? data : [data]);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getById();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {busData.map((bus) => (
        <div key={bus._id}>
          <div className="w-full h-60 bg-gray-200 flex items-center justify-center rounded-md overflow-hidden">
            <img
              src={bus.image}
              alt={bus.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold">{bus.name}</h2>

            <p className="text-sm normal">From: {bus.departureLocation}</p>
            <p className="text-sm normal">To: {bus.arrivalLocation}</p>

            <p className="font-bold mt-2">
              Departure Time:{" "}
              <span className="font-normal">{bus.departureTime}</span>
            </p>
            <p className="font-bold">
              Arrival Time:{" "}
              <span className="font-normal">{bus.arrivalTime}</span>
            </p>
            <p className="mt-2">
              <span className="font-bold">Price:</span> ${bus.price}
            </p>
            <p>
              <span className="font-bold">Bus Type:</span> {bus.busType}
            </p>
            <p>
              <span className="font-bold">Seats Available:</span>{" "}
              {bus.seatsAvailable}
            </p>
            <p>
              <span className="font-bold">Status:</span> {bus.status}
            </p>
          </div>
          <bottom
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
            onClick={handleCheckIn}
          >
            Book now
          </bottom>
        </div>
      ))}
    </div>
   
  );
};

export default BusSingle;

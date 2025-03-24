import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BusRoute = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [busRouteData, setBusRouteData] = useState([]);

  const getBus = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/bus`);
      if (response.ok) {
        const data = await response.json();
        setBusRouteData(Array.isArray(data) ? data : []);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBus();
  }, []);

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl text-center font-semibold mb-6">Top Bus Routes</h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {busRouteData.map((bus) => {
          const { _id, name, image } = bus;
          return (
            <Link to={`/bus/${_id}`} key={_id} className="block">
              <div className="max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300">
                <img src={image} alt={name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2"> {name}</h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BusRoute;

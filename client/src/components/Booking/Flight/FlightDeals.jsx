import travelData from "../../Data/TravalData.json";
import { Link } from 'react-router-dom';

const FlightDeals = () => {
  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-semibold mb-6">Flight deals from Worlds</h2>
      <p className="text-gray-700 text-base mb-4">
        Here are the flight deals with the lowest prices. Act fast – they all depart within the next three months.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {travelData.map((item) => (
          <Link to={`/item/${item.id}`} key={item.id} className="block">
            <div className="max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300">
              <img
                src={item.image}
                alt={item.from}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Flights From {item.from} To:</h3>
                <p className="text-gray-700">{item.to.join(", ")}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FlightDeals;

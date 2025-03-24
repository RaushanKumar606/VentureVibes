import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AllHotels() {
  const [hotels, setHotels] = useState([]);

  const getHotel = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/hotels", {
        method: "GET",
      });
      const data = await response.json();
      setHotels(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHotel();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-semibold mb-6">Hot hotel deals right now</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {hotels.map((item) => (
          <Link to={`/hotel/${item._id}`} key={item._id} className="block">
            <div className="max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300">
              <img
                src={
                  item.images && item.images.length > 0
                    ? item.images[0]
                    : "default-image.jpg"
                }
                alt={item.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2"> {item.name} </h3>
                <p className="text-gray-700">{item.location}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllHotels;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useAuth} from "../Hooks/ContextApi"
const Tours = () => {
  const [tour, setTourData] = useState([]);
   const {user} = useAuth()
  const getTours = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/tours`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        // setTourData(Array.isArray(data) ? data : data.tours || []);
        setTourData(data.tours || []);
      }
    } catch (error) {
      console.log(error)
    }
  };
  useEffect(() => {
    getTours();
  }, []);

  return (
    <div className="tour-container">
    <h2 className="popular-tour-name">Popular Tours</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {tour.map((item) => (
        <Link to={`/tours/${item._id}`} key={item._id}
        
        state={{
          product_Id: item._id,
          modelType: 'tour',
         userId : user?.userData?._id || "null"
        }}
        >
          <div className="max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300">
            <img
              src={
                item.images && item.images.length > 0
                  ? item.images[0]
                  : "default-image.jpg"
              }
              alt={item.title} 
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.location}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);
};

export default Tours;

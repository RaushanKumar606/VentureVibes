import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Tours = () => {
  const [tourData, setTourData] = useState([]);

  const getTours = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/tours`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setTourData(Array.isArray(data) ? data : data.tours || []);
      }
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  useEffect(() => {
    getTours();
  }, []);
  

  return (
    <div className="tour-container">
      <h2 className="popular-tour-name">Popular Tours</h2>
      <div className="all-tours-container">
        {tourData.map((tour) => {
          const { _id, title, price, country, image } = tour;
          return (
            <Link to={`/tours/${_id}`} key={_id}>
              <div className="tour-card">
                <img
                  src={image?.url || "fallback-image.jpg"}
                  alt={title}
                  className="tour-image"
                />
                <h3 className="tour-title">{title}</h3>
                <p className="tour-price">${price}</p>
                <p className="tour-country">{country}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Tours;

export { Tours };

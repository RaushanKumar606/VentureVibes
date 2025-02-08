import { useEffect, useState } from "react";

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
        console.log(data);
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
          const { _id, title, price, country } = tour;
          return (
            <div key={_id} className="tour-card">
              <img src={tour.image?.url} alt={tour.title} className="tour-image" /> 
              <h3 className="tour-title">{title}</h3>
              <p className="tour-price">${price}</p>
              <p className="tour-country">{country}</p>
             
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Tours };

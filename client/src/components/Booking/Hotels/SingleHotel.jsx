

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the hotel ID from the URL

function SingleHotel() {
  // Define state to store hotel data and loading state
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the hotel ID from the URL parameters
  const { id } = useParams();

  useEffect(() => {
    // Fetch hotel data based on the ID
    fetch(`https://api.example.com/hotels/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setHotel(data); // Set hotel data in state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        setError('Failed to load hotel data');
        setLoading(false);
      });
  }, [id]); // Re-fetch if the ID changes

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {hotel && (
        <div className="single-hotel-container">
          <h1>{hotel.name}</h1>
          <img src={hotel.image} alt={hotel.name} className="img-fluid" />
          <p>{hotel.description}</p>
          <p>Price: {hotel.price}</p>
        </div>
      )}
    </div>
  );
}

export default SingleHotel;


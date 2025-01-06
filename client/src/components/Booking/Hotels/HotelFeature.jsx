function HotelFeature() {
  return (
    <div className="feature-container">
      <h1>
        <span>Features of Hotels</span>
      </h1>
      <div className="feature-row">
        {/* Feature Cards */}
        {[...Array(4)].map((_, index) => (
          <div className="feature-card" key={index}>
            <img
              src="assets/countery/luxruyHotel.jpg"
              alt={`Feature ${index + 1}`}
              className="img-fluid"
            />
          <h3>Title Name </h3>
          <p>Price/starting at</p>
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default HotelFeature;
//  API CALL 

// import React, { useState, useEffect } from 'react';

// function HotelFeature() {
//   // Define state to store hotel features data
//   const [hotelFeatures, setHotelFeatures] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch data from API when the component mounts
//   useEffect(() => {
//     // Replace with your actual API endpoint
//     fetch('https://api.example.com/hotel-features') // Example API URL
//       .then((response) => response.json())
//       .then((data) => {
//         setHotelFeatures(data); // Set data into state
//         setLoading(false); // Set loading to false after data is fetched
//       })
//       .catch((err) => {
//         setError('Failed to load data'); // Set error if the API fails
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="feature-container">
//       <h1>
//         <span>Features of Hotels</span>
//       </h1>
//       <div className="feature-row">
//         {/* Render the fetched data dynamically */}
//         {hotelFeatures.map((feature, index) => (
//           <div className="feature-card" key={index}>
//             <img
//               src={feature.image} // Assuming the API returns an image URL
//               alt={`Feature ${index + 1}`}
//               className="img-fluid"
//             />
//             <h3>{feature.title}</h3>
//             <p>{`Price/starting at ${feature.price}`}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default HotelFeature;

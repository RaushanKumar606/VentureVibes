// import { useState, useEffect } from "react";
// import countery from "../Data/image.json";

// function Hero() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % countery.length);
//     }, 5000); // Change image every 8 seconds

//     return () => clearInterval(interval);
//   }, [countery.length]);

//   return (
//     <div className="hero-container">
//       <div className="hero-section">
//         {countery.map((item, index) => (
//           <div
//             key={item.key}
//             className={`hero-slide ${currentIndex === index ? "active" : ""}`}
//           >
//             <img src={item.imageSrc} alt={item.title} />
//             <h3 className="hero-title">{item.title}</h3>
//             <bottom className="booking">Book Now</bottom>
//           </div>
//         ))}
        
//       </div>
//       <div className="hero-dots">
//         {countery.map((_, index) => (
//           <span
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`hero-dot ${currentIndex === index ? "active" : ""}`}
//           ></span>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Hero;






import { useState, useEffect } from "react";
import countery from "../Data/image.json";

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % countery.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [countery.length]);

  return (
    <div className="hero-container w-full relative overflow-hidden">
      <div className="hero-section flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {countery.map((item, index) => (
          <div
            key={item.key || index}
            className="hero-slide w-full h-96 flex flex-col items-center justify-center text-center bg-gray-100 shadow-md"
          >
            <img src={item.imageSrc} alt={item.title} className="w-full h-full object-cover" />
            <h3 className="hero-title text-2xl font-bold text-gray-800 mt-4">{item.title}</h3>
            <button className="booking bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-700 transition">Book Now</button>
          </div>
        ))}
      </div>
      <div className="hero-dots flex justify-center mt-4">
        {countery.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`hero-dot w-4 h-4 mx-2 rounded-full cursor-pointer ${currentIndex === index ? "bg-blue-600" : "bg-gray-400"}`}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Hero;
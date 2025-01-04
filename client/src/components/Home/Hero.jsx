import { useState, useEffect } from "react";
import countery from "../Data/image.json";

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % countery.length);
    }, 5000); // Change image every 8 seconds

    return () => clearInterval(interval);
  }, [countery.length]);

  return (
    <div className="hero-container">
      <div className="hero-section">
        {countery.map((item, index) => (
          <div
            key={item.key}
            className={`hero-slide ${currentIndex === index ? "active" : ""}`}
          >
            <img src={item.imageSrc} alt={item.title} />
            <h3 className="hero-title">{item.title}</h3>
            <bottom className="booking">Book Now</bottom>
          </div>
        ))}
        
      </div>
      <div className="hero-dots">
        {countery.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`hero-dot ${currentIndex === index ? "active" : ""}`}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Hero;




// <div
// className="hero-slider"
// style={{
//   transform: `translateX(-${currentIndex * 100}%)`,
//   width: `${countery.length * 100}%`,
// }}
// >
// {countery.map((item) => (
//   <div key={item.key} className="hero-slide">
//     <img src={item.imageSrc} alt={item.title} />
//     <h3 className="hero-title">{item.title}</h3>
//   </div>
// ))}
// </div>
// <div className="hero-dots">
// {countery.map((_, index) => (
//   <span
//     key={index}
//     onClick={() => setCurrentIndex(index)}
//     className={`hero-dot ${currentIndex === index ? "active" : ""}`}
//   ></span>
// ))}
// </div>

import { useState, useEffect } from "react";
const imageData = [
  "/assets/Images/Image1.jpg",
  "/assets/Images/Image3.jpg",
  "/assets/Images/Image4.jpg",
  "/assets/Images/travel-world.jpg",
  "/assets/Images/indonosiya.jpg",
];

    function Hero() {
 
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [imageData.length]);

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="relative w-full h-full overflow-hidden">
        {imageData.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Sliding Image"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
    </div>
  );
}


export default Hero;
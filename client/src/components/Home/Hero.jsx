
import { useState, useEffect } from "react";
import image1 from "../../../public/assets/Images/Image1.jpg"
import image2 from "../../../public/assets/Images/Image2.jpg"
import image3 from "../../../public/assets/Images/Image3.jpg"
import image4 from "../../../public/assets/Images/Images.jpg"
import image5 from "../../../public/assets/Images/travel-world.jpg"
import image6 from "../../../public/assets/Images/indonosiya.jpg"

const imageData = [image1,image3,image2,image4,image5,image6]
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
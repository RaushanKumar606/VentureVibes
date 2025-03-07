import { useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import travelData from '../../Data/TravalData.json';

function PopularHotel() {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto mt-8 relative">
      <h2 className="text-3xl font-semibold mb-6">Popular searches</h2>
      
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10">
          <FaArrowLeft />
        </button>
        <div ref={sliderRef} className="flex overflow-x-scroll scrollbar-hide gap-6">
          {travelData.map((item) => (
            <div key={item.id} className="min-w-[300px] shadow-lg rounded-lg overflow-hidden">
              <img src={item.image} alt={item.from} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Buses From {item.from} To:</h3>
                <p className="text-gray-700">{item.to.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10">
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default PopularHotel;
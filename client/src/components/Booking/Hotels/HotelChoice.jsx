import { FaSearch } from 'react-icons/fa';

const HotelChoice = () => {
  return (
    <div className="bg-blue-100 p-4 flex flex-wrap items-center justify-between gap-4 shadow-md rounded-md mt-5">
      <div className="text-gray-700 font-semibold">SORT BY:</div>
      <div className="flex items-center gap-4 text-gray-700 text-sm">
        <span className="cursor-pointer hover:underline">Popular</span>
        <span className="cursor-pointer hover:underline font-bold">User Rating <span className="text-xs">(Highest First)</span></span>
        <span className="cursor-pointer hover:underline">Price <span className="text-xs">(Highest First)</span></span>
        <span className="cursor-pointer hover:underline text-blue-500">Price <span className="text-xs">(Lowest First)</span></span>
      </div>
      <div className="flex items-center gap-2 cursor-pointer text-blue-500 font-semibold">
        <span>📍 View Map</span>
      </div>
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-72">
        <FaSearch className="text-gray-500 p-2" />
        <input
          type="text"
          placeholder="Search for locality / hotel name"
          className="w-full p-2 outline-none"
        />
        
      </div>
      <button className="bg-blue-500 text-white text-center font-semibold py-3 px-6 rounded-md hover:bg-green-600 ">
    SEARCH
  </button>
    </div>
  );
};

export default HotelChoice;

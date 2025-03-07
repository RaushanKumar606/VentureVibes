export default function HotelSearch() {
  return (
    <div className="bg-[url('C:/Users/ASUS/Desktop/travler/client/public/assets/countery/hotel.jpg')] bg-cover bg-center w-full min-h-screen py-8 px-4 text-black text-center mt-5">
      <h2 className="text-3xl font-bold mt-10">Book Hotels and Homestays</h2>
      <div className="bg-transparent p-20 rounded-xl   shadow-lg mt-10 max-w-5xl mx-auto flex flex-wrap gap-3 items-center justify-between border border-black-300">
        <input
          type="text"
          placeholder="e.g. - Area, Landmark or Property Name"
          className="border border-gray-300 p-5 rounded-md w-full sm:w-auto flex-1 bg-transparent text-white-700"
        />
        <div className="flex flex-col">
          <label className="text-white-500 text-sm">Check-in</label>
          <input type="date" className="border border-g-300 p-3 rounded-md bg-transparent text-white-700" />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">Check-out</label>
          <input type="date" className="border border-gray-300 p-3 rounded-md bg-transparent text-white-700" />
        </div>
        <select className="border border-gray-300 p-5 rounded-md bg-transparent text-white-700 w-full sm:w-auto">
          <option>2 Adults | 1 Room</option>
          <option>1 Adult | 1 Room</option>
          <option>3 Adults | 1 Room</option>
        </select>
      </div>
      <div className="relative w-full">
        <button className="bg-blue-500 text-white text-center font-semibold py-3 px-6 rounded-md hover:bg-green-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          SEARCH
        </button>
      </div>
    </div>
  );
}
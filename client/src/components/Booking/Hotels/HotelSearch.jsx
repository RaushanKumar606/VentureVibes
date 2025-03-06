export default function HotelSearch() {
  return (
    <div className="bg-orange-500 py-8 px-4 text-white text-center">
      <h2 className="text-2xl font-semibold">Book Hotels and Homestays</h2>
      <div className="bg-white p-6 rounded-xl shadow-lg mt-6 max-w-4xl mx-auto flex flex-wrap gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="e.g. - Area, Landmark or Property Name"
          className="border border-gray-300 p-3 rounded-md w-full sm:w-auto flex-1 text-gray-700"
        />
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">Check-in</label>
          <input type="date" className="border border-gray-300 p-2 rounded-md text-gray-700" />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">Check-out</label>
          <input type="date" className="border border-gray-300 p-2 rounded-md text-gray-700" />
        </div>
        <select className="border border-gray-300 p-3 rounded-md text-gray-700 w-full sm:w-auto">
          <option>2 Adults | 1 Room</option>
          <option>1 Adult | 1 Room</option>
          <option>3 Adults | 1 Room</option>
        </select>
        <button className="bg-orange-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-orange-600">
          SEARCH
        </button>
      </div>
    </div>
  );
}





import { useState } from "react";

const AdminPostFlight = () => {
  const [flightData, setFlightData] = useState({
    flightName: "",
    from: "",
    to: "",
    image: "",
    departureTime: "",
    arrivalTime: "",
    flightNumber: "",
    seatAvailable: "",
    duration: "",
    price: "",
    status: "",
    flightType: "",
    carrier: "",
  });

  const handleChange = (e) => {
    setFlightData({ ...flightData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(flightData);
    alert("Flight Created Successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl border-2 border-green-500 hover:shadow-2xl transition-all duration-300"
      >
        <h2 className="text-2xl font-bold text-center text-green-600 mb-4 border-b-2 pb-2">
          Flight Create
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/** Input Fields with Hover Effects */}
          {[
            { label: "Flight Name", name: "flightName" },
            { label: "Flight Number", name: "flightNumber" },
            { label: "From", name: "from" },
            { label: "To", name: "to" },
            { label: "Image URL", name: "image" },
            { label: "Available Seats", name: "seatAvailable", type: "number" },
            { label: "Duration (Hours)", name: "duration", type: "number" },
            { label: "Price ($)", name: "price", type: "number" },
          ].map(({ label, name, type = "text" }) => (
            <label key={name} className="block">
              {label}
              <input
                type={type}
                name={name}
                onChange={handleChange}
                className="border p-2 w-full rounded-md outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 hover:border-green-500"
              />
            </label>
          ))}

          {/** Time Inputs */}
          {[
            { label: "Departure Time", name: "departureTime" },
            { label: "Arrival Time", name: "arrivalTime" },
          ].map(({ label, name }) => (
            <label key={name} className="block">
              {label}
              <input
                type="time"
                name={name}
                onChange={handleChange}
                className="border p-2 w-full rounded-md outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 hover:border-green-500"
              />
            </label>
          ))}

          {/** Select Dropdowns with Hover Effects */}
          {[
            { label: "Status", name: "status", options: ["Available", "Unavailable"] },
            { label: "Flight Type", name: "flightType", options: ["A", "B", "C"] },
            { label: "Carrier", name: "carrier", options: ["Oper", "Mar"] },
          ].map(({ label, name, options }) => (
            <label key={name} className="block">
              {label}
              <select
                name={name}
                onChange={handleChange}
                className="border p-2 w-full rounded-md outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 hover:bg-green-100"
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>

        {/** Submit Button with Hover Effect */}
        <button
          type="submit"
          className="mt-4 w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 hover:scale-105 transition-transform duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};



export default AdminPostFlight
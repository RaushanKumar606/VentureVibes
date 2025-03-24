import { useState } from "react";
import { useAuth } from "../Hooks/ContextApi";
import{toast} from 'react-toastify';
import {
  FaPlane,
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaImage,
  FaDollarSign,
} from "react-icons/fa";

const AdminPostFlight = () => {
  const [flight, setFlight] = useState({
    airline: "",
    from: "",
    to: "",
    minPrice: "",
    departureTime: "",
    arrivalTime: "",
    duration: "",
    flightNumber: "",
    seatsAvailable: "",
    status: "Scheduled",
    travellerType: "One Way",
    images: [],
  });

  const { token } = useAuth();

  const flightPost = async () => {
    try {
      const formData = new FormData();
      Object.keys(flight).forEach((key) => {
        if (key === "images") {
          flight.images.forEach((image) => {
            formData.append("images", image);
          });
        } else {
          formData.append(key, flight[key]);
        }
      });

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/admin/create-flight`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();
      console.log("✅ API Response:", data);

      if (response.ok) {
        toast.success("Flight Created Successfully!");
      } else {
        toast.success("Flight Created Successfully!",data.message);
      }
    } catch (error) {
      toast.error("flight not create",error)
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    flightPost();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlight((prev) => ({
      ...prev,
      [name]:
        ["seatsAvailable", "flightNumber", "duration", "minPrice"].includes(name)
          ? Number(value) || ""
          : value.trim() || prev[name],
    }));
  };
  // const handleImageUpload = (e) => {
  //   const files = Array.from(e.target.files);
  //   setFlight((prev) => ({ ...prev, images: files }));
  // };
  return (
    <div className="max-w-4xl mx-auto shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Flight Add</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center border p-2 rounded-md">
          <FaPlane className="text-gray-500 mr-2" />
          <input type="text" name="airline" placeholder="Airline Name" className=" p-2 outline-none" onChange={handleChange} />

        </div>

       
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center border p-2 rounded-md">
            <FaRegCalendarAlt className="text-gray-500 mr-2" />
            <input type="datetime-local" name="departureTime" className=" p-2 outline-none" onChange={handleChange} />
          </div>
          <div className="flex items-center border p-2 rounded-md">
            <FaRegCalendarAlt className="text-gray-500 mr-2" />
            <input type="datetime-local" name="arrivalTime" className=" p-2 outline-none" onChange={handleChange} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center border p-2 rounded-md">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <input type="text" name="status" placeholder="Status" className="w-full p-2 outline-none" onChange={handleChange} />
          </div>
          <div className="flex items-center border p-2 rounded-md">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <input type="number" name="seatsAvailable" placeholder="Seats Available" className="w-full p-2 outline-none" onChange={handleChange} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center border p-2 rounded-md">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <input type="number" name="flightNumber" placeholder="Flight Number" className="w-full p-2 outline-none" onChange={handleChange} />
          </div>
          <div className="flex items-center border p-2 rounded-md">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <input type="number" name="duration" placeholder="Duration (mins)" className="w-full p-2 outline-none" onChange={handleChange} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center border p-2 rounded-md">
            <FaDollarSign className="text-gray-500 mr-2" />
            <input type="number" name="minPrice" placeholder="Minimum Price" className="w-full p-2 outline-none" onChange={handleChange} />
          </div>
          <div className="flex items-center border p-2 rounded-md">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <input type="text" name="travellerType" placeholder="Travel Type" className="w-full p-2 outline-none" onChange={handleChange} />
          </div>
        </div>

        <div className="flex items-center border p-2 rounded-md">
          <FaImage className="text-gray-500 mr-2" />
          {/* <input type="file" multiple onChange={handleImageUpload} className="w-full p-2 outline-none" /> */}
        </div>
        <div className="flex space-x-2 overflow-x-auto">
          {flight.images.map((img, index) => (
            <img key={index} src={URL.createObjectURL(img)} alt="Preview" className="w-16 h-16 rounded-md" />
          ))}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminPostFlight;

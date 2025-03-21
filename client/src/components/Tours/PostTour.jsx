import { useState } from "react";
import { FaMapMarkerAlt, FaRegCalendarAlt, FaImage, FaDollarSign, FaPlus, FaTrash, FaPlane, FaLocationArrow ,FaGlobe} from "react-icons/fa";
import {useAuth} from "../Hooks/ContextApi"
const PostTour = () => {
  const [tourData, setTourData] = useState({
    title: "",
    destinations: [""],
    bestTimeToTravel: "",
    duration: { days: "", nights: "" },
    price: "",
    location: "",
    dayWisePlan: [{ day: 1, activity: "" }],
  });
   const {token} = useAuth
  const [images, setImages] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    setTourData({ ...tourData, [e.target.name]: e.target.value });
  };

  // Handle destinations
  const handleDestinationChange = (index, value) => {
    const updatedDestinations = [...tourData.destinations];
    updatedDestinations[index] = value;
    setTourData({ ...tourData, destinations: updatedDestinations });
  };

  const addDestination = () => {
    setTourData({ ...tourData, destinations: [...tourData.destinations, ""] });
  };

  const removeDestination = (index) => {
    const updatedDestinations = tourData.destinations.filter((_, i) => i !== index);
    setTourData({ ...tourData, destinations: updatedDestinations });
  };

  // Handle day-wise plan
  const handleDayPlanChange = (index, field, value) => {
    setTourData((prev) => ({
      ...prev,
      dayWisePlan: prev.dayWisePlan.map((plan, i) =>
        i === index ? { ...plan, [field]: value } : plan
      ),
    }));
  };

  const addDayPlan = () => {
    setTourData((prev) => ({
      ...prev,
      dayWisePlan: [...prev.dayWisePlan, { day: prev.dayWisePlan.length + 1, activity: "" }],
    }));
  };

  const removeDayPlan = (index) => {
    const updatedDayWisePlan = tourData.dayWisePlan.filter((_, i) => i !== index);
    setTourData((prev) => ({ ...prev, dayWisePlan: updatedDayWisePlan }));
  };

  // Handle file change (multiple images)
  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(tourData).forEach((key) => {
      if (Array.isArray(tourData[key])) {
        tourData[key].forEach((item) => formData.append(key, item));
      } else if (typeof tourData[key] === "object") {
        Object.entries(tourData[key]).forEach(([subKey, value]) =>
          formData.append(`${key}[${subKey}]`, value)
        );
      } else {
        formData.append(key, tourData[key]);
      }
    });

    images.forEach((file) => formData.append("images", file));

    try {
      const response = await fetch("http://localhost:8080/api/tours", {
        method: "POST",
        headers:{
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        alert("Tour added successfully!");
        setTourData({
          title: "",
          destinations: [""],
          bestTimeToTravel: "",
          duration: { days: "", nights: "" },
          price: "",
          location: "",
          country: "",
          dayWisePlan: [{ day: 1, activity: "" }],
        });
        setImages([]);
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-indigo-600 to-purple-500 text-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">🌍 Add New Tour</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {/* Tour Title */}
        <div className="flex items-center bg-white text-black p-2 rounded-lg">
          <FaPlane className="text-indigo-600 mx-2" />
          <input
            type="text"
            name="title"
            placeholder="Tour Title"
            value={tourData.title}
            onChange={handleChange}
            className="w-full p-2 outline-none"
            required
          />
        </div>

        {/* Destinations */}
        {tourData.destinations.map((destination, index) => (
          <div key={index} className="flex items-center bg-white text-black p-2 rounded-lg">
            <FaMapMarkerAlt className="text-indigo-600 mx-2" />
            <input
              type="text"
              value={destination}
              onChange={(e) => handleDestinationChange(index, e.target.value)}
              className="w-full p-2 outline-none"
              placeholder="Destination"
              required
            />
            {index > 0 && (
              <button type="button" className="ml-2 text-red-500" onClick={() => removeDestination(index)}>
                <FaTrash />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addDestination} className="bg-blue-500 hover:bg-blue-600 p-2 rounded-lg text-white flex items-center justify-center">
          <FaPlus className="mr-2" /> Add Destination
        </button>

        {/* Best Time to Travel */}
        <div className="flex items-center bg-white text-black p-2 rounded-lg">
          <FaRegCalendarAlt className="text-indigo-600 mx-2" />
          <input
            type="text"
            name="bestTimeToTravel"
            placeholder="Best Time to Travel"
            value={tourData.bestTimeToTravel}
            onChange={handleChange}
            className="w-full p-2 outline-none"
            required
          />
        </div>

        {/* Price */}
        <div className="flex items-center bg-white text-black p-2 rounded-lg">
          <FaDollarSign className="text-indigo-600 mx-2" />
          <input
            type="number"
            name="price"
            placeholder="Price (in USD)"
            value={tourData.price}
            onChange={handleChange}
            className="w-full p-2 outline-none"
            required
          />
        </div>


          {/* Duration */}
          <div className="flex gap-2">
          <input
            type="number"
            name="days"
            placeholder="Days"
            value={tourData.duration.days}
            onChange={(e) =>
              setTourData({ ...tourData, duration: { ...tourData.duration, days: e.target.value } })
            }
            className="p-2 rounded-lg text-black w-1/2"
            required
          />
          <input
            type="number"
            name="nights"
            placeholder="Nights"
            value={tourData.duration.nights}
            onChange={(e) =>
              setTourData({ ...tourData, duration: { ...tourData.duration, nights: e.target.value } })
            }
            className="p-2 rounded-lg text-black w-1/2"
            required
          />
        </div>

        {/* Location */}
        <div className="flex items-center bg-white text-black p-2 rounded-lg">
          <FaLocationArrow className="text-indigo-600 mx-2" />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={tourData.location}
            onChange={handleChange}
            className="w-full p-2 outline-none"
            required
          />
        </div>

         {/* Country */}
         <div className="flex items-center bg-white text-black p-2 rounded-lg">
          <FaGlobe className="text-indigo-600 mx-2" />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={tourData.country}
            onChange={handleChange}
            className="w-full p-2 outline-none"
            required
          />
        </div>

         {/* Image Upload */}
         <div className="flex items-center bg-white text-black p-2 rounded-lg">
          <FaImage className="text-indigo-600 mx-2" />
          <input type="file" multiple onChange={handleFileChange} className="w-full outline-none" />
        </div>

        {/* Day-wise Plan */}
        {tourData.dayWisePlan.map((plan, index) => (
          <div key={index} className="flex items-center bg-white text-black p-2 rounded-lg">
            <input
              type="text"
              placeholder={`Day ${plan.day} Activity`}
              value={plan.activity}
              onChange={(e) => handleDayPlanChange(index, "activity", e.target.value)}
              className="w-full p-2 outline-none"
              required
            />
            {index > 0 && (
              <button type="button" className="ml-2 text-red-500" onClick={() => removeDayPlan(index)}>
                <FaTrash />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addDayPlan} className="bg-blue-500 hover:bg-blue-600 p-2 rounded-lg text-white">
          <FaPlus className="mr-2" /> Add Day Plan
        </button>

        <button type="submit" className="bg-green-500 hover:bg-green-600 py-2 rounded-lg text-white text-lg font-bold">
          🚀 Submit Tour
        </button>
      </form>
    </div>
  );
};

export default PostTour;

import  { useState } from "react";

const AdminCreateHotel = () => {
  const [hotelData, setHotelData] = useState({
    name: "",
    preNightPrice: "",
    roomType: "",
    killometer: "",
    amenities: "",
    rating: "",
    person: "",
    status: "",
    location: "",
    images: "",
    description: "",
  });

  const handleChange = (e) => {
    setHotelData({ ...hotelData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(hotelData);
    alert("Hotel Created Successfully!");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96 border-2 border-black"
      >
        <h2 className="text-xl font-bold text-center mb-4 border-b-2 pb-2">
          Create Hotel
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <label>
            Name
            <input type="text" name="name" onChange={handleChange} className="border p-1 w-full" />
          </label>
          <label>
            PreNightPrice
            <input type="number" name="preNightPrice" onChange={handleChange} className="border p-1 w-full" />
          </label>

          <label>
            Room Type
            <input type="text" name="roomType" onChange={handleChange} className="border p-1 w-full" />
          </label>
          <label>
            Kilometers
            <input type="number" name="killometer" onChange={handleChange} className="border p-1 w-full" />
          </label>

          <label>
            Amenities
            <input type="text" name="amenities" onChange={handleChange} className="border p-1 w-full" />
          </label>
          <label>
            Rating
            <input type="number" name="rating" onChange={handleChange} className="border p-1 w-full" />
          </label>

          <label>
            Person
            <input type="number" name="person" onChange={handleChange} className="border p-1 w-full" />
          </label>
          <label>
            Status
            <select name="status" onChange={handleChange} className="border p-1 w-full">
              <option value="Available">Available</option>
              <option value="Unavailable">Unavailable</option>
            </select>
          </label>

          <label>
            Location
            <input type="text" name="location" onChange={handleChange} className="border p-1 w-full" />
          </label>
          <label>
            Images (URL)
            <input type="text" name="images" onChange={handleChange} className="border p-1 w-full" />
          </label>

          <label className="col-span-2">
            Description
            <textarea name="description" onChange={handleChange} className="border p-1 w-full"></textarea>
          </label>
        </div>

        <button type="submit" className="mt-4 w-full bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminCreateHotel;

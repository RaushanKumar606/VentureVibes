import { useState } from "react";
import { useAuth } from "../Hooks/ContextApi/ContextApi";
import { toast } from "react-toastify";

const CreateTourForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    country: "",
    location: "",
    image: null, // Image file
  });

  const { token } = useAuth(); // Authentication token
  const handleChange = (e) => {
    const { name, value ,type,files } = e.target;
    setFormData({ ...formData,  [name]: type === "file" ? files[0] : value });
  };
//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
  form.append("title", formData.title);
  form.append("description", formData.description);
  form.append("price", formData.price);
  form.append("country", formData.country);
  form.append("location", formData.location);
  if (formData.image) {
    form.append("image", formData.image); // Image must be named "image"
  }

  console.log("🔹 Form Data Before Sending:", form); // Debugging

    try {
      const response = await fetch("http://localhost:8080/api/tours", {
        method: "POST",
        headers: {
         
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

    //   const data = await response.json();
    //   console.log("Response Data:", data);

      if (response.ok) {
        toast.success("Tour created successfully!");
        setFormData({
          title: "",
          description: "",
          price: "",
          country: "",
          location: "",
          image: null,
        });
      } else {
        alert("Error iddd: " + response.message);
      }
    } catch (err) {
      alert("Something went wrong: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Create a New Tour</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-2"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-2"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-2"
        required
      />

      <input
        type="text"
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-2"
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-2"
        required
      />

      {/* File input for image */}
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Create Tour
      </button>
    </form>
  );
};

export default CreateTourForm;

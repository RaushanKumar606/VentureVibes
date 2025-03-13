import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../Hooks/ContextApi";
const ForgetEmail = () => {
  const [formData, setFormData] = useState({ email: "" });
  const token = useAuth()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { email } = formData;

    if (!token) {
      toast.error("You are not authorized! Please log in first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Attach token to the request
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Reset link sent! Check your email.");
        setFormData({ email: "" });
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-gray-100 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Reset Password</h2>
      <p className="text-gray-600 mb-6">
        Enter your registered email address, and we will send you a recovery link.
      </p>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          required
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-md transition duration-300"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgetEmail;

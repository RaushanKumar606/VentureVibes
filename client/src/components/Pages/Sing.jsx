// import { useAuth } from "../Hooks/ContextApi/ContextApi";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    number: "",
    country: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setUserData({ ...userData, image: e.target.files[0] }); 
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("number", userData.number);
    formData.append("country", userData.country);
    formData.append("password", userData.password);
  
    if (userData.image) {
      formData.append("image", userData.image); // Append only if image exists
    } else {
      toast.error("Please select an image.");
      return;
    }
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/signup`, {
        method: "POST",
        body: formData,
      });
  
      const res_data = await response.json();
      if (response.ok) {
        toast.success("Register Successful");
        navigate("/login");
      } else {
        toast.error(res_data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!",error);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Signup
        </h1>
        <form onSubmit={formSubmit} className="space-y-4">
          {[
            { label: "Username", name: "name", type: "text", icon: "👤" },
            { label: "Email", name: "email", type: "email", icon: "📧" },
            { label: "Phone", name: "number", type: "text", icon: "📞" },
            { label: "Country", name: "country", type: "text", icon: "🌍" },
            {
              label: "Password",
              name: "password",
              type: "password",
              icon: "🔒",
            },
          ].map(({ label, name, type, icon }, index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <span className="bg-gray-200 px-3 py-2 text-lg">{icon}</span>
                <input
                  type={type}
                  name={name}
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  value={userData[name]}
                  onChange={handleChange}
                  className="w-full p-2 outline-none"
                  required
                />
              </div>
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 p-2 rounded-lg" id="inputGroupFile02" required
            />
          </div>


          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Signup
          </button>
        </form>

        <div className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

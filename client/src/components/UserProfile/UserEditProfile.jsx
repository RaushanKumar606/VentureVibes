import {  useState } from "react";
import { useAuth } from "../Hooks/ContextApi";
import { toast } from "react-toastify";
const UserEditProfile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    country: "",
    dob: "",
  });
  const { token } = useAuth();

  const userUpdate = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/update`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setFormData(data);
        setProfileImage(data.profile_image);
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      toast.error("Profile Not Update", error);
    }
  };

//   useEffect(() => {
//     userUpdate();
//   },[]);
  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gradient-to-b from-blue-900 to-blue-950 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-5">Updata Profile</h2>

       <form onSubmit={userUpdate} className="space-y-4">
      <div className="flex justify-center">
        <label className="relative cursor-pointer">
          <img
            src={profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border border-gray-300"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      {/* Form */}
      
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block font-medium">Mobile</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your mobile number"
          />
        </div>

        <div>
          <label className="block font-medium">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your country"
          />
        </div>

        <div>
          <label className="block font-medium">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserEditProfile;

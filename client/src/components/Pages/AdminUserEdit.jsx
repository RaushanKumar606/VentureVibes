import { useEffect, useState } from "react";
import { useAuth } from "../Hooks/ContextApi/ContextApi";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
function AdminUserEdit() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    country: "",
  });
  const { token,  storeTokenInLS} = useAuth();
  const { id } = useParams(); 
  const getUserById = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/users/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if(response.ok){
        getUserById({
        name:data.name,
        email:data.email,
        mobile:data.mobile,
        country:data.country
        })
        storeTokenInLS(data.token)
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    getUserById()
  },[]);
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`http://localhost:8080/admin/users/update/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
            if (data.token) {
                storeTokenInLS(data.token); 
            }
            toast.success("Update Successfully");
        } else {
            toast.error(data.message || "Not Updated");
        }
    } catch (error) {
        console.error("Update Error:", error);
        toast.error(error.message || "Not Updated");

    }
};



  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Edit User
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Mobile</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter mobile number"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter country"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        >
          Update User
        </button>
      </form>
    </div>
  );
}

export default AdminUserEdit;

import { useAuth } from "../Hooks/ContextApi/ContextApi";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function AdminUser() {
  const [users, setUsers] = useState([]);
  const { token } = useAuth();
  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setUsers(userData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteUserById = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4"> All USER DATA</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4 text-left border">Username</th>
              <th className="py-3 px-4 text-left border">Email</th>
              <th className="py-3 px-4 text-left border">Phone</th>
              <th className="py-3 px-4 text-left border">Country</th>
              <th className="py-3 px-4 text-left border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border">
                <td className="py-3 px-4 border">{user.name}</td>
                <td className="py-3 px-4 border">{user.email}</td>
                <td className="py-3 px-4 border">{user.number}</td>
                <td className="py-3 px-4 border">{user.country}</td>
                <td className="py-3 px-4 border">
                  <button
                    // onClick={() => handleEdit(user._id)}
                    className="mr-3 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition"
                  >
                    <Link to={`/admin/users/${user._id}/edit`}>Edit</Link>
                  </button>

                  <button
                    onClick={() => deleteUserById(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUser;

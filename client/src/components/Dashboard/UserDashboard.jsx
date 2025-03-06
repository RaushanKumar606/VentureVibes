import { useState, useEffect } from "react";
import { useAuth } from "../Hooks/ContextApi/ContextApi";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">User Dashboard</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left font-semibold">Field</th>
            <th className="border border-gray-300 p-3 text-left font-semibold">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-3">Username</td>
            <td className="border border-gray-300 p-3">{user.userData.name}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">Email</td>
            <td className="border border-gray-300 p-3">{user.userData.email}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">Phone Number</td>
            <td className="border border-gray-300 p-3">{user.userData.number}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-3">Country</td>
            <td className="border border-gray-300 p-3">{user.userData.country}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserDashboard;

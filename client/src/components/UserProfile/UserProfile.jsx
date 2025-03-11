import { useState, useEffect } from "react";
import { useAuth } from "../Hooks/ContextApi/ContextApi";
const UserProfile = () => {
  
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
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Top Bar */}
        {/* <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search something"
              className="w-full p-2 pl-10 border rounded-md"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-500" />
          </div>
          <div className="flex items-center gap-4">
            <FiBell className="text-xl cursor-pointer" />
            <div className="flex items-center gap-2">
              <HiOutlineUserCircle className="text-3xl" />
              <div>
                <p className="text-sm font-semibold">{user.userData.name}</p>
                <p className="text-xs text-gray-500">{user.userData.email}</p>
              </div>
            </div>
          </div>
        </div> */}

        <div>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 bg-green-300">
                <th className="border border-gray-300 p-3 text-left font-semibold ">
                  Attribute
                </th>
                <th className="border border-gray-300 p-3 text-left font-semibold">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3">Full Name</td>
                <td className="border border-gray-300 p-3">
                  {user.userData.name}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3">Email Address</td>
                <td className="border border-gray-300 p-3">
                  {user.userData.email}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3">Contact Number</td>
                <td className="border border-gray-300 p-3">
                  {user.userData.number}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3">Location</td>
                <td className="border border-gray-300 p-3">
                  {user.userData.country}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg-grid-cols-3 gap-6 mt-10">
          <Card title="Flight" content="" />
          <Card title="Bus" content="" />
          <Card title="Hotel" content="" />
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, active, setActiveTab, badge }) => (
  <div
    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition ${
      active === label
        ? "bg-blue-500 text-white"
        : "text-gray-700 hover:bg-gray-200"
    }`}
    onClick={() => setActiveTab(label)}
  >
    <div className="flex items-center gap-2">
      <Icon className="text-xl" />
      <span>{label}</span>
    </div>
    {badge && (
      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
        {badge}
      </span>
    )}
  </div>
);

const Card = ({ title, content }) => (
  <div className="bg-white p-4 shadow-md rounded-lg">
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    <p className="text-xl font-bold text-gray-900">{content}</p>
  </div>
);


export default UserProfile;
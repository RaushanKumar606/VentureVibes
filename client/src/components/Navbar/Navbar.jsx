import { useState,useEffect } from "react";
import { useAuth } from "../Hooks/ContextApi/ContextApi";
import { HiOutlineUserCircle } from "react-icons/hi";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
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
    <div className="bg-white shadow-md w-full">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-3">
          <img
            src="assets/Images/logo.png"
            alt="logo"
            className="h-12 w-auto"
          />
          <a href="/" className="text-xl font-bold">
            <div className="flex items-center gap-1">
              <div className="bg-blue-600 text-white px-2 py-1 rounded-lg">
                JOIN
              </div>
              <span className="text-gray-700">
                World <span className="text-blue-600">PRIME</span>
              </span>
            </div>
          </a>
        </div>

        <div
          className={`lg:flex items-center space-x-6 ${
            isMenuOpen ? "block" : "hidden"
          } lg:block`}
        >
          <ul className="flex flex-col lg:flex-row gap-4 lg:gap-8 text-gray-700">
            <li>
              <a href="/" className="hover:text-blue-600">
                Home
              </a>
            </li>
            <li>
              <a href="/bus" className="hover:text-blue-600">
                Bus
              </a>
            </li>
            <li>
              <a href="/hotel" className="hover:text-blue-600">
                Hotels
              </a>
            </li>
            <li>
              <a href="/train" className="hover:text-blue-600">
                Train
              </a>
            </li>
            <li>
              <a href="/flight" className="hover:text-blue-600">
                Air
              </a>
            </li>
            <li>
              <a href="/tours" className="hover:text-blue-600">
                Tours
              </a>
            </li>
            {isLoggedIn ? (
              <>
                {/* <li><a href="/dashboard" className="hover:text-blue-600">Dashboard</a></li>
                <li><a href="/logout" className="hover:text-red-600">Logout</a></li> */}
                <li className="relative group">
                  <button className="hover:text-blue-600 flex items-center gap-2">
                    <a href="/user">
                      <HiOutlineUserCircle className="text-3xl" />
                      <i className="fas fa-user-circle"></i>{user.userData.name}
                    </a>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/signup" className="hover:text-blue-600">
                    Sign Up
                  </a>
                </li>
                <li>
                  <a href="/login" className="hover:text-blue-600">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>

        <button className="lg:hidden text-3xl" onClick={toggleMenu}>
          ☰
        </button>
      </nav>
    </div>
  );
};

export default Navbar;

import { useState } from "react";
import { useAuth } from "../Hooks/ContextApi";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { storeTokenInLS, user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    console.log( "all user",user)
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      const response = await fetch(`http://localhost:8080/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
         console.log("Response Status:", response.status);
         let res_data;
         try {
             res_data = await response.json();
         } catch (jsonError) {
             console.error("Failed to parse JSON:", jsonError);
             res_data = await response.text(); 
         }
         if (response.ok) {
          storeTokenInLS(res_data.token);  
          toast.success(` Welcome, User `); 
          navigate('/'); 
      } else {
        toast.error(res_data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setError(`Something went wrong. Please try again. Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">LOGIN</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <label className="block mb-2 text-gray-700">Email</label>
          <div className="relative mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="absolute right-3 top-3">👤</span>
          </div>

          <label className="block mb-2 text-gray-700">Password</label>
          <div className="relative mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="absolute right-3 top-3">🔒</span>
          </div>

          <div className="flex justify-between items-center mb-6">
            <label>
              <input type="checkbox" className="mr-2" /> Remember Me
            </label>
            <a href="/email" className="text-blue-500 hover:underline">Forgotten Password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-4">
          New User? <a href="/signup" className="text-blue-500 hover:underline">SignUp</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
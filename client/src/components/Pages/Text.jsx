import { useState } from "react";
import { useAuth } from "../Hooks/ContextApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { storeTokenInLS } = useAuth();
  const { user } = useAuth;
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    console.log("all user", user);
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

      const res_data = await response.json();
      if (response.ok) {
        storeTokenInLS(res_data.token);
        toast.success(`Login Successful! Welcome, ${user.name}`);
        navigate("/");
      } else {
        toast.error(res_data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Side - Image & Text */}
      <div
        className="hidden lg:flex w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/path-to-your-image.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-white text-center px-10">
          <h1 className="text-4xl font-bold italic">Travelista Tours</h1>
          <p className="mt-4 text-lg">
            Travel is the only purchase that enriches you in ways beyond
            material wealth
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <h2 className="text-3xl font-bold text-blue-600">Welcome</h2>
        <p className="text-gray-500 mt-1">Login with Email</p>

        <div className="w-full max-w-sm mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Email Id
          </label>
          <div className="relative mt-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          <label className="block text-sm font-medium text-gray-700 mt-4">
            Password
          </label>
          <div className="relative mt-1">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-between mt-2 text-sm">
          <a href="/email" className="text-blue-600 hover:underline">
              Forgot your password?
            </a>
          </div>

          <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:translate-y-[-2px]">
            LOGIN
          </button>

          <div className="text-center my-4 text-gray-500">OR</div>

          <div className="flex justify-center gap-4">
            <button className="p-2 border rounded-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-xl hover:translate-y-[-2px]">
              <img src="/google-icon.png" alt="Google" className="h-6" />
            </button>
            <button className="p-2 border rounded-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-xl hover:translate-y-[-2px]">
              <img src="/facebook-icon.png" alt="Facebook" className="h-6" />
            </button>
            <button className="p-2 border rounded-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-xl hover:translate-y-[-2px]">
              <img src="/apple-icon.png" alt="Apple" className="h-6" />
            </button>
          </div>

          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-600 font-semibold">
              Register Now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

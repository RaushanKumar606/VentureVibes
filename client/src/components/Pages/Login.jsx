import { useState } from "react";
import { useAuth } from "../Hooks/ContextApi/ContextApi";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import {  toast } from 'react-toastify';
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("")
  const { storeTokenInLS } = useAuth();
  // const { user  } = useAuth();
  const navigate = useNavigate();
  // const API = import.meta.env.VITE_APP_API;
  const handleLogin = async (e) => {
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
      // console.log(data)
      if (response.ok) {
        storeTokenInLS(res_data.token);
        toast.success("Login Successful");
        navigate  ('/');
      } else {
        toast.error(res_data.message || "Login failed. Please try again.");
        // setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-box">
      <div className="login-container">
        <h2 className="login-title">LOGIN</h2>
        {error && <p style={{ color: "red" }}>{error}</p>} 
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="icon">👤</span>
          </div>
          <label>Password</label>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="icon">🔒</span>
          </div>
          <div className="options">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="/email">Forgotten Password</a>
          </div>
          <button type="submit" className="login-button"  disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="signup">
          New User? <a href="/signup">SignUp</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

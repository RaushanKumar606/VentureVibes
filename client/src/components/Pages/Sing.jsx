
 import { useAuth } from "../Hooks/ContextApi/ContextApi";
import { useState } from "react";
import {  toast } from 'react-toastify';
import "./singup.css";
import { useNavigate} from 'react-router-dom';
const SignupPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    number: "",
    country: "",
    password: "",
  });

  const storetokenInLS=useAuth()
  // const API = import.meta.env.VITE_APP_API;
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    // console.log("User Data:", userData);
   
    const response = await fetch(`http://localhost:8080/api/signup`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(userData),
    });
    const res_data = await response.json();
    if (response.ok) {
      storetokenInLS(res_data.token);
      toast.success("Register Successful");
      navigate('/login');
    } else {
      // console.log("Signup failed:", response.status, res_data.message);
      toast.error(res_data.message)
    }
  };
  return (
    <div className="sign-page">
      <div className="signup-container">
        <h1 className="sing">Signup</h1>
        <form onSubmit={formSubmit}>
          <label>Username</label>
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Enter your username"
              value={userData.name}
              onChange={handleChange}
              required
            />
            <span className="icon">👤</span>
          </div>

          <label>Email</label>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={userData.email}
              onChange={handleChange}
              required
            />
            <span className="icon">📧</span>
          </div>

          <label>Phone</label>
          <div className="input-group">
            <input
              type="text"
              name="number"
              placeholder="Enter your phone number"
              value={userData.number}
              onChange={handleChange}
              required
            />
            <span className="icon">📞</span>
          </div>

          <label>Country</label>
          <div className="input-group">
            <input
              type="text"
              name="country"
              placeholder="Enter your country"
              value={userData.country}
              onChange={handleChange}
              required
            />
            <span className="icon">🌍</span>
          </div>

          <label>Password</label>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={userData.password}
              onChange={handleChange}
              required
            />
            <span className="icon">🔒</span>
          </div>

          <button type="submit" className="signup-button">
            Signup
          </button>
        </form>
        <div className="login">
  Already have an account? <a href="/login">Login</a>
</div>

      </div>
    </div>
  );
};

export default SignupPage;

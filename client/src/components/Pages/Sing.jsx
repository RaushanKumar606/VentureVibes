// import { useState } from "react";
// import { useAuth } from "../Hooks/ContextApi/ContextApi";
// import { useNavigate,Link } from 'react-router-dom';
// // import { use } from "react";
// // const SignupPage = () => {
// //   const [userData, setUserData] = useState({
// //     username: "",
// //     email: "",
// //     phone: "",
// //     password: "",
// //     country: "",
// //   });
// //   const storetokenInLS=useAuth()
// //   const navigate = useNavigate();

// //   const [error, setError] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setUserData({ ...userData, [name]: value });
// //   };

// //   const handleSignup = async (e) => {
// //     e.preventDefault();
// //     if (
// //       !userData.username ||
// //       !userData.email ||
// //       !userData.phone ||
// //       !userData.password ||
// //       !userData.country
// //     ) {
// //       setError("All fields are required.");
// //       return;
// //     }

// //     if (!/^\d{10}$/.test(userData.phone)) {
// //       setError("Phone number must be a valid 10-digit number.");
// //       return;
// //     }

// //     if (
// //       !/[a-z]/.test(userData.password) ||
// //       !/[A-Z]/.test(userData.password) ||
// //       !/\d/.test(userData.password) ||
// //       !/[!@#$%^&*(),.?":{}|<>]/.test(userData.password)
// //     ) {
// //       setError(
// //         "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character."
// //       );
// //       return;
// //     }

// //     try {
// //       setIsLoading(true);
// //       setError("");

// //       // const response = await fetch("http://localhost:8080/api/signup", {
// //       //   method: "POST",
// //       //   headers: {
// //       //     "Content-Type": "application/json",
// //       //   },
// //       //   body: JSON.stringify(userData),
// //       // });

// //       const response = await fetch(`http://localhost:8080/api/signup`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(userData),
// //       });
// //       const resData = await response.json();
// //       console.log("userdata",resData);

// //       if (response.ok) {
// //         const data = await response.json();
// //         storetokenInLS(data.token);
// //         console.log(data)

// //       }

// //       // Handle successful signup
// //     alert("Signup successful!");
// //       navigate('/login');
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };
// const SignupPage= ()=>{
// const [userData,setUserData] = useState({
//   username:"",
//   email:"",
//   phone:"",
//   password:"",
//   country:"",
// })
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

// const storetokenInLS=useAuth();
// const navigate =useNavigate();

// const handleInputChange = async(e) => {
//       const { name, value } = e.target;
//       setUserData({ ...userData, [name]: value });
//     };

//     const handleForm = async(e)=>{
//   e.preventDefault();
//    try {
//     const response = await fetch('http://localhost:8080/api/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(userData),

//     });

//      if (response.ok) {
//               const data = await response.json();
//               storetokenInLS(data.token);
//               console.log("userdata",data)

//             }
//             alert("Signup successful!");
//             navigate('/login');
//    } catch (err) {
//     console.log("user error",err)
//     setError(err.message);
//    }
//    finally {
//           setIsLoading(false);
//         }
//     }

//   return (
//     <div style={styles.container}>
//       <form onSubmit={handleForm} style={styles.form}>
//         <h2>Signup</h2>

//         {error && <p style={styles.error}>{error}</p>}

//         <div style={styles.inputGroup}>
//           <label>Username</label>
//           <input
//             type="text"
//             name="username"
//             placeholder="Enter your username"
//             value={userData.username}
//             onChange={handleInputChange}
//             style={styles.input}
//           />
//         </div>

//         <div style={styles.inputGroup}>
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             value={userData.email}
//             onChange={handleInputChange}
//             style={styles.input}
//           />
//         </div>

//         <div style={styles.inputGroup}>
//           <label>Phone Number</label>
//           <input
//             type="text"
//             name="phone"
//             placeholder="Enter your phone number"
//             value={userData.phone}
//             onChange={handleInputChange}
//             style={styles.input}
//           />
//         </div>

//         <div style={styles.inputGroup}>
//           <label>Password</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="Enter your password"
//             value={userData.password}
//             onChange={handleInputChange}
//             style={styles.input}
//           />
//         </div>

//         <div style={styles.inputGroup}>
//           <label>Country</label>
//           <input
//             type="text"
//             name="country"
//             placeholder="Enter your country"
//             value={userData.country}
//             onChange={handleInputChange}
//             style={styles.input}
//           />
//         </div>

//         <button type="submit" style={styles.button} disabled={isLoading}>
//           {isLoading ? "Signing up..." : "Signup"}
//         </button>
//         <p>
//         Already have an account? <Link to="/login">Login here</Link>
//       </p>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//     backgroundColor: "#f4f4f4",
//   },
//   form: {
//     padding: "2rem",
//     backgroundColor: "#fff",
//     borderRadius: "8px",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     width: "100%",
//     maxWidth: "400px",
//   },
//   inputGroup: {
//     marginBottom: "1rem",
//   },
//   input: {
//     width: "100%",
//     padding: "0.5rem",
//     fontSize: "1rem",
//     borderRadius: "4px",
//     border: "1px solid #ccc",
//   },
//   button: {
//     width: "100%",
//     padding: "0.7rem",
//     fontSize: "1rem",
//     color: "#fff",
//     backgroundColor: "#28a745",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   error: {
//     color: "red",
//     marginBottom: "1rem",
//   },
// };

// export default SignupPage;

// import { useState } from "react";

// const SignupPage = () => {
//   const [userData, setUserData] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//     country: "",
//   });

//   // const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({
//       ...userData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(userData)
//     const response = await fetch(`http://localhost:8080/api/signup`,{
//       method:'POST',
//       headers:{
//         'Content-Type':'application/json'
//       },
//       body: JSON.stringify(userData)
//     })
//     if(response.ok){
//       const data = await response.json()
//       console.log(data)

//       console.log("singup succfull ")
//     }

//   };

//   return (
//     <div
//       style={{
//         maxWidth: "400px",
//         margin: "50px auto",
//         padding: "20px",
//         border: "1px solid #ccc",
//         borderRadius: "8px",
//       }}
//     >
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <div style={{ marginBottom: "15px" }}>
//           <label htmlFor="username" style={{ display: "block", marginBottom: "5px" }}>
//             Username:
//           </label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             value={userData.username}
//             onChange={handleChange}
//             required
//             style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
//           />
//         </div>
//         <div style={{ marginBottom: "15px" }}>
//           <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>
//             Email:
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={userData.email}
//             onChange={handleChange}
//             required
//             style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
//           />
//         </div>
//         <div style={{ marginBottom: "15px" }}>
//           <label htmlFor="phone" style={{ display: "block", marginBottom: "5px" }}>
//             Phone:
//           </label>
//           <input
//             type="text"
//             id="phone"
//             name="phone"
//             value={userData.phone}
//             onChange={handleChange}
//             required
//             style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
//           />
//         </div>
//         <div style={{ marginBottom: "15px" }}>
//           <label htmlFor="country" style={{ display: "block", marginBottom: "5px" }}>
//             Country:
//           </label>
//           <input
//             type="text"
//             id="country"
//             name="country"
//             value={userData.country}
//             onChange={handleChange}
//             required
//             style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
//           />
//         </div>
//         <div style={{ marginBottom: "15px" }}>
//           <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>
//             Password:
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={userData.password}
//             onChange={handleChange}
//             required
//             style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
//           />
//         </div>
//         <button
//           type="submit"
//           style={{
//             width: "100%",
//             padding: "10px",
//             background: "#4CAF50",
//             color: "white",
//             border: "none",
//             borderRadius: "4px",
//           }}
//         >
//           Signup
//         </button>
//       </form>
//       {/* {message && (
//         <p
//           style={{
//             marginTop: "15px",
//             color: message.includes("Error") ? "red" : "green",
//           }}
//         >
//           {message}
//         </p>
//       )} */}
//     </div>
//   );
// };

// export default SignupPage;
import { useState } from "react";
import "./singup.css";

const SignupPage = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    country: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Signup successful:", data);
    }
  };

  return (
    <div className="sign-page">
      <div className="signup-container">
        <h1 className="sing">Signup</h1>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={userData.username}
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
              name="phone"
              placeholder="Enter your phone number"
              value={userData.phone}
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

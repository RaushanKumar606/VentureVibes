
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    backgroundImage: "url('C:\Users\ASUS\Desktop\travler\client\src\assets\Images\error.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
  };

  const titleStyle = {
    fontSize: "6rem",
    marginBottom: "1rem",
  };

  const messageStyle = {
    fontSize: "1.5rem",
    marginBottom: "2rem",
  };

  const buttonStyle = {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };


  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>404</h1>
      <p style={messageStyle}>Oops! The page you're looking for doesn't exist.</p>
      <button
        style={buttonStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        onClick={() => navigate("/")}
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;


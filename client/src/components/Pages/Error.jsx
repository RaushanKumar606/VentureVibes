import { useNavigate } from "react-router-dom";
import errorImage from "/assets/Images/error.png"; // Correct import for image

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen flex flex-col items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${errorImage})` }}
    >
      <h1 className="text-8xl font-bold mb-4 animate-bounce">404</h1>
      <p className="text-xl mb-6 text-center">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-300"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;

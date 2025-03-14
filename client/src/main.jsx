import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./components/Hooks/ContextApi.jsx";
import { ToastContainer } from "react-toastify";
// import { BookingProvider } from "./components/Hooks/BookingApi.jsx";

// const AppWithProviders = () => {
//   const { user, token } = useAuth(); 
//   return (
//     <BookingProvider userId={user?.id} token={token}>
//     </BookingProvider>
//   );
// };

createRoot(document.getElementById("root")).render(
  <AuthProvider>
 <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
  </AuthProvider>
);


import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider, useAuth } from "./components/Hooks/ContextApi.jsx";
import { ToastContainer } from "react-toastify";
import { BookingProvider } from "./components/Hooks/BookingApi.jsx";

const AppWithProviders = () => {
  const { user, token } = useAuth(); // ✅ Correct: use Hook inside a component

  return (
    <BookingProvider userId={user?.id} token={token}>
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
    </BookingProvider>
  );
};

// ✅ Wrap AuthProvider properly and use the new component inside it
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AppWithProviders />
  </AuthProvider>
);


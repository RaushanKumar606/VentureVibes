import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./components/Hooks/ContextApi.jsx";
import { ToastContainer } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import { BookingProvider } from "./components/Hooks/BookingApi.jsx";

// const AppWithProviders = () => {
//   const { user, token } = useAuth(); 
//   return (
//     <BookingProvider userId={user?.id} token={token}>
//     </BookingProvider>
//   );
// };

// Load your Stripe public key
const stripePromise = loadStripe(
  "pk_test_51NmvjYSJMmMS2PKYPTmToXg9wC1zicQF8uOorOJ0BcYOioztEhncFCsEE3NfcBEjr7XqJhzCldWd0RfK0tUHZ3mW00ISvW0iwa"
);


createRoot(document.getElementById("root")).render(
  <AuthProvider>
      <Elements stripe={stripePromise}>
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
      </Elements>
  </AuthProvider>
);


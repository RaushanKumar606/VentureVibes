
import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";


function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { price, title,  product_Id, bookingType, token } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState({
    line1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  // console.log( price, title, product_Id, bookingType,  )
  const loadRazorpayScript = async () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const res = await fetch("http://localhost:8080/api/bookings/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                amount: price * 1,
                currency: "INR",
                receipt: `receipt_${Date.now()}`
            }),
        });

        const data = await res.json();
        if (!data.success) {
            toast.error("Failed to create payment order");
            setLoading(false);
            return;
        }
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
            amount: price * 1,
            currency: "INR",
            name: "World Tour",
            description: `Payment for ${title}`,
            order_id: data.order.id,
            handler: async function (response) {
                toast.success("Payment successful!");

                let bookingData = { 
                    bookingType: bookingType, 
                    transactionId: response.razorpay_payment_id,
                    bookingDate: new Date(),
                    product_Id: product_Id
                };

                if (bookingType === "Hotel") {
                    bookingData.hotel = location.state. product_Id;
                } else if (bookingType === "Bus") {
                    bookingData.bus = location.state. product_Id;
                } else if (bookingType === "Flight") {
                    bookingData.flight = location.state. product_Id;
                } else if (bookingType === "Train") {
                    bookingData.train = location.state. product_Id;
                }

                const bookingRes = await fetch("http://localhost:8080/api/bookings/create", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(bookingData),
                });

                const bookingResponse = await bookingRes.json();
                if (bookingResponse.message === "Booking successful") {
                    toast.success("Booking confirmed!");
                } else {
                    toast.error("Booking failed!");
                }
                setTimeout(() => navigate("/user/dashboard"), 1500);
            },
            prefill: {
                name: customerName,
                email: "roshankumarsingh964@gmail.com",
                contact: "8102891606",
            },
            theme: { color: "#3399cc" },
        };

        const razorpayLoaded = await loadRazorpayScript();
        if (!razorpayLoaded) {
            toast.error("Failed to load Razorpay");
            setLoading(false);
            return;
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    } catch (error) {
        console.error("Payment failed:", error);
        toast.error("Payment failed. Please try again.");
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Payment</h1>
      <div className="bg-gray-100 p-4 rounded-md mb-4 shadow-md">
        <h2 className="text-xl font-medium text-gray-800">{title}</h2>
        <p className="text-lg text-gray-600">
          Price:{" "}
          <span className="text-green-600 font-semibold">
            {price.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </span>
        </p>
      </div>

      <form onSubmit={handlePayment} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="p-3 border rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address" className="text-gray-700 mb-2">
            Address Line 1
          </label>
          <input
            type="text"
            id="address"
            value={customerAddress.line1}
            onChange={(e) => setCustomerAddress({ ...customerAddress, line1: e.target.value })}
            className="p-3 border rounded-md"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="city" className="text-gray-700 mb-2">
            City
          </label>
          <input
            type="text"
            id="city"
            value={customerAddress.city}
            onChange={(e) => setCustomerAddress({ ...customerAddress, city: e.target.value })}
            className="p-3 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-3 text-white rounded-lg ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}

export default PaymentPage;

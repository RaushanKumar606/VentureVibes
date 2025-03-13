
    // import { CardElement } from "@stripe/react-stripe-js";

    // const Payment = ({
    // title,
    // amount,
    // customerName,
    // setCustomerName,
    // customerAddress,
    // setCustomerAddress,
    // handlePayment,
    // stripe,
    // loading,
    // auth,
    // }) =>
    //     const [loading, setLoading] = useState(false);
    //     const [amount, setAmount] = useState(0);
    //     const [title, setTitle] = useState("");
    //     const [customerName, setCustomerName] = useState("");
    //     const [customerAddress, setCustomerAddress] = useState({
    //     line1: "",
    //     city: "",
    //     state: "",
    //     postalCode: "",
    //     country: "",
    //     }); {
    // return (
    //     <div className="p-8">
    //     <h1 className="text-2xl font-semibold mb-4">Payment</h1>
    //     <div className="bg-gray-100 p-4 rounded-md mb-4 shadow-md">
    //         <h2 className="text-xl font-medium text-gray-800">{title}</h2>
    //         <p className="text-lg text-gray-600">
    //         Price: <span className="text-green-600 font-semibold">
    //             {amount.toLocaleString("en-US", {
    //             style: "currency",
    //             currency: "USD",
    //             })}
    //         </span>
    //         </p>
    //     </div>
    //     <form onSubmit={handlePayment} className="space-y-4">
    //         <div className="flex flex-col">
    //         <label htmlFor="name" className="text-gray-700 mb-2">Full Name</label>
    //         <input
    //             type="text"
    //             id="name"
    //             value={customerName}
    //             onChange={(e) => setCustomerName(e.target.value)}
    //             className="p-3 border rounded-md"
    //             placeholder={auth.user?.name}
    //             required
    //         />
    //         </div>
    //         <div className="flex flex-col">
    //         <label htmlFor="address" className="text-gray-700 mb-2">Address Line 1</label>
    //         <input
    //             type="text"
    //             id="address"
    //             value={customerAddress.line1}
    //             onChange={(e) => setCustomerAddress({ ...customerAddress, line1: e.target.value })}
    //             className="p-3 border rounded-md"
    //             placeholder="Enter address"
    //             required
    //         />
    //         </div>
    //         <div className="flex flex-col">
    //         <label htmlFor="city" className="text-gray-700 mb-2">City</label>
    //         <input
    //             type="text"
    //             id="city"
    //             value={customerAddress.city}
    //             onChange={(e) => setCustomerAddress({ ...customerAddress, city: e.target.value })}
    //             className="p-3 border rounded-md"
    //             placeholder="Enter city"
    //             required
    //         />
    //         </div>
    //         <div className="flex flex-col">
    //         <label htmlFor="state" className="text-gray-700 mb-2">State</label>
    //         <input
    //             type="text"
    //             id="state"
    //             value={customerAddress.state}
    //             onChange={(e) => setCustomerAddress({ ...customerAddress, state: e.target.value })}
    //             className="p-3 border rounded-md"
    //             placeholder="Enter state"
    //         />
    //         </div>
    //         <div className="flex flex-col">
    //         <label htmlFor="postalCode" className="text-gray-700 mb-2">Postal Code</label>
    //         <input
    //             type="text"
    //             id="postalCode"
    //             value={customerAddress.postalCode}
    //             onChange={(e) => setCustomerAddress({ ...customerAddress, postalCode: e.target.value })}
    //             className="p-3 border rounded-md"
    //             placeholder="Enter postal code"
    //         />
    //         </div>
    //         <div className="flex flex-col">
    //         <label htmlFor="country" className="text-gray-700 mb-2">Country</label>
    //         <input
    //             type="text"
    //             id="country"
    //             value={customerAddress.country}
    //             onChange={(e) => setCustomerAddress({ ...customerAddress, country: e.target.value })}
    //             className="p-3 border rounded-md"
    //             placeholder="Enter country (e.g., India)"
    //             required
    //         />
    //         </div>
    //         <div className="flex flex-col">
    //         <label htmlFor="card" className="text-gray-700 mb-2">Card Details</label>
    //         <CardElement id="card" className="p-3 border rounded-md" />
    //         </div>
    //         <button
    //         type="submit"
    //         disabled={!stripe || loading}
    //         className={`px-6 py-3 text-white rounded-lg ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
    //         >
    //         {loading ? "Processing..." : "Pay Now"}
    //         </button>
    //     </form>
    //     </div>
    // );
    // };

    // export default Payment;

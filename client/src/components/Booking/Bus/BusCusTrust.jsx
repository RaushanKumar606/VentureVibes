import { FaMoneyBillWave, FaCheckCircle, FaWallet } from 'react-icons/fa';

const BusCusTrust = () => {
  return (
    <div className="bus-container bg-gray-100 p-10 mt-10">
      <div className="traincus text-center">
        <h1 className="text-3xl font-bold mb-4">1 million+ customers</h1>
        <p className="text-lg mb-6">Book Bus tickets with us because</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col text-center bg-white p-6 rounded-lg shadow-md">
            <FaMoneyBillWave size={50} className="text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Cancellation Fee</h3>
            <p>You can opt for free cancellation & get full refund.</p>
          </div>
          <div className="col text-center bg-white p-6 rounded-lg shadow-md">
            <FaCheckCircle size={50} className="text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">goConfirmed Trip</h3>
            <p>Guaranteed confirmed tickets or we give you 2x refund.</p>
          </div>
          <div className="col text-center bg-white p-6 rounded-lg shadow-md">
            <FaWallet size={50} className="text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No PG Fee via UPI</h3>
            <p>Zero Payment Gateway Charges via UPI mode</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusCusTrust;

import { FaMoneyBillWave, FaCheckCircle, FaWallet } from 'react-icons/fa';

const TrainCus = () => {
  return (
    <div className="container mx-auto text-center py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">1 million+ customers</h1>
        <p className="text-lg text-gray-600">Book train tickets with us because</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center p-6 shadow-lg rounded-lg bg-white">
          <FaMoneyBillWave size={50} className="text-green-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Cancellation Fee</h3>
          <p className="text-gray-600">You can opt for free cancellation & get full refund.</p>
        </div>
        <div className="flex flex-col items-center p-6 shadow-lg rounded-lg bg-white">
          <FaCheckCircle size={50} className="text-blue-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">goConfirmed Trip</h3>
          <p className="text-gray-600">Guaranteed confirmed tickets or we give you 2x refund.</p>
        </div>
        <div className="flex flex-col items-center p-6 shadow-lg rounded-lg bg-white">
          <FaWallet size={50} className="text-orange-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No PG Fee via UPI</h3>
          <p className="text-gray-600">Zero Payment Gateway Charges via UPI mode.</p>
        </div>
      </div>
    </div>
  );
};

export default TrainCus;
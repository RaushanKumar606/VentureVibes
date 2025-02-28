import { FaMoneyBillWave, FaCheckCircle, FaWallet } from 'react-icons/fa';


const BusCusTrust = () => {
  return (
    <div className="train-container">
      <div className="traincus">
        <h1>1 million+ customers</h1>
        <p>Book Bus tickets with us because</p>
        <div className="row">
          <div className="col">
            <FaMoneyBillWave size={50} color="green" />
            <h3>No Cancellation Fee</h3>
            <p>You can opt for free cancellation & get full refund.</p>
          </div>
          <div className="col">
            <FaCheckCircle size={50} color="blue" />
            <h3>goConfirmed Trip</h3>
            <p>Guaranteed confirmed tickets or we give you 2x refund.</p>
          </div>
          <div className="col">
            <FaWallet size={50} color="orange" />
            <h3>No PG Fee via UPI</h3>
            <p>Zero Payment Gateway Charges via UPI mode</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusCusTrust;
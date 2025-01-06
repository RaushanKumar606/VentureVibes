import { FaUtensils, FaConciergeBell, FaShieldAlt, FaClock } from "react-icons/fa"; // Import Font Awesome icons

function HotelService() {
  return (
    <div className="service-container">
      <div className="service">
        {/* Right Section with Heading and Paragraph */}

        <div className="right-img">
          <img
            src="assets/countery/luxruyHotel.jpg"
            alt="Hotel"
            className="img-fluid"
          />
        </div>
        <div className="left-side">
          <h1>The Best Holidays Start Here!</h1>
          <p>
            Book your hotel with us and don't forget to grab an awesome hotel
            deal to save massive on your stay.
          </p>
          
          <div className="service-page">
      <div className="services-part">
        <FaUtensils className="icon" /> {/* Icon for Quality Food */}
        <h2>Quality Food</h2>
        <p>
          Departure defective arranging rapturous did. Conduct denied adding
          worthy little.
        </p>
      </div>
      <div className="services-part">
        <FaConciergeBell className="icon" /> {/* Icon for Quick Services */}
        <h2>Quick Services</h2>
        <p>Supposing so be resolving breakfast am or perfectly.</p>
      </div>
      <div className="services-part">
        <FaShieldAlt className="icon" /> {/* Icon for High Security */}
        <h2>High Security</h2>
        <p>Arranging rapturous did believe him all had supported.</p>
      </div>
      <div className="services-part">
        <FaClock className="icon" /> {/* Icon for 24/7 Services */}
        <h2>24/7 Services</h2>
        <p>Rapturous did believe him all had supported.</p>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
}

export default HotelService;

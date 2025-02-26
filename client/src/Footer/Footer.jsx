
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-column">
        <div className="footer-logo">
          <img
            src="assets\Images\logo.png"
            alt="WorldTrips Logo"
            className="logo_footer"
          />
          <h3>WorldTrips</h3>
        </div>
        <address>
          4 Carter Green, Suite 400 <br />
          Carmel, IN 46032
        </address>
        <div className="social-media">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-pinterest"></i>
            </a>
            <a href="#">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-column">
        <h4>Insurance</h4>
        <ul>
          <li>
            <a href="#">Travel Medical Insurance</a>
          </li>
          <li>
            <a href="#">Trip Insurance</a>
          </li>
          <li>
            <a href="#">International Student Insurance</a>
          </li>
        </ul>
      </div>

      <div className="footer-column">
        <h4>Resources & Support</h4>
        <ul>
          <li>
            <a href="#">Customer Resources</a>
          </li>
          <li>
            <a href="#">Travel Resources</a>
          </li>
          <li>
            <a href="#">Member Portal</a>
          </li>
          <li>
            <a href="#">FAQs</a>
          </li>
        </ul>
      </div>

      <div className="footer-column">
        <h4>Company</h4>
        <ul>
          <li>
            <a href="#">About WorldTrips</a>
          </li>
          <li>
            <a href="#">Careers</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
        </ul>
      </div>
      
    </footer>
    
  );
};

export default Footer;

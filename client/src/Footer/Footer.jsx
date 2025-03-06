import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer bg-gray-800 text-white p-10 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="footer-column">
        <div className="footer-logo flex items-center space-x-4">
          <img
            src="assets/Images/logo.png"
            alt="WorldTrips Logo"
            className="logo_footer w-12 h-12"
          />
          <h3 className="text-xl font-bold">WorldTrips</h3>
        </div>
        <address className="mt-4 text-sm">
          4 Carter Green, Suite 400 <br />
          Carmel, IN 46032
        </address>
        <div className="social-media mt-4">
          <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
          <div className="social-icons flex space-x-4">
            <a href="#" className="hover:text-blue-500">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:text-pink-500">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-red-500">
              <i className="fab fa-pinterest"></i>
            </a>
            <a href="#" className="hover:text-black">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-column">
        <h4 className="text-lg font-semibold mb-4">Insurance</h4>
        <ul className="space-y-2">
          <li>
            <a href="#" className="hover:underline">Travel Medical Insurance</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Trip Insurance</a>
          </li>
          <li>
            <a href="#" className="hover:underline">International Student Insurance</a>
          </li>
        </ul>
      </div>

      <div className="footer-column">
        <h4 className="text-lg font-semibold mb-4">Resources & Support</h4>
        <ul className="space-y-2">
          <li>
            <a href="#" className="hover:underline">Customer Resources</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Travel Resources</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Member Portal</a>
          </li>
          <li>
            <a href="#" className="hover:underline">FAQs</a>
          </li>
        </ul>
      </div>

      <div className="footer-column">
        <h4 className="text-lg font-semibold mb-4">Company</h4>
        <ul className="space-y-2">
          <li>
            <a href="#" className="hover:underline">About WorldTrips</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Careers</a>
          </li>
          <li>
            <a href="#" className="hover:underline">Contact Us</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
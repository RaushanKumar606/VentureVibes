import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaTwitter } from "react-icons/fa";

const HotelFooter = () => {
  return (
    <footer className="bg-black text-white py-12 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">the world awiats </h3>
          <select className="bg-gray-800 text-white p-2 rounded-lg w-40">
            <option>🇮🇳 India</option>
            <option>🇺🇸 USA</option>
            <option>🇬🇧 UK</option>
          </select>
          <ul className="mt-4 space-y-2">
            <li>Company</li>
            <li>Jobs</li>
            <li>Press</li>
            <li>Investor relations</li>
            <li>Mobile apps - searching on the go</li>
           
          </ul>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Help</h3>
          <ul className="space-y-2">
            <li>Learn how the world awiats  works</li>
            <li>Terms and conditions</li>
            <li>Legal information</li>
            <li>Do Not Sell My Personal Information</li>
            <li>Privacy notice</li>
            <li>DSA information</li>
            <li>Cyber Security</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get exclusive inspiration for your next stay – subscribe to our newsletter.</h3>
          <div className="flex">
            <input
              type="email"
              placeholder="Email address"
              className="p-2 w-full text-black rounded-l-lg"
            />
            <button className="bg-blue-600 px-6 py-2 rounded-r-lg">Subscribe</button>
          </div>
         
          <p className="text-sm">Kesselstraße 5 – 7, 40221 Düsseldorf</p>
          <p className="text-sm">Copyright 2025 the world awiats | All rights reserved.</p>
          <div className="flex gap-4 mt-4">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaYoutube />
            <FaLinkedinIn />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HotelFooter;

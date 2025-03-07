const FlightFooter = () => {
    return (
      <footer className="bg-black text-white py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left Section */}
          <div>
            <h2 className="text-lg font-bold mb-4">OUR OFFERINGS</h2>
            <ul className="space-y-2">
              {[
                "Quick Links",
                "Popular Destination",
                "International Destination",
                "Popular Airline",
                "Connect With Us",
                "Offers",
                "EMT Insights",
                "Media",
                "Investors Relation",
                "Current Openings",
              ].map((item, index) => (
                <li key={index} className="cursor-pointer hover:text-green-400">
                  {item}
                </li>
              ))}
            </ul>
          </div>
  
          {/* Middle Section */}
          <div>
            <h2 className="text-lg font-bold mb-4">
              Make your travel easy with a wide range of products and services.
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Flights",
                "Bus",
                "Airports",
                "Activities",
                "Hotels",
                "Cabs",
                "Travel Guides",
                "Flight Check-in",
                "Train Status",
                "PNR Check",
                "Corporate Travel",
                "Blog",
              ].map((service, index) => (
                <span
                  key={index}
                  className="cursor-pointer hover:text-green-400"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
  
          {/* Right Section */}
          <div>
            <h2 className="text-lg font-bold mb-4">Download EaseMyTrip App</h2>
            <div className="flex gap-4 mb-6">
              <img
                src="/assets/google.png"
                alt="Google Play"
                className="cursor-pointer w-40 hover:scale-110 transition-all"
              />
              <img
                src="/assets/apple.png"
                alt="Apple Store"
                className="cursor-pointer w-40 hover:scale-110 transition-all"
              />
            </div>
            <h2 className="text-lg font-bold mb-4">SCAN QR CODE</h2>
            <img
              src="/assets/qr.png"
              alt="QR Code"
              className="w-32 hover:scale-110 transition-all cursor-pointer"
            />
          </div>
        </div>
  
        <div className="text-center mt-10 text-sm border-t border-gray-700 pt-6">
          Copyright © 2025 EaseMyTrip
        </div>
      </footer>
    );
  };
  
  export default FlightFooter;
  
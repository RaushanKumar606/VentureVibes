export default function FlightService() {
    return (
      <div className="p-5 bg-white shadow-lg rounded-xl mt-10">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <h2 className="text-lg font-semibold mb-2">Explore the best flight deals</h2>
            <p className="text-gray-600 text-sm">
              Explore the best flight deals from anywhere,<br /> to everywhere, then book with no fees.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Compare flight deals</h2>
            <p className="text-gray-600 text-sm">
              Compare flight deals from over 1000 providers,<br /> and choose the cheapest, fastest or lowest-emission tickets.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Find the cheapest month</h2>
            <p className="text-gray-600 text-sm">
              Find the cheapest month - or even day - to fly, <br />and set up Price Alerts to book when the price is right.
            </p>
          </div>
        </div>
      </div>
    );
  }
  

import travelData from "../../Data/TravalData.json";
function AllHotels() {
    return (
        <div className="container mx-auto mt-8">
          <h2 className="text-3xl font-semibold mb-6">Hot hotel deals right now</h2>
    
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {travelData.map((item) => (
              <div key={item.id} className="max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.from}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">Buses From {item.from} To:</h3>
                  <p className="text-gray-700">{item.to.join(", ")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };

export default AllHotels
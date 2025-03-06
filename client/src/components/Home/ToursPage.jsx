import countery from "../Data/TopTours.json";

function ToursPage() {
  return (
    <>
      <div className="container mx-auto p-8">
        <h2 className="text-4xl font-bold text-center mb-10 text-blue-600">
          TOP POPULAR TRAVELS
        </h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {countery.map((item, index) => (
            <div
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105"
              key={item.key || index}
            >
              <img
                src={item.image.url}
                alt={item.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{item.title}</h3>
                {/* Uncomment below if content is needed */}
                {/* <p className="text-gray-600">
                  {item.content || "Discover more about this destination!"}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ToursPage;


import countery from "../Data/image.json";

function Blogs() {
  return (
    <>
      <div className="container mx-auto p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">BLOGS TRAVELS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {countery.map((item, index) => (
            <div 
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl" 
              key={item.key || index}
            >
              <img
                src={item.imageSrc}
                alt={item.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                {/* <p className="text-gray-600">{item.content || "Discover more about this destination!"}</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Blogs;
import countery from "../Data/image.json";

function Services() {
  return (
    <>
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">LUXURY TRAINS BUS AIR HOTEL</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {countery.map((item, index) => (
            <div
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition duration-300" 
              key={item.key || index}
            >
              <img
                src={item.imageSrc}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 p-4">{item.name}</h3>
              <a
                      href={item.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Live Demo!
                    </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Services;



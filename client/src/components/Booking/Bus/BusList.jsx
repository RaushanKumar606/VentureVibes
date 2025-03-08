import countery from "../../Data/image.json";

function BusList() {

  return (
    <>
      <div className="bus-list-container bg-gray-100 p-10">
        <h2 className="blogs-title text-3xl font-bold text-center mb-6">TOP BUS TRAVELS</h2>
        <div className="blogs-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {countery.map((item, index) => (
            <div className="blog-card bg-white rounded-lg shadow-md overflow-hidden" key={item.key || index}>
              <img src={item.imageSrc} alt={item.title} className="blog-image w-full h-48 object-cover" />
              <div className="blog-content p-6">
                <h3 className="blog-title text-xl font-semibold mb-4">{item.title}</h3>
                <div className="booknow-container flex justify-between items-center mt-4">
                  <div className="booknow bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                    <a href="#">BOOK NOW</a>
                  </div>
                  <div className="cupon-code text-gray-700">Code:</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BusList;
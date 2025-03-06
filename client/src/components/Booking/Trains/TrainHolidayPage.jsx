import holidays from "../../Data/holidays.json";

const TrainHolidayPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h2 className="text-4xl font-bold text-center mb-10">HOLIDAYS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {holidays.map((item, index) => (
          <div key={item.key || index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={item.imageSrc}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-gray-600 mt-2">
                {item.title || "Discover more about this destination!"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainHolidayPage;


const TrainInquiry = () => {
    return (
      <div className="text-center py-10 bg-gray-100">
        <h2 className="text-3xl font-bold mb-10">Railways Inquiry Just a Click Away!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {[
            { title: "Live Train Status", description: "Know the whereabouts of your train easily" },
            { title: "Coach & Seat Position", description: "View coach & seat layout of the train you wish to" },
            { title: "PNR Status", description: "Check PNR Status effortlessly" },
            { title: "Platform Locator", description: "Know the platform for your train" }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <a href="#" className="block">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default TrainInquiry;
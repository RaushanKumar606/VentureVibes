
function Tours() {
  const tourData = [
    {
      id: 1,
      name: "Taj Mahal",
      image: "assets/countery/tajmahal.jpg",
    },
    {
      id: 2,
      name: "Eiffel Tower",
      image: "assets/countery/tajmahal.jpg",
    },
    {
      id: 3,
      name: "Great Wall of China",
      image: "assets/countery/tajmahal.jpg",
    },
    {
    id: 3,
    name: "Great Wall of China",
    image: "assets/countery/tajmahal.jpg",
  },
  {
    id: 3,
    name: "Great Wall of China",
    image: "assets/countery/tajmahal.jpg",
  },
  {
    id: 3,
    name: "Great Wall of China",
    image: "assets/countery/tajmahal.jpg",
  },
  {
    id: 3,
    name: "Great Wall of China",
    image: "assets/countery/tajmahal.jpg",
  },
  {
    id: 3,
    name: "Great Wall of China",
    image: "assets/countery/tajmahal.jpg",
  },
  {
    id: 3,
    name: "Great Wall of China",
    image: "assets/countery/tajmahal.jpg",
  },
  {
    id: 3,
    name: "Great Wall of China",
    image: "assets/countery/tajmahal.jpg",
  },
  {
    id: 3,
    name: "Great Wall of China",
    image: "assets/countery/tajmahal.jpg",
  },
  ];

  return (
    <div className="tour-container">
      <h2 className="populer-tour-name">Popular Tours</h2>
      <div className="all-tours-container">
        {tourData.map((tour) => (
          <div key={tour.id} className="tour-card">
            <img src={tour.image} alt={tour.name} className="tour-image" />
            <h3 className="tour-title">{tour.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tours;


  
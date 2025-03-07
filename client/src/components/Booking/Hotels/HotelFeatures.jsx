const HotelFeatures = () => {
  const features = [
    {
      id: 1,
      image: '/assets/Images/search.svg',
      title: 'Search simply',
      description: 'Search through 5 million hotels  in just a few seconds.',
    },
    {
      id: 2,
      image: '/assets/Images/compare.svg',
      title: 'Compare confidently',
      description: 'Compare hotel prices from over 100 sites at once.',
    },
    {
      id: 3,
      image: '/assets/Images/save.svg',
      title: 'Save big',
      description: 'Discover a great deal to book on our partner sites.',
    },
  ];

  return (
    <div className="container mx-auto py-12 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {features.map((feature) => (
          <div key={feature.id} className="flex flex-col items-center">
            <img src={feature.image} alt={feature.title} className="w-40 mb-4" />
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelFeatures;

function About() {
  return (
    <>
      <div className="container mx-auto p-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <img 
              src="/assets/countery/tajmahal.jpg" 
              alt="About India" 
              className="w-full rounded-lg shadow-lg hover:scale-105 transition duration-300"
            />
          </div>
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">ABOUT INDIA</h1>
            <p className="text-gray-700 leading-relaxed">
              India, a land of diverse cultures, rich heritage, and natural beauty, is one of the oldest civilizations in the world. <br />
              Known for its vibrant traditions, delicious cuisine, and iconic landmarks such as the Taj Mahal, India offers a unique blend of the ancient and the modern. With over 1.4 billion people, it is a melting pot of languages, religions, and festivals, making it a truly colorful and dynamic nation.
              <br /><br />
              In the words of Mark Twain, “India is the cradle of the human race, the birthplace of human speech, the mother of history, the grandmother of legend and the great-grandmother of tradition.”
            </p>
          </div>
        </div>
        <div className="my-8 border-t border-gray-300"></div>
      </div>
    </>
  );
}

export default About;

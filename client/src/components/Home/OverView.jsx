function OverView() {
  const rows = [
    { column1: "Capital", column2: "Delhi  " },
    { column1: "States", column2: "28 States and 8 Union Territories (UT)" },
    { column1: "Independence", column2: "15th August 1947  " },
    {
      column1: "National Days",
      column2: (
        <>
          26th January (Republic Day) <br />
          15th August (Independence Day) <br />
          2nd October (Gandhi Jayanti; Mahatma Gandhi's Birthday) <br />
          (From the British Colonial Rule)
        </>
      ),
    },
    { column1: "President of India", column2: "	Droupadi Murmu" },
    { column1: "Prime Minister of India", column2: "	Narendra Modi" },
    { column1: "National Flag of India", column2: "	Tricolor" },
    {
      column1: "National Anthem of India",
      column2:
        "	Jana-gana-mana (composed originally in Bengali by Rabindranath Tagore)",
    },
    {
      column1: "National Song of India",
      column2:
        "	Vande Mataram (composed in Sanskrit by Bankimchandra Chatterji)",
    },
    { column1: "State Emblem", column2: "	Ashoka Chakra" },
    {
      column1: "National Bird of India",
      column2: "	Indian Peacock (Pavo Cristatus)",
    },
    { column1: "National Animal", column2: "	Tiger (Panthera Tigris)" },
    { column1: "Currency", column2: "		Rupee" },
    { column1: "Telephone Country Code", column2: "		+91" },
    { column1: "Total Area", column2: "		3.3 Million sq.km" },
    { column1: "Indian Stanard Time", column2: "		GMT +5:30" },
  ];

  const states = [
    { state: "Andhra Pradesh", capital: "Amravati" },
    { state: "Arunachal Pradesh", capital: "Itanagar" },
    { state: "Assam", capital: "Dispur" },
    { state: "Bihar", capital: "Patna" },
    { state: "Chattisgarh", capital: "Raipur" },
    { state: "Goa", capital: "Panji" },
    { state: "Gujarat", capital: "Gandhinagar" },
    { state: "Haryana", capital: "Chandigarh" },
    { state: "Himachal Pradesh", capital: "Shimla" },
    { state: "Jharkhand", capital: "Ranchi" },
    { state: "Karnataka", capital: "Bangalore" },
    { state: "Kerala", capital: "Trivandrum" },
    { state: "Madhya Pradesh", capital: "Bhopal" },
    { state: "Manipur", capital: "Imphal" },
    { state: "Meghalaya", capital: "Shilong" },
    { state: "Mizoram", capital: "Aizawl" },
    { state: "Nagaland", capital: "Kohima" },
    { state: "Odisha", capital: "Bhubaneshwar" },
    { state: "Punjab", capital: "Chandigarh" },
    { state: "Rajasthan", capital: "Jaipur" },
    { state: "Sikkim", capital: "Gangtok" },
    { state: "Tamil Nadu", capital: "Chennai" },
    { state: "Telangana", capital: "Hyderabad" },
    { state: "Tripura", capital: "Agartala" },
    { state: "Uttarakhand", capital: "Dehradun" },
    { state: "Uttar Pradesh", capital: "Lucknow" },
    { state: "West Bengal", capital: "Kolkata" },
  ];

  // Data for Union Territories and Capitals
  const unionTerritories = [
    { ut: "Andaman & Nicobar Islands", capital: "Port Blair" },
    { ut: "Dadra and Nagar Haveli and Daman & Diu", capital: "Daman" },
    { ut: "Jammu & Kashmir", capital: "Srinagar-Summer*, Jammu-Winter*" },
    { ut: "Lakshadweep", capital: "Kavaratti" },
    { ut: "Chandigarh", capital: "Chandigarh" },
    { ut: "Delhi", capital: "Delhi" },
    { ut: "Ladakh", capital: "Leh" },
    { ut: "Puducherry", capital: "Puducherry" },
  ];

  return (
    <div className="about-container">
      <h1>Indian Overview</h1>
      <p>
        India, officially known as the Republic of India, is a vast and diverse
        country located in South Asia. It is bordered by Pakistan to the
        northwest, China, Nepal, and Bhutan to the north, and Bangladesh and
        Myanmar to the east. To the south, India is surrounded by the Indian
        Ocean, making it a peninsula. With its unique geographical location,
        India is often referred to as the "subcontinent". India is a federal
        union comprising 28 states and 8 union territories. Each state has its
        own distinct culture, traditions, and languages, contributing to the
        rich tapestry of India's diversity. The country's population is one of
        the world's largest, with over 1.3 billion people, making it a vibrant
        and dynamic nation. <br></br>
        The climate and weather in India vary greatly due to its vast size and
        diverse topography. From the snowy peaks of the Himalayas in the north
        to the tropical beaches in the south, India experiences a wide range of
        climatic conditions, including tropical, subtropical, desert, and alpine
        climates. India's history is steeped in ancient civilizations and has
        witnessed the rise and fall of various empires and dynasties. The
        country is home to several UNESCO World Heritage Sites, reflecting its
        rich historical and cultural heritage. The Himalayas, the world's
        highest mountain range, are a prominent feature of India's geography.
        These majestic peaks not only add to the country's scenic beauty but
        also hold significant cultural and spiritual importance for various
        religions. Religion plays a vital role in India, with Hinduism, Islam,
        Christianity, Sikhism, Buddhism, and Jainism being some of the major
        religions practiced here. The country celebrates a multitude of
        festivals and cultural events, making it a year-round carnival of colors
        and traditions.
      </p>
      <h4>Essential Information about India: Quick Facts and Highlights</h4>
      <div style={{ padding: "20px" }}>
        <table
          style={{ width: "100%", borderCollapse: "collapse", textAlign: "" }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  backgroundColor: "#f4f4f4",
                }}
              >
                Country Name
              </th>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  backgroundColor: "#f4f4f4",
                }}
              >
                Indian
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                  {row.column1}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                  {row.column2}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1>Discovering India: States and Their Capitals</h1>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "30px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  backgroundColor: "#f4f4f4",
                }}
              >
                State Name
              </th>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  backgroundColor: "#f4f4f4",
                }}
              >
                Capital Name
              </th>
            </tr>
          </thead>
          <tbody>
            {states.map((item, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                  {item.state}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                  {item.capital}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h1>Union Territories & Their Capitals</h1>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  backgroundColor: "#f4f4f4",
                }}
              >
                UT Name
              </th>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  backgroundColor: "#f4f4f4",
                }}
              >
                Capital Name
              </th>
            </tr>
          </thead>
          <tbody>
            {unionTerritories.map((item, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                  {item.ut}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                  {item.capital}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        For travelers, India is a treasure trove of exploration and experiences.
        From the bustling cities to serene rural landscapes, India offers a
        diverse range of attractions, such as historical monuments, palaces,
        temples, wildlife sanctuaries, and beautiful beaches. The country's
        tourism industry attracts millions of visitors every year who come to
        witness its diverse culture, stunning landscapes, and warm hospitality.
        Visiting India is a journey that promises unforgettable memories,
        providing a blend of ancient traditions and modern advancements. Whether
        exploring the bustling streets of Delhi, marveling at the beauty of the
        Taj Mahal, or meditating in the peaceful foothills of the Himalayas,
        India offers a truly magical experience that leaves a lasting impression
        on every traveler.
      </p>
    </div>
  );
}

export default OverView;

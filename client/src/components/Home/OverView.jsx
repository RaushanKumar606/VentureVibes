function OverView() {
  const rows = [
    { column1: "Capital", column2: "Delhi" },
    { column1: "States", column2: "28 States and 8 Union Territories (UT)" },
    { column1: "Independence", column2: "15th August 1947" },
    { column1: "National Days", column2: "26th January (Republic Day), 15th August (Independence Day), 2nd October (Gandhi Jayanti)" },
    { column1: "President of India", column2: "Droupadi Murmu" },
    { column1: "Prime Minister of India", column2: "Narendra Modi" },
    { column1: "National Flag of India", column2: "Tricolor" },
    { column1: "National Anthem of India", column2: "Jana-gana-mana (Rabindranath Tagore)" },
    { column1: "National Song of India", column2: "Vande Mataram (Bankimchandra Chatterji)" },
    { column1: "State Emblem", column2: "Ashoka Chakra" },
    { column1: "National Bird", column2: "Indian Peacock" },
    { column1: "National Animal", column2: "Tiger" },
    { column1: "Currency", column2: "Rupee" },
    { column1: "Telephone Country Code", column2: "+91" },
    { column1: "Total Area", column2: "3.3 Million sq.km" },
    { column1: "Indian Standard Time", column2: "GMT +5:30" },
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Indian Overview</h1>
      <p className="text-gray-700 leading-relaxed mb-8">
        India, officially known as the Republic of India, is a vast and diverse country located in South Asia...
      </p>

      <h4 className="text-2xl font-semibold mb-4">Essential Information about India</h4>
      <table className="w-full table-auto border-collapse border border-gray-300 mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left">Category</th>
            <th className="border border-gray-300 p-3 text-left">Details</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-3">{row.column1}</td>
              <td className="border border-gray-300 p-3">{row.column2}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-gray-700 leading-relaxed">
        For travelers, India is a treasure trove of exploration and experiences...
      </p>
    </div>
  );
}

export default OverView;

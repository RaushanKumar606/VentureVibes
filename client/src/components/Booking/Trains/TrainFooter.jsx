const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Social Media Icons */}
          <div className="flex flex-wrap gap-4">
            {/* {[
              "Facebook",
              "WhatsApp",
              "YouTube",
              "Instagram",
              "LinkedIn",
              "Telegram",
              "Pinterest",
              "Twitter",
            ].map((icon, index) => (
              <button
                key={index}
                className="bg-blue-600 rounded-full p-2 hover:bg-blue-500 transition"
                aria-label={icon}
              >
                {icon}
              </button>
            ))} */}
          </div>

  
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                title: "IRCTC Trains",
                links: ["General Info", "Important Info", "Agents", "Enquiries"],
              },
              {
                title: "Services",
                links: [
                  "IRCTC eWallet",
                  "IRCTC iPay",
                  "DMRC Ticket Booking",
                  "Refund Rules",
                ],
              },
              {
                title: "Support",
                links: [
                  "Help & Support",
                  "Policies",
                  "Mobile Zone",
                  "Ask Disha ChatBot",
                ],
              },
              {
                title: "About Us",
                links: [
                  "Advertise with us",
                  "Person with Disability",
                  "IRCTC Zone",
                  "Newly Migrated Agents",
                ],
              },
            ].map((section, index) => (
              <div key={index}>
                <h6 className="text-lg font-bold mb-2">{section.title}</h6>
                {section.links.map((link, i) => (
                  <p key={i} className="text-sm hover:text-blue-400 cursor-pointer">{link}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center border-t border-gray-700 mt-6 pt-4">
          &copy; 2025 www.irctc.co.in. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;

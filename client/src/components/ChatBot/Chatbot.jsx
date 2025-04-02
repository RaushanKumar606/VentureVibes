import  { useState } from "react";
import "./Chatbot.css";
import { MessageCircle } from "lucide-react";
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Controls chatbot visibility

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    const botMessage = { text: data.reply, sender: "bot" };
    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div>
      {/* Floating Chatbot Button */}
      <button className="chatbot-button" onClick={() => setIsOpen(!isOpen)}>
      <MessageCircle size={24} />
</button>

      {/* Chatbot Box */}
      {isOpen && (
        <div className="chatbot-container">
          <div className="chat-header">
            <h3>Chatbot</h3>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>

          <div className="chat-window">
            {messages.map((msg, index) => (
              <div key={index} className={msg.sender}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

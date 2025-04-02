const { Configuration, OpenAIApi } =require ("openai");
const dotenv =require("dotenv");

dotenv.config();

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

const getChatbotResponse = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      max_tokens: 100,
    });

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({ error: "Failed to get response from chatbot" });
  }
};
module.exports={getChatbotResponse}
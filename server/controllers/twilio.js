const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const sendWhatsAppMessage = async (number, userName, bookingDetails) => {
  try {
    const fullNumber = `+91${number}`; 
    const message = await client.messages.create({
      from: 'whatsapp:+14155238886',
      to: `whatsapp:${fullNumber}`, 
      body: `Hi ${userName}, your booking for '${bookingDetails}' is confirmed. Thank you for trusting us. Have a wonderful trip! ✨`
     
      // body: `Hi ${userName}, your booking for '${bookingDetails}' is confirmed. Enjoy your journey! 🌟`
    });

    // console.log('Message sent:', message);
    return message; 
  } catch (err) {
    // console.error('WhatsApp Error:', err.message);
    throw err; 
  }
};

module.exports = { sendWhatsAppMessage };

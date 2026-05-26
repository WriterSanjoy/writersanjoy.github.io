import emailjs from '@emailjs/nodejs';

export default async function handler(req, res) {
  try {
    const orderParams = req.body;

    // 1️⃣ Publisher notification
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_CONFIRM_ID,
      orderParams,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY
      }
    );

    // 2️⃣ Customer auto‑reply
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_REPLY_ID,
      {
        to_name: orderParams.customer_name,
        to_email: orderParams.customer_email,
        header: orderParams.book_title,
        message_block: `Order Confirmation Details:\nBook: ${orderParams.book_title}\nPrice: ${orderParams.book_price}\nType: ${orderParams.order_type}\nDate: ${orderParams.order_date}`
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY
      }
    );

    res.status(200).json({ message: "✅ Order placed successfully!" });
  } catch (err) {
    console.error("EmailJS error:", err);
    res.status(500).json({ error: "❌ Failed to send order emails" });
  }
}
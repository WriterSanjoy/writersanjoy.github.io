import emailjs from '@emailjs/nodejs';

export default async function handler(req, res) {
  try {
    const {
      book_title,
      book_price,
      order_type,
      customer_name,
      customer_phone,
      customer_email,
      customer_address,
      order_date
    } = req.body;

    // 1️⃣ Send to Publisher (Order Confirmation)
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_CONFIRM_ID,
      {
        book_title,
        book_price,
        order_type,
        customer_name,
        customer_phone,
        customer_email,
        customer_address,
        order_date
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY
      }
    );

    // 2️⃣ Send Auto‑Reply to Customer
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_REPLY_ID,
      {
        to_name: customer_name,
        to_email: customer_email,
        header: "Order Confirmation",
        message_block: `Your order for "${book_title}" has been received.`
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY
      }
    );

    res.status(200).json({ message: "Order emails sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send order emails" });
  }
}
export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed"
    });
  }

  const { name, comment } = req.body;

  console.log("Received Comment:");
  console.log("Name:", name);
  console.log("Comment:", comment);

  return res.status(200).json({
    success: true,
    message: "Comment received"
  });
}
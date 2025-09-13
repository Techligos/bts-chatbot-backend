export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ message: "Hello from BTS Chatbot Backend 🚀" });
  }
  return res.status(405).json({ error: "Method not allowed" });
}

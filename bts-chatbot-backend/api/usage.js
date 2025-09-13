export default function handler(req, res) {
  return res.status(200).json({ used: 0, left: 20 });
}

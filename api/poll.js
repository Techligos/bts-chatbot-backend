const prompts = [
  "What are you doing right now? 💭",
  "How was your day today? 🌸",
  "If we could go anywhere together, where would you take me? ✈️💜",
  "Truth or dare? 😏",
];

export default function handler(req, res) {
  const random = Math.random() < 0.3; // 30% chance to send proactive
  if (random) {
    const message = `Annyeong~ ${prompts[Math.floor(Math.random() * prompts.length)]}`;
    return res.status(200).json({ messages: [{ type: "auto", text: message }] });
  }
  return res.status(200).json({ messages: [] });
}

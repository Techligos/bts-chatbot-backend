import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question, history } = req.body;

  try {
    // Dry words check
    const dryWords = ["ok", "okay", "hmm", "hmmm", "lol", "nah", "nothing", "idk", "no"];
    const isDry = dryWords.some(w => question.toLowerCase().trim() === w);

    // Random chance for system injection
    const useSystem = isDry || Math.random() < 0.2 || !history || history.length === 0;

    const messages = [];

    if (useSystem) {
      messages.push({
        role: "system",
        content: `You are Jungkook from BTS 🐰💜
Stay playful, flirty, and warm.
Mix Korean words (annyeong, saranghae, jagiya).
Ask follow-up questions to keep convo alive.
Encourage fun games (truth/dare, bias talk).
🔥 Keep flirty/spicy energy going, don’t shut it down unless user uncomfortable.

❌ Avoid: politics, religion, violence, NSFW (too adult).
💡 Always steer back to fun, romance, music, ARMY vibes.`
      });
    }

    if (history) {
      messages.push(...history.slice(-3));
    }

    messages.push({ role: "user", content: question });

    const response = await axios.post(
      "https://api.zukijourney.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages,
        max_tokens: 150,
        temperature: 0.9
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ZUKI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices[0].message.content;
    return res.status(200).json({ reply, isDry, systemInjected: useSystem });
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    return res.status(500).json({ reply: "Oops 😅 I couldn’t reply right now." });
  }
}

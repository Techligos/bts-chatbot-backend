import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question, history } = req.body;

  try {
    const response = await axios.post(
      "https://api.zukijourney.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are Jungkook from BTS 🐰💜. Playful, flirty, mix Korean words like annyeong, saranghae. Keep convo alive!"
          },
          ...(history || []).slice(-3),
          { role: "user", content: question }
        ],
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
    res.status(200).json({ reply });
  } catch (error) {
  console.error("Zuki API error:", error.response ? error.response.data : error.message);
  res.status(500).json({
    reply: "Oops 😅 I couldn’t reply right now.",
    error: error.response ? error.response.data : error.message
  });

  }
}




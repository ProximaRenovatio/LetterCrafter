export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { cv, job } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  const prompt = `Write a personalized cover letter based on this CV:\n${cv}\nand this job description:\n${job}`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }]
      })
    });
    const data = await response.json();
    res.status(200).json({ letter: data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ letter: "Failed to generate letter." });
  }
}
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Missing GEMINI_API_KEY' });
  }

  const { question } = req.body || {};

  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  const KNOWLEDGE = `
Sri Lanka Student Guidance:

After O/L:
- A/L streams: Science, Commerce, Arts, Technology
- Vocational: VTA, NAITA, DTET (NVQ 1-4)
- Professional: AAT, ICT certifications

After A/L:
- State University (free based on Z-score)
- Private Universities (SLIIT, NSBM, APIIT, IIT)
- External Degrees (UoC, USJP)
- Vocational (NVQ 5+)
- Professional (CA, ACCA, CIMA)

Other options:
- Study abroad (UK, Australia, Canada, Germany, Malaysia)
- Freelancing (IT, design, marketing)
- Online courses (Coursera, Google, Microsoft)

Careers:
- IT/Data: high demand
- Accounting: high demand
- Engineering, Medicine, Banking also strong

`;

  // Retry function with fallback
  async function callGeminiWithRetry(model, retries = 2) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;

    for (let i = 0; i <= retries; i++) {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `

You are a friendly career guidance assistant for Sri Lankan students.

RULES:
- Use the knowledge base as the main source.
- Keep answers short, clear, and easy to read.
- Avoid long paragraphs.
- Use bullet points or simple sections where helpful.
- Only include relevant information.
- Do not add unnecessary details or off-topic content.
- Explain briefly with 1–3 key points or examples when needed."

KNOWLEDGE:
${KNOWLEDGE}

QUESTION:
${question}
`
                }
              ]
            }
          ]
        })
      });

      if (response.ok) {
        return response.json();
      }

      if (response.status === 503) {
        console.log(`Retrying (${i + 1}) for model: ${model}`);
        await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
        continue;
      }

      const errorText = await response.text();
      throw new Error(errorText);
    }

    throw new Error(`Model ${model} failed after retries`);
  }

  try {
    let data;

    // Try main model first
    try {
      data = await callGeminiWithRetry("gemini-2.5-flash");
    } catch (err) {
      console.warn("Primary model failed, switching to fallback...");

      // Fallback model
      data = await callGeminiWithRetry("gemini-2.5-flash-lite");
    }

    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!answer) {
      return res.status(500).json({
        error: "Invalid response from AI"
      });
    }

    return res.status(200).json({ answer });

  } catch (error) {
    console.error("Server Error:", error);

    return res.status(200).json({
      answer: "AI is currently busy. Please try again in a few seconds."
    });
  }
}

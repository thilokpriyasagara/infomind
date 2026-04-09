export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    return res.status(405).json({ answer: 'Method not allowed.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(200).json({
      answer: '⚠️ Setup error: GEMINI_API_KEY is not set in Vercel environment variables. Please add it in Vercel → Settings → Environment Variables, then redeploy.'
    });
  }

  const { question } = req.body || {};

  if (!question) {
    return res.status(200).json({ answer: 'Please ask a question.' });
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

  const prompt = `You are a friendly career guidance assistant for Sri Lankan students.

RULES:
- Use the knowledge base as the main source.
- Keep answers short, clear, and easy to read.
- Avoid long paragraphs.
- Use bullet points or simple sections where helpful.
- Only include relevant information.
- Explain briefly with 1-3 key points or examples when needed.

KNOWLEDGE:
${KNOWLEDGE}

QUESTION:
${question}`;

  // Try models in order of preference
  const models = [
    'gemini-1.5-flash',
    'gemini-1.5-flash-8b',
    'gemini-pro'
  ];

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 512,
          }
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error(`Model ${model} failed with ${response.status}: ${errText}`);

        // If API key is invalid (403), return a clear message immediately
        if (response.status === 403 || response.status === 400) {
          return res.status(200).json({
            answer: `⚠️ API Error (${response.status}): Your Gemini API key may be invalid or not have access. Please check your GEMINI_API_KEY in Vercel settings.`
          });
        }

        // Try next model for other errors
        continue;
      }

      const data = await response.json();
      const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      if (answer) {
        return res.status(200).json({ answer });
      }

      // No answer from this model, try next
      console.warn(`Model ${model} returned empty answer`);

    } catch (err) {
      console.error(`Model ${model} threw:`, err.message);
      // Try next model
    }
  }

  // All models failed
  return res.status(200).json({
    answer: '⚠️ All AI models are currently unavailable. Please try again in a moment.'
  });
}

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// Load .env manually for the plugin
function loadEnv() {
  try {
    const envFile = readFileSync(resolve(process.cwd(), '.env'), 'utf-8')
    const env: Record<string, string> = {}
    for (const line of envFile.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const idx = trimmed.indexOf('=')
      if (idx > 0) {
        env[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim()
      }
    }
    return env
  } catch {
    return {}
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-chat-middleware',
      configureServer(server) {
        const env = loadEnv()
        const GEMINI_API_KEY = env.GEMINI_API_KEY || ''

        server.middlewares.use('/api/chat', async (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405
            res.end(JSON.stringify({ error: 'Method not allowed' }))
            return
          }

          if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Missing GEMINI_API_KEY in .env file' }))
            return
          }

          let body = ''
          req.on('data', (chunk: Buffer) => { body += chunk.toString() })
          req.on('end', async () => {
            try {
              const { question } = JSON.parse(body)
              if (!question) {
                res.statusCode = 400
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: 'Question is required' }))
                return
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
`

              const models = ['gemini-2.0-flash', 'gemini-1.5-flash']
              let answer = ''

              for (const model of models) {
                try {
                  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`
                  const geminiRes = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      contents: [{
                        parts: [{
                          text: `You are a friendly career guidance assistant for Sri Lankan students.

RULES:
- Use the knowledge base as the main source.
- Keep answers short, clear, and easy to read.
- Avoid long paragraphs.
- Use bullet points or simple sections where helpful.
- Only include relevant information.

KNOWLEDGE:
${KNOWLEDGE}

QUESTION:
${question}`
                        }]
                      }]
                    })
                  })

                  if (geminiRes.ok) {
                    const data = await geminiRes.json() as {
                      candidates?: { content?: { parts?: { text?: string }[] } }[]
                    }
                    answer = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? ''
                    if (answer) break
                  }
                } catch {
                  // try next model
                }
              }

              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({
                answer: answer || 'AI is currently busy. Please try again in a few seconds.'
              }))
            } catch (err) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ answer: 'Sorry, something went wrong. Please try again.' }))
            }
          })
        })
      }
    }
  ],
})

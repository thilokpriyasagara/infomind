import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([
    { from: "Bot", text: "👋 Hi! I'm your career guidance assistant. Ask me anything about education paths, universities, vocational training, or careers! 😊" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim() || loading) return;
    const question = input.trim();
    setMessages(prev => [...prev, { from: "You", text: question }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { from: "Bot", text: data.answer }]);
    } catch {
      setMessages(prev => [...prev, { from: "Bot", text: "Sorry, something went wrong. Please try again." }]);
    }
    setLoading(false);
  }

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000 }}>

      {/* Chat Window */}
      {open && (
        <div style={{
          width: 340, marginBottom: 12,
          border: "1px solid #e5e7eb", borderRadius: 16, overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)", background: "white",
          display: "flex", flexDirection: "column"
        }}>
          {/* Header */}
          <div style={{
            background: "#4f46e5", padding: "0.85rem 1rem",
            color: "white", display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>🎓 InfoMind</div>
              <div style={{ fontSize: 11, opacity: 0.85 }}>Career Guidance and Assistance</div>
            </div>
            <button onClick={() => setOpen(false)} style={{
              background: "none", border: "none", color: "white",
              fontSize: 20, cursor: "pointer", lineHeight: 1
            }}>×</button>
          </div>

          {/* Messages */}
          <div style={{
            height: 320, overflowY: "auto", padding: "0.75rem",
            background: "#f9fafb", display: "flex", flexDirection: "column", gap: 8
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.from === "You" ? "flex-end" : "flex-start",
                background: m.from === "You" ? "#4f46e5" : "white",
                color: m.from === "You" ? "white" : "#111",
                padding: "0.5rem 0.85rem", borderRadius: 14, maxWidth: "85%",
                fontSize: 13, boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                lineHeight: 1.5
              }}>
                {m.from === "Bot" ? (
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                ) : (
                  m.text
                )}
              </div>
            ))}
            {loading && (
              <div style={{
                alignSelf: "flex-start", background: "white", padding: "0.5rem 0.85rem",
                borderRadius: 14, fontSize: 13, color: "#888"
              }}>
                Thinking...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            display: "flex", padding: "0.6rem", gap: 6,
            background: "white", borderTop: "1px solid #e5e7eb"
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ask a question..."
              style={{
                flex: 1, padding: "0.5rem 0.85rem", border: "1px solid #d1d5db",
                borderRadius: 20, outline: "none", fontSize: 13
              }}
            />
            <button onClick={sendMessage} disabled={loading} style={{
              padding: "0.5rem 1rem", background: "#4f46e5", color: "white",
              border: "none", borderRadius: 20, cursor: "pointer", fontSize: 13,
              opacity: loading ? 0.6 : 1
            }}>
              Send
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button onClick={() => setOpen(prev => !prev)} style={{
        width: 56, height: 56, borderRadius: "50%",
        background: "#4f46e5", color: "white", border: "none",
        fontSize: 26, cursor: "pointer", display: "flex",
        alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 16px rgba(79,70,229,0.5)"
      }}>
        {open ? "×" : "🎓"}
      </button>
    </div>
  );
}

 "use client";
import { useState } from "react";

export default function AIChat() {
  const [input, setInput] = useState(""); 
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    setLoading(true);
    setMessages((prev) => [...prev, `You: ${input}`]);
    try {
      // Placeholder for AI API call (e.g., OpenAI)
      // Replace with your API endpoint and key
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_OPENAI_API_KEY" // Replace with your key
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: input }],
        }),
      });
      const data = await response.json();
      const aiReply = data.choices?.[0]?.message?.content || "No response";
      setMessages((prev) => [...prev, `AI: ${aiReply}`]);
    } catch (err) {
      setMessages((prev) => [...prev, "AI: Error fetching response"]);
    }
    setInput("");
    setLoading(false);
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">AI Chat Demo</h1>
      <div className="space-y-2 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="text-gray-800">{msg}</div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="border px-3 py-2 rounded w-full"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
      <p className="mt-2 text-xs text-gray-500">(Replace API key in code for real AI responses)</p>
    </div>
  );
}

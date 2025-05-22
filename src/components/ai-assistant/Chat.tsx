"use client";
import { useState, useRef } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessages: Message[] = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.message || data.response || JSON.stringify(data) }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Sorry, I couldn't process your request." }]);
    }
    setLoading(false);
    setTimeout(() => {
      chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="flex flex-col h-full max-h-[500px] w-full border rounded shadow bg-white dark:bg-gray-800">
      <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`p-2 rounded ${msg.role === "user" ? "bg-blue-100 dark:bg-blue-900 self-end" : "bg-gray-100 dark:bg-gray-700 self-start"}`}>
            <span className="text-sm">{msg.content}</span>
          </div>
        ))}
        {loading && <div className="text-gray-400">Assistant is typing...</div>}
      </div>
      <form onSubmit={sendMessage} className="flex p-2 border-t bg-gray-50 dark:bg-gray-900">
        <input
          className="flex-1 p-2 rounded border mr-2 dark:bg-gray-700 dark:text-white"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask the assistant..."
          disabled={loading}
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" disabled={loading || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
} 
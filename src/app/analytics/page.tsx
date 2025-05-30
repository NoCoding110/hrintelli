"use client";
import { ChartBarIcon, UserGroupIcon, CurrencyDollarIcon, ArrowTrendingDownIcon, ClockIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { getLLMResponse, formatAnalyticsContext, Message } from "@/utils/llmService";

export default function AnalyticsPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I\'m your HR Analytics Assistant. Ask me anything about your HR metrics, trends, or predictions.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Example metrics (replace with real data from Supabase)
  const metrics = [
    {
      title: "Total Employees",
      value: 248,
      icon: <UserGroupIcon className="w-7 h-7 text-blue-500" />,
      description: "Current headcount",
    },
    {
      title: "Turnover Rate",
      value: "7.2%",
      icon: <ArrowTrendingDownIcon className="w-7 h-7 text-red-500" />,
      description: "Last 12 months",
    },
    {
      title: "Avg. Salary",
      value: "$92,400",
      icon: <CurrencyDollarIcon className="w-7 h-7 text-green-500" />,
      description: "Across all roles",
    },
    {
      title: "Avg. Hours/Week",
      value: "38.6",
      icon: <ClockIcon className="w-7 h-7 text-purple-500" />,
      description: "Time tracking",
    },
    {
      title: "Diversity Index",
      value: "0.68",
      icon: <ChartBarIcon className="w-7 h-7 text-yellow-500" />,
      description: "(0-1 scale)",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const context = formatAnalyticsContext(metrics);
      const response = await getLLMResponse([...messages, { role: 'user', content: userMessage }], context);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100">Analytics</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Key HR metrics and visualizations. Powered by AI insights.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {metrics.map((m, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-start">
              <div className="flex items-center gap-3 mb-2">{m.icon}<span className="text-lg font-semibold text-gray-700 dark:text-gray-200">{m.title}</span></div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{m.value}</div>
              <div className="text-xs text-gray-400">{m.description}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 min-h-[320px] flex flex-col">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Trends & Visualizations</h2>
          <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500 text-center">
            <div>
              <div className="mb-2">[Charts will appear here]</div>
              <div className="text-xs">Integrate Recharts or other visualizations for trends, breakdowns, and more.</div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 min-h-[320px] flex flex-col">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">AI Analytics Assistant</h2>
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-gray-900 dark:text-gray-100">
                    Thinking...
                  </div>
                </div>
              )}
              {error && (
                <div className="flex justify-start">
                  <div className="bg-red-100 dark:bg-red-900 rounded-lg p-3 text-red-700 dark:text-red-200">
                    {error}
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about HR metrics..."
                className="flex-1 p-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 
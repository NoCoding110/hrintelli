"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ArrowRightIcon, UserIcon, LockClosedIcon, SparklesIcon } from "@heroicons/react/24/outline";

const supabase = createClientComponentClient();
const DEMO_EMAIL = process.env.NEXT_PUBLIC_DEMO_EMAIL || "demo@yourapp.com";
const DEMO_PASSWORD = process.env.NEXT_PUBLIC_DEMO_PASSWORD || "demopassword123";

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else router.push("/dashboard");
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
    });
    setLoading(false);
    if (error) setError("Demo login failed. Please try again.");
    else router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col gap-6 border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col items-center gap-2 mb-2">
          <span className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow"><SparklesIcon className="w-7 h-7" /></span>
          <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300">Sign in to HR Intelli</h1>
          <p className="text-gray-500 dark:text-gray-400 text-center">Your all-in-one HR, analytics, and AI assistant platform.</p>
        </div>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-1"><UserIcon className="w-4 h-4" /> Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              className="p-3 rounded-lg border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-1"><LockClosedIcon className="w-4 h-4" /> Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              className="p-3 rounded-lg border bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing in..." : (<><ArrowRightIcon className="w-5 h-5" /> Sign In</>)}
          </button>
        </form>
        <div className="flex flex-col gap-2 mt-2">
          <button
            onClick={handleDemoLogin}
            className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold text-lg flex items-center justify-center gap-2 hover:bg-green-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in as Demo..." : (<><UserIcon className="w-5 h-5" /> Quick Demo Login</>)}
          </button>
        </div>
        {error && <div className="mt-2 text-red-500 text-center text-sm">{error}</div>}
        <div className="text-xs text-gray-400 text-center mt-4">&copy; {new Date().getFullYear()} Corentis HR. All rights reserved.</div>
      </div>
    </div>
  );
} 
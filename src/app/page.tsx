"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setLoading(false);
      if (user) {
        router.replace("/dashboard");
      }
    });
  }, [router]);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow w-full max-w-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-700 dark:text-blue-300">Welcome to HR Intelli</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-300">Your all-in-one HR, analytics, and AI assistant platform.</p>
        <button
          onClick={() => router.push("/auth")}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 text-lg font-semibold"
        >
          Sign In / Sign Up
        </button>
      </div>
    </div>
  );
}

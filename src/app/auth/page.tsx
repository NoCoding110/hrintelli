"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = createClientComponentClient();
const DEMO_EMAIL = process.env.NEXT_PUBLIC_DEMO_EMAIL || "demo@yourapp.com";
const DEMO_PASSWORD = process.env.NEXT_PUBLIC_DEMO_PASSWORD || "demopassword123";

export default function AuthPage() {
  const router = useRouter();
  const [demoLoading, setDemoLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.push("/dashboard");
      }
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleDemoLogin = async () => {
    setDemoLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
    });
    setDemoLoading(false);
    if (error) setError("Demo login failed. Please try again.");
    else router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded shadow">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={[]}
        />
        <div className="mt-6 flex flex-col gap-2">
          <button
            onClick={handleDemoLogin}
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 text-lg font-semibold w-full"
            disabled={demoLoading}
          >
            {demoLoading ? "Logging in as Demo..." : "Quick Demo Login"}
          </button>
          {error && <div className="mt-2 text-red-500 text-center">{error}</div>}
        </div>
      </div>
    </div>
  );
} 
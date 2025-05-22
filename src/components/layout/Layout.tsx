"use client";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-8 py-4 border-b bg-white dark:bg-gray-800">
          <div className="text-lg font-semibold text-gray-700 dark:text-gray-200">HR Intelli Dashboard</div>
          <ThemeToggle />
        </header>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
} 
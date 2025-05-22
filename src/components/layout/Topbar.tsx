"use client";
import ThemeToggle from "./ThemeToggle";
import { BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex-1 flex items-center gap-4">
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full max-w-md px-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <BellIcon className="w-6 h-6 text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
        </button>
        <button className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <UserCircleIcon className="w-8 h-8 text-blue-600 dark:text-blue-300" />
          <span className="hidden md:inline text-gray-700 dark:text-gray-200 font-medium">Demo User</span>
        </button>
      </div>
    </header>
  );
} 
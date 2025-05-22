"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Interviews", href: "/interviews" },
  { name: "Salary Ranges", href: "/salary" },
  { name: "Time Tracking", href: "/time-tracking" },
  { name: "Benefits", href: "/benefits" },
  { name: "Analytics", href: "/analytics" },
  { name: "Scenario Planning", href: "/scenario-planning" },
  { name: "AI Assistant", href: "/dashboard#ai" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="h-full w-64 bg-white dark:bg-gray-900 border-r flex flex-col p-4">
      <div className="text-2xl font-bold mb-8 text-blue-700 dark:text-blue-300">HR Intelli</div>
      <nav className="flex-1 space-y-2">
        {navItems.map(item => (
          <Link key={item.href} href={item.href} legacyBehavior>
            <a className={`block px-4 py-2 rounded transition font-medium ${pathname === item.href ? "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200" : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"}`}>{item.name}</a>
          </Link>
        ))}
      </nav>
    </aside>
  );
} 
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon, UserGroupIcon, BriefcaseIcon, CalendarIcon, ChartBarIcon, Cog6ToothIcon, AcademicCapIcon, CurrencyDollarIcon, UsersIcon, BuildingOffice2Icon, PuzzlePieceIcon, LightBulbIcon, Squares2X2Icon, ArrowTrendingUpIcon, ClipboardDocumentListIcon, SparklesIcon, ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";

const navSections = [
  {
    header: "CORE HR",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
      { name: "Recruitment", href: "/interviews", icon: UserGroupIcon },
      { name: "Employee Records", href: "/employee-records", icon: BriefcaseIcon },
      { name: "Leave Management", href: "/leave-management", icon: CalendarIcon },
      { name: "Performance", href: "/performance", icon: ChartBarIcon },
      { name: "Time & Attendance", href: "/time-tracking", icon: CalendarIcon },
    ],
  },
  {
    header: "DEVELOPMENT",
    items: [
      { name: "Training", href: "/training", icon: AcademicCapIcon },
      { name: "Compensation", href: "/salary", icon: CurrencyDollarIcon },
      { name: "Succession Management", href: "/succession-management", icon: UsersIcon },
    ],
  },
  {
    header: "ORGANIZATIONAL INTELLIGENCE",
    items: [
      { name: "Organizational Design", href: "/organizational-design", icon: BuildingOffice2Icon },
      { name: "Org Transformation", href: "/org-transformation", icon: PuzzlePieceIcon },
      { name: "Mergers & Acquisitions", href: "/mergers-acquisitions", icon: Squares2X2Icon },
      { name: "Operational Workforce", href: "/operational-workforce", icon: ArrowTrendingUpIcon },
      { name: "Strategic Workforce", href: "/strategic-workforce", icon: ClipboardDocumentListIcon },
      { name: "Activity Analysis", href: "/activity-analysis", icon: ChartBarIcon },
      { name: "Skills Analysis", href: "/skills-analysis", icon: SparklesIcon },
    ],
  },
  {
    header: "",
    items: [
      { name: "Analytics", href: "/analytics", icon: ChartBarIcon },
      { name: "Scenario Planning", href: "/scenario-planning", icon: LightBulbIcon },
      { name: "AI Assistant", href: "/dashboard#ai", icon: ChatBubbleLeftRightIcon },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="h-full w-72 bg-white dark:bg-gray-900 border-r flex flex-col p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">HR</div>
        <span className="text-2xl font-bold text-blue-700 dark:text-blue-300 tracking-tight">Corentis HR</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        {navSections.map(section => (
          <div key={section.header} className="mb-4">
            {section.header && <div className="text-xs font-semibold text-gray-400 px-2 mb-2 mt-4 uppercase tracking-wider">{section.header}</div>}
            <ul className="space-y-1">
              {section.items.map(item => {
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link href={item.href} legacyBehavior>
                      <a className={`flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium text-base ${pathname === item.href ? "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200" : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"}`}>
                        <Icon className="w-5 h-5" />
                        {item.name}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="mt-auto flex items-center justify-between px-2 pt-4 text-xs text-gray-400">
        <span>© {new Date().getFullYear()} Corentis HR</span>
        <Cog6ToothIcon className="w-5 h-5 cursor-pointer hover:text-blue-500" />
      </div>
    </aside>
  );
} 
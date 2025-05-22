"use client";
import { useState } from "react";
import { UserGroupIcon, ChartBarIcon, SparklesIcon, HeartIcon } from "@heroicons/react/24/outline";

export default function DashboardPage() {
  // Example metrics, replace with real data from Supabase as needed
  const [metrics] = useState({
    employees: 248,
    talentCoverage: 82,
    skillsAlignment: 76,
    orgHealth: 89,
  });

  // Example AI insights
  const aiInsights = [
    {
      text: "5 critical roles have high turnover risk based on our predictive model",
      link: "#",
      linkText: "View Risk Analysis",
    },
    {
      text: "Engineering team has a potential skill gap in cloud architecture",
      link: "#",
      linkText: "See Skills Analysis",
    },
    {
      text: "3 departments show suboptimal spans of control in org design",
      link: "#",
      linkText: "Optimize Structure",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100">HR Intelligence Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Welcome to your AI-powered HR hub. Strategic insights across your organization.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-2">
              <UserGroupIcon className="w-7 h-7 text-purple-400" />
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">Total Employees</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{metrics.employees}</div>
            <div className="text-xs text-gray-400">Across 10 business units</div>
            <div className="text-xs text-green-600 mt-1">+4.2% vs. last month</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-2">
              <ChartBarIcon className="w-7 h-7 text-purple-400" />
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">Talent Coverage</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{metrics.talentCoverage}%</div>
            <div className="text-xs text-gray-400">Critical roles with succession plans</div>
            <div className="text-xs text-green-600 mt-1">+7.5% vs. last month</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-2">
              <SparklesIcon className="w-7 h-7 text-purple-400" />
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">Skills Alignment</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{metrics.skillsAlignment}%</div>
            <div className="text-xs text-gray-400">Match to strategic needs</div>
            <div className="text-xs text-green-600 mt-1">+3.2% vs. last month</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-2">
              <HeartIcon className="w-7 h-7 text-purple-400" />
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">Organization Health</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{metrics.orgHealth}%</div>
            <div className="text-xs text-gray-400">Based on AI intelligence model</div>
            <div className="text-xs text-green-600 mt-1">+1.8% vs. last month</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col min-h-[300px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Organizational Design</h2>
            <button className="px-4 py-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded border border-blue-200 dark:border-blue-700 text-sm font-semibold">Open Designer</button>
          </div>
          <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500 text-center">
            <div>
              <div className="mb-2">Interactive organization chart will appear here</div>
              <div className="text-xs">Visualize your organization structure with AI-powered insights</div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col min-h-[300px]">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">AI Assistant Insights</h2>
          <div className="flex-1 flex flex-col gap-3">
            {aiInsights.map((insight, i) => (
              <div key={i} className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded p-3">
                <div className="text-gray-700 dark:text-gray-200 text-sm mb-1">{insight.text}</div>
                <a href={insight.link} className="text-blue-600 dark:text-blue-300 text-xs font-semibold hover:underline">{insight.linkText}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Add more dashboard sections as needed */}
    </div>
  );
} 
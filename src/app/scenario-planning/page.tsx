import { LightBulbIcon, UserGroupIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline";

export default function ScenarioPlanningPage() {
  const scenarios = [
    {
      title: "Succession Planning",
      icon: <UserGroupIcon className="w-7 h-7 text-blue-500" />,
      description: "Identify and prepare future leaders for key roles.",
    },
    {
      title: "What-if Analysis",
      icon: <LightBulbIcon className="w-7 h-7 text-yellow-500" />,
      description: "Model the impact of organizational changes.",
    },
    {
      title: "Org Restructuring",
      icon: <BuildingOffice2Icon className="w-7 h-7 text-green-500" />,
      description: "Simulate and plan new org structures.",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-1 text-gray-900 dark:text-gray-100">Scenario Planning</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Explore what-if scenarios, succession plans, and org design changes with AI support.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((s, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-start">
              <div className="flex items-center gap-3 mb-2">{s.icon}<span className="text-lg font-semibold text-gray-700 dark:text-gray-200">{s.title}</span></div>
              <div className="text-xs text-gray-400">{s.description}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 min-h-[320px] flex flex-col">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Scenario Tools</h2>
          <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500 text-center">
            <div>
              <div className="mb-2">[Interactive scenario planning tools coming soon]</div>
              <div className="text-xs">Visualize, simulate, and compare scenarios for your organization.</div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 min-h-[320px] flex flex-col">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">AI Scenario Assistant</h2>
          <div className="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-500 text-center">
            <div>
              <div className="mb-2">[AI-powered scenario Q&A coming soon]</div>
              <div className="text-xs">Ask questions like "What if we merge two departments?" or "Show succession risk for CTO role".</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
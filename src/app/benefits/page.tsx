"use client";
import dynamic from "next/dynamic";
const BenefitsTable = dynamic(() => import("@/components/benefits/BenefitsTable"), { ssr: false });

export default function BenefitsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Benefits Management</h1>
      <BenefitsTable />
    </div>
  );
} 
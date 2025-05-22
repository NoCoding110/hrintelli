import dynamic from "next/dynamic";
const SalaryRangesTable = dynamic(() => import("@/components/salary/SalaryRangesTable"), { ssr: false });

export default function SalaryPage() {
  return (
    <div>
      <SalaryRangesTable />
    </div>
  );
} 
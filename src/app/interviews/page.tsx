"use client";
import dynamic from "next/dynamic";
const InterviewTable = dynamic(() => import("@/components/interviews/InterviewTable"), { ssr: false });

export default function InterviewsPage() {
  return (
    <div>
      <InterviewTable />
    </div>
  );
} 
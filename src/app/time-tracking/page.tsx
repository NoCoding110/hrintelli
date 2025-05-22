"use client";
import dynamic from "next/dynamic";
const TimeTrackingTable = dynamic(() => import("@/components/time-tracking/TimeTrackingTable"), { ssr: false });

export default function TimeTrackingPage() {
  return (
    <div>
      <TimeTrackingTable />
    </div>
  );
} 
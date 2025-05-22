"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Benefit } from "@/types/benefit";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#2563eb", "#60a5fa", "#f59e42", "#10b981", "#f43f5e", "#a78bfa", "#fbbf24"];

export default function BenefitsTable() {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetchBenefits();
  }, []);

  async function fetchBenefits() {
    setLoading(true);
    const { data, error } = await supabase.from("benefits").select("*");
    if (error) setError(error.message);
    else setBenefits(data || []);
    setLoading(false);
  }

  const types = Array.from(new Set(benefits.map(b => b.benefit_type)));
  const statuses = Array.from(new Set(benefits.map(b => b.status)));
  const userIds = Array.from(new Set(benefits.map(b => b.user_id)));

  const filtered = benefits.filter(b =>
    (!type || b.benefit_type === type) &&
    (!status || b.status === status) &&
    (!userId || b.user_id === userId)
  );

  // Analytics
  const byType = types.map(t => ({ name: t, value: filtered.filter(b => b.benefit_type === t).length }));
  const byStatus = statuses.map(s => ({ name: s, value: filtered.filter(b => b.status === s).length }));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="type-select">Type</label>
          <select id="type-select" className="p-2 border rounded w-full" value={type} onChange={e => setType(e.target.value)}>
            <option value="">All</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="status-select">Status</label>
          <select id="status-select" className="p-2 border rounded w-full" value={status} onChange={e => setStatus(e.target.value)}>
            <option value="">All</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="user-select">User ID</label>
          <select id="user-select" className="p-2 border rounded w-full" value={userId} onChange={e => setUserId(e.target.value)}>
            <option value="">All</option>
            {userIds.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col">
          <h3 className="font-semibold mb-4 text-lg text-gray-800 dark:text-gray-100">Benefits by Type</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={byType} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {byType.map((entry, i) => <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col">
          <h3 className="font-semibold mb-4 text-lg text-gray-800 dark:text-gray-100">Benefits by Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={byStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {byStatus.map((entry, i) => <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm bg-white dark:bg-gray-800 rounded-xl shadow">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-2">User ID</th>
              <th className="p-2">Type</th>
              <th className="p-2">Provider</th>
              <th className="p-2">Enrollment Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id} className="border-b">
                <td className="p-2">{b.user_id}</td>
                <td className="p-2">{b.benefit_type}</td>
                <td className="p-2">{b.provider}</td>
                <td className="p-2">{b.enrollment_date?.slice(0, 10)}</td>
                <td className="p-2">{b.status}</td>
                <td className="p-2">{b.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
} 
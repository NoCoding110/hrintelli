"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { TimeLog } from "@/types/timeLog";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const emptyLog: Partial<TimeLog> = {
  user_id: "",
  date: "",
  check_in_time: "",
  check_out_time: "",
  break_duration_minutes: 0,
  total_hours: 0,
  status: "present",
};

export default function TimeTrackingTable() {
  const [logs, setLogs] = useState<TimeLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<Partial<TimeLog>>(emptyLog);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    setLoading(true);
    const { data, error } = await supabase.from("time_logs").select("*").order("date", { ascending: false });
    if (error) setError(error.message);
    else setLogs(data || []);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from("time_logs").insert([form]);
    setModalOpen(false);
    setSaving(false);
    fetchLogs();
  }

  // Analytics
  const totalHours = logs.reduce((sum, l) => sum + (l.total_hours || 0), 0);
  const avgHours = logs.length ? (totalHours / logs.length).toFixed(2) : "-";

  // Chart data: group by date
  const chartData = Object.values(
    logs.reduce((acc, log) => {
      if (!acc[log.date]) acc[log.date] = { date: log.date, total_hours: 0 };
      acc[log.date].total_hours += log.total_hours;
      return acc;
    }, {} as Record<string, { date: string; total_hours: number }>)
  ).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Time Tracking</h2>
        <button onClick={() => { setForm(emptyLog); setModalOpen(true); }} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Log</button>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Analytics</h3>
        <div className="flex gap-8 text-sm">
          <div>Total Hours: <span className="font-bold">{totalHours}</span></div>
          <div>Average Hours/Log: <span className="font-bold">{avgHours}</span></div>
        </div>
      </div>
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="date" stroke="#888" angle={-20} textAnchor="end" interval={0} height={60} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total_hours" stroke="#2563eb" name="Total Hours" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-2">Date</th>
              <th className="p-2">User</th>
              <th className="p-2">Check In</th>
              <th className="p-2">Check Out</th>
              <th className="p-2">Break (min)</th>
              <th className="p-2">Total Hours</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(l => (
              <tr key={l.id} className="border-b">
                <td className="p-2">{l.date}</td>
                <td className="p-2">{l.user_id}</td>
                <td className="p-2">{l.check_in_time}</td>
                <td className="p-2">{l.check_out_time}</td>
                <td className="p-2">{l.break_duration_minutes}</td>
                <td className="p-2">{l.total_hours}</td>
                <td className="p-2">{l.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-md space-y-4">
            <h3 className="text-lg font-bold mb-2">Add Time Log</h3>
            <div>
              <label className="block mb-1" htmlFor="date-input">Date</label>
              <input id="date-input" type="date" className="w-full p-2 border rounded" required value={form.date || ""} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </div>
            <div>
              <label className="block mb-1" htmlFor="user-id-input">User ID</label>
              <input id="user-id-input" className="w-full p-2 border rounded" required value={form.user_id || ""} onChange={e => setForm(f => ({ ...f, user_id: e.target.value }))} />
            </div>
            <div>
              <label className="block mb-1" htmlFor="check-in-input">Check In</label>
              <input id="check-in-input" type="time" className="w-full p-2 border rounded" required value={form.check_in_time || ""} onChange={e => setForm(f => ({ ...f, check_in_time: e.target.value }))} />
            </div>
            <div>
              <label className="block mb-1" htmlFor="check-out-input">Check Out</label>
              <input id="check-out-input" type="time" className="w-full p-2 border rounded" required value={form.check_out_time || ""} onChange={e => setForm(f => ({ ...f, check_out_time: e.target.value }))} />
            </div>
            <div>
              <label className="block mb-1" htmlFor="break-input">Break (min)</label>
              <input id="break-input" type="number" min={0} className="w-full p-2 border rounded" value={form.break_duration_minutes || 0} onChange={e => setForm(f => ({ ...f, break_duration_minutes: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="block mb-1" htmlFor="total-hours-input">Total Hours</label>
              <input id="total-hours-input" type="number" min={0} step={0.01} className="w-full p-2 border rounded" value={form.total_hours || 0} onChange={e => setForm(f => ({ ...f, total_hours: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="block mb-1" htmlFor="status-input">Status</label>
              <select id="status-input" className="w-full p-2 border rounded" value={form.status || "present"} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="remote">Remote</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded">Cancel</button>
              <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{saving ? "Saving..." : "Save"}</button>
            </div>
          </form>
        </div>
      )}
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
} 
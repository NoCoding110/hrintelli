"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { SalaryRange } from "@/types/salaryRange";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function SalaryRangesTable() {
  const [salaryRanges, setSalaryRanges] = useState<SalaryRange[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [department, setDepartment] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  useEffect(() => {
    fetchSalaryRanges();
  }, []);

  async function fetchSalaryRanges() {
    setLoading(true);
    const { data, error } = await supabase.from("job_salary_ranges").select("*");
    if (error) setError(error.message);
    else setSalaryRanges(data || []);
    setLoading(false);
  }

  const departments = Array.from(new Set(salaryRanges.map(s => s.department)));
  const jobTitles = Array.from(new Set(salaryRanges.filter(s => !department || s.department === department).map(s => s.job_title)));

  const filtered = salaryRanges.filter(s =>
    (!department || s.department === department) &&
    (!jobTitle || s.job_title === jobTitle)
  );

  // Analytics
  const avg = filtered.length ? (filtered.reduce((sum, s) => sum + s.median_salary, 0) / filtered.length).toFixed(2) : "-";
  const min = filtered.length ? Math.min(...filtered.map(s => s.minimum_salary)) : "-";
  const max = filtered.length ? Math.max(...filtered.map(s => s.maximum_salary)) : "-";

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
        <div>
          <label className="block mb-1" htmlFor="department-select">Department</label>
          <select id="department-select" className="p-2 border rounded w-full" value={department} onChange={e => { setDepartment(e.target.value); setJobTitle(""); }}>
            <option value="">All</option>
            {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
          </select>
        </div>
        <div>
          <label className="block mb-1" htmlFor="job-title-select">Job Title</label>
          <select id="job-title-select" className="p-2 border rounded w-full" value={jobTitle} onChange={e => setJobTitle(e.target.value)}>
            <option value="">All</option>
            {jobTitles.map(jt => <option key={jt} value={jt}>{jt}</option>)}
          </select>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Analytics</h3>
        <div className="flex gap-8 text-sm">
          <div>Average Median Salary: <span className="font-bold">{avg}</span></div>
          <div>Min Salary: <span className="font-bold">{min}</span></div>
          <div>Max Salary: <span className="font-bold">{max}</span></div>
        </div>
      </div>
      <div className="mb-8">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filtered} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="job_title" stroke="#888" angle={-20} textAnchor="end" interval={0} height={60} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="minimum_salary" fill="#60a5fa" name="Min" />
            <Bar dataKey="median_salary" fill="#2563eb" name="Median" />
            <Bar dataKey="maximum_salary" fill="#1e293b" name="Max" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-2">Department</th>
              <th className="p-2">Job Title</th>
              <th className="p-2">Min Salary</th>
              <th className="p-2">Median Salary</th>
              <th className="p-2">Max Salary</th>
              <th className="p-2">Currency</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id} className="border-b">
                <td className="p-2">{s.department}</td>
                <td className="p-2">{s.job_title}</td>
                <td className="p-2">{s.minimum_salary}</td>
                <td className="p-2">{s.median_salary}</td>
                <td className="p-2">{s.maximum_salary}</td>
                <td className="p-2">{s.currency}</td>
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
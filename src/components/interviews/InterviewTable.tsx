"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { Interview } from "@/types/interview";

const emptyInterview: Partial<Interview> = {
  applicant_id: "",
  interview_id: "",
  interview_date: "",
  interview_type: "",
  feedback: "",
  rating: 0,
  status: "scheduled",
};

export default function InterviewTable() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Interview | null>(null);
  const [form, setForm] = useState<Partial<Interview>>(emptyInterview);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchInterviews();
  }, []);

  async function fetchInterviews() {
    setLoading(true);
    const { data, error } = await supabase.from("interviews").select("*").order("interview_date", { ascending: false });
    if (error) setError(error.message);
    else setInterviews(data || []);
    setLoading(false);
  }

  function openAdd() {
    setEditing(null);
    setForm(emptyInterview);
    setModalOpen(true);
  }

  function openEdit(interview: Interview) {
    setEditing(interview);
    setForm(interview);
    setModalOpen(true);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this interview?")) return;
    await supabase.from("interviews").delete().eq("id", id);
    fetchInterviews();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    if (editing) {
      await supabase.from("interviews").update(form).eq("id", editing.id);
    } else {
      await supabase.from("interviews").insert([form]);
    }
    setModalOpen(false);
    setSaving(false);
    fetchInterviews();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Interviews</h2>
        <button onClick={openAdd} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Add Interview</button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Type</th>
                <th className="p-2">Applicant</th>
                <th className="p-2">Feedback</th>
                <th className="p-2">Rating</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((iv) => (
                <tr key={iv.id} className="border-b">
                  <td className="p-2">{iv.interview_date?.slice(0, 10)}</td>
                  <td className="p-2">{iv.interview_type}</td>
                  <td className="p-2">{iv.applicant_id}</td>
                  <td className="p-2">{iv.feedback}</td>
                  <td className="p-2">{iv.rating}</td>
                  <td className="p-2">{iv.status}</td>
                  <td className="p-2 space-x-2">
                    <button onClick={() => openEdit(iv)} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
                    <button onClick={() => handleDelete(iv.id)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-md space-y-4">
            <h3 className="text-lg font-bold mb-2">{editing ? "Edit Interview" : "Add Interview"}</h3>
            <div>
              <label className="block mb-1">Date</label>
              <input type="date" className="w-full p-2 border rounded" required value={form.interview_date?.slice(0,10) || ""} onChange={e => setForm(f => ({ ...f, interview_date: e.target.value }))} />
            </div>
            <div>
              <label className="block mb-1">Type</label>
              <input className="w-full p-2 border rounded" required value={form.interview_type || ""} onChange={e => setForm(f => ({ ...f, interview_type: e.target.value }))} />
            </div>
            <div>
              <label className="block mb-1">Applicant ID</label>
              <input className="w-full p-2 border rounded" required value={form.applicant_id || ""} onChange={e => setForm(f => ({ ...f, applicant_id: e.target.value }))} />
            </div>
            <div>
              <label className="block mb-1">Feedback</label>
              <input className="w-full p-2 border rounded" value={form.feedback || ""} onChange={e => setForm(f => ({ ...f, feedback: e.target.value }))} />
            </div>
            <div>
              <label className="block mb-1">Rating</label>
              <input type="number" min={0} max={10} className="w-full p-2 border rounded" value={form.rating || 0} onChange={e => setForm(f => ({ ...f, rating: Number(e.target.value) }))} />
            </div>
            <div>
              <label className="block mb-1">Status</label>
              <select className="w-full p-2 border rounded" value={form.status || "scheduled"} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded">Cancel</button>
              <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">{saving ? "Saving..." : "Save"}</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 
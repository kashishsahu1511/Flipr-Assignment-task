import React, { useState, useEffect } from "react";
import axios from "axios";

export default function NewsletterViewer() {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/newsletter", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setNewsletters(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching newsletters:", err);
      setError("Failed to fetch newsletter subscriptions");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this subscriber?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/newsletter/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      setNewsletters(newsletters.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Error deleting newsletter:", err);
      setError("Failed to remove subscriber");
    }
  };

  const filteredNewsletters = newsletters.filter((newsletter) =>
    newsletter.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    const emails = newsletters.map((n) => n.email).join("\n");
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(emails));
    element.setAttribute("download", "newsletter_emails.txt");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) return <div className="text-center py-8">Loading subscriptions...</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Newsletter Subscriptions</h2>
        <div className="flex gap-4">
          <span className="bg-blue-600 text-white px-4 py-2 rounded font-semibold">
            Total: {newsletters.length}
          </span>
          {newsletters.length > 0 && (
            <button
              onClick={handleExport}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold transition"
            >
              Export Emails
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Table */}
      {filteredNewsletters.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left font-bold">Email Address</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-bold">Subscribed Date</th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredNewsletters.map((newsletter) => (
                <tr key={newsletter._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 break-all">{newsletter.email}</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">
                    {new Date(newsletter.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(newsletter._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          {searchTerm ? "No emails match your search" : "No newsletter subscribers yet"}
        </div>
      )}
    </div>
  );
}

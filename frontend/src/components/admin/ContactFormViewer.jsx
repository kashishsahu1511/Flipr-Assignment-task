import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ContactFormViewer() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/contacts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setContacts(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setError("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      setContacts(contacts.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting contact:", err);
      setError("Failed to delete contact");
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center py-8">Loading contacts...</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Contact Form Responses</h2>
        <span className="bg-blue-600 text-white px-4 py-2 rounded font-semibold">
          Total: {contacts.length}
        </span>
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
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Table */}
      {filteredContacts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left font-bold">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-bold">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-bold">Phone</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-bold">City</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-bold">Submitted</th>
                <th className="border border-gray-300 px-4 py-2 text-center font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr key={contact._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3">{contact.name}</td>
                  <td className="border border-gray-300 px-4 py-3">{contact.email}</td>
                  <td className="border border-gray-300 px-4 py-3">{contact.phone}</td>
                  <td className="border border-gray-300 px-4 py-3">{contact.city}</td>
                  <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          {searchTerm ? "No contacts match your search" : "No contact form submissions yet"}
        </div>
      )}
    </div>
  );
}

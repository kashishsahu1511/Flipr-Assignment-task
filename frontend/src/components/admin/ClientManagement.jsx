import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ClientManagement() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    description: "",
    image: null,
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch clients
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/clients");
      setClients(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching clients:", err);
      setError("Failed to fetch clients");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("designation", formData.designation);
      data.append("description", formData.description);
      if (formData.image) {
        data.append("image", formData.image);
      }

      const response = await axios.post("http://localhost:5000/api/clients", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      setClients([...clients, response.data]);
      setFormData({ name: "", designation: "", description: "", image: null });
      setShowForm(false);
    } catch (err) {
      console.error("Error adding client:", err);
      setError(err.response?.data?.error || "Failed to add client");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this client?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      setClients(clients.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting client:", err);
      setError("Failed to delete client");
    }
  };

  if (loading) return <div className="text-center py-8">Loading clients...</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Client Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition"
        >
          {showForm ? "Cancel" : "Add Client"}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Client Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter client name"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                placeholder="e.g., CEO, Web Developer, Designer"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Description/Testimonial</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 h-24"
                placeholder="Enter client testimonial or description"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Client Image</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full px-4 py-2 border border-gray-300 rounded"
                accept="image/*"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 rounded transition"
            >
              {submitting ? "Adding..." : "Add Client"}
            </button>
          </div>
        </form>
      )}

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div key={client._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow">
            <div className="flex justify-center p-4">
              {client.image && (
                <img
                  src={client.image.startsWith("http") ? client.image : `http://localhost:5000${client.image}`}
                  alt={client.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-200"
                />
              )}
            </div>
            <div className="p-4 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-1">{client.name}</h3>
              <p className="text-blue-600 font-semibold mb-3">{client.designation}</p>
              <p className="text-gray-600 text-sm mb-4">{client.description}</p>
              <button
                onClick={() => handleDelete(client._id)}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {clients.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No clients found. Add your first client!
        </div>
      )}
    </div>
  );
}

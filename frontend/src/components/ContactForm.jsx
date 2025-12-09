import React, { useState } from "react";
import axios from "axios";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      // Validation
      if (!formData.name || !formData.email || !formData.phone || !formData.city) {
        setError("All fields are required");
        setLoading(false);
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
      }

      // Phone validation (basic)
      if (formData.phone.length < 10) {
        setError("Please enter a valid phone number");
        setLoading(false);
        return;
      }

      console.log("Submitting form data:", formData);

      const response = await axios.post(
        "http://localhost:5000/api/contacts",
        formData
      );

      console.log("Form submitted successfully:", response.data);

      setMessage("Thank you! Your inquiry has been submitted successfully.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(err.response?.data?.error || "Error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Form Container */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Get a Free Consultation
            </h2>

            {/* Success Message */}
            {message && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                {message}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:border-orange-500 transition"
                required
              />

              {/* Email */}
              <input
                type="email"
                name="email"
                placeholder="Enter Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:border-orange-500 transition"
                required
              />

              {/* Phone */}
              <input
                type="tel"
                name="phone"
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:border-orange-500 transition"
                required
              />

              {/* City */}
              <input
                type="text"
                name="city"
                placeholder="Area, City"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:border-orange-500 transition"
                required
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-500 text-white font-bold py-3 px-4 rounded transition duration-200"
              >
                {loading ? "Submitting..." : "Get Quick Quote"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

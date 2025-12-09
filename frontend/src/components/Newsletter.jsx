import React, { useState } from "react";
import axios from "axios";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      // Validation
      if (!email) {
        setError("Email is required");
        setLoading(false);
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
      }

      console.log("Subscribing email:", email);

      const response = await axios.post(
        "http://localhost:5000/api/newsletter/subscribe",
        { email }
      );

      console.log("Newsletter subscription successful:", response.data);
      setMessage("Successfully subscribed to our newsletter!");
      setEmail("");
    } catch (err) {
      console.error("Error subscribing to newsletter:", err);
      setError(
        err.response?.data?.error ||
          "Error subscribing to newsletter. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-500 py-12 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Side - Navigation Links */}
          <div className="flex gap-6 md:gap-8 text-white text-sm md:text-base font-semibold flex-wrap justify-center md:justify-start">
            <a href="#home" className="hover:text-blue-200 transition">
              Home
            </a>
            <a href="#services" className="hover:text-blue-200 transition">
              Services
            </a>
            <a href="#projects" className="hover:text-blue-200 transition">
              Projects
            </a>
            <a href="#testimonials" className="hover:text-blue-200 transition">
              Testimonials
            </a>
            <a href="#contact" className="hover:text-blue-200 transition">
              Contact
            </a>
          </div>

          {/* Right Side - Newsletter Subscription */}
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto justify-center md:justify-end">
            <label className="text-white text-sm md:text-base font-semibold self-center md:self-auto">
              Subscribe Us
            </label>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={handleChange}
                className="px-4 py-2 rounded text-sm text-gray-900 placeholder-gray-500 flex-grow md:flex-grow-0 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-white hover:bg-gray-100 disabled:bg-gray-400 text-blue-600 font-bold py-2 px-6 rounded transition duration-200 whitespace-nowrap text-sm"
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Status Messages */}
        {message && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-center text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-center text-sm">
            {error}
          </div>
        )}
      </div>
    </section>
  );
}

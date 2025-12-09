import { useState } from "react";
import axios from "axios";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      if (!email) {
        setError("Email is required");
        setLoading(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
      }

      await axios.post("http://localhost:5000/api/newsletter/subscribe", { email });
      setMessage("Successfully subscribed!");
      setEmail("");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Error subscribing. Please try again.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Real Trust</h2>
            <p className="text-blue-100 text-sm leading-relaxed">
              Your trusted partner for consultation, design, and marketing solutions.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-blue-100 hover:text-white transition text-2xl">f</a>
              <a href="#" className="text-blue-100 hover:text-white transition text-2xl">𝕏</a>
              <a href="#" className="text-blue-100 hover:text-white transition text-2xl">in</a>
              <a href="#" className="text-blue-100 hover:text-white transition text-2xl">📷</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3 text-blue-100 text-sm">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="#services" className="hover:text-white transition">Services</a></li>
              <li><a href="/projects" className="hover:text-white transition">Projects</a></li>
              <li><a href="#testimonials" className="hover:text-white transition">Testimonials</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Services</h3>
            <ul className="space-y-3 text-blue-100 text-sm">
              <li><a href="#" className="hover:text-white transition">Consultation</a></li>
              <li><a href="#" className="hover:text-white transition">Design</a></li>
              <li><a href="#" className="hover:text-white transition">Marketing</a></li>
              <li><a href="#" className="hover:text-white transition">Support</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6">Newsletter</h3>
            <p className="text-blue-100 text-sm mb-4">
              Subscribe to get the latest updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-500 text-white font-bold py-2 px-4 rounded-lg transition text-sm"
              >
                {loading ? "..." : "Subscribe"}
              </button>
            </form>
            {message && <p className="text-green-300 text-xs mt-2">{message}</p>}
            {error && <p className="text-red-300 text-xs mt-2">{error}</p>}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-blue-100 text-sm">
            <p>© 2024 Real Trust. All Rights Reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

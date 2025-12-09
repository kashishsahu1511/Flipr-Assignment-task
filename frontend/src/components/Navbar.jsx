export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50\">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">Real Trust</h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex gap-8 items-center">
            <a href="/" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Home
            </a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Services
            </a>
            <a href="/projects" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Projects
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Testimonials
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded transition">
            CONTACT
          </button>
        </div>
      </div>
    </nav>
  );
}

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4 inline-block pb-4 border-b-4 border-orange-500">
            About Us
          </h2>
          <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            Learn more about our team and our mission to deliver excellence.
          </p>
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left - Text */}
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Who We Are</h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Real Trust is a leading firm specializing in consultation, design, and marketing services. With over a decade of experience, we've helped hundreds of businesses transform their vision into reality.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Our team of experts combines creativity, innovation, and strategic thinking to deliver results that exceed expectations. We believe in building long-term partnerships with our clients based on trust and excellence.
            </p>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center gap-3">
                <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">✓</span>
                Expert Team with Industry Experience
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">✓</span>
                100+ Successful Projects Delivered
              </li>
              <li className="flex items-center gap-3">
                <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">✓</span>
                Client Satisfaction Guaranteed
              </li>
            </ul>
          </div>

          {/* Right - Stats */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-orange-500">
              <h4 className="text-4xl font-bold text-blue-600 mb-2">500+</h4>
              <p className="text-gray-700 font-semibold">Clients Served</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-blue-600">
              <h4 className="text-4xl font-bold text-blue-600 mb-2">1000+</h4>
              <p className="text-gray-700 font-semibold">Projects Completed</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-orange-500">
              <h4 className="text-4xl font-bold text-blue-600 mb-2">15+</h4>
              <p className="text-gray-700 font-semibold">Years Experience</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center border-t-4 border-blue-600">
              <h4 className="text-4xl font-bold text-blue-600 mb-2">98%</h4>
              <p className="text-gray-700 font-semibold">Client Retention</p>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Sarah Johnson", role: "Lead Consultant", image: "https://i.pravatar.cc/150?u=sarah" },
              { name: "Michael Chen", role: "Design Director", image: "https://i.pravatar.cc/150?u=michael" },
              { name: "Emma Williams", role: "Marketing Strategist", image: "https://i.pravatar.cc/150?u=emma" },
              { name: "David Martinez", role: "Project Manager", image: "https://i.pravatar.cc/150?u=david" }
            ].map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6 overflow-hidden rounded-lg shadow-lg h-64">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h4>
                <p className="text-orange-500 font-semibold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
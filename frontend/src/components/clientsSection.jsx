import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ClientsSection() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        console.log("Fetching clients from API...");
        const res = await axios.get("http://localhost:5000/api/clients");
        console.log("Clients fetched:", res.data);
        setClients(res.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching clients:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <h2 className="text-center text-4xl font-bold mb-12">Happy Clients</h2>
        <p className="text-center text-gray-600">Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <h2 className="text-center text-4xl font-bold mb-12">Happy Clients</h2>
        <p className="text-center text-red-600">Error: {error}</p>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4 inline-block pb-4 border-b-4 border-orange-500">
            Happy Clients
          </h2>
          <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            Our clients trust us to deliver exceptional results. Here are testimonials from our satisfied customers.
          </p>
        </div>

        {clients.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No clients found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {clients.map((client, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 p-8 text-center border-t-4 border-orange-500"
              >
                {/* Client Image */}
                <div className="flex justify-center mb-6">
                  <img
                    src={client.image}
                    className="w-24 h-24 rounded-full border-4 border-orange-500 shadow-md object-cover"
                    alt={client.name}
                    onError={(e) => {e.target.src = `https://ui-avatars.com/api/?name=${client.name}&background=random`}}
                  />
                </div>

                {/* Testimonial */}
                <p className="text-gray-700 text-sm leading-relaxed mb-6 h-24 overflow-y-auto">
                  "{client.description}"
                </p>

                {/* Client Info */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-gray-800">{client.name}</h3>
                  <p className="text-orange-500 font-semibold text-sm mt-2">{client.designation}</p>
                </div>

                {/* Stars */}
                <div className="mt-4 flex justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

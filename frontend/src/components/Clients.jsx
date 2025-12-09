import { useEffect, useState } from "react";
import axios from "axios";

export default function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/clients")
      .then(res => setClients(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-center text-4xl font-bold mb-12">Happy Clients</h2>

      <div className="grid grid-cols-5 gap-6 px-20">
        {clients.map((client, index) => (
          <div key={index} className="bg-white p-8 rounded-2xl shadow-lg relative text-center">
            <img
              src={client.image}
              alt={client.name}
              className="w-20 h-20 rounded-full mx-auto -mt-14 border-4 border-white shadow"
            />

            <p className="text-gray-600 mt-4">{client.description}</p>

            <h3 className="text-lg font-bold mt-4">{client.name}</h3>
            <p className="text-sm text-blue-600">{client.designation}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

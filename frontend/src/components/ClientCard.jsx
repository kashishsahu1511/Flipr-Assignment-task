export default function ClientCard({ client }) {
  return (
    <div className="relative w-64 bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-all">

      {/* Profile Image */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        <img
          src={client.image}
          alt={client.name}
          className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="mt-10">
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {client.description}
        </p>

        <h3 className="text-blue-600 font-semibold text-lg">
          {client.name}
        </h3>

        <p className="text-gray-500 text-sm mt-1">
          {client.designation}
        </p>
      </div>
    </div>
  );
}

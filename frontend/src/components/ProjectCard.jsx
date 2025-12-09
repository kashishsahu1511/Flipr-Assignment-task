export default function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 overflow-hidden group">
      {/* Image Container */}
      <div className="relative overflow-hidden h-56 bg-gray-200">
        <img 
          src={project.image} 
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          alt={project.title}
          onError={(e) => {e.target.src = "https://via.placeholder.com/400x300?text=Project"}}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
          {project.title}
        </h3>

        <p className="text-gray-600 text-sm mb-6 line-clamp-3 h-16">
          {project.description}
        </p>

        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:translate-y-[-2px] shadow-md hover:shadow-lg">
          READ MORE
        </button>
      </div>
    </div>
  );
}

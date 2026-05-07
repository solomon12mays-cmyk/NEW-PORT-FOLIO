import { useEffect, useState } from 'react';
import { getProjects } from '../../services/projectService';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProjects(category ? { category } : {})
      .then(res => setProjects(res.data.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-white drop-shadow">
          Projects
        </h1>

        {/* Filter Buttons */}
        <div className="flex gap-3 justify-center mb-12 flex-wrap">
          {['', 'web', 'ai', 'ml', 'fullstack'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full transition-all backdrop-blur-sm border border-white/30 ${
                category === cat
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {cat || 'All'}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-white">Loading...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.slug}`}
                className="group bg-white/10 dark:bg-gray-800/40 backdrop-blur-sm 
                         rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
                         transition-all duration-300 hover:-translate-y-2 
                         border border-white/20"
              >
                <div className={`h-2 ${
                  project.category === 'ai' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                  project.category === 'ml' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                  project.category === 'web' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                  'bg-gradient-to-r from-orange-500 to-yellow-500'
                }`}></div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                      project.category === 'ai' ? 'bg-purple-500/30 text-purple-200' :
                      project.category === 'ml' ? 'bg-blue-500/30 text-blue-200' :
                      'bg-green-500/30 text-green-200'
                    }`}>
                      {project.category.toUpperCase()}
                    </span>
                    {project.accuracy && (
                      <span className="px-3 py-1 text-xs rounded-full font-medium 
                                     bg-orange-500/30 text-orange-200">
                        {project.accuracy}%
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-white 
                               group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-4 flex items-center text-blue-300 text-sm font-medium">
                    View Project 
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
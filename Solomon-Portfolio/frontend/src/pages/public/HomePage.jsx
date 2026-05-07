import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProjects } from '../../services/projectService';
import { FaArrowRight, FaDownload, FaGithub, FaLinkedin, FaCode, FaBrain, FaServer } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

const HomePage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getFeaturedProjects()
      .then(res => setProjects(res.data.data))
      .catch(() => {});
  }, []);

  const techStack = [
    { icon: <FaCode className="text-3xl" />, name: 'Frontend', tech: 'React, Tailwind' },
    { icon: <FaServer className="text-3xl" />, name: 'Backend', tech: 'Laravel, PHP' },
    { icon: <FaBrain className="text-3xl" />, name: 'AI/ML', tech: 'Python, TensorFlow' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                            bg-blue-600/40 text-white text-sm mb-6 border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Available for Internship
              </div>

                           <div className="inline-block pl-5 mb-4 relative
                            before:content-[''] before:absolute before:left-0 before:top-0 
                            before:h-full before:w-1 before:rounded-full
                            before:bg-gradient-to-b before:from-blue-500 before:via-purple-500 before:to-pink-500
                            before:animate-pulse">
                <p className="text-blue-300 text-lg font-light tracking-wider">
                  Hi, I'm
                </p>
                <h1 className="text-4xl md:text-7xl font-extrabold text-white">
                  Solomon
                </h1>
              </div>
              <div className="text-xl md:text-2xl text-gray-200 mb-2 h-10 drop-shadow">
                <TypeAnimation
                  sequence={[
                    'Full Stack Developer',
                    2000,
                    'AI/ML Model Developer',
                    2000,
                    'CS Student @ DBU',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </div>

              <p className="text-lg text-gray-200 mb-8 max-w-lg leading-relaxed drop-shadow-md">
                Building innovative web solutions and AI models from Debre Birhan, Ethiopia. 
                Passionate about creating technology that makes a difference.
              </p>

              <div className="flex gap-4 flex-wrap">
                <Link
                  to="/projects"
                  className="group px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                           transition-all flex items-center gap-2 shadow-lg shadow-blue-500/25
                           hover:shadow-blue-500/40 hover:-translate-y-0.5"
                >
                  View My Work
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="/cv.pdf"
                  download="Solomon_Alemayehu_CV.pdf"
                  className="px-6 py-3 border-2 border-white/50 text-white rounded-xl 
                           hover:bg-white/20 hover:border-white/80
                           transition-all flex items-center gap-2 backdrop-blur-sm"
                >
                  <FaDownload /> Download CV
                </a>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-8">
                <a href="https://github.com/Solomon-21may" target="_blank" 
                   className="text-white/70 hover:text-white text-2xl transition-colors">
                  <FaGithub />
                </a>
                <a href="#" className="text-white/70 hover:text-white text-2xl transition-colors">
                  <FaLinkedin />
                </a>
              </div>
            </div>

            {/* Right - Profile Photo */}
            <div className="hidden md:flex justify-center">
              <div className="w-72 h-72 rounded-full overflow-hidden shadow-2xl 
                            border-2 border-white/30">
                <img 
                  src="/profile.jpg" 
                  alt="Solomon Alemayehu"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-6">
            {techStack.map((item) => (
              <div key={item.name} 
                   className="text-center p-6 bg-white/10 dark:bg-gray-800/40 backdrop-blur-sm 
                            rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 
                            transition-all border border-white/20">
                <div className="text-blue-400 mb-3 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="font-bold text-white">{item.name}</h3>
                <p className="text-sm text-gray-300">{item.tech}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {projects.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow">
                Featured Projects
              </h2>
              <p className="text-gray-200 max-w-2xl mx-auto drop-shadow">
                A selection of my recent work in web development and AI/ML
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
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

            <div className="text-center mt-12">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white/20 
                         text-white rounded-xl hover:bg-white/30 backdrop-blur-sm
                         transition-all font-medium border border-white/30"
              >
                View All Projects <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow">
            Let's Work Together
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            I'm currently looking for internship and freelance opportunities. 
            If you have a project in mind, let's make it happen!
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 
                     rounded-xl hover:bg-gray-100 transition-all font-bold text-lg 
                     shadow-lg hover:shadow-xl"
          >
            Get In Touch <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
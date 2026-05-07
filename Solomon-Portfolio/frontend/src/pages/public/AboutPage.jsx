import { motion } from 'framer-motion';
import { FaUser, FaGraduationCap, FaMapMarkerAlt, FaCalendar, FaCode } from 'react-icons/fa';

const AboutPage = () => {
  const details = [
    { icon: <FaGraduationCap />, label: 'University', value: 'Debre Birhan University' },
    { icon: <FaCalendar />, label: 'Year', value: '3rd Year Student' },
    { icon: <FaCode />, label: 'Field', value: 'Computer Science' },
    { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Ethiopia' },
  ];

  const skills = ['Full Stack Development', 'AI/ML Models', 'API Development', 'Database Design', 'UI/UX Design'];

  return (
    <div className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About Me
        </motion.h1>
        
        {/* Profile - Outside card */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 
                        border-2 border-gray-300 dark:border-white/20 shadow-lg">
            <img 
              src="/profile.jpg" 
              alt="Solomon Alemayehu"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Solomon Alemayehu
          </h2>
          <p className="text-blue-600 dark:text-blue-400 text-sm mb-4">
            Full Stack Developer & AI/ML Engineer
          </p>
          <a
            href="/cv.pdf"
            download
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-full 
                     hover:bg-blue-700 transition-all text-sm"
          >
            Download CV
          </a>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Who I Am */}
          <motion.div 
            className="bg-white/80 dark:bg-gray-800/40 backdrop-blur-sm 
                      rounded-2xl p-8 border border-gray-200 dark:border-white/20 shadow-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white mb-4">
              <FaUser className="text-blue-500" /> Who I Am
            </h3>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-4">
              I'm a passionate <span className="text-blue-600 dark:text-blue-300 font-semibold">Computer Science student</span> at 
              <span className="text-gray-900 dark:text-white font-semibold"> Debre Birhan University</span>, Ethiopia. 
              I specialize in building modern web applications and exploring the exciting world of 
              Artificial Intelligence and Machine Learning.
            </p>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              My goal is to become a skilled <span className="text-purple-600 dark:text-purple-300 font-semibold">full-stack developer</span> and 
              <span className="text-pink-600 dark:text-pink-300 font-semibold"> AI engineer</span>, creating innovative solutions 
              that solve real-world problems in Ethiopia and beyond.
            </p>
          </motion.div>

          {/* One Card - Everything with Tooltip */}
          <motion.div 
            className="bg-white/80 dark:bg-gray-800/40 backdrop-blur-sm 
                      rounded-2xl p-6 border border-gray-200 dark:border-white/20 shadow-md"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Detail Items */}
            <div className="space-y-3 mb-6">
              {details.map((detail, index) => (
                <motion.div
                  key={detail.label}
                  className="group relative flex items-center gap-3 p-3 rounded-xl
                           hover:bg-gray-100 dark:hover:bg-white/5 transition-all cursor-default"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <span className="text-blue-500 dark:text-blue-400 text-lg shrink-0">{detail.icon}</span>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs uppercase">{detail.label}</p>
                    <p className="text-gray-900 dark:text-white font-medium text-sm">{detail.value}</p>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 
                                bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs 
                                rounded-lg opacity-0 group-hover:opacity-100 transition-opacity 
                                whitespace-nowrap pointer-events-none shadow-lg">
                    {detail.label}: {detail.value}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 
                                  border-4 border-transparent border-t-gray-900 dark:border-t-white"></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-white/10 mb-4"></div>

            {/* What I Do */}
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">What I Do</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  className="group relative px-3 py-1.5 bg-gray-100 dark:bg-white/10 
                           rounded-full text-gray-700 dark:text-gray-200 text-xs 
                           border border-gray-200 dark:border-white/10
                           hover:bg-blue-50 dark:hover:bg-blue-500/10 
                           hover:border-blue-300 dark:hover:border-blue-500/30
                           cursor-default transition-all"
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                  {/* Tooltip */}
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 
                                 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs 
                                 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity 
                                 whitespace-nowrap pointer-events-none">
                    {skill}
                  </span>
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
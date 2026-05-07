import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* 404 Number */}
        <motion.h1 
          className="text-8xl md:text-9xl font-black text-white/20 select-none"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          404
        </motion.h1>
        
        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white 
                     rounded-xl hover:bg-blue-700 transition-all shadow-lg"
          >
            <FaHome /> Go Home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white 
                     rounded-xl hover:bg-white/20 border border-white/20 transition-all"
          >
            <FaSearch /> Contact Me
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
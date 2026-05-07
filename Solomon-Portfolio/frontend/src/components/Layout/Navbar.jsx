import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' },
     { name: 'Chat', path: '/chat' },
  ];

  return (
    <nav className="fixed w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Solomon<span className="text-purple-600 dark:text-purple-400">.</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 
                           dark:hover:text-blue-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 
                         text-gray-800 dark:text-gray-200 hover:bg-gray-300 
                         dark:hover:bg-gray-600 transition-all text-xl"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          <button
            className="md:hidden text-2xl text-gray-700 dark:text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block py-3 text-gray-700 dark:text-gray-300"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                toggleDarkMode();
                setIsOpen(false);
              }}
              className="mt-3 w-full text-left px-4 py-3 rounded-lg 
                         bg-gray-200 dark:bg-gray-700 text-xl"
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
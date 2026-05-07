import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://github.com/Solomon-21may" target="_blank" rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 text-2xl">
            <FaGithub />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 text-2xl">
            <FaLinkedin />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 text-2xl">
            <FaTwitter />
          </a>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Solomon Alemayehu. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
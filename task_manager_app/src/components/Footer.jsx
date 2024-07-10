import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column 1: Task Manager Info */}
          <div className="text-center md:text-center">
            <h2 className="text-xl font-bold mb-2">Task Manager</h2>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in velit consectetur, euismod turpis sed, imperdiet urna.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="text-center md:text-center">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm">
              <li className="mb-2"><a href="/" className="hover:text-gray-300">Home</a></li>
              <li className="mb-2"><a href="/tasks" className="hover:text-gray-300">Tasks</a></li>
              <li className="mb-2"><a href="/profile" className="hover:text-gray-300">Profile</a></li>
              <li className="mb-2"><a href="/login" className="hover:text-gray-300">Login</a></li>
              <li className="mb-2"><a href="/register" className="hover:text-gray-300">Register</a></li>
            </ul>
          </div>
          
          {/* Column 3: Links to Portfolio, GitHub, LinkedIn */}
          <div className="text-center md:text-center">
            <h3 className="text-lg font-semibold mb-2">Connect with Me</h3>
            <ul className="text-sm">
              <li className="mb-2"><a href="/portfolio" className="hover:text-gray-300">Portfolio</a></li>
              <li className="mb-2"><a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">GitHub</a></li>
              <li className="mb-2"><a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-4 text-center md:text-center">
          <p className="text-sm">&copy; 2024 Task Manager. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

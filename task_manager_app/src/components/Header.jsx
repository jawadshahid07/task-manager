import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router for navigation

export const Header = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          Task Manager
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/tasks" className="hover:text-gray-300">Tasks</Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-gray-300">Profile</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </li>
            {/* Add more navigation links as needed */}
          </ul>
        </nav>
      </div>
    </header>
  );
};
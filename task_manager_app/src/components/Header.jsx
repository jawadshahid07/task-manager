import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
    <header className="p-5 bg-gray-800 text-white shadow md:flex md:items-center md:justify-between">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" className="text-2xl">
            Task Manager
        </Link>
        <div className="md:hidden">
            <button onClick={toggleMenu}>
            {isOpen ? (
                <XIcon className="h-6 w-6 text-white" />
            ) : (
                <MenuIcon className="h-6 w-6 text-white" />
            )}
            </button>
        </div>
        <nav className={`md:flex md:items-center ${isOpen ? 'block' : 'hidden'}`}>
            <ul className="flex space-x-4 md:flex md:items-center z-[-1] md:z-auto md:static absolute bg-gray-800 w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-alll ease-in duration-500">
            <li className="mx-4 my-6 md:my-0">
                <Link to="/" className="hover:text-gray-300 duration-500">Home</Link>
            </li>
            <li className="mx-4 my-6 md:my-0">
                <Link to="/tasks" className="hover:text-gray-300 duration-500">Tasks</Link>
            </li>
            <li className="mx-4 my-6 md:my-0">
                <Link to="/profile" className="hover:text-gray-300 duration-500">Profile</Link>
            </li>
            <li className="mx-4 my-6 md:my-0">
                <Link to="/login" className="hover:text-gray-300 duration-500">Login</Link>
            </li>
            <li className="mx-4 my-6 md:my-0">
                <Link to="/register" className="hover:text-gray-300 duration-500">Register</Link>
            </li>

            <button className="bg-gray-900 text-gray-300 duration-500 px-6 py-2 mx-4 hover:bg-gray-700 rounded">Get Started</button>
            </ul>
        </nav>
        </div>
    </header>
    );
};

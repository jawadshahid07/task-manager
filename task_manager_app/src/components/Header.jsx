import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(true);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="p-1 bg-gray-800 text-white shadow md:flex md:items-center md:justify-between">
            <div className="px-2 py-1 flex justify-between items-center w-full mx-6">
                <Link to="/" className="text-xl"> 
                    Task Manager
                </Link>
                <div className="ml-auto md:hidden">
                    <button onClick={toggleMenu}>
                        {isOpen ? (
                            <XIcon className="h-6 w-6 text-white" />
                        ) : (
                            <MenuIcon className="h-6 w-6 text-white" />
                        )}
                    </button>
                </div>
            </div>
            <nav className={`md:flex md:items-center md:justify-between bg-gray-800 md:bg-transparent md:static absolute left-0 w-full md:w-auto py-2 md:py-0 transition-all ease-in-out duration-500 ${isOpen ? 'block opacity-100 top-16' : 'hidden opacity-0 top-[-400px]'}`}
                style={{
                    maxHeight: '100vh',
                    left: isOpen ? '0' : '-9999px',
                    width: '100%',
                    textAlign: isOpen ? 'left' : 'center',
                    padding: isOpen ? '16px 24px' : '0', 
                    top: '40px',
                }}>
                <ul className="md:flex md:items-center md:justify-between">
                    <li className="md:mx-2 my-2 md:my-0"> 
                        <Link to="/" className="block md:inline-block px-2 hover:text-gray-300 duration-500">Home</Link>
                    </li>
                    <li className="md:mx-2 my-2 md:my-0">
                        <Link to="/tasks" className="block md:inline-block px-2 hover:text-gray-300 duration-500">Tasks</Link>
                    </li>
                    <li className="md:mx-2 my-2 md:my-0">
                        <Link to="/profile" className="block md:inline-block px-2 hover:text-gray-300 duration-500">Profile</Link>
                    </li>
                    <li className="md:mx-2 my-2 md:my-0">
                        <Link to="/login" className="block md:inline-block px-2 hover:text-gray-300 duration-500">Login</Link>
                    </li>
                    <li className="md:mx-2 my-2 md:my-0">
                        <Link to="/register" className="block md:inline-block px-2 hover:text-gray-300 duration-500">Register</Link>
                    </li>
                    <li className="md:mx-2 my-2 md:my-0">
                        <button className="block md:inline-block bg-gray-900 text-gray-300 duration-500 px-2 py-2 mx-2 hover:bg-gray-700 rounded width-100 md:w-auto">Get Started</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

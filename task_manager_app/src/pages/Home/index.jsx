import React from 'react';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Task Manager</h1>
        <p className="text-lg text-gray-600">Your ultimate tool for task management</p>
      </header>
      <main className="mt-8 flex flex-col items-center">
        <section className="max-w-md bg-white shadow-md rounded-lg overflow-hidden mx-4">
          <h2 className="text-xl font-bold text-gray-800 bg-gray-200 py-2 px-4">Features</h2>
          <ul className="p-4">
            <li className="text-gray-700">User Authentication</li>
            <li className="text-gray-700">Task Management</li>
            <li className="text-gray-700">Notifications and Reminders</li>
            <li className="text-gray-700">Team Collaboration</li>
          </ul>
        </section>
        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800">Get Started</h2>
          <p className="text-lg text-gray-600 mb-4">Sign up or log in to start managing your tasks today!</p>
          <div className="flex">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4">
              Sign Up
            </button>
            <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
              Log In
            </button>
          </div>
        </section>
      </main>
      <footer className="mt-8 text-gray-600 text-sm">
        <p>&copy; 2024 Task Manager. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
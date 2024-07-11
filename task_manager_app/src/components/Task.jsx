import React, { useState } from 'react';
import { DotsHorizontalIcon } from '@heroicons/react/outline';

const Task = ({ task, onEdit, onDelete, onComplete }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const taskStatusColor = task.completed
    ? 'bg-green-500'
    : task.date < today
    ? 'bg-red-500'
    : 'bg-yellow-500';

  // Ensure task.priority is defined; if not, default to 'medium'
  const priority = {
    low: {
      text: 'LOW PRIORITY',
      color: 'text-black',
      arrows: '>'
    },
    medium: {
      text: 'MEDIUM PRIORITY',
      color: 'text-yellow-500',
      arrows: '>>'
    },
    high: {
      text: 'HIGH PRIORITY',
      color: 'text-red-500',
      arrows: '>>>'
    }
  }[task.priority || 'medium']; // Default to 'medium' if task.priority is undefined

  const formattedDate = new Date(task.date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="bg-custom-white p-4 shadow-2xl rounded-3xl flex flex-col justify-between min-h-[250px] min-w-[200px] relative">
      <div className="absolute top-2 right-2">
        <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
          <DotsHorizontalIcon className="h-6 w-6 mr-2 text-black" />
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg">
            <button
              onClick={() => {
                onEdit(task);
                setMenuOpen(false);
              }}
              className="block px-4 py-2 text-left text-black w-full hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={() => {
                onComplete(task.id);
                setMenuOpen(false);
              }}
              className="block px-4 py-2 text-left text-black w-full hover:bg-gray-100"
            >
              Complete
            </button>
            <button
              onClick={() => {
                onDelete(task.id);
                setMenuOpen(false);
              }}
              className="block px-4 py-2 text-left text-black w-full hover:bg-gray-100"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <div>
        <div className={`flex justify-left text-sm ${priority.color} mb-1`}>
          {priority.arrows} {priority.text}
        </div>
        <h2 className="text-xl font-bold flex items-center mb-1">
          <span className={`w-3 h-3 rounded-full mr-2 ${taskStatusColor}`} />
          {task.title}
        </h2>
        <p className="text-sm text-gray-500 mb-2 flex justify-left">{formattedDate}</p>
        <p className="text-md flex justify-left">{task.description}</p>
      </div>
    </div>
  );
};

export default Task;

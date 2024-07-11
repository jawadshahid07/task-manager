import React from 'react';

const Task = ({ task, onEdit, onDelete, onComplete }) => {
  const today = new Date().toISOString().split('T')[0];
  const taskStyle = task.completed ? 'bg-green-500' : (task.date < today ? 'bg-red-500' : 'bg-yellow-500');

  return (
    <div className={`bg-custom-white p-4 shadow-3xl rounded-3xl flex flex-col justify-between min-h-[250px] min-w-[200px]`}>
      <div>
        <h2 className={`${taskStyle} text-xl font-bold rounded-3xl`}>{task.title}</h2>
        <p>{task.description}</p>
        <p className="text-sm text-gray-500">{task.date}</p>
      </div>
      <div className="flex justify-center space-x-2 mt-4">
        <button onClick={() => onEdit(task)} className="bg-gray-900 text-white px-4 py-2 rounded-3xl">
          Edit
        </button>
        <button onClick={() => onComplete(task.id)} className="bg-gray-900 text-white px-4 py-2 rounded-3xl bg-green-500">
          Complete
        </button>
        <button onClick={() => onDelete(task.id)} className="bg-gray-900 text-white px-4 py-2 rounded-3xl bg-red-500">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;

import React, { useState } from 'react';
import Task from '../../components/Task';
import TaskForm from '../../components/TaskForm';
import Pagination from '../../components/Pagination';
import { PlusIcon } from '@heroicons/react/outline';

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', description: 'Description of Task 1', date: '2024-07-01', completed: false, priority: 'medium' },
    { id: 2, title: 'Task 2', description: 'Description of Task 2', date: '2024-07-02', completed: false, priority: 'low' },
    { id: 3, title: 'Task 3', description: 'Description of Task 3', date: '2024-07-02', completed: false, priority: 'high' },
    // Add more tasks as needed
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const tasksPerPage = 12;

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;

  const filteredTasks = tasks.filter(task => {
    const today = new Date().toISOString().split('T')[0];
    if (filter === 'completed') return task.completed;
    if (filter === 'missed') return !task.completed && task.date < today;
    if (filter === 'pending') return !task.completed && task.date >= today;
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);

  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleCreate = (task) => {
    setTasks([...tasks, { id: tasks.length + 1, ...task, completed: false }]);
    setIsCreating(false);
  };

  const handleEdit = (task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleComplete = (id) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, completed: true } : t)));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1); 
  };

  return (
    <div className="bg-gray-400">
      <div className="container mx-auto px-4 py-4 rounded-3xl min-h-[800px] flex flex-col pt-20">
        <h1 className="text-2xl font-bold mb-4 text-black">Tasks</h1>
        <div className="flex space-x-4 mb-4 justify-center">
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-2 py-2 rounded-3xl w-[200px] ${filter === 'all' ? 'bg-gray-900 text-white' : 'text-gray-900'}`}
          >
            All Tasks
          </button>
          <button
            onClick={() => handleFilterChange('completed')}
            className={`px-2 py-2 rounded-3xl w-[200px] ${filter === 'completed' ? 'bg-gray-900 text-white' : 'text-gray-900'}`}
          >
            Completed Tasks
          </button>
          <button
            onClick={() => handleFilterChange('missed')}
            className={`px-2 py-2 rounded-3xl w-[200px] ${filter === 'missed' ? 'bg-gray-900 text-white' : 'text-gray-900'}`}
          >
            Missed Tasks
          </button>
          <button
            onClick={() => handleFilterChange('pending')}
            className={`px-2 py-2 rounded-3xl w-[200px] ${filter === 'pending' ? 'bg-gray-900 text-white' : 'text-gray-900'}`}
          >
            Pending Tasks
          </button>
          <button onClick={() => setIsCreating(true)} className="text-gray-900 px-2 py-2 rounded-3xl w-[200px] flex items-center justify-center">
            <PlusIcon className="h-4 w-4 mr-2" /> Create Task
          </button>
        </div>
        <div className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {currentTasks.map(task => (
              <Task
                key={task.id}
                task={task}
                onEdit={() => { setCurrentTask(task); setIsEditing(true); }}
                onDelete={handleDelete}
                onComplete={handleComplete}
              />
            ))}
            {Array.from({ length: tasksPerPage - currentTasks.length }).map((_, index) => (
              <div key={index} className="bg-transparent p-4 rounded"></div>
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <Pagination totalTasks={filteredTasks.length} tasksPerPage={tasksPerPage} onPageChange={handlePageChange} currentPage={currentPage} />
        </div>

        {isCreating && (
          <TaskForm onSubmit={handleCreate} onCancel={() => setIsCreating(false)} />
        )}
        {isEditing && (
          <TaskForm task={currentTask} onSubmit={handleEdit} onCancel={() => setIsEditing(false)} />
        )}
      </div>
    </div>
  );
};

export default Tasks;

import React from 'react';

const Pagination = ({ totalTasks, tasksPerPage, onPageChange, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`mx-1 px-3 py-1 rounded-3xl ${number === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

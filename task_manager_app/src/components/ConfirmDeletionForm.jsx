import React from 'react';
import { XIcon } from '@heroicons/react/outline';

const ConfirmDeletionForm = ({ onClose, onDelete }) => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <XIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-semibold mb-4">Confirm Account Deletion</h2>
        <div className="space-y-6">
          <p className="text-lg text-gray-900">Are you sure you want to delete your account?</p>
          <div className="flex justify-end space-x-4">
            <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
              Delete Account
            </button>
            <button onClick={onClose} className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletionForm;

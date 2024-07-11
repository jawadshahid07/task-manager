import React from 'react';

const ProfileDetails = ({ user }) => {
  return (
    <div className="space-y-6">
      <div className="text-left">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Full Name</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{user.fullName}</p>
      </div>
      <div className="text-left">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Bio</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{user.bio}</p>
      </div>
      {/* Add more profile details as needed */}
    </div>
  );
};

export default ProfileDetails;

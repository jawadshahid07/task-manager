import React from 'react';

const ProfileHeader = ({ user }) => {
  return (
    <div className="text-center">
      <img className="mx-auto h-20 w-20 rounded-full" src={user.avatar} alt={`${user.username}'s avatar`} />
      <h2 className="mt-6 text-3xl font-extrabold text-gray-900">{user.username}</h2>
      <p className="mt-2 text-sm text-gray-600">{user.email}</p>
    </div>
  );
};

export default ProfileHeader;

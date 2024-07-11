import React, { useState } from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import ProfileDetails from '../../components/ProfileDetails';
import EditProfileForm from '../../components/EditProfileForm';
import ChangePasswordForm from '../../components/ChangePasswordForm';
import ConfirmDeletionForm from '../../components/ConfirmDeletionForm';

const Profile = () => {
    // Replace with actual user data fetching logic if needed
    const [user, setUser] = useState({
      username: 'username',
      email: 'user@example.com',
      fullName: 'User Full Name',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.',
      avatar: 'https://www.example.com/avatar.jpg', // URL to user's avatar
    });
  
    const [editProfile, setEditProfile] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [confirmDeletion, setConfirmDeletion] = useState(false);
  
    const handleCloseForms = () => {
      setEditProfile(false);
      setChangePassword(false);
      setConfirmDeletion(false);
    };
  
    const handleDeleteAccount = () => {
      // Add logic to delete account
      console.log('Deleting account...');
      handleCloseForms();
    };
  
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 relative bg-gray-300 p-6 rounded-3xl">
          <ProfileHeader user={user} />
          <ProfileDetails user = {user}/>
          
          {editProfile && <EditProfileForm user={user} onClose={handleCloseForms} />}
          {changePassword && <ChangePasswordForm onClose={handleCloseForms} />}
          {confirmDeletion && <ConfirmDeletionForm onDelete={handleDeleteAccount} onClose={handleCloseForms} />}
  
          {!editProfile && !changePassword && !confirmDeletion && (
            <div className="flex justify-center space-x-4">
              <button onClick={() => setEditProfile(true)} className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700">
                Edit Profile
              </button>
              <button onClick={() => setChangePassword(true)} className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700">
                Change Password
              </button>
              <button onClick={() => setConfirmDeletion(true)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
                Delete Account
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };
  
export default Profile;
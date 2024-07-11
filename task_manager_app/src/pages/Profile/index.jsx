import React, { useState } from 'react';
import ProfileHeader from '../../components/ProfileHeader';
import ProfileDetails from '../../components/ProfileDetails';
import EditProfileForm from '../../components/EditProfileForm';
import ChangePasswordForm from '../../components/ChangePasswordForm';
import ConfirmDeletionForm from '../../components/ConfirmDeletionForm';
import { DotsHorizontalIcon } from '@heroicons/react/outline';

const Profile = () => {
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
    const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

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
      <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 flex items-center justify-center my-[-100px]">
        <div className="max-w-md w-full relative">
          {/* Menu Icon */}
          <div className="absolute top-0 right-0 m-4">
            <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
              <DotsHorizontalIcon className="h-6 w-6" />
            </button>
            {menuOpen && (
              <div className="absolute z-10 right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
                <button onClick={() => { setMenuOpen(false); setEditProfile(true); }} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                  Edit Profile
                </button>
                <button onClick={() => { setMenuOpen(false); setChangePassword(true); }} className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                  Change Password
                </button>
                <button onClick={() => { setMenuOpen(false); setConfirmDeletion(true); }} className="block px-4 py-2 text-red-600 hover:bg-red-200 w-full text-left">
                  Delete Account
                </button>
              </div>
            )}
          </div>

          {/* Profile Content */}
          <div className="bg-gray-300 p-6 rounded-3xl shadow-2xl">
            <ProfileHeader user={user} />
            <ProfileDetails user={user} />

            {editProfile && <EditProfileForm user={user} onClose={handleCloseForms} />}
            {changePassword && <ChangePasswordForm onClose={handleCloseForms} />}
            {confirmDeletion && <ConfirmDeletionForm onDelete={handleDeleteAccount} onClose={handleCloseForms} />}
          </div>
      </div>
    </div>
  );
};

  
export default Profile;
import React, { useState } from 'react';
import axios from '../axiosConfig';
import { Navigate } from 'react-router-dom';

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await axios.put('/update-password', {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword

      });
      console.log('Password updated successfully:', response);
      alert('Password updated successfully');
      Navigate("/"); 
    } catch (error) {
        console.error('Error updating password:', error.response || error.message);
        alert(
            error.response?.data?.message || 'Failed to update password. Please try again.'
        );
    }
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <h2>Update Password</h2>

              <form
                method="post"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password Confirmation"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit" onClick={handleUpdatePassword}>
                  Update
                </button>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
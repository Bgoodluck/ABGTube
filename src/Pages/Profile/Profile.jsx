import React, { useState, useEffect, useContext } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { TubeContext } from '../../Components/Context/TubeContext';

function Profile() {
  const { user, updateUserProfile } = useContext(TubeContext);
  const [userData, setUserData] = useState(user || {});
  const [newImage, setNewImage] = useState(user?.profileImage || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserData(user);
      setNewImage(user.profileImage || '');
    }
  }, [user]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateUserProfile(userData);
    alert('Profile updated successfully!');
    navigate('/');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewImage(imageUrl);

      const updatedUserData = { ...userData, profileImage: imageUrl };
      setUserData(updatedUserData);
      updateUserProfile(updatedUserData);
    }
  };

  useEffect(() => {
    return () => {
      if (newImage) {
        URL.revokeObjectURL(newImage);
      }
    };
  }, [newImage]);

  return (
    <div className="profile">
      <h2>Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <input
          type="text"
          placeholder="Name"
          value={userData.name || ''}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={userData.email || ''}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <div className='profile2'>
          <label>Change Profile Image:</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      <div className="profile-image">
        {newImage ? <img src={newImage} alt="New Profile" /> : null}
      </div>
    </div>
  );
}

export default Profile;

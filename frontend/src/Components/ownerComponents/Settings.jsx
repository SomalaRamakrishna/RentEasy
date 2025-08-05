import React, { useState, useEffect } from 'react';
import './Settings.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Settings = () => {
  const user=localStorage.getItem('user');
  const userId= user ? JSON.parse(user).id : null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    profilePic: null,
    profilePicUrl: '', // for preview of existing profile pic
  });

  // 🔄 Fetch current user data
  useEffect(() => {
    const fetchOwner = async () => {
      console.log("Fetching owner details for user ID:", userId);
      try {
        const res = await axios.get(`https://renteasy-84kh.onrender.com/api/owner/get-owner-details/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log("Owner data fetched:", res.data);
        const owner = res.data;
        setFormData((prev) => ({
          ...prev,
          name: owner.name || '',
          email: owner.email || '',
          phone: owner.phone || '',
          city: owner.city || '',
          profilePicUrl: owner.profilePic || '',
        }));
      } catch (error) {
        console.error('Error fetching owner data:', error);
        toast.error('❌ Failed to load owner details');
      }
    };
    
   

    if (userId) fetchOwner();
  }, [userId]);

  // 🖋️ Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 📷 File change handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profilePic: file,
        profilePicUrl: URL.createObjectURL(file), // show preview
      }));
    }
  };

  // ✅ Submit updated data
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('city', formData.city);

    if (formData.profilePic instanceof File) {
      data.append('images', formData.profilePic);
    }

    console.log("Submitting data...");
    for (let [key, value] of data.entries()) {
        console.log(key, value);
      }

    const response = await axios.put(
      `https://renteasy-84kh.onrender.com/api/owner/edit-owner-details/${userId}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    if (response.status === 200) {
      toast.success('✅ Profile updated successfully!');
    } else {
      toast.warning('⚠️ Update submitted but may not have saved correctly.');
    }
  } catch (err) {
    console.error('Update error:', err);
    toast.error('❌ Failed to update settings. Please try again.');
  }
};


  return (
    <div className="settings-container">
      <h2>Account Settings</h2>
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="profile-picture">
          <label>Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {formData.profilePicUrl && (
            <img
              src={formData.profilePicUrl}
              alt="Profile Preview"
              className="profile-preview"
            />
          )}
        </div>

        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />

        <label>City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default Settings;

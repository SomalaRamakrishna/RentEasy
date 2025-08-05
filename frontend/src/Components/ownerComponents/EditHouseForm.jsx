import React, { useState, useEffect } from 'react';
import './EditHouseForm.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import LocationPicker from './LocationPicker';

const EditHouseForm = ({ houseId, onClose, onUpdated }) => {
  const [location, setLocation] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: {},
    city: '',
    advance: '',
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

 useEffect(() => {
  const fetchHouse = async () => {
    try {
      const response = await axios.get(`https://renteasy-84kh.onrender.com/api/owner/house/${houseId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

    const house = response.data[0];
    let parsedLocation = {};
    if (typeof house.location === 'string' && house.location.includes(',')) {
      const [latStr, lngStr] = house.location.split(',');
      parsedLocation = {
        lat: parseFloat(latStr),
        lng: parseFloat(lngStr),
      };
    } else if (typeof house.location === 'object' && house.location.lat && house.location.lng) {
      parsedLocation = house.location;
    }

      setFormData({
        ...house,
        location: parsedLocation,
      });

      setPreviewImages(house.images || []);
      if (house.location?.lat && house.location?.lng) {
       setLocation({
          lat: house.location.lat,
          lng: house.location.lng
        });
      }
    } catch (error) {
      console.error('❌ Error while fetching house:', error);
      toast.error('❌ Failed to fetch house details.');
    }
  };

  if (houseId) fetchHouse();

}, [houseId]);



  // ✏️ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // 🖼 Handle image upload (limit to 5)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setFormData((prev) => ({ ...prev, images: files }));

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // 📍 Handle location selection from map
  const handleLocationSelect = (coords) => {
    setLocation(coords);
    setFormData((prev) => ({
      ...prev,
      location: {
          lat: coords.lat,
          lng: coords.lng,
        },
    }));
  };

  // ✅ Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();

     // Loop through all form data
  Object.entries(formData).forEach(([key, value]) => {
    if (key === 'images') {
      value.forEach((img) => {
        updatedData.append('images', img);
      });
    } else if (key === 'location' && value && value.lat && value.lng) {
      // Convert location object to string "lat,lng"
      const locationStr = `${value.lat},${value.lng}`;
      updatedData.append('location', locationStr);
    } else {
      updatedData.append(key, value);
    }
  });
   // console.log("updatedData", updatedData);
    try {
      await axios.put(`https://renteasy-84kh.onrender.com/api/owner/edit-house/${houseId}`, updatedData, {
        headers: { 'Content-Type': 'multipart/form-data' ,
          Authorization: `Bearer ${localStorage.getItem('token')}`  
        },
        
      });
      toast.success('✅ Property updated successfully!');
      onUpdated(); // Refresh property list
      onClose();   // Close form/modal
    } catch (err) {
      console.error('Update error:', err);
      if (err.response && err.response.data) {
        toast.error(`❌ ${err.response.data.message || 'Failed to update property.'}`);
      }
      toast.error('❌ Failed to update property.');
    }
  };

 

  return (
    <div className="edit-form-container">
      <h2>Edit Property</h2>
      <button className="close-btn" onClick={onClose}>×</button>

      <form className="edit-house-form" onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          required
        />

        <label>Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label>Advance Amount</label>
        <input
          type="number"
          name="advance"
          value={formData.advance}
          onChange={handleChange}
          required
        />

        <label>City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <label>Pick Location on Map</label>
        <LocationPicker onLocationSelect={handleLocationSelect} />
        {location && (
          <div className="location-coords">
            📍 Selected: Lat {location.lat.toFixed(4)}, Lng {location.lng.toFixed(4)}
          </div>
        )}

        <label>Upload Images (Max: 5)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <div className="image-preview">
          {previewImages.map((img, i) => (
            <img key={i} src={img} alt={`preview-${i}`} />
          ))}
        </div>

        <div className="button-group">
          <button type="submit">Update Property</button>
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditHouseForm;

import React, { useState } from 'react';
import './AddHouseForm.css';
import LocationPicker from './LocationPicker';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddHouseForm = ({fetchProperties}) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [landmark, setLandmark] = useState('');
  const [furnished, setFurnished] = useState(false);
  const [availableFrom, setAvailableFrom] = useState('');
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState(null);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert('You can upload up to 5 images only.');
      return;
    }
    setImages(files);
  };

  const handleLocationSelect = (coords) => {
    setLocation(coords);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location) {
      alert('Please select a location from the map.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('propertyType', propertyType);
    formData.append('bedrooms', bedrooms);
    formData.append('bathrooms', bathrooms);
    formData.append('area', area);
    formData.append('city', city);
    formData.append('pincode', pincode);
    formData.append('landmark', landmark);
    formData.append('furnished', furnished);
    formData.append('availableFrom', availableFrom); 
    formData.append('location[lat]', location.lat);
    formData.append('location[lng]', location.lng);

    images.forEach((image, index) => {
      formData.append('images', image);
    });

    try {
      const token = localStorage.getItem('token');
      console.log("formData",formData);
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

     
      const res = await axios.post('https://renteasy-84kh.onrender.com/api/owner/add-house',formData, {
        headers: {
          Authorization: `Bearer ${token}`,
           'Content-Type': 'multipart/form-data',

        },
      });

      toast.success('Property added successfully!');
      console.log("res:",res.data);
      fetchProperties();
    } catch (error) {
      console.error('Error adding property:', error);
      toast.error('Failed to add property. Please try again.');
    }
  };

  return (
    <div className="add-house-container">
      <h2>Add New Property</h2>
      <form className="add-house-form" onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Rent Price (₹/month)</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
         <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="3"  />

        <label>Property Type</label>
        <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} >
          <option value="">Select</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="PG">PG</option>
          <option value="Villa">Villa</option>
          <option value="Studio">Studio</option>
        </select>

        <div className="inline-inputs">
          <div>
            <label>Bedrooms</label>
            <input type="number" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}  />
          </div>
          <div>
            <label>Bathrooms</label>
            <input type="number" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
          </div>
          <div>
            <label>Area (sq.ft)</label>
            <input type="number" value={area} onChange={(e) => setArea(e.target.value)} />
          </div>
        </div>

        <div className="inline-inputs">
          <div>
            <label>City</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)}  />
          </div>
          <div>
            <label>Pincode</label>
            <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} />
          </div>
          <div>
            <label>Landmark</label>
            <input type="text" value={landmark} onChange={(e) => setLandmark(e.target.value)} />
          </div>
        </div>

        <label>Available From</label>
        <input type="date" value={availableFrom} onChange={(e) => setAvailableFrom(e.target.value)}/>

        <label>
          <input type="checkbox" checked={furnished} onChange={(e) => setFurnished(e.target.checked)} />
          Furnished
        </label>
       

        <label>Upload House Images (Max 5)</label>
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />

        {images.length > 0 && (
          <div className="image-preview">
            {images.map((img, idx) => (
              <img key={idx} src={URL.createObjectURL(img)} alt={`preview-${idx}`} className="preview-img" />
            ))}
          </div>
        )}

        <label>Pick Location on Map</label>
        <LocationPicker onLocationSelect={handleLocationSelect} />
        {location && (
          <div className="location-coords">
            📍 Selected: Lat {location.lat.toFixed(4)}, Lng {location.lng.toFixed(4)}
          </div>
        )}

        <button type="submit">Add Property</button>
      </form>
    </div>
  );
};

export default AddHouseForm;
/*
*/
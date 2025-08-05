// src/components/ViewHouseModal.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewHouseModal.css'; // You can create this for styling

const ViewHouseModal = ({ houseId, onClose }) => {
  const [house, setHouse] = useState(null);

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        const res = await axios.get(`https://renteasy-84kh.onrender.com/api/owner/house/${houseId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setHouse(res.data[0]); // Assuming response returns array with one house
      } catch (err) {
        console.error("Error fetching house:", err);
      }
    };

    fetchHouse();
  }, [houseId]);

  if (!house) return <div className="modal-content">Loading...</div>;

  return (
     <div className="modal-overlay">
      <div className="modal-content view-house-modal">
        <h2>{house.title}</h2>

        {/* Images */}
        <div className="image-gallery">
          {house.images?.map((img, idx) => (
            <img key={idx} src={img} alt={`House ${idx + 1}`} />
          ))}
        </div>

        {/* Basic Details */}
        <div className="details-grid">
          <p><strong>Price:</strong> ₹{house.price}</p>
          <p><strong>Advance:</strong> ₹{house.advance}</p>
          <p><strong>Rooms:</strong> {house.rooms}</p>
          <p><strong>Bathrooms:</strong> {house.bathrooms}</p>
          <p><strong>Area:</strong> {house.area} sqft</p>
          <p><strong>Floor:</strong> {house.floor}</p>
          <p><strong>Total Floors:</strong> {house.totalFloors}</p>
          <p><strong>Facing:</strong> {house.facing}</p>
          <p><strong>Furnished:</strong> {house.furnished === "true" ? "Yes" : "No"}</p>
          <p><strong>Available From:</strong> {new Date(house.availableFrom).toLocaleDateString()}</p>
          <p><strong>Booking Status:</strong> {house.bookingStatus}</p>
          <p><strong>Is Available:</strong> {house.isAvailable ? "Yes" : "No"}</p>
          <p><strong>Is Verified:</strong> {house.isVerified ? "Yes" : "No"}</p>
        </div>

        {/* Description & Amenities */}
        <p><strong>Description:</strong> {house.description}</p>
        <p><strong>Amenities:</strong> {house.amenities?.length ? house.amenities.join(', ') : 'None'}</p>

        {/* Location */}
        <div className="location-info">
          <p><strong>Latitude:</strong> {house.location?.lat}</p>
          <p><strong>Longitude:</strong> {house.location?.lng}</p>
        </div>

        {/* Created/Updated */}
        <p><strong>Created At:</strong> {new Date(house.createdAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(house.updatedAt).toLocaleString()}</p>

        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>× Close</button>
      </div>
    </div>
  );
};

export default ViewHouseModal;

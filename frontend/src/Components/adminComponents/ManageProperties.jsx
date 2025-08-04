import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageProperties.css';

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/properties', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProperties(response.data);
    } catch (err) {
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="admin-properties">
      <h2>All Listed Properties</h2>
      {loading ? (
        <p>Loading properties...</p>
      ) : (
        <table className="property-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Location</th>
              <th>Owner</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {properties.length === 0 ? (
              <tr>
                <td colSpan="5">No properties found.</td>
              </tr>
            ) : (
              properties.map((property) => (
                <tr key={property._id}>
                  <td>{property.title}</td>
                  <td>₹ {property.price}</td>
                  <td>{property.location?.address || 'N/A'}</td>
                  <td>{property.owner?.name || 'Unknown'}</td>
                  <td>{property.isAvailable ? 'Available' : 'Occupied'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageProperties;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageOwners.css';
import { toast } from 'react-toastify';

const ManageOwners = () => {
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  const deleteOwner = async (ownerId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/reject-owner/${ownerId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Owner deleted:', ownerId);
      toast.success('Owner deleted successfully');
      setOwners(owners.filter(owner => owner._id !== ownerId));
    } catch (error) {
      console.error('Error deleting owner:', error);
    }
  };
  // Fetch owners from backend http://localhost:5000
  const fetchOwners = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/owners', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Fetched owners:', response.data);
      setOwners(response.data);
    } catch (error) {
      console.error('Error fetching owners:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  return (
    <div className="manage-owners-container">
      <h2>Manage Owners</h2>

      {loading ? (
        <p>Loading owners...</p>
      ) : (
        <table className="owners-table">
          <thead>
            <tr>
              <th>Owner ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {owners.length === 0 ? (
              <tr>
                <td colSpan="5">No owners found.</td>
              </tr>
            ) : (
              owners.map((owner) => (
                <tr key={owner._id}>
                  <td>{owner._id}</td>
                  <td>{owner.name}</td>
                  <td>{owner.email}</td>
                  <td>{owner.phone}</td>
                  <td>
                    <button className="btn-delete" onClick={()=>deleteOwner(owner._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageOwners;

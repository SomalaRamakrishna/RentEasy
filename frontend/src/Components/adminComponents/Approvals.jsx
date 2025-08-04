import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Approvals.css';

const Approvals = () => {
  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    const fetchApprovals = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/pending-owners', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setApprovals(response.data);
      } catch (err) {
        console.error('Error fetching approvals:', err);
      }
    };

    fetchApprovals();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/approve-owner/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setApprovals(prev => prev.filter(item => item._id !== id));
      alert(`Approved owner ID ${id}`);
    } catch (err) {
      console.error('Approval failed:', err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/reject-owner/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setApprovals(prev => prev.filter(item => item._id !== id));
      alert(`Rejected owner ID ${id}`);
    } catch (err) {
      console.error('Rejection failed:', err);
    }
  };

  return (
    <div className="approvals-container">
      <h2>Pending Approvals</h2>
      {approvals.length === 0 ? (
        <p>No pending approvals.</p>
      ) : (
        <table className="approvals-table">
          <thead>
            <tr>
              <th>Owner Name</th>
              <th>Email</th>
              <th>City</th>
              <th>Date Submitted</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {approvals.map(item => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.city}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="btn-approve" onClick={() => handleApprove(item._id)}>Approve</button>
                  <button className="btn-reject" onClick={() => handleReject(item._id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Approvals;

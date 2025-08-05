import React, { useEffect, useState } from 'react';
import './ViewPayments.css';
import axios from 'axios';

const ViewPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axios.get('https://renteasy-84kh.onrender.com/api/admin/payments', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPayments(res.data);
      } catch (err) {
        console.error('Error fetching payments:', err);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="admin-payments">
      <h2>View Payments</h2>
      <table className="payment-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>House</th>
            <th>Amount (₹)</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.user?.name || 'N/A'}</td>
              <td>{payment.user?.email || 'N/A'}</td>
              <td>{payment.house?.title || 'N/A'}</td>
              <td>₹{payment.amount}</td>
              <td className={`status ${payment.status.toLowerCase()}`}>{payment.status}</td>
              <td>{new Date(payment.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewPayments;

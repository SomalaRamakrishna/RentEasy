import React, { useEffect, useState } from 'react';
import './Payments.css';

const dummyPayments = [
  {
    houseTitle: 'Green Heights Apartment',
    amount: 7000,
    paymentId: 'pay_LNweqk12345',
    status: 'success',
    createdAt: '2025-07-14T10:00:00.000Z',
  },
  {
    houseTitle: 'Ocean View Residency',
    amount: 5500,
    paymentId: 'pay_LXzabc98765',
    status: 'success',
    createdAt: '2025-07-12T16:45:00.000Z',
  },
  {
    houseTitle: 'City Center Flat',
    amount: 8000,
    paymentId: 'pay_LXwert45678',
    status: 'failed',
    createdAt: '2025-07-10T08:30:00.000Z',
  },
  {
    houseTitle: 'Royal Villa',
    amount: 9500,
    paymentId: 'pay_LXghjk34567',
    status: 'success',
    createdAt: '2025-07-09T11:10:00.000Z',
  },
];

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Simulate backend fetch
    setTimeout(() => {
      setPayments(dummyPayments);
    }, 1000); // 1 second loading simulation
  }, []);

  return (
    <div className="payments-container">
      <h2>My Payments</h2>
      {payments.length === 0 ? (
        <p className="no-payments">Loading payments...</p>
      ) : (
        <div className="payment-list">
          {payments.map((pay, idx) => (
            <div key={idx} className="payment-card">
              <h3>🏠 {pay.houseTitle}</h3>
              <p><strong>Amount Paid:</strong> ₹{pay.amount}</p>
              <p><strong>Payment ID:</strong> {pay.paymentId}</p>
              <p><strong>Status:</strong>{' '}
                <span className={pay.status === 'success' ? 'success' : 'failed'}>
                  {pay.status}
                </span>
              </p>
              <p><strong>Date:</strong> {new Date(pay.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Payments;

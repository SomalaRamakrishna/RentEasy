import React from 'react';
import './AdminDashboard.css';

const AdminSidebar = ({ setActiveTab }) => {
  return (
    <div className="admin-sidebar">
      <h3>🛠️ Rent Easy Admin</h3>
      <ul>
        <li onClick={() => setActiveTab('dashboard')}>📊 Dashboard</li>
        <li onClick={() => setActiveTab('properties')}>🏘️ Properties</li>
        <li onClick={() => setActiveTab('users')}>👥 Users</li>
        <li onClick={() => setActiveTab('owners')}>👥 Owners</li>
        <li onClick={() => setActiveTab('payments')}>📅 Payments</li>
        <li onClick={() => setActiveTab('approvals')}>✅ Approvals</li>
        <li onClick={() => setActiveTab('logout')}>🚪 Logout</li>
      </ul>
    </div>
  );
};

export default AdminSidebar;

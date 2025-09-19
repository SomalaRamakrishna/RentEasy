import React from 'react';
import './AdminDashboard.css';

const AdminSidebar = ({ setActiveTab }) => {
  const handleLogout = () => {
    // Clear admin session (if any)
    // Redirect to admin login page
    window.location.href = '/admin/login';
  };
  return (
    <div className="admin-sidebar">
      <h3>🛠️ Rent Easy Admin</h3>
      <ul>
        <li onClick={() => setActiveTab('dashboard')}>📊 Dashboard</li>
        <li onClick={() => setActiveTab('properties')}>🏘️ Properties</li>
        <li onClick={() => setActiveTab('users')}>👥 Users</li>
        <li onClick={() => setActiveTab('owners')}>👥 Owners</li>
        {/* <li onClick={() => setActiveTab('payments')}>📅 Payments</li> */}
        {/* <li onClick={() => setActiveTab('approvals')}>✅ Approvals</li> */}
        
      </ul>
     {/*  <button className="logout-btn" onClick={handleLogout}>
          🚪 Logout
      </button> */}
    </div>
  );
};

export default AdminSidebar;

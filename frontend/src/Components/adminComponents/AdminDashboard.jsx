import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import ManageUsers from './ManageUsers';
import ManageOwners from './ManageOwners';
import ViewPayments from './ViewPayments';

import './AdminDashboard.css';
import ManageProperties from './ManageProperties';
import Approvals from './Approvals';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalUsers: 0,
    pendingApprovals: 0,
    totalCities: 0,
  });

  useEffect(() => {
    if (activeTab === 'dashboard') {
      const fetchStats = async () => {
        try {
          // Replace with your actual admin stats API
          const res = await fetch('/api/admin/stats');
          const data = await res.json();
          setStats(data);
        } catch (err) {
          console.error("Failed to fetch admin stats", err);
        }
      };

      fetchStats();
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <h2>Welcome Admin 👋</h2>
            <div className="stats-grid">
              <div className="stat-card">🏠 Total Properties: {stats.totalProperties}</div>
              <div className="stat-card">👤 Total Users: {stats.totalUsers}</div>
              <div className="stat-card">⏳ Pending Approvals: {stats.pendingApprovals}</div>
              <div className="stat-card">🌆 Cities Listed: {stats.totalCities}</div>
            </div>
          </>
        );
      case 'properties':
        return <ManageProperties />;
      case 'users':
        return <ManageUsers />;
      case 'owners':
        return <ManageOwners />;
      case 'payments':
        return <ViewPayments />;
       case 'approvals':
        return <Approvals />; 
      default:
        return <div>Select a section from sidebar</div>;
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminSidebar setActiveTab={setActiveTab} />
      <div className="dashboard-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;

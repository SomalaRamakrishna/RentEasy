import React, { useEffect, useState } from 'react';
import './OwnerDashboard.css';
import PropertyList from './PropertiesList';
import AddProperty from './AddHouseForm';
import Settings from './Settings';
import Payments from './Payments';
import axios from 'axios';

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [properties, setProperties] = useState([]);


  const fetchProperties = async () => {
    try {
      const res = await axios.get("https://renteasy-84kh.onrender.com/api/owner/my-houses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("feteched properties,,",res.data);
      setProperties(res.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);


  const renderContent = () => {
    switch (activeTab) {
      case 'properties':
        return <PropertyList properties={properties} fetchProperties={fetchProperties}/>;
      case 'add-property':
        return <AddProperty fetchProperties={fetchProperties}/>;
      case 'settings':
        return <Settings />;
      case 'payments':
        return <Payments />;
      default:
        return <div className="welcome">
          <h2>Welcome, Owner!</h2>
          <p>Manage your rental listings, add new properties, and control your settings from here.</p>
        </div>;
    }
  };

  return (
    <div className="owner-dashboard">
      <aside className="sidebar">
        <h2 className="logo">🏠 RentEasy</h2>
        <ul>
          <li
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </li>
          <li
            className={activeTab === 'properties' ? 'active' : ''}
            onClick={() => setActiveTab('properties')}
          >
            My Properties
          </li>
          <li
            className={activeTab === 'add-property' ? 'active' : ''}
            onClick={() => setActiveTab('add-property')}
          >
            Add Property
          </li>
          <li
            className={activeTab === 'payments' ? 'active' : ''}
            onClick={() => setActiveTab('payments')}
          >
            Payments
          </li>
          <li
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </li>
        </ul>
      </aside>
      <main className="main-content">{renderContent()}</main>
      
    </div>
  );
};

export default OwnerDashboard;

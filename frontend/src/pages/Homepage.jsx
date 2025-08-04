import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">🏡 Rent Easy</h1>
        <p className="home-subtitle">
          Your one-stop solution to find or list rental properties. Join us and make house-hunting smarter and easier.
        </p>
        <div className="home-buttons">
          <button className="home-btn primary" onClick={() => navigate('/register')}>
            Register
          </button>
          <button className="home-btn secondary" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

// src/pages/AboutPage.jsx
import React from "react";

const AboutPage = () => {
  return (
    <div className="about-page" style={{ padding: "2rem" }}>
      <h1>About Rent Easy</h1>
      <p>
        <strong>Rent Easy</strong> is a modern web and mobile platform that simplifies
        the rental process for both tenants and property owners.
      </p>
      <p>
        Our mission is to provide a seamless experience by integrating features like:
      </p>
      <ul>
        <li>Verified property listings</li>
        <li>Location-based search and geomaps</li>
        <li>Secure advance payments</li>
        <li>Owner-tenant communication</li>
      </ul>
      <p>
        Whether you're searching for your next home or listing your property, Rent Easy is designed to save time, reduce stress, and ensure transparency.
      </p>
      <p>Developed by Daimond & Team 👨‍💻</p>
    </div>
  );
};

export default AboutPage;

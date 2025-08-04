// RentEasy Dashboard Component
import React, { useEffect, useState } from "react";
import "./DashboardPage.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import photo from '../assets/images.jpeg'; // Assuming logo is in assets folder
import SearchPage from "../Components/additionalComponents/SearchPage";
import Navbar from "./NavBar";
let sampleHouses = [];

const DashboardPage = () => {
  const [selectedCity, setSelectedCity] = useState("Hyderabad");
  const [houses, setHouses] = useState([]);
  const [coords, setCoords] = useState({ lat: 17.385, lng: 78.4867 });
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  
  
    const fetchProperties = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/houses", {
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

  const logout = () => {
  // Clear token and user data
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Redirect to login or homepage
  navigate("/login");  // or "/"
};
  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    if (city === "Hyderabad") setCoords({ lat: 17.385, lng: 78.4867 });
    if (city === "Chennai") setCoords({ lat: 13.0827, lng: 80.2707 });
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <Navbar username="Daimond" onLogout={logout} />
      </header>
      <SearchPage properties={properties}/>

      <div className="city-selector">
        <label>Select City: </label>
        <select value={selectedCity} onChange={handleCityChange}>
          <option value="">--Choose--</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Chennai">Chennai</option>
        </select>
      </div>

      

      <div className="houses-list">
      <h2>Rental Houses in {selectedCity}</h2>
      <div className="house-cards">
        {properties?.map((house, index) => (
          <div className="house-card" key={index}>
            <div className="image-section">
              <img
                src={house.images?.[0]}
                alt={house.title}
                className="house-img"
              />
              <div className="badge">
                {house.isVerified ? "✔ Verified" : "❗Unverified"}
              </div>
              <div className="price-tag">₹{house.price}/mo</div>
            </div>

            <div className="house-details">
              <h3>{house.title}</h3>
              <p><strong>Type:</strong> {house.propertyType}</p>
             
              <p><strong>Address:</strong> {house.area}</p>
               <p><strong>Available From:</strong> {new Date(house.availableFrom).toLocaleDateString()}</p>
              <p><strong>Owner:</strong> {house.owner?.name} ({house.owner?.email})</p>
              

              <div className="map-preview">
                <iframe
                  title="map"
                  width="100%"
                  height="150"
                  loading="lazy"
                  style={{ border: "0", borderRadius: "8px" }}
                  src={`https://www.google.com/maps?q=${house.location.lat},${house.location.lng}&z=15&output=embed`}
                  allowFullScreen
                ></iframe>
              </div>

              <div className="card-buttons">
                <button
                  className="view-button"
                  onClick={() => navigate(`/view-house/${house._id}`)}
                >
                  🔍 View Details
                </button>
                <button className="save-button">❤️ Save</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="footer">
        <p>@somalaramakrishna - copyrights are reserved 2025.</p>
      </div>
    </div> 
    </div>
  );
};

export default DashboardPage;
 



/*<div className="house-details">

              <h3>{house.title}</h3>
              <p><strong>Type:</strong> {house.propertyType}</p>
              <p><strong>Location:</strong> Lat: {house.location?.lat.toFixed(3)}, Lng: {house.location?.lng.toFixed(3)}</p>
              <p><strong>Address:</strong> {house.area}</p>
              <p><strong>Advance:</strong> ₹{house.advance}</p>
              <p><strong>Rooms:</strong> {house.rooms}, <strong>Bathrooms:</strong> {house.bathrooms}</p>
              <p><strong>Floor:</strong> {house.floor} / {house.totalFloors}</p>
              <p><strong>Facing:</strong> {house.facing}</p>
              <p><strong>Furnished:</strong> {house.furnished === "true" ? "Yes" : "No"}</p>
              <p><strong>Available From:</strong> {new Date(house.availableFrom).toLocaleDateString()}</p>
              <p><strong>Owner:</strong> {house.owner?.name} ({house.owner?.email})</p>
              <p><strong>Contact:</strong> {house.contact}</p>
              <p><strong>Description:</strong> {house.description}</p>

              <div className="map-preview">
                <iframe
                  title="map"
                  width="100%"
                  height="150"
                  loading="lazy"
                  style={{ border: "0", borderRadius: "8px" }}
                  src={`https://www.google.com/maps?q=${house.location.lat},${house.location.lng}&z=15&output=embed`}
                  allowFullScreen
                ></iframe>
              </div>

              <div className="card-buttons">
                <button
                  className="view-button"
                  onClick={() => navigate(`/view-house/${house._id}`)}
                >
                  🔍 View Details
                </button>
                <button className="save-button">❤️ Save</button>
              </div>
            </div>
          </div>
        ))}
      </div>*/
      /*
        {/* <div className="virtual-tour">
          <h3>Virtual House Tour</h3>
         <iframe
                title="Virtual Tour"
                width="100%"
                height="500px"
                src="#123"
                //[{"@context":"https://schema.org","@type":"Accommodation","name":"Library Sample","description":"","address":"US","latitude":"","longitude":"","keywords":"","photo":"https://my.matterport.com/api/v1/player/models/9gmG66cA2Sc/thumb"},{"@context":"https://schema.org","@type":"VideoObject","name":"Library Sample - Preview Video 1","description":"3D fly through with a birds eye view of \"Library Sample\". This virtual tour was created by Perspective 3D using Matterport's digital twin technology.","width":854,"height":480,"thumbnail":"https://cdn-2.matterport.com/models/ee21beabe0ee4cd5a8e89d60f3f5f22e/assets/render/animation-0001-480.jpg?t=2-1ba0c835c2573d36ea344745f3e0b68f92d88e1a-1752718621-1&width=200&height=140&fit=crop&disable=upscale","thumbnailUrl":"https://cdn-2.matterport.com/models/ee21beabe0ee4cd5a8e89d60f3f5f22e/assets/render/animation-0001-480.jpg?t=2-1ba0c835c2573d36ea344745f3e0b68f92d88e1a-1752718621-1&width=200&height=140&fit=crop&disable=upscale","contentUrl":"https://cdn-2.matterport.com/models/ee21beabe0ee4cd5a8e89d60f3f5f22e/assets/render/animation-0001-480.mp4?t=2-230eccca8ac32e22ae65fbf19d24d6bfde977d37-1752718621-1&download=LONG-INTRO-480p-MP4.mp4","uploadDate":"2022-03-15T12:54:49.000Z"}]
                frameBorder="0"
                allowFullScreen
                allow="xr-spatial-tracking"
                ></iframe>
           



        </div> */

        /*<div className="dashboard-map">
        <iframe
          title="GeoMap"
          width="100%"
          height="350"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${coords.lat},${coords.lng}&z=13&output=embed`}
        ></iframe>
      </div> */
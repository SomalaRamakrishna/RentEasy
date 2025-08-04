import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for missing default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : <Marker position={position} />;
};

const LocationPicker = ({ onLocationSelect }) => {
  const [position, setPosition] = useState({ lat: 15.5, lng: 78.5 }); // Default: Andhra Pradesh

  const handleSave = () => {
    if (onLocationSelect) onLocationSelect(position);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Select Location on Map</h3>
      <MapContainer
        center={position}
        zoom={8}
        scrollWheelZoom={true}
        style={{ height: "400px", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
      <p style={{ marginTop: "10px" }}>
        <strong>Latitude:</strong> {position.lat.toFixed(6)} &nbsp;
        <strong>Longitude:</strong> {position.lng.toFixed(6)}
      </p>
      <button
         type="button"
        onClick={handleSave}
        style={{
          padding: "10px 20px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
        Save Location
      </button>
    </div>
  );
};

export default LocationPicker;

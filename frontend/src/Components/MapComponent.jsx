import React from "react";

const MapComponent = ({ lat, lng }) => {
  return (
    <iframe
      title="map"
      width="100%"
      height="300"
      frameBorder="0"
      style={{ border: 0, borderRadius: "10px" }}
      src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
      allowFullScreen
    ></iframe>
  );
};

export default MapComponent;

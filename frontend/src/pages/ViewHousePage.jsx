import React, { useEffect, useState } from "react";
import "./ViewHousePage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import MapComponent from "../Components/MapComponent"; 

const ViewHousePage = () => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);

   const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    fade: true
  };

const fetchHouse = async () => {

  try {
    const token = localStorage.getItem('token');
    /* const user = JSON.parse(localStorage.getItem('user')); */ // Parse the JSON string
    

    const response = await axios.get(`http://localhost:5000/api/user/house/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("fetched house:",response.data)
    setHouse(response.data[0]);
  } catch (error) {
    console.error("Error fetching houses:", error);
  }
};


 useEffect(() => {
  fetchHouse();
}, []);


  const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true); // Script is already loaded
      return;
    }
    
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const handleBooking = async () => {
  try {
    //setLoading(true);
     console.log("entered"); 

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      return;
    }

    // Fetch order details from the backend
    const { data } = await axios.post(
      "http://localhost:5000/api/payment",
      { amount: 2 }, // Amount in INR
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const options = {
      key: "rzp_test_6lXQP2dJmktdCG", // Replace with your Razorpay key
      amount: data.amount,
      currency: "INR",
      name: "House Advance Payment",
      description: "Pay to book  an House",
      order_id: data.id,
      handler: async (response) => {
          // Step 3: Verify Payment
          const verifyRes = await axios.post("http://localhost:5000/api/payment/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          },{
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
          if (verifyRes.data.success) {
            alert("Payment Successful!");
          } else {
            alert("Payment Verification Failed!");
          }},
      prefill: {
        name: "alumini-user",
        email: "alumni@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };
    console.log("entered 3"); 

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Payment Error:", error);
    alert("Payment Failed. Try Again.");
  } finally {
    //setLoading(false);
  }
};

  if (!house) return <div className="loader">Loading property details...</div>;

  return (
    <div className="view-house-page">
      <div className="main-content">
        <div className="view-house-container">
               <h2 className="house-title">{house.title}</h2>

              <div className="image-slider">
                {house?.images?.length > 0 && (
                  <Slider {...sliderSettings}>
                    {house.images.slice(0, 5).map((img, index) => (
                      <div key={index}>
                        <img src={img} alt={`house-${index}`} className="house-photo" />
                      </div>
                    ))}
                  </Slider>
                )}
              </div>

              <div className="house-details">
                  <table className="house-table">
                    <tbody>
                      <tr><td className="label">Type</td><td>{house.propertyType}</td></tr>
                      <tr><td className="label">Rooms</td><td>{house.rooms}</td></tr>
                      <tr><td className="label">Bathrooms</td><td>{house.bathrooms}</td></tr>
                      <tr><td className="label">Floor</td><td>{house.floor} / {house.totalFloors}</td></tr>
                      <tr><td className="label">Facing</td><td>{house.facing}</td></tr>
                      <tr><td className="label">Furnished</td><td>{house.furnished === "true" ? "Yes" : "No"}</td></tr>
                      <tr><td className="label">Price</td><td>₹{house.price}</td></tr>
                      <tr><td className="label">Advance</td><td>₹{house.advance}</td></tr>
                      <tr><td className="label">Status</td><td>{house.bookingStatus}</td></tr>
                      <tr><td className="label">Available From</td><td>{new Date(house.availableFrom).toLocaleDateString()}</td></tr>
                      <tr><td className="label">Area</td><td>{house.area} sq.ft</td></tr>
                      <tr><td className="label">Description</td><td>{house.description}</td></tr>
                      <tr><td className="label">Amenities</td>
                        <td>{house.amenities?.length > 0 ? house.amenities.join(", ") : "Not specified"}</td>
                      </tr>
                      <tr><td className="label">Location</td>
                        <td>Lat: {house.location?.lat}, Lng: {house.location?.lng}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="map-container">
                  <h3>Geolocation</h3>
                  <MapComponent lat={house.location?.lat} lng={house.location?.lng} />
                </div>
                   <button   onClick={handleBooking} className="pay-button">
                      Pay Advance
                    </button>

                <div className="owner-info">
                    <h3>Owner Contact</h3>
                    <p><strong>Name:</strong> {house.owner?.name || "N/A"}</p>
                    <p><strong>Phone:</strong> {house.owner?.phone || "N/A"}</p>
                    <p><strong>Email:</strong> {house.owner?.email || "N/A"}</p>
                </div>

                <div className="availability-status">
                    <h3>Status</h3>
                    <p className={house.isAvailable ? "" : "booked"}>
                      {house.isAvailable ? "Available" : "Currently Booked"}
                    </p>
                  </div>

         </div>
      </div>
    </div>
  );
};

export default ViewHousePage;

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./SearchPage.css";

const SampleData=[
  {
    "_id": "1",
    "title": "2BHK Flat",
    "price": 15000,
    "location": {
      "lat": 17.4352,
      "lng": 78.3898,
      "address": "Madhapur, Hyderabad"
    }
  },
  {
    "_id": "2",
    "title": "1BHK Apartment",
    "price": 10000,
    "location": {
      "lat": 17.4239,
      "lng": 78.4866,
      "address": "Kukatpally, Hyderabad"
    }
  },
  {
    "_id": "3",
    "title": "3BHK Villa",
    "price": 28000,
    "location": {
      "lat": 17.4125,
      "lng": 78.4789,
      "address": "Banjara Hills, Hyderabad"
    }
  },
  {
    "_id": "4",
    "title": "1RK Studio",
    "price": 7000,
    "location": {
      "lat": 17.4939,
      "lng": 78.3989,
      "address": "Miyapur, Hyderabad"
    }
  },
  {
    "_id": "5",
    "title": "2BHK House",
    "price": 13000,
    "location": {
      "lat": 17.4441,
      "lng": 78.3773,
      "address": "KPHB, Hyderabad"
    }
  },
  {
    "_id": "6",
    "title": "3BHK Flat",
    "price": 22000,
    "location": {
      "lat": 17.4260,
      "lng": 78.4431,
      "address": "Ameerpet, Hyderabad"
    }
  },
  {
    "_id": "7",
    "title": "1BHK House",
    "price": 9000,
    "location": {
      "lat": 17.4495,
      "lng": 78.3911,
      "address": "Hitec City, Hyderabad"
    }
  },
  {
    "_id": "8",
    "title": "2BHK Independent House",
    "price": 12000,
    "location": {
      "lat": 17.5185,
      "lng": 78.3947,
      "address": "Nizampet, Hyderabad"
    }
  },
  {
    "_id": "9",
    "title": "PG for Boys",
    "price": 5000,
    "location": {
      "lat": 17.4702,
      "lng": 78.4211,
      "address": "Yousufguda, Hyderabad"
    }
  },
  {
    "_id": "10",
    "title": "3BHK Villa",
    "price": 25000,
    "location": {
      "lat": 17.3543,
      "lng": 78.4563,
      "address": "Jubilee Hills, Hyderabad"
    }
  },
  {
    "_id": "11",
    "title": "1BHK Apartment",
    "price": 8500,
    "location": {
      "lat": 17.4931,
      "lng": 78.3964,
      "address": "Chandanagar, Hyderabad"
    }
  },
  {
    "_id": "12",
    "title": "2BHK Flat",
    "price": 14000,
    "location": {
      "lat": 17.3972,
      "lng": 78.4561,
      "address": "SR Nagar, Hyderabad"
    }
  },
  {
    "_id": "13",
    "title": "Studio Room",
    "price": 6500,
    "location": {
      "lat": 17.4256,
      "lng": 78.5122,
      "address": "Begumpet, Hyderabad"
    }
  },
  {
    "_id": "14",
    "title": "2BHK Flat",
    "price": 16000,
    "location": {
      "lat": 17.4223,
      "lng": 78.5452,
      "address": "Secunderabad, Hyderabad"
    }
  },
  {
    "_id": "15",
    "title": "3BHK Apartment",
    "price": 24000,
    "location": {
      "lat": 17.4274,
      "lng": 78.4037,
      "address": "Gachibowli, Hyderabad"
    }
  },
  {
    "_id": "16",
    "title": "1RK Flat",
    "price": 6000,
    "location": {
      "lat": 17.4024,
      "lng": 78.4809,
      "address": "Erragadda, Hyderabad"
    }
  },
  {
    "_id": "17",
    "title": "2BHK Apartment",
    "price": 13500,
    "location": {
      "lat": 17.4203,
      "lng": 78.3897,
      "address": "Manikonda, Hyderabad"
    }
  },
  {
    "_id": "18",
    "title": "3BHK Villa",
    "price": 26000,
    "location": {
      "lat": 17.4369,
      "lng": 78.3445,
      "address": "Narsingi, Hyderabad"
    }
  },
  {
    "_id": "19",
    "title": "1BHK House",
    "price": 9500,
    "location": {
      "lat": 17.4132,
      "lng": 78.4892,
      "address": "Punjagutta, Hyderabad"
    }
  },
  {
    "_id": "20",
    "title": "2BHK Flat",
    "price": 14500,
    "location": {
      "lat": 17.385,
      "lng": 78.4867,
      "address": "Somajiguda, Hyderabad"
    }
  },
  {
    "_id": "21",
    "title": "PG for Girls",
    "price": 5500,
    "location": {
      "lat": 17.4412,
      "lng": 78.4623,
      "address": "Ameerpet, Hyderabad"
    }
  },
  {
    "_id": "22",
    "title": "1BHK Flat",
    "price": 8000,
    "location": {
      "lat": 17.4700,
      "lng": 78.3993,
      "address": "Bachupally, Hyderabad"
    }
  },
  {
    "_id": "23",
    "title": "2BHK House",
    "price": 12500,
    "location": {
      "lat": 17.4830,
      "lng": 78.3845,
      "address": "Bowenpally, Hyderabad"
    }
  },
  {
    "_id": "24",
    "title": "3BHK Duplex",
    "price": 27000,
    "location": {
      "lat": 17.4992,
      "lng": 78.4151,
      "address": "Alwal, Hyderabad"
    }
  },
  {
    "_id": "25",
    "title": "1RK Studio",
    "price": 6000,
    "location": {
      "lat": 17.4574,
      "lng": 78.4292,
      "address": "Moosapet, Hyderabad"
    }
  },
  {
    "_id": "26",
    "title": "2BHK Flat",
    "price": 15500,
    "location": {
      "lat": 17.4400,
      "lng": 78.3821,
      "address": "Kondapur, Hyderabad"
    }
  },
  {
    "_id": "27",
    "title": "3BHK Penthouse",
    "price": 35000,
    "location": {
      "lat": 17.3765,
      "lng": 78.4663,
      "address": "Film Nagar, Hyderabad"
    }
  },
  {
    "_id": "28",
    "title": "1BHK Flat",
    "price": 9500,
    "location": {
      "lat": 17.4225,
      "lng": 78.4080,
      "address": "Shaikpet, Hyderabad"
    }
  },
  {
    "_id": "29",
    "title": "2BHK Apartment",
    "price": 14000,
    "location": {
      "lat": 17.5011,
      "lng": 78.3930,
      "address": "Pragathi Nagar, Hyderabad"
    }
  },
  {
    "_id": "30",
    "title": "3BHK Villa",
    "price": 30000,
    "location": {
      "lat": 17.3332,
      "lng": 78.5511,
      "address": "LB Nagar, Hyderabad"
    }
  }
]


// Fix for default marker icons not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const SearchPage = ({properties}) => {
  const [center, setCenter] = useState([17.385044, 78.486671]); // Default to Hyderabad

  return (
    <div className="search-map-container">
      <h2>Available Properties</h2>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="map"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> contributors'
        />
        {properties?.map((house) => (
          <Marker
            key={house._id}
            position={[house.location.lat, house.location.lng]}
          >
            <Popup>
              <strong>{house.title}</strong><br />
              ₹{house.price}/month<br />
              {house.location.address}<br />
              <a href={`/house/${house._id}`}>View</a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default SearchPage;

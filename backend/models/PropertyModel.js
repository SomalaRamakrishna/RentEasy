const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    maxlength: 2000,
  },
  price: {
    type: Number,
    required: true,
  },
  advance: {
    type: Number,
    required: true,
  },
  rooms: {
    type: Number,
    default: 1,
  },
  bathrooms: {
    type: Number,
    default: 1,
  },
  area: {
    type: String, // e.g., "1200 sqft"
  },
  furnished: {
    type: String,
     default:'false',
  },
  propertyType: {
    type: String,
    enum: ['Apartment', 'House', 'PG', 'Studio', 'Villa'],
    required: true,
  },
  floor: {
    type: String, // e.g., "2nd Floor", "Ground Floor"
    default:"Ground Floor",
  },
  totalFloors: {
    type: Number,
    default:1,
  },
  facing: {
    type: String, // e.g., "East", "West"
    default:"East",
  },
  images: {
    type: [String],
    validate: [arrayLimit, '{PATH} exceeds the limit of 5'],
  },
  amenities: {
    type: [String], // e.g., ["WiFi", "AC", "Parking", "Lift"]
    default: [],
  },
  location: {
    address: {
      type: String,
    },
    city: String,
    pincode: String,
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  availableFrom: {
    type: Date,
    default: Date.now,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true,
  },
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  bookingStatus: {
    type: String,
    enum: ['available', 'booked', 'pending'],
    default: 'available',
  },
}, { timestamps: true });

function arrayLimit(val) {
  return val.length <= 5;
}

module.exports = mongoose.model('Property', propertySchema);

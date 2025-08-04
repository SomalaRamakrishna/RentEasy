const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    /* minlength: 20 */
  },

  phone: {
    type: String,
    /* required: true */
  },

  profilePic: {
    type: String,
    default: ''
  },

  role: {
    type: String,
    enum: ['owner', 'tenant', 'admin'],
    default: 'tenant'
  },

  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'other'
  },

  dob: {
    type: Date
  },
  city:{
    type: String,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },

  isVerified: {
    type: Boolean,
    default: false
  },

  likedProperties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }],

  bookedProperties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }],

  bio: {
    type: String,
    maxlength: 300
  },
  payments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }],

  
  resetPasswordToken: String,
  resetPasswordExpires: Date,

  lastLogin: Date,
  loginHistory: [{
    ip: String,
    timestamp: Date
  }]
}, { timestamps: true });

module.exports = mongoose.model('UserModel', userSchema);

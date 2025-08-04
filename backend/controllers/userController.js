const User = require('../models/UserModel'); // or TenantModel if you use separate models


const mongoose = require('mongoose');
const Property = require('../models/PropertyModel');



const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select('-password'); // exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, phone, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(email && { email }),
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




const getAvailableHouses = async (req, res) => {
  try {
    const houses = await Property.find()
      .populate('owner', 'name email phone') // only fetch minimal owner info
      .sort({ createdAt: -1 });

    res.status(200).json(houses);
  } catch (error) {
    console.error('Error fetching available houses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const viewHouseDetails = async (req, res) => {
  const houseId = req.params.id;
  console.log("houseId",houseId);
  try {
      const house = await Property.find({_id: houseId} ).populate('owner', 'name email phone role createdAt') // Include only safe fields

    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }
    
    res.status(200).json(house);
  } catch (error) {
    console.error('Error fetching house details:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


/*

const Razorpay = require('razorpay');
const Payment = require('../models/Payment');

// If using Razorpay, configure instance (use env vars in production)
const razorpay = new Razorpay({
  key_id: 'rzp_test_YourKeyHere',
  key_secret: 'YourSecretHere'
});

const makePayment = async (req, res) => {
  const userId = req.user._id;
  const houseId = req.params.houseId;

  try {
    const house = await Property.findById(houseId).populate('owner');
    if (!house) return res.status(404).json({ message: 'House not found' });

    const amount = house.advance;

    // Create Razorpay order (or mock it)
    const payment_capture = 1;
    const currency = 'INR';
    const options = {
      amount: amount * 100, // Razorpay works in paise
      currency,
      receipt: `receipt_${houseId}_${Date.now()}`,
      payment_capture
    };

    const order = await razorpay.orders.create(options);

    // Save to DB as pending (status update can be done in webhook or success page)
    const payment = new Payment({
      user: userId,
      house: houseId,
      owner: house.owner._id,
      amount,
      currency,
      razorpayOrderId: order.id,
      status: 'created'
    });

    await payment.save();

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      house: {
        title: house.title,
        location: house.location,
        owner: house.owner.name
      }
    });

  } catch (err) {
    console.error('Payment error:', err);
    res.status(500).json({ message: 'Payment initiation failed' });
  }
};



const getTenantPayments = async (req, res) => {
  try {
    const userId = req.user._id;

    const payments = await Payment.find({ user: userId })
      .populate('house', 'title location city')       // show house title and location
      .populate('owner', 'name email')                // show owner name
      .sort({ createdAt: -1 });                        // latest first

    res.status(200).json(payments);
  } catch (err) {
    console.error('Get Tenant Payments Error:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


*/



module.exports = {
  getProfile, updateProfile,
  getAvailableHouses, viewHouseDetails
};
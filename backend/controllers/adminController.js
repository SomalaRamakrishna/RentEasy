const UserModel = require('../models/UserModel'); // adjust path as needed
const Property = require('../models/PropertyModel'); // adjust path
const Payment = require('../models/Payment'); // adjust path
const PropertyModel = require('../models/PropertyModel');

// ✅ Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ role: 'tenant' })
                    .select('-password')
                    .sort({ createdAt: -1 }); // Newest first
   // console.log('Fetched owners:', users);
    res.status(200).json(users);
  } catch (err) {
    console.error('Error getting users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const getAllOwners = async (req, res) => {
  try {
    const owners = await UserModel.find({ role: 'owner' })
                    .select('-password')
                    .sort({ createdAt: -1 }); // Newest first
   // console.log('Fetched owners:', owners);
    res.status(200).json(owners);
  } catch (err) {
    console.error('Error getting users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// ✅ Get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'name email');
    res.status(200).json(properties);
  } catch (err) {
    console.error('Error getting properties:', err);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
};

// ✅ Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('user property');
    res.status(200).json(payments);
  } catch (err) {
    console.error('Error getting payments:', err);
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
};

// ✅ Delete a user by ID
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    console.log('Deleting user:', user);
    await UserModel.findByIdAndDelete(userId);
    await PropertyModel.updateMany({ owner: userId }, { isAvailable: false });
    res.status(200).json({ message: 'User deleted successfully' });
  }
  catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// ✅ Ban a user (update status)
const banUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.isBanned = true;
    await user.save();

    res.status(200).json({ message: 'User has been banned' });
  } catch (err) {
    console.error('Error banning user:', err);
    res.status(500).json({ error: 'Failed to ban user' });
  }
};


const  getPendingOwners = async (req, res) => {
  try {
    const pending = await User.find({ role: 'owner', verified: false }).select('-password');
    res.status(200).json(pending);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending owners' });
  }
};

const  approveOwner = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { verified: true });
    res.status(200).json({ message: 'Owner approved' });
  } catch (err) {
    res.status(500).json({ error: 'Approval failed' });
  }
};

const rejectOwner = async (req, res) => {
  try {
    console.log('Rejecting owner with ID:', req.params.id);
    console.log("property Details:", await Property.find({ owner: req.params.id }));
    await UserModel.findByIdAndDelete(req.params.id);
    await PropertyModel.deleteMany({ owner: req.params.id });
    res.status(200).json({ message: 'Owner rejected and removed' });
  } catch (err) {
    res.status(500).json({ error: 'Rejection failed' });
  }
};

const getStats = async (req, res) => {
  try {
    const totalProperties = await PropertyModel.countDocuments();
    const totalUsers = await UserModel.countDocuments({ role: 'tenant' });
    const totalOwners = await UserModel.countDocuments({ role: 'owner' });
    const totalCities = await PropertyModel.distinct('location.city').then(cities => cities.length);
    res.status(200).json({ totalProperties, totalUsers, totalOwners, totalCities });
  } catch (err) {
    console.error('Error fetching stats:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};


module.exports = {
  getAllUsers,
  getAllOwners,
  getAllProperties,
    getAllPayments,
    getStats,
    deleteUser,
    banUser,

    getPendingOwners,
    approveOwner,
    rejectOwner
};
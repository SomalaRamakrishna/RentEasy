const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getAvailableHouses,
  viewHouseDetails,
} = require('../controllers/userController');

const {userVerify} = require('../middleware/userVerify');


// Profile
/* router.get('/profile', verify, getProfile);
router.put('/profile', verify, updateProfile); */

// House Browsing
router.get('/houses', userVerify, getAvailableHouses);
router.get('/house/:id', userVerify, viewHouseDetails);

// Payments 
/* router.post('/payment/:houseId', verify, makePayment);  // Pay advance
router.get('/payments', verify, getTenantPayments);     */ // View all payments

module.exports = router;

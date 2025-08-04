const express = require("express");


const multer = require("multer");
const router = express.Router();

/* const storage = multer.memoryStorage(); // or diskStorage if saving to disk
const upload = multer({ storage: storage }); */

const {verify}= require('../middleware/verify');
 const upload = require('../middleware/uploadMiddleware'); 
const {addHouse,getMyHouses, deleteHouse, editHouse, viewHouse, editOwnerDetails, getOwner} = require('../controllers/ownerController');







router.get('/my-houses', verify, getMyHouses);
router.get('/get-owner-details/:id', verify, getOwner);
router.post('/add-house', verify, upload.array("images",5), addHouse);
router.get('/house/:id', verify, viewHouse);
router.delete('/delete-house/:id', verify, deleteHouse);
 router.put('/edit-house/:id', verify,upload.array("images",5), editHouse);
 router.put('/edit-owner-details/:id', verify,upload.array("images",5),editOwnerDetails);
/*
router.get('/bookings/:houseId', verify, getBookingsForHouse);
router.get('/payments', verify, getPayments); */

module.exports = router;
